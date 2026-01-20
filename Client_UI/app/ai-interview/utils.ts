import { AIInterview } from "./types";

// API response type from backend
export interface InterviewAPIResponse {
  _id: string;
  name: string;
  description: string;
  role?: string;
  tags: string[];
  stages?: string[];
  durationMins: number;
  difficulty: string;
  totalAttempts?: number;
  avgScore?: number;
  isActive: boolean;
  createdAt: string;
  agent?: {
    name: string;
    company: string;
    role: string;
    photo?: string;
  };
}

// Extended interview type with agent info
export interface AIInterviewWithAgent extends AIInterview {
  agent?: {
    name: string;
    company: string;
    role: string;
    photo?: string;
  };
}

// Response types for API calls
export interface ListInterviewsResponse {
  data: {
    data: InterviewAPIResponse[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  success: boolean;
  msg: string;
}

export interface GetInterviewResponse {
  data: {
    interview: InterviewAPIResponse;
  };
  success: boolean;
  msg: string;
}

// Transform API response to frontend type
export function transformInterview(apiInterview: InterviewAPIResponse): AIInterviewWithAgent {
  return {
    id: apiInterview._id,
    title: apiInterview.name,
    role: apiInterview.role || apiInterview.agent?.role || "Technical Interview",
    description: apiInterview.description,
    difficulty: apiInterview.difficulty as AIInterview["difficulty"],
    duration: apiInterview.durationMins,
    stages: apiInterview.stages || [],
    focusAreas: apiInterview.tags,
    totalTaken: apiInterview.totalAttempts || 0,
    avgScore: apiInterview.avgScore || 0,
    status: apiInterview.isActive ? "available" : "coming_soon",
    createdAt: apiInterview.createdAt,
    agent: apiInterview.agent,
  };
}

// ============================================
// Session Types
// ============================================

// Response type from backend for starting a session
export interface SessionStartResponse {
  data: {
    signedUrl: string;
    agentId: string;
    interviewId: string;
    agentName: string;
    agentCompany: string;
    agentRole: string;
  };
  success: boolean;
  msg: string;
}

// Connection states for the interview session
export type ConnectionStatus = "connecting" | "connected" | "reconnecting" | "error" | "ended";

// AI Avatar states
export type AIState = "idle" | "speaking" | "listening";

// Theme type for session UI
export type Theme = "light" | "dark";

// Session state interface
export interface SessionState {
  connectionStatus: ConnectionStatus;
  errorMessage?: string;
  isMuted: boolean;
  aiState: AIState;
  currentStageIndex: number;
  elapsedSeconds: number;
  showEndConfirmation: boolean;
  showHelpPanel: boolean;
  theme: Theme;
}

// Format seconds to MM:SS
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// ============================================
// Session Results Types
// ============================================

// Transcript item from ElevenLabs
export interface TranscriptItem {
  role: "agent" | "user";
  message: string;
  time_in_call_secs: number;
}

// Session results from backend
export interface SessionResultsData {
  conversationId: string;
  status: string;
  transcript: TranscriptItem[];
  duration: number;
  startTime: string | null;
  endTime: string | null;
  questionsAnswered: number;
  questionsAsked: number;
  analysis?: {
    transcript_summary?: string;
    evaluation_criteria_results?: Record<string, unknown>;
  };
}

export interface SessionResultsResponse {
  data: SessionResultsData;
  success: boolean;
  msg: string;
}

// Session summary for results page display
export interface SessionSummary {
  duration: number;
  stagesCompleted: number;
  totalStages: number;
  questionsAnswered: number;
  completedAt: Date;
}

// ============================================
// Interview Attempt Types (History)
// ============================================

export type AttemptStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "abandoned"
  | "evaluating"
  | "evaluated"
  | "failed";

export interface AttemptEvaluation {
  overallScore: number;
  overallFeedback: string;
  strengths: string[];
  areasForImprovement: string[];
  evaluatedAt: string;
}

export interface InterviewAttempt {
  _id: string;
  interview: {
    _id: string;
    name: string;
    difficulty: string;
    durationMins: number;
  };
  attemptNumber: number;
  status: AttemptStatus;
  startedAt?: string;
  completedAt?: string;
  durationSeconds?: number;
  evaluation?: AttemptEvaluation;
  createdAt: string;
}

export interface ListAttemptsResponse {
  data: {
    data: InterviewAttempt[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  success: boolean;
  msg: string;
}

export interface CreateAttemptResponse {
  data: {
    attemptId: string;
    interviewId: string;
    attemptNumber: number;
    status: AttemptStatus;
    startedAt: string;
    conversationId?: string;
  };
  success: boolean;
  msg: string;
}
