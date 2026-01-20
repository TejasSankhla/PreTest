# AI Interviewer Feature - Brainstorming Document

## Overview
Integration of ElevenLabs Conversation Voice AI for conducting mock technical interviews.

## Core Concept
- Users can run AI-powered mock interviews (independent of mentor bookings)
- Focus: Technical domain (SDE1, SDE2, etc.) - extensible to UI/UX later
- Each mock interview is broken into sub-components with specialized AI agents

---

## Naming Conventions (Finalized)

| Entity | Name | Description |
|--------|------|-------------|
| Template | **`Interview`** | The interview definition/blueprint (admin-created) |
| User's attempt | **`InterviewAttempt`** | One user's attempt at an interview |
| Stage config | **`InterviewStage`** | Embedded stage definition in Interview |

---

## Data Model (Finalized)

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

---

## Interview Sub-Components (Stages)

| # | Stage | Agent Persona | Purpose |
|---|-------|---------------|---------|
| 1 | Introduction | HR Agent | Warm-up, basic screening |
| 2 | Experience Discussion | EM / Tech Lead | Past experience deep-dive |
| 3 | Problem Solving | SDE2/SDE3 | Technical problem-solving |
| 4 | Project Discussion | Senior Dev | Project depth, decisions |
| 5 | Behavioral/Communication | Evaluator | Clarity, accuracy, interview presence |

Each stage has:
- Defined agent persona
- Stage-specific scoring criteria
- Aggregates to overall interview score
- Actionable feedback per stage

---

## Clarified Requirements

### Booking vs Interviews
- **Decision:** Independent features - mock interviews are NOT tied to mentor bookings
- Users can access mock interviews separately

### Interview Flow
- **Decision:** Progressive unlock (completion-based)
- User must complete Stage N before Stage N+1 unlocks
- No score threshold required - just completion
- All 5 stages happen in a **single continuous voice session**
- **No pause/resume** - once started, must complete or abandon

### Mock Definition
- **Decision:** Admin/Platform-created interview scenarios only
- Examples: "Amazon SDE1 Frontend", "Google SDE2 Backend", etc.
- Pre-built templates with defined criteria per stage

### Scoring
- **Decision:** Both question-level AND stage-level scoring
- **Timing:** Post-interview batch evaluation (after call ends)
- AI analyzes full transcript and scores after completion
- Aggregates: Question → Stage → Overall Interview

### Recording & Replay
- **Decision:** Full replay support
- Store: Audio recording + Transcript
- Users can review anytime

### ElevenLabs
- **Status:** Existing account with API keys
- Need to configure agents for each persona

---

## Assumptions Log

| # | Assumption | Status | Notes |
|---|------------|--------|-------|
| 1 | Interviews are independent of bookings | ✅ Confirmed | |
| 2 | Progressive unlock is completion-based | ✅ Confirmed | No score threshold |
| 3 | Mocks are admin-created templates | ✅ Confirmed | |
| 4 | Single continuous voice session | ✅ Confirmed | |
| 5 | No pause/resume support | ✅ Confirmed | |
| 6 | Post-interview scoring | ✅ Confirmed | |
| 7 | Full audio + transcript storage | ✅ Confirmed | |
| 8 | Progressive unlock is per-mock | ✅ Confirmed | Each mock starts from Stage 1 |
| 9 | Stage transitions are agent-driven | ✅ Confirmed | Agent decides when to move on |
| 10 | Stage tracking via agent metadata | ✅ Confirmed | ElevenLabs webhooks/events |
| 11 | Scoring via external LLM (GPT/Claude) | ✅ Confirmed | Post-interview evaluation |
| 12 | Unlimited re-attempts per mock | ✅ Confirmed | All attempts saved in history |
| 13 | Audio stored on ElevenLabs | ✅ Confirmed | Store URL reference only |
| 14 | Frontend connects via ElevenLabs WebSocket | ✅ Confirmed | Browser SDK direct connection |
| 15 | Support Web + Mobile from start | ✅ Confirmed | Design for both platforms |
| 16 | GPT-4o for scoring | ✅ Confirmed | OpenAI evaluation |

---

## Technical Context (Existing Codebase)

