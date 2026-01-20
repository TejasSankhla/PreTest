import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// ─────────────────────────────────────────────────────────────────────────────
// RUBRIC SCHEMA
// Evaluation criteria that can be selected for interviews
// ─────────────────────────────────────────────────────────────────────────────

@Schema({ timestamps: true, collection: 'rubrics' })
export class Rubric {
  @Prop({ required: true })
  name: string; // e.g., "STAR Method", "Communication Clarity"

  @Prop({ required: true })
  description: string; // What to evaluate and how

  @Prop({ type: [String], default: [] })
  tags: string[]; // For filtering in admin UI, e.g., ["behavioral", "soft-skills"]
}

export type RubricDocument = Rubric & Document;
export const RubricSchema = SchemaFactory.createForClass(Rubric);

// Indexes
RubricSchema.index({ name: 1 });
RubricSchema.index({ tags: 1 });
// Text index for search
RubricSchema.index({ name: 'text', description: 'text' });
