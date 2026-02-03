// ─────────────────────────────────────────────────────────────────────────────
// JOB DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface EvaluationJobData {
  attemptId: string;
  conversationId: string;
  userId: string;
  interviewId: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// JOB NAMES
// Pipeline: FETCH_TRANSCRIPT → FETCH_AUDIO → COMPLETE_EVALUATION
// ─────────────────────────────────────────────────────────────────────────────

export enum EvaluationJobName {
  FETCH_TRANSCRIPT = 'fetch-transcript',
  FETCH_AUDIO = 'fetch-audio',
  COMPLETE_EVALUATION = 'complete-evaluation',
}

// ─────────────────────────────────────────────────────────────────────────────
// QUEUE CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const EVALUATION_JOB_CONFIG = {
  attempts: 3,
  backoff: {
    type: 'exponential' as const,
    delay: 3000, // 3s, 6s, 12s
  },
};
