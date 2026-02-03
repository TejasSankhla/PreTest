import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export enum AttemptStatus {
  PENDING = 'pending', // Created but WebSocket not connected yet
  IN_PROGRESS = 'in_progress', // Interview active (WebSocket connected)
  COMPLETED = 'completed', // Interview ended normally
  ABANDONED = 'abandoned', // User quit or disconnected

  // Evaluation pipeline stages
  FETCHING_TRANSCRIPT = 'fetching_transcript', // Job 1: Fetching transcript from ElevenLabs
  FETCHING_AUDIO = 'fetching_audio', // Job 2: Fetching audio from ElevenLabs
  EVALUATING = 'evaluating', // Job 3: Running LLM evaluation

  // Terminal states
  EVALUATED = 'evaluated', // Scoring complete
  FAILED = 'failed', // Evaluation failed (can be retried)
}

export enum Platform {
  WEB = 'web',
  IOS = 'ios',
  ANDROID = 'android',
}

// ─────────────────────────────────────────────────────────────────────────────
// EVALUATION TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface FeedbackPoint {
  point: string; // "Missed opportunity to quantify impact"
  evidence?: string; // "At 2:34 - 'I helped improve the system'"
}

export interface RubricScore {
  rubricId: string;
  rubricName: string;
  score: number; // 0-100
  feedbacks: FeedbackPoint[]; // Areas for improvement with transcript evidence
  strengths: FeedbackPoint[]; // What they did well with transcript evidence
}

export interface EvaluationResult {
  overallScore: number; // 0-100 (average of all rubric scores)
  overallFeedback: string; // 2-3 paragraph summary
  rubricScores: RubricScore[];
  evaluatedAt: Date;
  evaluationModel: string; // e.g., "gpt-4o"
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERVIEW ATTEMPT SCHEMA
// Records a user's attempt at an interview
// ─────────────────────────────────────────────────────────────────────────────

@Schema({ timestamps: true, collection: 'interview_attempts' })
export class InterviewAttempt {
  // ─────────────────────────────────────────────────────────────────────────
  // References
  // ─────────────────────────────────────────────────────────────────────────

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  })
  interview: MongooseSchema.Types.ObjectId;

  // ─────────────────────────────────────────────────────────────────────────
  // Status
  // ─────────────────────────────────────────────────────────────────────────

  @Prop({
    required: true,
    enum: AttemptStatus,
    default: AttemptStatus.PENDING,
  })
  status: AttemptStatus;

  // ─────────────────────────────────────────────────────────────────────────
  // ElevenLabs Integration
  // ─────────────────────────────────────────────────────────────────────────

  @Prop()
  elevenLabsConversationId?: string; // Set when frontend connects to ElevenLabs WebSocket

  @Prop()
  audioUrl?: string; // Recording URL from ElevenLabs (populated after completion)

  // ─────────────────────────────────────────────────────────────────────────
  // Timing
  // ─────────────────────────────────────────────────────────────────────────

  @Prop()
  startedAt?: Date; // When user actually started speaking (POST /start called)

  @Prop()
  completedAt?: Date; // When interview ended

  @Prop()
  durationSeconds?: number; // Calculated: completedAt - startedAt

  // ─────────────────────────────────────────────────────────────────────────
  // Transcript (raw ElevenLabs response - stored as JSON)
  // ─────────────────────────────────────────────────────────────────────────

  @Prop({ type: MongooseSchema.Types.Mixed })
  transcript?: Record<string, unknown>; // Raw ElevenLabs conversation transcript

  // ─────────────────────────────────────────────────────────────────────────
  // Evaluation Results (populated after LLM scoring)
  // ─────────────────────────────────────────────────────────────────────────

  @Prop({ type: Object })
  evaluation?: EvaluationResult;

  // ─────────────────────────────────────────────────────────────────────────
  // Metadata
  // ─────────────────────────────────────────────────────────────────────────

  @Prop({ enum: Platform, default: Platform.WEB })
  platform: Platform;
}

export type InterviewAttemptDocument = InterviewAttempt & Document;
export const InterviewAttemptSchema =
  SchemaFactory.createForClass(InterviewAttempt);

// ─────────────────────────────────────────────────────────────────────────────
// INDEXES
// ─────────────────────────────────────────────────────────────────────────────

// User's attempt history (most recent first)
InterviewAttemptSchema.index({ user: 1, createdAt: -1 });

// Find attempts for a specific interview by a user
InterviewAttemptSchema.index({ user: 1, interview: 1 });

// All attempts for an interview (for stats/analytics)
InterviewAttemptSchema.index({ interview: 1, createdAt: -1 });

// Find attempts by status (e.g., pending evaluations)
InterviewAttemptSchema.index({ status: 1 });

// Webhook lookup by ElevenLabs conversation ID
InterviewAttemptSchema.index({ elevenLabsConversationId: 1 });
