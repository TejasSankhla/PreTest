import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  InterviewAttempt,
  InterviewAttemptDocument,
  AttemptStatus,
} from '../../schemas/interview-attempt.schema';
import {
  EvaluationService,
  InterviewWithRubrics,
} from '../../services/evaluation.service';
import { ElevenLabsWebhookPayload } from '../../types/elevenlabs.types';

export type { ElevenLabsWebhookPayload };

@Injectable()
export class ElevenLabsWebhookService {
  private readonly logger = new Logger(ElevenLabsWebhookService.name);

  constructor(
    @InjectModel(InterviewAttempt.name)
    private attemptModel: Model<InterviewAttemptDocument>,
    private evaluationService: EvaluationService,
  ) {}

  /**
   * Handle incoming ElevenLabs webhook
   */
  async handleWebhook(payload: ElevenLabsWebhookPayload): Promise<void> {
    this.logger.log(
      `Received webhook: ${payload.type} for conversation ${payload.data.conversation_id}`,
    );

    switch (payload.type) {
      case 'post_call_transcription':
        await this.handlePostCallTranscription(payload);
        break;
      case 'post_call_audio':
        this.handlePostCallAudio(payload);
        break;
      default:
        this.logger.warn(`Unknown webhook type: ${payload.type}`);
    }
  }

  /**
   * Handle post_call_transcription webhook
   * This is triggered when the call ends and transcript is ready
   */
  private async handlePostCallTranscription(
    payload: ElevenLabsWebhookPayload,
  ): Promise<void> {
    const { conversation_id, transcript, metadata } = payload.data;

    // Find the attempt by conversation ID
    const attempt = await this.attemptModel.findOne({
      elevenLabsConversationId: conversation_id,
    });

    if (!attempt) {
      this.logger.warn(
        `No attempt found for conversation ID: ${conversation_id}`,
      );
      return;
    }

    // Update attempt with transcript and mark as completed if still in progress
    if (attempt.status === AttemptStatus.IN_PROGRESS) {
      attempt.status = AttemptStatus.COMPLETED;
      attempt.completedAt = new Date();

      if (metadata?.call_duration_secs) {
        attempt.durationSeconds = metadata.call_duration_secs;
      } else if (attempt.startedAt) {
        attempt.durationSeconds = Math.floor(
          (attempt.completedAt.getTime() - attempt.startedAt.getTime()) / 1000,
        );
      }
    }

    // Store raw ElevenLabs transcript as JSON (evaluation service extracts it)
    attempt.transcript = { transcript: transcript || [] };

    // Save and trigger evaluation
    await attempt.save();

    this.logger.log(
      `Transcript saved for attempt ${String(attempt._id)}, triggering evaluation...`,
    );

    // Trigger evaluation (sync for now, can be made async later)
    await this.triggerEvaluation(attempt._id.toString());
  }

  /**
   * Handle post_call_audio webhook
   * This provides the audio recording URL
   */
  private handlePostCallAudio(payload: ElevenLabsWebhookPayload): void {
    const { conversation_id } = payload.data;

    // For now, we'll fetch the audio URL when needed via the conversation API
    // The post_call_audio webhook contains base64 audio which we don't want to store directly

    this.logger.log(
      `Audio webhook received for conversation ${conversation_id} (audio URL will be fetched on demand)`,
    );
  }

  /**
   * Trigger evaluation for an attempt
   * This will be called after transcript is saved
   */
  async triggerEvaluation(attemptId: string): Promise<void> {
    const attempt = await this.attemptModel
      .findById(attemptId)
      .populate<{ interview: InterviewWithRubrics }>({
        path: 'interview',
        populate: { path: 'rubrics', model: 'Rubric' },
      })
      .exec();

    if (!attempt) {
      this.logger.error(`Attempt not found: ${attemptId}`);
      return;
    }

    // Only evaluate if we have a transcript and attempt is completed
    if (
      !attempt.transcript ||
      (attempt.status !== AttemptStatus.COMPLETED &&
        attempt.status !== AttemptStatus.FAILED)
    ) {
      this.logger.warn(
        `Cannot evaluate attempt ${attemptId}: no transcript or invalid status`,
      );
      return;
    }

    try {
      // Mark as evaluating
      attempt.status = AttemptStatus.EVALUATING;
      await attempt.save();

      this.logger.log(`Evaluation started for attempt ${attemptId}`);

      // Call evaluation service
      const evaluation = await this.evaluationService.evaluate(
        attempt.interview,
        attempt.transcript,
      );

      // Save evaluation results
      attempt.status = AttemptStatus.EVALUATED;
      attempt.evaluation = evaluation;
      await attempt.save();

      this.logger.log(
        `Evaluation completed for attempt ${attemptId}, score: ${evaluation.overallScore}`,
      );
    } catch (error) {
      this.logger.error(`Evaluation failed for attempt ${attemptId}:`, error);

      attempt.status = AttemptStatus.FAILED;
      await attempt.save();
    }
  }
}
