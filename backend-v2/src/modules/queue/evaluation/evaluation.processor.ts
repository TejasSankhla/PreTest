import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EVALUATION_QUEUE } from './evaluation.queue';
import {
  EvaluationJobData,
  EvaluationJobName,
  EVALUATION_JOB_CONFIG,
} from './evaluation.types';
import {
  InterviewAttempt,
  InterviewAttemptDocument,
  AttemptStatus,
} from '../../../schemas/interview-attempt.schema';
import {
  EvaluationService,
  InterviewWithRubrics,
} from '../../../services/evaluation.service';
import { AiInterviewService } from '../../ai-interview/ai-interview.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Processor(EVALUATION_QUEUE)
export class EvaluationProcessor extends WorkerHost {
  private readonly logger = new Logger(EvaluationProcessor.name);

  constructor(
    @InjectModel(InterviewAttempt.name)
    private attemptModel: Model<InterviewAttemptDocument>,
    private evaluationService: EvaluationService,
    private aiInterviewService: AiInterviewService,
    @InjectQueue(EVALUATION_QUEUE) private evaluationQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<EvaluationJobData>): Promise<void> {
    const jobName = job.name as EvaluationJobName;

    switch (jobName) {
      case EvaluationJobName.FETCH_TRANSCRIPT:
        await this.processFetchTranscript(job);
        break;
      case EvaluationJobName.FETCH_AUDIO:
        await this.processFetchAudio(job);
        break;
      case EvaluationJobName.COMPLETE_EVALUATION:
        await this.processCompleteEvaluation(job);
        break;
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // JOB 1: FETCH TRANSCRIPT
  // ─────────────────────────────────────────────────────────────────────────────

  private async processFetchTranscript(
    job: Job<EvaluationJobData>,
  ): Promise<void> {
    const { attemptId, conversationId } = job.data;
    const maxAttempts = job.opts.attempts ?? EVALUATION_JOB_CONFIG.attempts;

    this.logger.log(
      `[FETCH_TRANSCRIPT] Job ${job.id} for attempt ${attemptId} (try ${job.attemptsMade + 1}/${maxAttempts})`,
    );

    const attempt = await this.attemptModel.findById(attemptId).exec();

    if (!attempt) {
      throw new Error(`Attempt not found: ${attemptId}`);
    }

    // Skip if already past this stage or in terminal state
    if (
      this.isTerminalOrPastStage(
        attempt.status,
        AttemptStatus.FETCHING_TRANSCRIPT,
      )
    ) {
      this.logger.warn(
        `Attempt ${attemptId} already past FETCHING_TRANSCRIPT stage: ${attempt.status}, skipping`,
      );
      return;
    }

    try {
      // Mark as FETCHING_TRANSCRIPT
      attempt.status = AttemptStatus.FETCHING_TRANSCRIPT;
      await attempt.save();
      await job.updateProgress(10);

      // Fetch transcript from ElevenLabs
      this.logger.log(`Fetching transcript for conversation ${conversationId}`);
      const conversation =
        await this.aiInterviewService.getConversation(conversationId);
      await job.updateProgress(80);

      // Save transcript to attempt
      attempt.transcript = {
        transcript: conversation.transcript || [],
        metadata: conversation.metadata,
        analysis: conversation.analysis,
      };

      // Calculate duration from metadata if available
      if (
        conversation.metadata?.call_duration_secs &&
        !attempt.durationSeconds
      ) {
        attempt.durationSeconds = conversation.metadata.call_duration_secs;
      }

      await attempt.save();
      await job.updateProgress(100);

      this.logger.log(
        `[FETCH_TRANSCRIPT] Completed for attempt ${attemptId}, transcript length: ${conversation.transcript?.length || 0}`,
      );

      // Queue next job: FETCH_AUDIO
      await this.queueNextJob(EvaluationJobName.FETCH_AUDIO, job.data);
    } catch (error) {
      this.logger.error(
        `[FETCH_TRANSCRIPT] Failed for attempt ${attemptId}:`,
        error,
      );

      // Mark as failed only on final attempt
      if (job.attemptsMade >= maxAttempts - 1) {
        attempt.status = AttemptStatus.FAILED;
        await attempt.save();
        this.logger.error(
          `All retries exhausted for FETCH_TRANSCRIPT, attempt ${attemptId} marked as FAILED`,
        );
      }

      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // JOB 2: FETCH AUDIO
  // ─────────────────────────────────────────────────────────────────────────────

  private async processFetchAudio(job: Job<EvaluationJobData>): Promise<void> {
    const { attemptId, conversationId } = job.data;
    const maxAttempts = job.opts.attempts ?? EVALUATION_JOB_CONFIG.attempts;

    this.logger.log(
      `[FETCH_AUDIO] Job ${job.id} for attempt ${attemptId} (try ${job.attemptsMade + 1}/${maxAttempts})`,
    );

    const attempt = await this.attemptModel.findById(attemptId).exec();

    if (!attempt) {
      throw new Error(`Attempt not found: ${attemptId}`);
    }

    // Skip if already past this stage or in terminal state
    if (
      this.isTerminalOrPastStage(attempt.status, AttemptStatus.FETCHING_AUDIO)
    ) {
      this.logger.warn(
        `Attempt ${attemptId} already past FETCHING_AUDIO stage: ${attempt.status}, skipping`,
      );
      return;
    }

    try {
      // Mark as FETCHING_AUDIO
      attempt.status = AttemptStatus.FETCHING_AUDIO;
      await attempt.save();
      await job.updateProgress(10);

      // Fetch audio URL from ElevenLabs
      this.logger.log(`Fetching audio for conversation ${conversationId}`);
      const audioUrl =
        await this.aiInterviewService.getConversationAudioUrl(conversationId);
      await job.updateProgress(80);

      // Save audio URL if available
      if (audioUrl) {
        attempt.audioUrl = audioUrl;
        await attempt.save();
        this.logger.log(
          `[FETCH_AUDIO] Audio URL saved for attempt ${attemptId}`,
        );
      } else {
        this.logger.log(
          `[FETCH_AUDIO] No audio available for attempt ${attemptId}, proceeding`,
        );
      }

      await job.updateProgress(100);

      // Queue next job: COMPLETE_EVALUATION
      await this.queueNextJob(EvaluationJobName.COMPLETE_EVALUATION, job.data);
    } catch (error) {
      this.logger.error(
        `[FETCH_AUDIO] Failed for attempt ${attemptId}:`,
        error,
      );

      // Mark as failed only on final attempt
      if (job.attemptsMade >= maxAttempts - 1) {
        attempt.status = AttemptStatus.FAILED;
        await attempt.save();
        this.logger.error(
          `All retries exhausted for FETCH_AUDIO, attempt ${attemptId} marked as FAILED`,
        );
      }

      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // JOB 3: COMPLETE EVALUATION
  // ─────────────────────────────────────────────────────────────────────────────

  private async processCompleteEvaluation(
    job: Job<EvaluationJobData>,
  ): Promise<void> {
    const { attemptId } = job.data;
    const maxAttempts = job.opts.attempts ?? EVALUATION_JOB_CONFIG.attempts;

    this.logger.log(
      `[COMPLETE_EVALUATION] Job ${job.id} for attempt ${attemptId} (try ${job.attemptsMade + 1}/${maxAttempts})`,
    );

    const attempt = await this.attemptModel
      .findById(attemptId)
      .populate<{ interview: InterviewWithRubrics }>({
        path: 'interview',
        populate: { path: 'rubrics', model: 'Rubric' },
      })
      .exec();

    if (!attempt) {
      throw new Error(`Attempt not found: ${attemptId}`);
    }

    // Skip if already evaluated or failed
    if (
      attempt.status === AttemptStatus.EVALUATED ||
      attempt.status === AttemptStatus.FAILED
    ) {
      this.logger.warn(
        `Attempt ${attemptId} already in terminal state: ${attempt.status}, skipping`,
      );
      return;
    }

    try {
      // Mark as EVALUATING
      attempt.status = AttemptStatus.EVALUATING;
      await attempt.save();
      await job.updateProgress(10);

      // Check if transcript exists
      if (!attempt.transcript) {
        this.logger.error(`No transcript found for attempt ${attemptId}`);
        attempt.status = AttemptStatus.FAILED;
        await attempt.save();
        return;
      }

      // Check if transcript is empty
      const transcriptData = attempt.transcript as {
        transcript?: unknown[];
      };
      if (
        !transcriptData.transcript ||
        transcriptData.transcript.length === 0
      ) {
        this.logger.warn(`Empty transcript for attempt ${attemptId}`);
        attempt.status = AttemptStatus.FAILED;
        await attempt.save();
        return;
      }

      await job.updateProgress(30);

      // Run LLM evaluation
      this.logger.log(`Running LLM evaluation for attempt ${attemptId}`);
      const evaluation = await this.evaluationService.evaluate(
        attempt.interview,
        attempt.transcript,
      );
      await job.updateProgress(90);

      // Save evaluation results
      attempt.status = AttemptStatus.EVALUATED;
      attempt.evaluation = evaluation;
      await attempt.save();
      await job.updateProgress(100);

      this.logger.log(
        `[COMPLETE_EVALUATION] Completed for attempt ${attemptId}, score: ${evaluation.overallScore}`,
      );
    } catch (error) {
      this.logger.error(
        `[COMPLETE_EVALUATION] Failed for attempt ${attemptId}:`,
        error,
      );

      // Mark as failed only on final attempt
      if (job.attemptsMade >= maxAttempts - 1) {
        attempt.status = AttemptStatus.FAILED;
        await attempt.save();
        this.logger.error(
          `All retries exhausted for COMPLETE_EVALUATION, attempt ${attemptId} marked as FAILED`,
        );
      }

      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────────────────────────────

  private async queueNextJob(
    jobName: EvaluationJobName,
    data: EvaluationJobData,
  ): Promise<void> {
    const jobId = `${jobName}-${data.attemptId}`;

    await this.evaluationQueue.add(jobName, data, {
      jobId,
      // No delay between pipeline stages
    });

    this.logger.log(
      `Queued ${jobName} job ${jobId} for attempt ${data.attemptId}`,
    );
  }

  private isTerminalOrPastStage(
    currentStatus: AttemptStatus,
    stageStatus: AttemptStatus,
  ): boolean {
    // Terminal states
    if (
      currentStatus === AttemptStatus.EVALUATED ||
      currentStatus === AttemptStatus.FAILED
    ) {
      return true;
    }

    // Check if already past this stage in pipeline
    const pipelineOrder = [
      AttemptStatus.FETCHING_TRANSCRIPT,
      AttemptStatus.FETCHING_AUDIO,
      AttemptStatus.EVALUATING,
    ];

    const currentIndex = pipelineOrder.indexOf(currentStatus);
    const stageIndex = pipelineOrder.indexOf(stageStatus);

    // If current status is in pipeline and past the given stage
    if (currentIndex !== -1 && stageIndex !== -1 && currentIndex > stageIndex) {
      return true;
    }

    return false;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // EVENTS
  // ─────────────────────────────────────────────────────────────────────────────

  @OnWorkerEvent('completed')
  onCompleted(job: Job<EvaluationJobData>) {
    this.logger.log(
      `[${job.name}] Job ${job.id} completed for attempt ${job.data.attemptId}`,
    );
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<EvaluationJobData> | undefined, error: Error) {
    if (job) {
      this.logger.error(
        `[${job.name}] Job ${job.id} failed for attempt ${job.data.attemptId}: ${error.message}`,
      );
    } else {
      this.logger.error(`Job failed: ${error.message}`);
    }
  }
}
