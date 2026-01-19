import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERVIEW SCHEMA
// Template for interview sessions (seeded by admin, not CRUD by users)
// ─────────────────────────────────────────────────────────────────────────────

@Schema({ timestamps: true, collection: 'interviews' })
export class Interview {
  @Prop({ required: true })
  name: string; // e.g., "Frontend SDE1 Mock Interview"

  @Prop({ required: true })
  description: string; // Brief description of what the interview covers

  @Prop({ type: [String], default: [] })
  tags: string[]; // e.g., ["React", "JavaScript", "System Design", "DSA"]

  @Prop({ required: true })
  durationMins: number; // Expected duration in minutes (e.g., 45, 60)

  @Prop({ required: true, enum: Difficulty, default: Difficulty.MEDIUM })
  difficulty: Difficulty;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Agent', required: true })
  agent: MongooseSchema.Types.ObjectId; // Reference to the Agent conducting this interview

  @Prop({ default: true })
  isActive: boolean;
}

export type InterviewDocument = Interview & Document;
export const InterviewSchema = SchemaFactory.createForClass(Interview);

// Indexes for filtering and querying
InterviewSchema.index({ isActive: 1 });
InterviewSchema.index({ difficulty: 1 });
InterviewSchema.index({ tags: 1 });
InterviewSchema.index({ isActive: 1, difficulty: 1 });
// Text index for search optimization
InterviewSchema.index({ name: 'text', description: 'text' });