### Stack
- **Framework:** NestJS v11
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (passport-jwt, bcrypt)
- **External APIs:** Google Calendar, Razorpay, Resend (email)

### Existing Models
- **User:** name, email, password, mobile, verification flags
- **Mentor:** profile, availability slots, company, rating, etc.
- **Booking:** mentor ref, client (user) ref, slot datetime, meeting_link

### Module Pattern
```
src/
├── schemas/          # Mongoose schemas
├── modules/          # Feature modules (controller, service, dto)
├── services/         # Shared services (calendar, email, payment)
├── config/           # Config files
└── common/           # Guards, decorators, utils
```

---

## Schemas (Finalized)

### 1. Interview (The Template - Admin-created)
```typescript
{
  _id: ObjectId,

  // Basic Info
  name: string,                     // "Amazon SDE1 Frontend Interview"
  description: string,              // Detailed description

  // Classification
  targetRole: enum,                 // "SDE1" | "SDE2" | "SDE3" | "Staff" | "Principal"
  difficulty: enum,                 // "Easy" | "Medium" | "Hard"
  tags: string[],                   // ["React", "System Design", "DSA"]

  // Duration
  estimatedDurationMins: number,    // ~45-60 mins typical

  // Single AI Persona (shown to user - same throughout interview)
  persona: {
    name: string,                   // "Alex"
    role: string,                   // "Senior Technical Interviewer"
    style: string,                  // "Professional, supportive"
  },

  // Stages (internally specialized, but same persona)
  stages: InterviewStage[],         // Each stage has focused instructions

  // ElevenLabs Config
  elevenLabsAgentId: string,        // Agent ID for this interview workflow

  // Admin
  isActive: boolean,
  createdBy: ObjectId,              // Admin user

  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### 2. InterviewStage (Embedded in Interview)
```typescript
{
  index: number,                    // 0, 1, 2...
  name: string,                     // "Introduction" | "Experience" | "Problem Solving" | etc.
  isRequired: boolean,              // Can't skip this stage

  // NO persona here - uses Interview-level persona (single persona approach)

  // Stage-specific focus (appended to base prompt in ElevenLabs)
  focusInstructions: string,        // What this stage focuses on
  transitionPhrase: string,         // "Let's move on to..." (natural, same persona)

  // Scoring
  scoringCriteria: ScoringCriterion[],
  stageWeight: number,              // Weight in overall score (0-1, all sum to 1)
}
```

### 3. ScoringCriterion (Embedded in InterviewStage)
```typescript
{
  name: string,                     // "Communication Clarity"
  description: string,              // What we're evaluating
  weight: number,                   // 0-1, sums to 1 within stage
  maxScore: number,                 // e.g., 10
  rubric: {                         // Scoring guide for LLM
    excellent: string,              // "Clear, concise, well-structured..."
    good: string,
    average: string,
    poor: string,
  }
}
```

### 4. InterviewAttempt (User's Session)
```typescript
{
  _id: ObjectId,

  // References
  user: ObjectId,                   // ref: User
  interview: ObjectId,              // ref: Interview
  attemptNumber: number,            // Auto-calculated: 1, 2, 3...

  // Status
  status: enum,                     // "in_progress" | "completed" | "abandoned" | "scoring" | "scored"
  currentStageIndex: number,        // 0-N (updated via webhook)

  // ElevenLabs
  elevenLabsConversationId: string, // Conversation ID from ElevenLabs
  audioUrl?: string,                // Recording URL (populated after completion)

  // Timing
  startedAt?: Date,
  completedAt?: Date,
  durationSeconds?: number,

  // Transcript (populated after completion)
  transcript: TranscriptEntry[],

  // Scoring (populated after LLM evaluation - JSON field for sub-stages)
  stageResults: StageResult[],
  overallScore?: number,            // 0-100
  overallFeedback?: string,
  strengths?: string[],
  areasForImprovement?: string[],

  // Metadata
  platform?: string,                // "web" | "ios" | "android"

  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### 5. TranscriptEntry (Embedded in InterviewAttempt)
```typescript
{
  index: number,                    // Sequential order
  role: enum,                       // "agent" | "user"
  text: string,                     // What was said
  timestampMs: number,              // Milliseconds from start
  stageIndex: number,               // Which stage (0-N)

  // Optional metadata from ElevenLabs
  confidence?: number,              // Speech recognition confidence
  emotion?: string,                 // Detected emotion if available
}
```

### 6. StageResult (Embedded in InterviewAttempt)
```typescript
{
  stageIndex: number,
  stageName: string,

  // Question-level scores
  questionScores: QuestionScore[],

  // Criteria-level scores
  criteriaScores: {
    criterionName: string,
    score: number,
    maxScore: number,
    feedback: string,
  }[],

  // Aggregate
  stageScore: number,               // 0-100
  feedback: string,                 // Overall stage feedback
  strengths: string[],
  improvements: string[],
}
```

### 7. QuestionScore (Embedded in StageResult)
```typescript
{
  questionText: string,             // The question asked
  answerSummary: string,            // Summary of user's answer
  score: number,                    // 0-10 or similar
  maxScore: number,
  feedback: string,

  // Link to transcript
  transcriptRange: {
    startIndex: number,
    endIndex: number,
  }
}
```

### Indexes
```javascript
// InterviewAttempt
{ user: 1, createdAt: -1 }          // User's history (all attempts)
{ user: 1, interview: 1 }           // Attempts for a specific interview
{ interview: 1, createdAt: -1 }     // All attempts for an interview
{ status: 1 }                       // Find sessions needing scoring
{ elevenLabsConversationId: 1 }     // Webhook lookups

// Interview
{ isActive: 1, targetRole: 1 }      // Browse by role
{ isActive: 1, domain: 1 }          // Browse by domain
{ isActive: 1, difficulty: 1 }      // Browse by difficulty
```

---

## API Design (Finalized)

### Interviews (Templates - Admin)
```
GET    /api/interviews                     → List all active interviews (with filters)
GET    /api/interviews/:id                 → Get interview details
POST   /api/admin/interviews               → Create interview (admin only)
PUT    /api/admin/interviews/:id           → Update interview (admin only)
DELETE /api/admin/interviews/:id           → Soft delete (set isActive=false)
```

### Interview Attempts (User Sessions)
```
GET    /api/attempts                       → List all user's attempts
GET    /api/attempts?interviewId=xyz       → List attempts for specific interview
GET    /api/attempts/:id                   → Get attempt details
POST   /api/interviews/:id/attempts        → Start new attempt for an interview
POST   /api/attempts/:id/token             → Get ElevenLabs connection token
POST   /api/attempts/:id/start             → Mark attempt as started
POST   /api/attempts/:id/abandon           → Mark as abandoned
GET    /api/attempts/:id/replay            → Get audio URL + transcript for replay
```

### Webhooks (ElevenLabs → Our Backend)
```
POST   /api/webhooks/elevenlabs            → Handle all ElevenLabs webhooks
       - post_call_transcription           → Store transcript, queue scoring
       - post_call_audio                   → Store audio URL reference
       - stage_transition (if using tools) → Update currentStageIndex
```

---

## Architecture Flow

### 1. Starting an Interview Attempt
```
┌─────────┐  POST /interviews/:id/attempts  ┌─────────┐
│ Client  │ ───────────────────────────────►│ Backend │
│ (Web/   │                                 │         │
│  Mobile)│ ◄───────────────────────────────│         │
└─────────┘    { attemptId, interviewId }   └─────────┘
     │                                           │
     │      POST /attempts/:id/token             │
     │ ─────────────────────────────────────────►│
     │                                           │
     │      { signedUrl, agentId }               │
     │ ◄─────────────────────────────────────────│
     │                                           │
     │           WebSocket Connect               │
     │ ─────────────────────────────────────────►│──► ElevenLabs
     │                                           │
     │      POST /attempts/:id/start             │
     │ ─────────────────────────────────────────►│
     │                                           │
     ▼                                           ▼
 Voice Call Active (Client ↔ ElevenLabs)
```

### 2. During Interview (Stage Transitions)
```
┌───────────┐                    ┌─────────┐
│ ElevenLabs│ stage_transition   │ Backend │
│   Agent   │ ──────────────────►│         │
└───────────┘   (server tool)    └─────────┘
                                      │
                                      │ Update attempt
                                      │ currentStageIndex
                                      ▼
                               ┌─────────────┐
                               │  MongoDB    │
                               └─────────────┘
```

### 3. Interview Completion & Scoring
```
┌───────────┐ conversation_end   ┌─────────┐
│ ElevenLabs│ ──────────────────►│ Backend │
└───────────┘   webhook          └─────────┘
                                      │
                         ┌────────────┼────────────┐
                         │            │            │
                         ▼            ▼            ▼
                    Fetch       Update Attempt  Queue Job
                  Transcript   (completed)      (scoring)
                         │
                         └─────────► BullMQ/Queue
                                         │
                                         ▼
                                   ┌───────────┐
                                   │  GPT-4o   │
                                   │ Scoring   │
                                   └───────────┘
                                         │
                                         ▼
                                   Update Attempt
                                   with StageResults
                                         │
                                         ▼
                                   Notify User
                                   (Email/Push)
```

### 4. Replay Flow
```
┌─────────┐  GET /attempts/:id/replay  ┌─────────┐
│ Client  │ ──────────────────────────►│ Backend │
└─────────┘                            └─────────┘
     │                                      │
     │    { audioUrl, transcript,           │
     │      stageResults, scores }          │
     │ ◄────────────────────────────────────│
     │                                      │
     ▼
  Render replay UI with:
  - Audio player (from ElevenLabs URL)
  - Synced transcript
  - Stage-by-stage scores
  - Question-level feedback
```

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Database | MongoDB (existing) | Consistent with current stack |
| ORM | Mongoose (existing) | Consistent with current stack |
| Queue | BullMQ with Redis | Async scoring jobs, reliable |
| LLM for Scoring | GPT-4o | Good balance of cost/quality |
| Voice AI | ElevenLabs Conversational | User has existing account |
| Audio Storage | ElevenLabs hosted | Simplify infrastructure |
| Frontend Connection | Direct WebSocket to ElevenLabs | Low latency, official SDK |

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Create Interview and InterviewAttempt schemas
- [ ] Create interview module (CRUD for templates - admin)
- [ ] Create attempt module (basic CRUD - user)
- [ ] Set up ElevenLabs service wrapper
- [ ] Configure webhooks endpoint

### Phase 2: Core Interview Flow
- [ ] Implement attempt creation with ElevenLabs conversation init
- [ ] Implement signed URL/token generation
- [ ] Implement webhook handlers (stage transition, completion)
- [ ] Test end-to-end interview flow with ElevenLabs

### Phase 3: Scoring Pipeline
- [ ] Set up BullMQ/Redis for job queue
- [ ] Create scoring service (GPT-4o integration)
- [ ] Implement transcript parsing + stage segmentation
- [ ] Implement scoring logic per criteria
- [ ] Store results and update attempt

### Phase 4: User Experience
- [ ] Implement replay endpoint (audio + transcript)
- [ ] Implement user attempt history
- [ ] Add email notifications for completed scores
- [ ] Frontend integration (separate task)

### Phase 5: Admin & Polish
- [ ] Admin endpoints for interview template management
- [ ] Analytics/reporting endpoints
- [ ] Rate limiting and security
- [ ] Monitoring and error handling

---

## Open Questions (Researched)

| # | Question | Status | Answer |
|---|----------|--------|--------|
| 1 | Does ElevenLabs support custom webhooks for stage transitions? | ✅ Yes | Use **Agent Workflows** with Subagent nodes for stage transitions. Can also send `contextual_update` events via WebSocket |
| 2 | What's the transcript format from ElevenLabs API? | ✅ Answered | Array of `{role, message, time_in_call_secs, tool_calls, tool_results}` |
| 3 | Does ElevenLabs provide audio recording URLs automatically? | ✅ Yes | Post-call webhook sends base64 MP3 audio (`post_call_audio`) or use GET Conversation API |
| 4 | Can we inject dynamic prompts mid-conversation for persona switch? | ✅ Yes | Use **Agent Workflows** - Subagent nodes can override system prompt, LLM, voice, knowledge base |
| 5 | What's the ElevenLabs pricing for conversational AI? | ❓ Pending | Check billing dashboard |

---

## ElevenLabs Integration Notes (Researched)

### Key Features Available

#### 1. Agent Workflows (Perfect for our use case!)
- Visual graph-based conversation design with branching paths
- **Subagent Nodes** - Each stage can be a subagent with:
  - Own system prompt (append or override)
  - Own LLM selection
  - Own voice configuration
  - Own knowledge base (stage-specific docs)
  - Own tools (stage-specific webhooks)
- **Edge Conditions** for routing:
  - LLM conditions (natural language evaluation)
  - Expression-based (deterministic logic)
  - Unconditional (auto-progress)

#### 2. Post-Call Webhooks
Three webhook types sent after call ends:

**`post_call_transcription`:**
```json
{
  "type": "post_call_transcription",
  "event_timestamp": 1234567890,
  "data": {
    "agent_id": "...",
    "conversation_id": "...",
    "status": "...",
    "transcript": [
      {
        "role": "agent" | "user",
        "message": "text spoken",
        "time_in_call_secs": 12.5,
        "tool_calls": [...],
        "tool_results": [...]
      }
    ],
    "metadata": { /* timing, costs */ },
    "analysis": { /* evaluation results */ }
  }
}
```

**`post_call_audio`:**
- Base64-encoded MP3 of full conversation
- Delivered via chunked transfer encoding
- Can be toggled on/off

**Authentication:** HMAC-SHA256 via `ElevenLabs-Signature` header

#### 3. Server Tools (Webhooks)
- Agent can call our backend during conversation
- Configure: Name, Description, Method, URL, Parameters
- Use for: Stage transition notifications, fetching user data, logging

#### 4. Knowledge Base
- Upload: PDF, TXT, DOCX, HTML, EPUB (21MB limit)
- RAG enabled for large knowledge bases
- Can scope per subagent (stage-specific knowledge)
- ~500ms latency added when RAG enabled

#### 5. Client-to-Server Events (WebSocket)
- **`contextual_update`**: Send background info without interrupting
- **`user_message`**: Inject text as if user spoke
- **`user_activity`**: Reset timeout during silence

### Architecture: Single Persona, Specialized Workflow

**Key Insight:** User sees ONE interviewer persona (e.g., "Alex"), but internally ElevenLabs workflow uses specialized subagent nodes for each stage - same voice, same name, different focus areas.

#### What User Sees (PreTest Platform)
```
┌─────────────────────────────────────────────────┐
│           AI INTERVIEWER: "Alex"                │
│           Role: Senior Technical Interviewer    │
│           Style: Professional & Supportive      │
│                                                 │
│  Single continuous conversation with Alex       │
│  who guides you through the entire interview    │
└─────────────────────────────────────────────────┘
```

#### What Happens Internally (ElevenLabs Workflow)
```
┌─────────────────────────────────────────────────────────────────────┐
│            AGENT WORKFLOW (Same Voice & Name: "Alex")               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │   Stage 1    │───►│   Stage 2    │───►│   Stage 3    │          │
│  │ Introduction │    │  Experience  │    │   Problem    │          │
│  │  Specialist  │    │  Specialist  │    │  Specialist  │          │
│  │ (APPEND mode)│    │ (APPEND mode)│    │ (APPEND mode)│          │
│  └──────────────┘    └──────────────┘    └──────────────┘          │
│         │                  │                   │                    │
│         │    SAME VOICE    │    SAME VOICE     │                    │
│         │    SAME NAME     │    SAME NAME      │                    │
│         ▼                  ▼                   ▼                    │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │   Stage 4    │───►│   Stage 5    │───►│     End      │          │
│  │   Project    │    │  Behavioral  │    │    Node      │          │
│  │  Specialist  │    │  Specialist  │    │              │          │
│  └──────────────┘    └──────────────┘    └──────────────┘          │
│                                                │                    │
│                                                ▼                    │
│                                      POST-CALL WEBHOOK              │
└────────────────────────────────────────────────┼────────────────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────┐
                                      │   Our Backend   │
                                      │  - Store transcript
                                      │  - Queue scoring
                                      │  - Update attempt
                                      └─────────────────┘
```

#### How ElevenLabs Handles This
1. **Same Voice**: All subagent nodes use identical voice config
2. **Append Mode**: Each stage APPENDS instructions without losing base persona
3. **Context Flows**: Conversation history passes between nodes automatically
4. **User Perceives**: One continuous conversation with "Alex"
5. **Internal Specialization**: Different prompts optimize each stage's questions

### Subagent Configuration (Single Persona)

```yaml
# Base Agent (The "Alex" persona - shared across all stages)
Agent Name: "Technical Interview - Alex"
Voice: Same voice for ALL nodes (e.g., "Josh" - professional male)

Base System Prompt: |
  You are Alex, a senior technical interviewer conducting a mock interview.

  YOUR IDENTITY (NEVER CHANGES):
  - Name: Alex
  - Role: Senior Technical Interviewer
  - Style: Professional, supportive, thorough
  - Tone: Encouraging but rigorous

  NEVER change your name or introduce yourself as someone else.
  You are Alex throughout the entire interview.

# Each subagent node APPENDS (not overrides) stage-specific instructions:

Stage 1 - Introduction (Appended):
  Voice: SAME (Josh)
  Prompt Mode: APPEND
  Focus: |
    CURRENT FOCUS: Introduction Phase
    - Welcome the candidate warmly
    - Ask them to introduce themselves
    - Explain: interview covers background, technical problem, project discussion, behavioral
    - Keep to 3-5 minutes

    When done, transition naturally:
    "Great, thanks for sharing! Let's dive into your experience..."

Stage 2 - Experience Discussion (Appended):
  Voice: SAME (Josh)
  Prompt Mode: APPEND
  Focus: |
    CURRENT FOCUS: Experience Deep-Dive
    - Ask about specific projects they mentioned
    - Probe for technical decisions and challenges
    - Understand their growth and learnings

    After 8-10 minutes, transition:
    "Your experience sounds solid. Let me give you a technical problem..."

Stage 3 - Problem Solving (Appended):
  Voice: SAME (Josh)
  Prompt Mode: APPEND
  Focus: |
    CURRENT FOCUS: Technical Problem Solving
    - Present a frontend coding problem
    - Let candidate think out loud
    - Guide without giving answers

    THE PROBLEM: Build a search input with autocomplete from an API.
    How would you handle efficient API calls?

    After thorough discussion:
    "Good thinking! Let's discuss one of your projects in depth..."

Stage 4 - Project Deep Dive (Appended):
  Voice: SAME (Josh)
  Prompt Mode: APPEND
  Focus: |
    CURRENT FOCUS: Project Architecture
    - Pick a project from their earlier discussion
    - Dive deep into architecture decisions
    - Ask what they'd do differently

    After 10-12 minutes:
    "Great insights. Let me wrap up with a few final questions..."

Stage 5 - Behavioral (Appended):
  Voice: SAME (Josh)
  Prompt Mode: APPEND
  Focus: |
    CURRENT FOCUS: Behavioral & Wrap-up
    - Ask 2-3 behavioral questions
    - Thank them for their time

    Closing:
    "Thank you for your time today! You'll receive detailed feedback shortly."
```

### WebSocket Connection Flow

```
Frontend                          ElevenLabs                    Our Backend
   │                                  │                              │
   │──── GET /interviews/:id/token ──►│                              │
   │◄─── { signedUrl, agentId } ──────│                              │
   │                                  │                              │
   │══════ WebSocket Connect ═════════╡                              │
   │      wss://api.elevenlabs.io     │                              │
   │                                  │                              │
   │◄════ conversation_started ═══════│                              │
   │                                  │                              │
   │◄═══► voice conversation ═════════│                              │
   │      (real-time audio)           │                              │
   │                                  │                              │
   │      [Stage transitions happen   │                              │
   │       automatically via workflow]│                              │
   │                                  │                              │
   │◄════ conversation_ended ═════════│                              │
   │                                  │                              │
   │                                  │──── POST /webhooks/eleven ──►│
   │                                  │     { transcript, audio }    │
   │                                  │                              │
   │                                  │◄──── 200 OK ─────────────────│
```

### Sources
- [Agent Workflows](https://elevenlabs.io/docs/agents-platform/customization/agent-workflows)
- [Post-Call Webhooks](https://elevenlabs.io/docs/agents-platform/workflows/post-call-webhooks)
- [Server Tools](https://elevenlabs.io/docs/agents-platform/customization/tools/server-tools)
- [Knowledge Base](https://elevenlabs.io/docs/agents-platform/customization/knowledge-base)
- [WebSocket API](https://elevenlabs.io/docs/agents-platform/libraries/web-sockets)
- [Client Events](https://elevenlabs.io/docs/agents-platform/customization/events/client-to-server-events)

---

## Quick Prototype Plan (ElevenLabs Dashboard) - Single Persona

### Goal
Get a working 5-stage AI interview with SINGLE PERSONA running in ElevenLabs dashboard.

### Step 1: Create Base Agent
1. Go to [ElevenLabs Agents Dashboard](https://elevenlabs.io/app/agents)
2. Click **Create New Agent** → Select **Blank Template**
3. Name it: `SDE1 Frontend Interview - Alex`

### Step 2: Configure Base Agent Settings
```
First Message:
"Hi! I'm Alex, and I'll be your interviewer for today's mock technical interview
for the SDE1 Frontend position.

This will be a comprehensive interview covering your background, a technical problem,
project discussion, and some behavioral questions - about 45 to 60 minutes total.

Let's start with you telling me a bit about yourself. What's your background
and what brings you here today?"

System Prompt:
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

### Step 3: Set Up Agent Workflow (Visual Editor)

```
┌─────────────────────────────────────────────────────────────────┐
│           WORKFLOW CANVAS (Same Voice: Alex)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [START] ──► [Stage 1: Intro] ──► [Stage 2: Experience]       │
│                                              │                  │
│                                              ▼                  │
│              [Stage 5: Behavioral] ◄── [Stage 4: Project]      │
│                       │                      ▲                  │
│                       │                      │                  │
│                       ▼              [Stage 3: Problem]         │
│                   [END NODE]                                    │
│                                                                 │
│   ALL NODES USE SAME VOICE + APPEND MODE                        │
└─────────────────────────────────────────────────────────────────┘
```

### Step 4: Configure Each Subagent Node (APPEND Mode)

**IMPORTANT:** All nodes use:
- Same Voice (e.g., "Josh" - professional male)
- Prompt Mode: **APPEND** (not override)

#### Node 1: Introduction
```yaml
Name: "Stage 1 - Introduction"
Voice: Josh (SAME for all nodes)
Prompt Mode: APPEND

Appended Instructions: |
  CURRENT FOCUS: Introduction Phase

  Your objectives:
  - Welcome the candidate warmly (already done in first message)
  - Let them introduce themselves (2-3 mins)
  - Explain the interview structure briefly
  - Set expectations for timing

  Keep this stage to 3-5 minutes.
  When introduction feels complete, transition naturally:
  "Great, thanks for sharing that! I'd love to hear more about your
  experience. Tell me about your current role and some projects
  you've worked on..."

Edge to Next Node:
  Condition Type: LLM
  Condition: "Has the candidate introduced themselves?"
```

#### Node 2: Experience Discussion
```yaml
Name: "Stage 2 - Experience"
Voice: Josh (SAME)
Prompt Mode: APPEND

Appended Instructions: |
  CURRENT FOCUS: Experience Deep-Dive

  Your objectives:
  - Explore the candidate's work history
  - Ask about their most impactful projects
  - Understand technical decisions they've made
  - Probe for challenges faced and solutions

  Questions to explore:
  - "Tell me more about [project they mentioned]..."
  - "What was the most challenging technical problem there?"
  - "How did you approach that decision?"
  - "What technologies did you use and why?"

  After 8-10 minutes, transition:
  "Your experience sounds solid. Now I'd like to give you a
  technical problem to work through. Ready?"

Edge to Next Node:
  Condition Type: LLM
  Condition: "Has the interviewer discussed work experience and projects?"
```

#### Node 3: Problem Solving
```yaml
Name: "Stage 3 - Problem Solving"
Voice: Josh (SAME)
Prompt Mode: APPEND

Appended Instructions: |
  CURRENT FOCUS: Technical Problem Solving

  Present this problem:
  "Let's work through a practical problem. Imagine you need to build
  a search input component that shows autocomplete suggestions as
  the user types. The suggestions come from an API endpoint.

  The catch is - we don't want to hit the API on every single keystroke.
  How would you approach building this?"

  Guide the discussion:
  - Let them think out loud
  - Ask clarifying questions about their approach
  - Probe edge cases: "What about error handling?"
  - Discuss optimizations: "How would you handle slow networks?"
  - Ask about keyboard navigation, accessibility

  After thorough discussion (15-20 mins):
  "Good thinking! Now let's switch gears - I'd like to hear about
  one of your projects in more detail..."

Edge to Next Node:
  Condition Type: LLM
  Condition: "Has a technical problem been discussed with solution approach?"
```

#### Node 4: Project Deep Dive
```yaml
Name: "Stage 4 - Project Deep Dive"
Voice: Josh (SAME)
Prompt Mode: APPEND

Appended Instructions: |
  CURRENT FOCUS: Project Architecture Discussion

  Your objectives:
  - Pick a project from their earlier discussion
  - Dive deep into architecture decisions
  - Understand trade-offs they considered
  - Ask what they'd do differently

  Start with:
  "Earlier you mentioned [project]. Let's dig deeper into that.
  Can you walk me through the architecture?"

  Follow-up questions:
  - "What were the main technical trade-offs?"
  - "How did you handle [specific challenge]?"
  - "If you could redo it, what would you change?"
  - "How did you handle testing/deployment?"

  After 10-12 minutes:
  "Great insights! Let me wrap up with a few final questions..."

Edge to Next Node:
  Condition Type: LLM
  Condition: "Has a specific project been discussed in depth?"
```

#### Node 5: Behavioral & Wrap-up
```yaml
Name: "Stage 5 - Behavioral"
Voice: Josh (SAME)
Prompt Mode: APPEND

Appended Instructions: |
  CURRENT FOCUS: Behavioral Questions & Wrap-up

  Ask 2-3 of these behavioral questions:
  - "Tell me about a time you disagreed with a teammate on a technical approach."
  - "How do you handle tight deadlines when quality might suffer?"
  - "Describe a situation where you had to learn something new quickly."
  - "How do you approach giving or receiving code review feedback?"

  Listen for: Communication, collaboration, problem-solving, growth mindset.

  After behavioral questions, close warmly:
  "Thank you so much for your time today! That concludes our interview.
  You'll receive detailed feedback and scores shortly. Best of luck!"

Edge to End Node:
  Condition Type: LLM
  Condition: "Have behavioral questions been asked and interview concluded?"
```

#### End Node
```yaml
Name: "Interview Complete"
Action: End call gracefully
```

### Step 5: Configure Voice (SAME for All)
In ElevenLabs dashboard, select ONE voice for ALL nodes:
- **Recommended:** Josh, Adam, or Daniel (professional male voices)
- Keep voice settings consistent across all subagent nodes
- This ensures seamless persona continuity

### Step 6: Test in Dashboard
1. Click **"Test AI Agent"** button
2. Go through all 5 stages
3. Verify Alex maintains consistent identity
4. Check transitions feel natural
5. Note any prompt improvements needed

### Step 7: Quick Frontend Embed (Optional)
```html
<!-- Add to any HTML page -->
<elevenlabs-convai agent-id="YOUR_AGENT_ID"></elevenlabs-convai>
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async type="text/javascript"></script>
```

---

## Prototype Checklist

- [ ] Create agent in ElevenLabs dashboard (name: "Alex")
- [ ] Set up base agent with first message + system prompt
- [ ] Create workflow with 5 subagent nodes
- [ ] Configure each node with APPEND mode instructions
- [ ] Set edge conditions (LLM-based)
- [ ] Use SAME voice for ALL nodes (Josh/Adam/Daniel)
- [ ] Test full interview flow in dashboard
- [ ] Verify Alex maintains consistent identity
- [ ] Note timing of each stage
- [ ] Export agent ID for frontend integration

---

## What Prototype Validates
1. ✅ Single persona throughout entire interview
2. ✅ Specialized stage handling via APPEND mode
3. ✅ Seamless stage transitions (same voice)
4. ✅ Context flows between stages
5. ✅ Natural conversation flow (~45-60 mins)

## What Prototype Doesn't Cover (For Later)
- ❌ Backend session tracking
- ❌ Post-call webhook handling
- ❌ Transcript storage
- ❌ GPT-4o scoring pipeline
- ❌ User authentication
- ❌ Interview history/replay

