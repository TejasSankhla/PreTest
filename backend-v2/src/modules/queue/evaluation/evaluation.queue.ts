import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EvaluationJobData, EvaluationJobName } from './evaluation.types';

export const EVALUATION_QUEUE = 'evaluation';

// Pipeline job IDs follow this pattern for easy lookup
const getJobId = (jobName: EvaluationJobName, attemptId: string) =>
  `${jobName}-${attemptId}`;

@Injectable()
export class EvaluationQueueService {
  private readonly logger = new Logger(EvaluationQueueService.name);

  constructor(@InjectQueue(EVALUATION_QUEUE) private evaluationQueue: Queue) {}

  /**
   * Start the evaluation pipeline for an interview attempt
   * Pipeline: FETCH_TRANSCRIPT → FETCH_AUDIO → COMPLETE_EVALUATION
   */
  async queueEvaluation(data: EvaluationJobData): Promise<string> {
    const jobId = getJobId(EvaluationJobName.FETCH_TRANSCRIPT, data.attemptId);

    const job = await this.evaluationQueue.add(
      EvaluationJobName.FETCH_TRANSCRIPT,
      data,
      {
        jobId,
        // 3 second delay to allow ElevenLabs to finalize data
        delay: 3000,
      },
    );

    this.logger.log(
      `Started evaluation pipeline (job ${job.id}) for attempt ${data.attemptId}`,
    );

    return job.id ?? jobId;
  }

  /**
   * Get the current status of the evaluation pipeline
   * Returns the status of all 3 jobs in the pipeline
   */
  async getPipelineStatus(attemptId: string): Promise<{
    attemptId: string;
    currentStage: EvaluationJobName | 'pending' | 'completed' | 'failed';
    jobs: {
      name: EvaluationJobName;
      id: string;
      state: string;
      progress: number | string | object | boolean;
      attemptsMade: number;
      failedReason?: string;
    }[];
  }> {
    const jobs: {
      name: EvaluationJobName;
      id: string;
      state: string;
      progress: number | string | object | boolean;
      attemptsMade: number;
      failedReason?: string;
    }[] = [];

    // Check all 3 pipeline stages
    const stages = [
      EvaluationJobName.FETCH_TRANSCRIPT,
      EvaluationJobName.FETCH_AUDIO,
      EvaluationJobName.COMPLETE_EVALUATION,
    ];

    let currentStage: EvaluationJobName | 'pending' | 'completed' | 'failed' =
      'pending';

    for (const stage of stages) {
      const jobId = getJobId(stage, attemptId);
      const job = await this.evaluationQueue.getJob(jobId);

      if (job) {
        const state = await job.getState();
        jobs.push({
          name: stage,
          id: job.id ?? jobId,
          state,
          progress: job.progress,
          attemptsMade: job.attemptsMade,
          failedReason: job.failedReason,
        });

        // Determine current stage
        if (state === 'failed') {
          currentStage = 'failed';
        } else if (
          state === 'active' ||
          state === 'waiting' ||
          state === 'delayed'
        ) {
          currentStage = stage;
        } else if (
          state === 'completed' &&
          stage === EvaluationJobName.COMPLETE_EVALUATION
        ) {
          currentStage = 'completed';
        }
      }
    }

    return {
      attemptId,
      currentStage,
      jobs,
    };
  }

  /**
   * Get job status by ID (for polling)
   */
  async getJobStatus(jobId: string): Promise<{
    id: string;
    state: string;
    progress: number | string | object | boolean;
    attemptsMade: number;
    failedReason?: string;
  } | null> {
    const job = await this.evaluationQueue.getJob(jobId);
    if (!job) return null;

    return {
      id: job.id ?? jobId,
      state: await job.getState(),
      progress: job.progress,
      attemptsMade: job.attemptsMade,
      failedReason: job.failedReason,
    };
  }

  /**
   * Remove all jobs for an attempt from the queue (for cleanup/testing)
   */
  async removeAttemptJobs(attemptId: string): Promise<number> {
    let removed = 0;

    const stages = [
      EvaluationJobName.FETCH_TRANSCRIPT,
      EvaluationJobName.FETCH_AUDIO,
      EvaluationJobName.COMPLETE_EVALUATION,
    ];

    for (const stage of stages) {
      const jobId = getJobId(stage, attemptId);
      const job = await this.evaluationQueue.getJob(jobId);
      if (job) {
        await job.remove();
        removed++;
      }
    }

    return removed;
  }
}
