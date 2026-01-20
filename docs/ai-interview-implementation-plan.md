# AI Interview Feature - Implementation Plan

> **Source of Truth Document** for AI Interview Backend Integration
>
> Last Updated: January 2026

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Phase Overview](#2-phase-overview)
3. [Database Schema](#3-database-schema)
4. [API Endpoints](#4-api-endpoints)
5. [Phase 1: ElevenLabs Agent Setup](#5-phase-1-elevenlabs-agent-setup)
6. [Phase 2: Single Agent E2E Testing](#6-phase-2-single-agent-e2e-testing)
7. [Phase 3: Interview Listing & Start Flow](#7-phase-3-interview-listing--start-flow)
8. [Phase 4: Frontend Integration](#8-phase-4-frontend-integration)
9. [Technical Architecture](#9-technical-architecture)
10. [Open Questions & Decisions](#10-open-questions--decisions)

---

## 1. Executive Summary

### What We're Building
An AI-powered mock interview platform integrated with ElevenLabs Conversational AI that allows users to practice technical interviews with specialized AI agents.

### Core Features
- **Multi-stage interviews** with specialized AI personas (Introduction, Experience, Problem Solving, Project Discussion, Behavioral)
- **Single continuous voice session** through ElevenLabs WebSocket
- **Post-interview scoring** using GPT-4o
- **Full replay support** with audio + transcript
- **Unlimited re-attempts** per interview template

### Key Technical Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Database | MongoDB (existing) | Consistent with current stack |
| Queue System | BullMQ + Redis | Async scoring jobs |
| LLM Scoring | GPT-4o | Cost/quality balance |
| Voice AI | ElevenLabs Conversational | User has existing account |
| Audio Storage | ElevenLabs hosted | Simplify infrastructure |
| Frontend Connection | Direct WebSocket to ElevenLabs | Low latency, official SDK |

---

## 2. Phase Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Agent Setup & Workflow Discovery                                    │
│ ─────────────────────────────────────────                                    │
│ • Create test agent in ElevenLabs dashboard                                  │
│ • Configure workflow with 5 specialized subagent nodes                       │
│ • Test single-persona approach (same voice, APPEND mode)                     │
│ • Validate stage transitions                                                 │
│ • Document agent ID and configuration                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2: Single Agent E2E Testing                                           │
│ ─────────────────────────────────────                                        │
│ • Create Interview & InterviewAttempt schemas                                │
│ • Implement ElevenLabs service wrapper                                       │
│ • Build token generation endpoint                                            │
│ • Set up webhook handlers                                                    │
│ • Test complete flow: Start → Voice Call → Transcript                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3: Interview Listing & Start Flow                                      │
│ ─────────────────────────────────────────                                    │
│ • Interview CRUD endpoints (admin)                                           │
│ • Interview listing endpoints (user)                                         │
│ • Attempt management endpoints                                               │
│ • Scoring pipeline (BullMQ + GPT-4o)                                         │
│ • Replay endpoint                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4: Frontend Integration                                               │
│ ─────────────────────────────────────                                        │
│ • Interview browser UI                                                       │
│ • Interview session UI (WebSocket integration)                               │
│ • Results & feedback UI                                                      │
│ • Replay UI with synced transcript                                           │
│ • User history dashboard                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema

### 3.1 Schema Overview

```
User (existing)
  │
  │ 1:N
  ▼
InterviewAttempt ──────────────► Interview (N:1)
  │                                    │
  │ embeds                             │ embeds
  ▼                                    ▼
TranscriptEntry[]                 InterviewStage[]
StageResult[]                     ScoringCriterion[]
```

### 3.2 Interview Schema (Template - Admin Created)

**File:** `src/schemas/interview.schema.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export enum TargetRole {
  SDE1 = 'SDE1',
  SDE2 = 'SDE2',
  SDE3 = 'SDE3',
  STAFF = 'Staff',
  PRINCIPAL = 'Principal',
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

// ─────────────────────────────────────────────────────────────────────────────
// EMBEDDED SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

@Schema({ _id: false })
export class Rubric {
  @Prop({ required: true })
  excellent: string;

  @Prop({ required: true })
  good: string;

  @Prop({ required: true })
  average: string;

  @Prop({ required: true })
  poor: string;
}

@Schema({ _id: false })
export class ScoringCriterion {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0, max: 1 })
  weight: number; // Sum to 1 within stage

  @Prop({ required: true, default: 10 })
  maxScore: number;

  @Prop({ type: Rubric, required: true })
  rubric: Rubric;
}

@Schema({ _id: false })
export class InterviewStage {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  name: string; // "Introduction" | "Experience" | "Problem Solving" | etc.

  @Prop({ required: true, default: true })
  isRequired: boolean;

  @Prop({ required: true })
  focusInstructions: string; // Stage-specific focus (appended to base prompt)

  @Prop({ required: true })
  transitionPhrase: string; // "Let's move on to..."

  @Prop({ type: [ScoringCriterion], default: [] })
  scoringCriteria: ScoringCriterion[];

  @Prop({ required: true, min: 0, max: 1 })
  stageWeight: number; // Weight in overall score (all sum to 1)
}

@Schema({ _id: false })
export class Persona {
  @Prop({ required: true })
  name: string; // "Alex"

  @Prop({ required: true })
  role: string; // "Senior Technical Interviewer"

  @Prop({ required: true })
  style: string; // "Professional, supportive"
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

@Schema({ timestamps: true, collection: 'interviews' })
export class Interview {
  // Basic Info
  @Prop({ required: true })
  name: string; // "Amazon SDE1 Frontend Interview"

  @Prop({ required: true })
  description: string;

  // Classification
  @Prop({ required: true, enum: TargetRole })
  targetRole: TargetRole;

  @Prop({ required: true, enum: Difficulty })
  difficulty: Difficulty;

  @Prop({ type: [String], default: [] })
  tags: string[]; // ["React", "System Design", "DSA"]

  // Duration
  @Prop({ required: true })
  estimatedDurationMins: number; // ~45-60 mins typical

  // Single AI Persona (shown to user - same throughout interview)
  @Prop({ type: Persona, required: true })
  persona: Persona;

  // Stages (internally specialized, but same persona)
  @Prop({ type: [InterviewStage], required: true })
  stages: InterviewStage[];

  // ElevenLabs Config
  @Prop({ required: true })
  elevenLabsAgentId: string;

  // Admin
  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId; // Admin user

  // Timestamps (auto-added by mongoose)
  createdAt: Date;
  updatedAt: Date;
}

export type InterviewDocument = Interview & Document;
export const InterviewSchema = SchemaFactory.createForClass(Interview);

// Indexes
InterviewSchema.index({ isActive: 1, targetRole: 1 });
InterviewSchema.index({ isActive: 1, difficulty: 1 });
InterviewSchema.index({ tags: 1 });
```

### 3.3 InterviewAttempt Schema (User's Session)

**File:** `src/schemas/interview-attempt.schema.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export enum AttemptStatus {
  PENDING = 'pending',           // Created but not started
  IN_PROGRESS = 'in_progress',   // Voice call active
  COMPLETED = 'completed',       // Call ended, awaiting scoring
  SCORING = 'scoring',           // Scoring in progress
  SCORED = 'scored',             // Scoring complete
  ABANDONED = 'abandoned',       // User abandoned
  FAILED = 'failed',             // System error
}

export enum TranscriptRole {
  AGENT = 'agent',
  USER = 'user',
}

export enum Platform {
  WEB = 'web',
  IOS = 'ios',
  ANDROID = 'android',
}

// ─────────────────────────────────────────────────────────────────────────────
// EMBEDDED SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

@Schema({ _id: false })
export class TranscriptEntry {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true, enum: TranscriptRole })
  role: TranscriptRole;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  timestampMs: number; // Milliseconds from start

  @Prop({ required: true })
  stageIndex: number;

  @Prop()
  confidence?: number; // Speech recognition confidence

  @Prop()
  emotion?: string; // Detected emotion if available
}

@Schema({ _id: false })
export class TranscriptRange {
  @Prop({ required: true })
  startIndex: number;

  @Prop({ required: true })
  endIndex: number;
}

@Schema({ _id: false })
export class QuestionScore {
  @Prop({ required: true })
  questionText: string;

  @Prop({ required: true })
  answerSummary: string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  maxScore: number;

  @Prop({ required: true })
  feedback: string;

  @Prop({ type: TranscriptRange })
  transcriptRange?: TranscriptRange;
}

@Schema({ _id: false })
export class CriterionScore {
  @Prop({ required: true })
  criterionName: string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  maxScore: number;

  @Prop({ required: true })
  feedback: string;
}

@Schema({ _id: false })
export class StageResult {
  @Prop({ required: true })
  stageIndex: number;

  @Prop({ required: true })
  stageName: string;

  @Prop({ type: [QuestionScore], default: [] })
  questionScores: QuestionScore[];

  @Prop({ type: [CriterionScore], default: [] })
  criteriaScores: CriterionScore[];

  @Prop({ required: true })
  stageScore: number; // 0-100

  @Prop({ required: true })
  feedback: string;

  @Prop({ type: [String], default: [] })
  strengths: string[];

  @Prop({ type: [String], default: [] })
  improvements: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

@Schema({ timestamps: true, collection: 'interview_attempts' })
export class InterviewAttempt {
  // References
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Interview', required: true })
  interview: Types.ObjectId;

  @Prop({ required: true })
  attemptNumber: number; // Auto-calculated: 1, 2, 3...

  // Status
  @Prop({ required: true, enum: AttemptStatus, default: AttemptStatus.PENDING })
  status: AttemptStatus;

  @Prop({ default: 0 })
  currentStageIndex: number;

  // ElevenLabs
  @Prop()
  elevenLabsConversationId?: string;

  @Prop()
  audioUrl?: string; // Recording URL (populated after completion)

  // Timing
  @Prop()
  startedAt?: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  durationSeconds?: number;

  // Transcript
  @Prop({ type: [TranscriptEntry], default: [] })
  transcript: TranscriptEntry[];

  // Scoring
  @Prop({ type: [StageResult], default: [] })
  stageResults: StageResult[];

  @Prop()
  overallScore?: number; // 0-100

  @Prop()
  overallFeedback?: string;

  @Prop({ type: [String] })
  strengths?: string[];

  @Prop({ type: [String] })
  areasForImprovement?: string[];

  // Metadata
  @Prop({ enum: Platform })
  platform?: Platform;

  // Timestamps (auto-added)
  createdAt: Date;
  updatedAt: Date;
}

export type InterviewAttemptDocument = InterviewAttempt & Document;
export const InterviewAttemptSchema = SchemaFactory.createForClass(InterviewAttempt);

// Indexes
InterviewAttemptSchema.index({ user: 1, createdAt: -1 }); // User's history
InterviewAttemptSchema.index({ user: 1, interview: 1 }); // Attempts for specific interview
InterviewAttemptSchema.index({ interview: 1, createdAt: -1 }); // All attempts for an interview
InterviewAttemptSchema.index({ status: 1 }); // Find sessions needing scoring
InterviewAttemptSchema.index({ elevenLabsConversationId: 1 }); // Webhook lookups
```

### 3.4 Schema Summary Table

| Schema | Collection | Purpose | Key Fields |
|--------|------------|---------|------------|
| `Interview` | `interviews` | Template definition (admin-created) | name, targetRole, difficulty, stages[], persona, elevenLabsAgentId |
| `InterviewAttempt` | `interview_attempts` | User's session record | user, interview, status, transcript[], stageResults[], overallScore |
| `InterviewStage` | (embedded) | Stage configuration | index, name, focusInstructions, scoringCriteria[], stageWeight |
| `ScoringCriterion` | (embedded) | Evaluation criteria | name, weight, maxScore, rubric |
| `TranscriptEntry` | (embedded) | Conversation log | role, text, timestampMs, stageIndex |
| `StageResult` | (embedded) | Per-stage evaluation | stageScore, questionScores[], criteriaScores[], feedback |

---

## 4. API Endpoints

### 4.1 Endpoint Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ INTERVIEWS (Templates) - Admin & User                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ GET    /api/interviews                    │ List active interviews           │
│ GET    /api/interviews/:id                │ Get interview details            │
│ POST   /api/admin/interviews              │ Create interview (admin)         │
│ PUT    /api/admin/interviews/:id          │ Update interview (admin)         │
│ DELETE /api/admin/interviews/:id          │ Soft delete (admin)              │
├─────────────────────────────────────────────────────────────────────────────┤
│ ATTEMPTS (User Sessions)                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ GET    /api/interviews/attempts           │ List user's attempts             │
│ GET    /api/interviews/attempts/:id       │ Get attempt details              │
│ POST   /api/interviews/:id/attempts       │ Create new attempt               │
│ POST   /api/interviews/attempts/:id/token │ Get ElevenLabs connection token  │
│ POST   /api/interviews/attempts/:id/start │ Mark attempt as started          │
│ POST   /api/interviews/attempts/:id/abandon│ Mark as abandoned               │
│ GET    /api/interviews/attempts/:id/replay│ Get replay data                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ WEBHOOKS (ElevenLabs → Backend)                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ POST   /api/webhooks/elevenlabs           │ Handle ElevenLabs events         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Detailed API Specifications

#### 4.2.1 Interview Endpoints (Public/User)

**GET `/api/interviews`** - List Active Interviews

```typescript
// Query Parameters
interface ListInterviewsQuery {
  targetRole?: 'SDE1' | 'SDE2' | 'SDE3' | 'Staff' | 'Principal';
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];      // Comma-separated
  page?: number;        // Default: 1
  limit?: number;       // Default: 20
}

// Response
interface ListInterviewsResponse {
  data: {
    interviews: {
      _id: string;
      name: string;
      description: string;
      targetRole: string;
      difficulty: string;
      tags: string[];
      estimatedDurationMins: number;
      persona: {
        name: string;
        role: string;
      };
      stageCount: number;
    }[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  success: true;
  msg: string;
  err: null;
}
```

**GET `/api/interviews/:id`** - Get Interview Details

```typescript
// Response
interface GetInterviewResponse {
  data: {
    _id: string;
    name: string;
    description: string;
    targetRole: string;
    difficulty: string;
    tags: string[];
    estimatedDurationMins: number;
    persona: Persona;
    stages: {
      index: number;
      name: string;
      // Note: focusInstructions NOT exposed to user
    }[];
    // User-specific data (if authenticated)
    userStats?: {
      totalAttempts: number;
      bestScore: number | null;
      lastAttemptDate: Date | null;
    };
  };
  success: true;
  msg: string;
  err: null;
}
```

#### 4.2.2 Attempt Endpoints (Authenticated)

**GET `/api/interviews/attempts`** - List User's Attempts

```typescript
// Query Parameters
interface ListAttemptsQuery {
  interviewId?: string;          // Filter by interview
  status?: AttemptStatus;        // Filter by status
  page?: number;
  limit?: number;
}

// Response
interface ListAttemptsResponse {
  data: {
    attempts: {
      _id: string;
      interview: {
        _id: string;
        name: string;
        targetRole: string;
      };
      attemptNumber: number;
      status: AttemptStatus;
      overallScore?: number;
      startedAt?: Date;
      completedAt?: Date;
      durationSeconds?: number;
    }[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  success: true;
  msg: string;
  err: null;
}
```

**POST `/api/interviews/:id/attempts`** - Create New Attempt

```typescript
// Request Body
interface CreateAttemptDto {
  platform?: 'web' | 'ios' | 'android';
}

// Response
interface CreateAttemptResponse {
  data: {
    attemptId: string;
    interviewId: string;
    attemptNumber: number;
    interview: {
      name: string;
      persona: Persona;
      estimatedDurationMins: number;
    };
  };
  success: true;
  msg: string;
  err: null;
}
```

**POST `/api/interviews/attempts/:id/token`** - Get ElevenLabs Connection Token

```typescript
// Response
interface GetTokenResponse {
  data: {
    signedUrl: string;           // WebSocket URL with auth
    agentId: string;             // ElevenLabs agent ID
    conversationId: string;      // For tracking
  };
  success: true;
  msg: string;
  err: null;
}
```

**POST `/api/interviews/attempts/:id/start`** - Mark Attempt as Started

```typescript
// Request Body
interface StartAttemptDto {
  elevenLabsConversationId: string;
}

// Response
interface StartAttemptResponse {
  data: {
    attemptId: string;
    status: 'in_progress';
    startedAt: Date;
  };
  success: true;
  msg: string;
  err: null;
}
```

**POST `/api/interviews/attempts/:id/abandon`** - Abandon Attempt

```typescript
// Response
interface AbandonAttemptResponse {
  data: {
    attemptId: string;
    status: 'abandoned';
  };
  success: true;
  msg: string;
  err: null;
}
```

**GET `/api/interviews/attempts/:id`** - Get Attempt Details

```typescript
// Response
interface GetAttemptResponse {
  data: {
    _id: string;
    interview: {
      _id: string;
      name: string;
      persona: Persona;
      stages: { index: number; name: string }[];
    };
    attemptNumber: number;
    status: AttemptStatus;
    currentStageIndex: number;
    startedAt?: Date;
    completedAt?: Date;
    durationSeconds?: number;

    // Scoring (only if status === 'scored')
    overallScore?: number;
    overallFeedback?: string;
    strengths?: string[];
    areasForImprovement?: string[];
    stageResults?: StageResult[];
  };
  success: true;
  msg: string;
  err: null;
}
```

**GET `/api/interviews/attempts/:id/replay`** - Get Replay Data

```typescript
// Response
interface GetReplayResponse {
  data: {
    attemptId: string;
    interview: {
      _id: string;
      name: string;
      persona: Persona;
      stages: { index: number; name: string }[];
    };
    audioUrl: string;            // ElevenLabs hosted
    transcript: TranscriptEntry[];
    stageResults: StageResult[];
    overallScore: number;
    durationSeconds: number;
  };
  success: true;
  msg: string;
  err: null;
}
```

#### 4.2.3 Admin Endpoints

**POST `/api/admin/interviews`** - Create Interview

```typescript
// Request Body
interface CreateInterviewDto {
  name: string;
  description: string;
  targetRole: TargetRole;
  difficulty: Difficulty;
  tags: string[];
  estimatedDurationMins: number;
  persona: {
    name: string;
    role: string;
    style: string;
  };
  stages: {
    index: number;
    name: string;
    isRequired: boolean;
    focusInstructions: string;
    transitionPhrase: string;
    scoringCriteria: ScoringCriterion[];
    stageWeight: number;
  }[];
  elevenLabsAgentId: string;
}
```

**PUT `/api/admin/interviews/:id`** - Update Interview

```typescript
// Request Body: Partial<CreateInterviewDto>
```

**DELETE `/api/admin/interviews/:id`** - Soft Delete

```typescript
// Sets isActive = false
// Response: { success: true, msg: "Interview deactivated" }
```

#### 4.2.4 Webhook Endpoints

**POST `/api/webhooks/elevenlabs`** - Handle ElevenLabs Events

```typescript
// Headers
// ElevenLabs-Signature: HMAC-SHA256 signature

// Request Body (varies by event type)
interface ElevenLabsWebhook {
  type: 'post_call_transcription' | 'post_call_audio';
  event_timestamp: number;
  data: {
    agent_id: string;
    conversation_id: string;
    status: string;
    transcript?: TranscriptEntry[];
    audio_base64?: string;      // For post_call_audio
    metadata?: {
      // Call duration, costs, etc.
    };
  };
}
```

---

## 5. Phase 1: ElevenLabs Agent Setup

### 5.1 Objective
Create and validate a working 5-stage AI interview in ElevenLabs dashboard with single-persona approach.

### 5.2 Agent Configuration

**Agent Name:** `SDE1 Frontend Interview - Alex`

**Base System Prompt:**
```
You are Alex, a senior technical interviewer conducting a mock interview.

YOUR IDENTITY (NEVER CHANGES):
- Name: Alex
- Role: Senior Technical Interviewer
- Style: Professional, supportive, thorough
- Tone: Encouraging but rigorous

You are Alex throughout the ENTIRE interview. Never introduce yourself as
anyone else or change your identity.

INTERVIEW STRUCTURE:
The interview flows through 5 stages naturally:
1. Introduction - Get to know the candidate (3-5 mins)
2. Experience Discussion - Explore their background (8-10 mins)
3. Problem Solving - Technical problem (15-20 mins)
4. Project Deep Dive - Discuss a project (10-12 mins)
5. Behavioral - Wrap-up questions (5-8 mins)

GENERAL GUIDELINES:
- Be professional but warm and encouraging
- Listen actively and ask follow-up questions
- Keep responses concise (2-3 sentences typically)
- Don't overwhelm with multiple questions at once
- Transition naturally between topics

The workflow controls stage progression automatically via appended instructions.
```

**First Message:**
```
Hi! I'm Alex, and I'll be your interviewer for today's mock technical interview
for the SDE1 Frontend position.

This will be a comprehensive interview covering your background, a technical problem,
project discussion, and some behavioral questions - about 45 to 60 minutes total.

Let's start with you telling me a bit about yourself. What's your background
and what brings you here today?
```

### 5.3 Workflow Configuration

See [ai-interviewer-brainstorm.md](./ai-interviewer-brainstorm.md) for detailed stage configurations.

### 5.4 Checklist

- [ ] Create agent in ElevenLabs dashboard
- [ ] Configure base system prompt & first message
- [ ] Set up workflow with 5 subagent nodes
- [ ] Configure each node with APPEND mode
- [ ] Set edge conditions (LLM-based)
- [ ] Use SAME voice for ALL nodes
- [ ] Test full interview flow
- [ ] Verify persona consistency
- [ ] Note stage timing
- [ ] Export and document agent ID

### 5.5 Deliverables
- ElevenLabs Agent ID: `______________`
- Voice Configuration: `______________`
- Webhook URL configured: `______________`

---

## 6. Phase 2: Single Agent E2E Testing

### 6.1 Objective
Build minimal backend to complete one full interview cycle: Start → Voice Call → Transcript → Store.

### 6.2 Implementation Tasks

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TASK 2.1: Database Setup                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Create Interview schema                                                    │
│ • Create InterviewAttempt schema                                             │
│ • Seed one test interview document                                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ TASK 2.2: ElevenLabs Service                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Create ElevenLabsService class                                             │
│ • Implement getSignedUrl(agentId) method                                     │
│ • Implement verifyWebhookSignature(payload, signature)                       │
│ • Implement fetchConversation(conversationId) for manual retrieval           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ TASK 2.3: Core Endpoints                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ • POST /api/interviews/:id/attempts - Create attempt                         │
│ • POST /api/interviews/attempts/:id/token - Get signed URL                   │
│ • POST /api/interviews/attempts/:id/start - Mark started                     │
│ • POST /api/webhooks/elevenlabs - Handle post-call events                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ TASK 2.4: Webhook Handling                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Verify HMAC signature                                                      │
│ • Handle post_call_transcription event                                       │
│ • Handle post_call_audio event                                               │
│ • Update attempt status and store transcript                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Test Flow

```
┌─────────┐                           ┌─────────┐                    ┌───────────┐
│ Client  │                           │ Backend │                    │ ElevenLabs│
└────┬────┘                           └────┬────┘                    └─────┬─────┘
     │                                     │                               │
     │  POST /interviews/:id/attempts      │                               │
     │────────────────────────────────────>│                               │
     │  { attemptId }                      │                               │
     │<────────────────────────────────────│                               │
     │                                     │                               │
     │  POST /attempts/:id/token           │                               │
     │────────────────────────────────────>│  Get Signed URL               │
     │                                     │──────────────────────────────>│
     │                                     │  { signedUrl }                │
     │  { signedUrl, agentId }             │<──────────────────────────────│
     │<────────────────────────────────────│                               │
     │                                     │                               │
     │  WebSocket Connect                  │                               │
     │════════════════════════════════════════════════════════════════════>│
     │                                     │                               │
     │  POST /attempts/:id/start           │                               │
     │────────────────────────────────────>│                               │
     │  { status: in_progress }            │                               │
     │<────────────────────────────────────│                               │
     │                                     │                               │
     │  <Voice Interview Happens>          │                               │
     │<═══════════════════════════════════════════════════════════════════>│
     │                                     │                               │
     │                                     │  POST /webhooks/elevenlabs    │
     │                                     │<──────────────────────────────│
     │                                     │  (transcript + audio)         │
     │                                     │                               │
     │                                     │  Update Attempt               │
     │                                     │  status → completed           │
     │                                     │                               │
```

### 6.4 Environment Variables Required

```env
# ElevenLabs
ELEVENLABS_API_KEY=your_api_key
ELEVENLABS_WEBHOOK_SECRET=your_webhook_secret
ELEVENLABS_AGENT_ID=your_test_agent_id
```

### 6.5 Checklist

- [ ] Create Interview schema
- [ ] Create InterviewAttempt schema
- [ ] Create ElevenLabsService
- [ ] Implement token endpoint
- [ ] Implement webhook handler
- [ ] Test with ElevenLabs dashboard
- [ ] Verify transcript storage
- [ ] Verify audio URL storage

---

## 7. Phase 3: Interview Listing & Start Flow

### 7.1 Objective
Complete user-facing APIs and scoring pipeline.

### 7.2 Implementation Tasks

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TASK 3.1: Interview Module (Full CRUD)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ • GET /api/interviews - List with filters                                    │
│ • GET /api/interviews/:id - Detail view                                      │
│ • Admin CRUD endpoints                                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ TASK 3.2: Attempt Module (Full CRUD)                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ • GET /api/interviews/attempts - User history                                │
│ • GET /api/interviews/attempts/:id - Detail + scores                         │
│ • POST /api/interviews/attempts/:id/abandon                                  │
│ • GET /api/interviews/attempts/:id/replay                                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ TASK 3.3: Scoring Pipeline                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Set up BullMQ with Redis                                                   │
│ • Create ScoringService with GPT-4o                                          │
│ • Implement transcript parsing & stage segmentation                          │
│ • Implement per-criterion scoring                                            │
│ • Store results and update attempt                                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ TASK 3.4: Notifications                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Email notification when scoring complete                                   │
│ • (Optional) Push notification support                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Scoring Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SCORING PIPELINE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │   Webhook    │───>│  BullMQ Job  │───>│   Scoring    │                  │
│  │   Handler    │    │   Queue      │    │   Worker     │                  │
│  └──────────────┘    └──────────────┘    └──────────────┘                  │
│                                                 │                           │
│                                                 ▼                           │
│                                          ┌──────────────┐                  │
│                                          │   GPT-4o     │                  │
│                                          │  Evaluation  │                  │
│                                          └──────────────┘                  │
│                                                 │                           │
│                          ┌──────────────────────┼────────────────────┐      │
│                          │                      │                    │      │
│                          ▼                      ▼                    ▼      │
│                   ┌────────────┐        ┌────────────┐       ┌───────────┐ │
│                   │   Stage    │        │  Question  │       │  Criteria │ │
│                   │   Scores   │        │   Scores   │       │   Scores  │ │
│                   └────────────┘        └────────────┘       └───────────┘ │
│                          │                      │                    │      │
│                          └──────────────────────┼────────────────────┘      │
│                                                 │                           │
│                                                 ▼                           │
│                                          ┌──────────────┐                  │
│                                          │    Update    │                  │
│                                          │   Attempt    │                  │
│                                          │   (scored)   │                  │
│                                          └──────────────┘                  │
│                                                 │                           │
│                                                 ▼                           │
│                                          ┌──────────────┐                  │
│                                          │    Send      │                  │
│                                          │   Email      │                  │
│                                          └──────────────┘                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.4 Environment Variables Required

```env
# Redis (for BullMQ)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# OpenAI
OPENAI_API_KEY=your_api_key
OPENAI_MODEL=gpt-4o
```

### 7.5 Checklist

- [ ] Complete Interview CRUD
- [ ] Complete Attempt CRUD
- [ ] Set up BullMQ
- [ ] Create ScoringService
- [ ] Implement scoring prompt templates
- [ ] Test scoring pipeline
- [ ] Implement email notifications
- [ ] Create replay endpoint

---

## 8. Phase 4: Frontend Integration

### 8.1 Objective
Build complete user-facing UI for the interview feature.

### 8.2 Pages Required

| Page | Route | Description |
|------|-------|-------------|
| Interview Browser | `/ai-interview` | List all available interviews with filters |
| Interview Detail | `/ai-interview/[id]` | Interview info + user stats + start button |
| Interview Session | `/ai-interview/[id]/session` | Voice call UI with ElevenLabs SDK |
| Results | `/ai-interview/attempts/[id]` | Scores, feedback, strengths/improvements |
| Replay | `/ai-interview/attempts/[id]/replay` | Audio player + synced transcript |
| History | `/ai-interview/history` | User's all attempts |

### 8.3 ElevenLabs SDK Integration

```typescript
// Using @11labs/react package
import { useConversation } from '@11labs/react';

function InterviewSession({ signedUrl, agentId }) {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const startInterview = async () => {
    await conversation.startSession({
      signedUrl,
      agentId,
    });
  };

  const endInterview = async () => {
    await conversation.endSession();
  };

  return (
    // UI with start/end buttons, status indicators, etc.
  );
}
```

### 8.4 Checklist

- [ ] Interview browser page
- [ ] Interview detail page
- [ ] Session page with ElevenLabs SDK
- [ ] Results page with stage-by-stage view
- [ ] Replay page with audio sync
- [ ] User history page
- [ ] Mobile responsive design

---

## 9. Technical Architecture

### 9.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                    │
│   │    Web      │    │     iOS     │    │   Android   │                    │
│   │   (Next.js) │    │     App     │    │     App     │                    │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘                    │
│          │                  │                  │                            │
│          └──────────────────┼──────────────────┘                            │
│                             │                                               │
└─────────────────────────────┼───────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   REST API      │  │   WebSocket     │  │    Webhooks     │
│  (Our Backend)  │  │  (ElevenLabs)   │  │ (ElevenLabs→Us) │
└────────┬────────┘  └─────────────────┘  └────────┬────────┘
         │                                         │
         ▼                                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                        NestJS Application                            │  │
│   ├─────────────┬─────────────┬─────────────┬─────────────┬─────────────┤  │
│   │  Interview  │   Attempt   │   Webhook   │   Scoring   │  ElevenLabs │  │
│   │   Module    │   Module    │   Module    │   Module    │   Service   │  │
│   └─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘  │
│                                     │                                       │
│   ┌─────────────────────────────────┼─────────────────────────────────┐    │
│   │                                 ▼                                 │    │
│   │   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │    │
│   │   │   MongoDB   │    │    Redis    │    │   BullMQ    │          │    │
│   │   │  (Schemas)  │    │   (Cache)   │    │  (Jobs)     │          │    │
│   │   └─────────────┘    └─────────────┘    └─────────────┘          │    │
│   │         DATA LAYER                                                │    │
│   └───────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   ElevenLabs    │  │     OpenAI      │  │     Resend      │
│  (Voice AI)     │  │    (Scoring)    │  │    (Email)      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 9.2 Module Structure

```
backend-v2/src/
├── modules/
│   └── ai-interview/
│       ├── ai-interview.module.ts
│       ├── controllers/
│       │   ├── interview.controller.ts      # GET /interviews, GET /interviews/:id
│       │   ├── attempt.controller.ts        # Attempt CRUD
│       │   ├── admin-interview.controller.ts # Admin endpoints
│       │   └── webhook.controller.ts        # ElevenLabs webhooks
│       ├── services/
│       │   ├── interview.service.ts
│       │   ├── attempt.service.ts
│       │   └── scoring.service.ts
│       ├── dto/
│       │   ├── create-interview.dto.ts
│       │   ├── create-attempt.dto.ts
│       │   └── ...
│       └── processors/
│           └── scoring.processor.ts         # BullMQ worker
│
├── schemas/
│   ├── interview.schema.ts
│   └── interview-attempt.schema.ts
│
└── services/
    └── elevenlabs.service.ts                # ElevenLabs API wrapper
```

---

## 10. Open Questions & Decisions

### 10.1 Resolved

| # | Question | Decision | Notes |
|---|----------|----------|-------|
| 1 | Interviews tied to bookings? | No, independent | Mock interviews are separate |
| 2 | Stage unlock mechanism | Completion-based | No score threshold |
| 3 | Pause/resume support | No | Single continuous session |
| 4 | Stage transitions | Agent-driven | ElevenLabs workflow handles it |
| 5 | Audio storage | ElevenLabs hosted | Store URL reference only |
| 6 | Scoring timing | Post-interview batch | After call ends |

### 10.2 Pending

| # | Question | Options | Notes |
|---|----------|---------|-------|
| 1 | Admin role implementation | Separate schema vs flag on User? | Need to decide |
| 2 | Rate limiting per user | Max attempts per day? | Pricing consideration |
| 3 | ElevenLabs pricing | Check billing dashboard | Cost per minute |
| 4 | Redis hosting | Self-hosted vs managed? | For BullMQ |

### 10.3 Assumptions

- ElevenLabs Agent Workflows support our stage transition needs
- GPT-4o is sufficient for accurate scoring
- Users have stable internet for 45-60 min voice calls
- Post-call webhook delivery is reliable

---

## Appendix A: Sample Seed Data

```typescript
// Sample Interview document for testing
const sampleInterview = {
  name: "Amazon SDE1 Frontend Interview",
  description: "Practice interview for Amazon SDE1 Frontend position covering React, JavaScript, system design basics, and behavioral questions.",
  targetRole: "SDE1",
  difficulty: "Medium",
  tags: ["React", "JavaScript", "Frontend", "Amazon"],
  estimatedDurationMins: 45,
  persona: {
    name: "Alex",
    role: "Senior Technical Interviewer",
    style: "Professional, supportive, thorough"
  },
  stages: [
    {
      index: 0,
      name: "Introduction",
      isRequired: true,
      focusInstructions: "Welcome candidate, let them introduce themselves...",
      transitionPhrase: "Great, thanks for sharing! Let's dive into your experience...",
      scoringCriteria: [
        {
          name: "Communication Clarity",
          description: "Clear and structured self-introduction",
          weight: 0.5,
          maxScore: 10,
          rubric: {
            excellent: "Clear, well-structured, concise introduction",
            good: "Mostly clear with minor improvements possible",
            average: "Some clarity issues, rambling",
            poor: "Unclear, disorganized introduction"
          }
        },
        // ... more criteria
      ],
      stageWeight: 0.1
    },
    // ... more stages
  ],
  elevenLabsAgentId: "agent_xyz123",
  isActive: true,
  createdBy: "admin_user_id"
};
```

---

## Appendix B: References

- [ElevenLabs Agent Workflows](https://elevenlabs.io/docs/agents-platform/customization/agent-workflows)
- [ElevenLabs Post-Call Webhooks](https://elevenlabs.io/docs/agents-platform/workflows/post-call-webhooks)
- [ElevenLabs React SDK](https://www.npmjs.com/package/@11labs/react)
- [BullMQ Documentation](https://docs.bullmq.io/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

---

**Document Version:** 1.0
**Created:** January 2026
**Author:** Development Team
