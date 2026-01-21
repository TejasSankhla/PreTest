// ─────────────────────────────────────────────────────────────────────────────
// ELEVENLABS TYPES
// Shared type definitions for ElevenLabs Conversational AI integration
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Single transcript item from ElevenLabs conversation
 */
export interface ElevenLabsTranscriptItem {
  role: 'agent' | 'user';
  message: string;
  time_in_call_secs: number;
  tool_calls?: unknown[];
  tool_results?: unknown[];
}

/**
 * Metadata from ElevenLabs conversation
 */
export interface ElevenLabsMetadata {
  start_time_unix_secs?: number;
  end_time_unix_secs?: number;
  call_duration_secs?: number;
}

/**
 * Full conversation response from ElevenLabs API
 */
export interface ElevenLabsConversation {
  conversation_id: string;
  agent_id: string;
  status: string;
  transcript: ElevenLabsTranscriptItem[];
  metadata?: ElevenLabsMetadata;
  analysis?: {
    transcript_summary?: string;
    evaluation_criteria_results?: Record<string, unknown>;
  };
}

/**
 * Webhook payload data from ElevenLabs
 */
export interface ElevenLabsWebhookData {
  agent_id: string;
  conversation_id: string;
  status: string;
  transcript?: ElevenLabsTranscriptItem[];
  metadata?: ElevenLabsMetadata;
  analysis?: unknown;
}

/**
 * Full webhook payload from ElevenLabs
 */
export interface ElevenLabsWebhookPayload {
  type: string;
  event_timestamp: number;
  data: ElevenLabsWebhookData;
}
