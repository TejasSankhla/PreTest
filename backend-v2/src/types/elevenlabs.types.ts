// ─────────────────────────────────────────────────────────────────────────────
// ELEVENLABS TYPES
// Shared type definitions for ElevenLabs Conversational AI integration
// @see https://elevenlabs.io/docs/conversational-ai
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// TRANSCRIPT TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ElevenLabsConversationTurnMetrics {
  convai_llm_service_ttfb?: {
    elapsed_time: number;
  };
  convai_llm_service_ttf_sentence?: {
    elapsed_time: number;
  };
}

/**
 * Single transcript item from ElevenLabs conversation
 */
export interface ElevenLabsTranscriptItem {
  role: 'agent' | 'user';
  message: string;
  time_in_call_secs: number;
  tool_calls?: unknown[] | null;
  tool_results?: unknown[] | null;
  feedback?: unknown;
  conversation_turn_metrics?: ElevenLabsConversationTurnMetrics | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// METADATA TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ElevenLabsDeletionSettings {
  deletion_time_unix_secs?: number;
  deleted_logs_at_time_unix_secs?: number | null;
  deleted_audio_at_time_unix_secs?: number | null;
  deleted_transcript_at_time_unix_secs?: number | null;
  delete_transcript_and_pii?: boolean;
  delete_audio?: boolean;
}

export interface ElevenLabsFeedback {
  overall_score?: number | null;
  likes?: number;
  dislikes?: number;
}

export interface ElevenLabsCharging {
  dev_discount?: boolean;
}

/**
 * Metadata from ElevenLabs conversation
 */
export interface ElevenLabsMetadata {
  start_time_unix_secs?: number;
  end_time_unix_secs?: number;
  call_duration_secs?: number;
  cost?: number;
  deletion_settings?: ElevenLabsDeletionSettings;
  feedback?: ElevenLabsFeedback;
  authorization_method?: string;
  charging?: ElevenLabsCharging;
  termination_reason?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ANALYSIS TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ElevenLabsAnalysis {
  evaluation_criteria_results?: Record<string, unknown>;
  data_collection_results?: Record<string, unknown>;
  call_successful?: 'success' | 'failure' | 'unknown';
  transcript_summary?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSATION RESPONSE TYPE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Full conversation response from ElevenLabs API
 * @see https://elevenlabs.io/docs/conversational-ai/api-reference/get-conversation
 */
export interface ElevenLabsConversation {
  conversation_id: string;
  agent_id: string;
  status: string;
  transcript: ElevenLabsTranscriptItem[];
  metadata?: ElevenLabsMetadata;
  analysis?: ElevenLabsAnalysis;
}
