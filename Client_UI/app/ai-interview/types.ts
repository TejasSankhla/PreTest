// AI Interview Types

// Enum to match backend Difficulty enum
export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export type InterviewDifficulty = `${Difficulty}`;
export type InterviewStatus = "available" | "coming_soon";
export type UserInterviewState = "not_taken" | "completed";

export interface AIInterview {
  id: string;
  title: string;
  role: string;
  description: string;
  difficulty: InterviewDifficulty;
  duration: number; // in minutes
  stages: string[];
  focusAreas: string[];
  totalTaken: number;
  avgScore: number;
  status: InterviewStatus;
  createdAt: string;
  // User-specific state (optional, for logged-in users)
  userState?: UserInterviewState;
  userScore?: number; // User's score if completed
  userAttempts?: number; // Number of times user has taken this interview
}

export interface InterviewSession {
  id: string;
  interviewId: string;
  userId: string;
  status: "pending" | "in_progress" | "completed" | "abandoned";
  startedAt?: string;
  completedAt?: string;
  score?: number;
  duration?: number; // actual duration in seconds
  transcript?: TranscriptEntry[];
  feedback?: InterviewFeedback;
}

export interface TranscriptEntry {
  speaker: "ai" | "user";
  text: string;
  timestamp: number; // seconds from start
}

export interface InterviewFeedback {
  overallScore: number;
  summary: string;
  stageScores: {
    stageName: string;
    score: number;
    feedback: string;
  }[];
  strengths: string[];
  improvements: string[];
}

// Filter types
export interface InterviewFilters {
  search: string;
  difficulty: InterviewDifficulty | "All";
  sortBy: "popular" | "newest" | "highest_rated";
}
