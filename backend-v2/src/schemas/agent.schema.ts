import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// ─────────────────────────────────────────────────────────────────────────────
// AGENT SCHEMA
// Stores metadata about AI interview agents (maps to ElevenLabs agents)
// ─────────────────────────────────────────────────────────────────────────────

@Schema({ timestamps: true, collection: 'agents' })
export class Agent {
  @Prop({ required: true })
  name: string; // e.g., "Alex"

  @Prop({ required: true })
  company: string; // e.g., "TechCorp", "Amazon", "Google"

  @Prop({ required: true })
  role: string; // e.g., "Senior Technical Interviewer"

  @Prop()
  photo: string; // URL to agent's avatar/photo

  @Prop({ required: true, unique: true })
  elevenLabsAgentId: string; // ElevenLabs agent ID for API calls

  @Prop()
  systemPrompt: string; // Reference copy of the system prompt (source of truth is ElevenLabs)

  @Prop({ default: true })
  isActive: boolean;
}

export type AgentDocument = Agent & Document;
export const AgentSchema = SchemaFactory.createForClass(Agent);

// Indexes
AgentSchema.index({ elevenLabsAgentId: 1 });
AgentSchema.index({ isActive: 1 });
