# AI Interview - UX Flow & User Journey

## Overview

The AI Interview feature provides users with an immersive, video-call style mock interview experience powered by ElevenLabs Conversational Voice AI. The design follows the **AI Studio** approach - a premium dark theme with two-participant video call aesthetics.

---

## User Journey Map

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              AI INTERVIEW USER JOURNEY                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  [Discovery]     [Selection]      [Preparation]     [Interview]    [Results]   │
│      │               │                 │                │              │        │
│      ▼               ▼                 ▼                ▼              ▼        │
│  ┌───────┐     ┌──────────┐      ┌──────────┐    ┌──────────┐   ┌──────────┐  │
│  │Navbar │     │Interview │      │  Brief   │    │  Live    │   │ Feedback │  │
│  │  Tab  │────▶│  Browse  │─────▶│  Screen  │───▶│Interview │──▶│ & Score  │  │
│  └───────┘     └──────────┘      └──────────┘    └──────────┘   └──────────┘  │
│                      │                                               │          │
│                      │           ┌──────────┐                       │          │
│                      └──────────▶│   My     │◀──────────────────────┘          │
│                                  │Interviews│                                   │
│                                  └──────────┘                                   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Screen 1: AI Interviews Browse Page

### Purpose
Allow users to discover and select from available AI interview templates based on role, company, and difficulty.

### URL: `/ai-interview`

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ [Navbar with AI Interview tab active]                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AI Mock Interviews                          [My Interviews →]  │
│  Practice with AI interviewers tailored to                      │
│  your target role and company                                   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Search interviews...]  [Company ▼] [Role ▼] [Level ▼]  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Popular Interviews                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │ 🏢 Amazon  │ │ 🏢 Google  │ │ 🏢 Meta    │ │ 🏢 Microsoft│  │
│  │ SDE 1     │ │ L3 SWE    │ │ E4 FE      │ │ SDE 59     │  │
│  │ ⭐⭐⭐     │ │ ⭐⭐⭐⭐    │ │ ⭐⭐⭐      │ │ ⭐⭐⭐       │  │
│  │ 45 min    │ │ 60 min    │ │ 45 min    │ │ 50 min     │  │
│  │ 234 taken │ │ 189 taken │ │ 156 taken │ │ 201 taken  │  │
│  │ [Start →] │ │ [Start →] │ │ [Start →] │ │ [Start →]  │  │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘  │
│                                                                 │
│  Browse by Category                                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [FAANG] [Startups] [Finance] [Product] [Design] [Data]   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  All Interviews (24)                                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Interview cards in grid/list view...                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Interview Card Components
- Company logo/icon
- Role title (e.g., "SDE 1", "Product Manager")
- Difficulty indicator (Easy/Medium/Hard stars)
- Estimated duration
- Number of users who've taken it
- Brief description preview
- "Start Interview" CTA button

### Key Interactions
1. **Filter/Search**: Users can filter by company, role type, difficulty
2. **Quick Start**: Click "Start" to go directly to brief screen
3. **Card Click**: Opens interview detail modal/page
4. **My Interviews**: Navigate to history page

---

## Screen 2: Interview Brief Screen

### Purpose
Prepare the user for the interview by explaining what to expect, checking permissions, and building confidence.

### URL: `/ai-interview/session/[id]/brief`

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back to Interviews]                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌─────────────────────┐                     │
│                    │     🏢 Amazon       │                     │
│                    │      SDE 1          │                     │
│                    │   ⭐⭐⭐ Medium       │                     │
│                    └─────────────────────┘                     │
│                                                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                 │
│  What to Expect                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ⏱️  Duration: ~45 minutes                                 │  │
│  │ 🎯 Focus Areas: Leadership Principles, System Design     │  │
│  │ 📊 Stages: Intro → Experience → Problem → Projects → Wrap│  │
│  │ 🎤 Format: Voice conversation with AI interviewer        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Interview Stages                                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ① Introduction (5 min) - Brief intro and rapport         │  │
│  │ ② Experience Discussion (10 min) - Past work & projects  │  │
│  │ ③ Problem Solving (15 min) - Technical scenarios         │  │
│  │ ④ Project Deep-Dive (10 min) - Detailed walkthrough      │  │
│  │ ⑤ Wrap-up (5 min) - Questions and closing                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Tips for Success                                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 💡 Speak clearly and at a moderate pace                   │  │
│  │ 💡 Use the STAR method for behavioral questions           │  │
│  │ 💡 It's okay to ask for clarification                     │  │
│  │ 💡 Quantify your impact with numbers when possible        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Device Check                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🎤 Microphone: [Testing...] ✓ Working                    │  │
│  │ 🔊 Speaker: [Test Sound] ✓ Working                       │  │
│  │ 📹 Camera (optional): [Enable]                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│              ┌────────────────────────────────┐                │
│              │    🚀 Start Interview          │                │
│              │    Ready when you are          │                │
│              └────────────────────────────────┘                │
│                                                                 │
│  [Skip brief and start directly]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components
1. **Interview Header**: Company, role, difficulty badge
2. **What to Expect**: Quick overview of duration, format, focus areas
3. **Stage Breakdown**: Visual timeline of interview phases
4. **Tips Section**: Contextual advice for this interview type
5. **Device Check**: Microphone/speaker test with visual feedback
6. **Start CTA**: Large, prominent button to begin
7. **Skip Option**: For returning users who want to jump in

### Key Interactions
1. **Mic Test**: Click to test microphone, show audio waveform
2. **Speaker Test**: Play test sound to verify audio
3. **Camera Toggle**: Optional video (for self-view, not recorded)
4. **Start Interview**: Transitions to live interview screen

---

## Screen 3: Live Interview Screen (AI Studio)

### Purpose
The core interview experience - an immersive video-call style interface for conversation with the AI interviewer.

### URL: `/ai-interview/session/[id]`

### Layout (Based on AI Studio Approach)
```
┌─────────────────────────────────────────────────────────────────┐
│ 🔴 LIVE │ Amazon SDE1 Interview │ ⚡450 XP │ 🔥 5 day streak   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │                         │  │                             │  │
│  │     ╭───────────╮      │  │         ╭─────╮            │  │
│  │     │    AI     │      │  │         │  T  │            │  │
│  │     │  Avatar   │      │  │         ╰─────╯            │  │
│  │     │  (Orb)    │      │  │                             │  │
│  │     ╰───────────╯      │  │                             │  │
│  │                         │  │                             │  │
│  │  ● Alex (AI)           │  │  🎤 You                     │  │
│  │  Speaking...           │  │                             │  │
│  └─────────────────────────┘  └─────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 💬 Current Question • Stage 2                             │  │
│  │                                                           │  │
│  │ "Tell me about a challenging project you worked on.      │  │
│  │  What was your specific role and how did you handle      │  │
│  │  the technical challenges?"                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Stage Progress                                                 │
│  [✓ Intro]──[● Experience]──[○ Problem]──[○ Projects]──[○ End]│
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🏆 Stage 1 Complete! +100 XP │ ⭐⭐☆ Introduction Score   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│          ┌───┐    ┌───┐    ┌───┐    ┌───┐                     │
│          │🎤│    │📹│    │📞│    │💬│                     │
│          │Mic│    │Vid│    │End│    │Chat│                    │
│          └───┘    └───┘    └───┘    └───┘                     │
│                                                                 │
│                      32:15 elapsed                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components

#### 1. Top Bar
- Live indicator (red dot + "LIVE")
- Interview title (Company + Role)
- XP counter (gamification)
- Streak indicator
- Timer (optional in header)

#### 2. Video Grid (2-up layout)
- **AI Panel**: Animated orb avatar with glow effects when speaking
- **User Panel**: User's video (or avatar initial if camera off)
- Speaking indicators (green dot when active)
- Name labels

#### 3. Current Question Display
- Stage indicator
- Large, readable question text
- Updates as conversation progresses

#### 4. Progress Timeline
- Visual stage indicator
- Checkmarks for completed stages
- Active stage highlighted
- Upcoming stages dimmed

#### 5. Achievement Banner (contextual)
- Shows when user completes a stage
- XP earned
- Quick score preview

#### 6. Control Bar
- **Mic**: Toggle mute/unmute (large, prominent)
- **Video**: Toggle camera on/off
- **End Call**: End interview (requires confirmation)
- **Transcript**: Toggle live transcript panel

#### 7. Timer
- Elapsed time display
- Optional estimated remaining time

### States & Transitions

#### AI Speaking State
- Orb pulses with glow rings
- "Alex (AI) Speaking..." label
- User's mic visual feedback dimmed

#### User Speaking State
- "Listening to you..." indicator
- User's audio waveform visualization
- AI orb in idle state

#### Thinking State
- AI processing indicator
- "Thinking..." label
- Brief pause before response

### Key Interactions
1. **Mute/Unmute**: Toggle microphone
2. **Video Toggle**: Turn camera on/off
3. **End Interview**: Confirmation modal → results screen
4. **View Transcript**: Slide-out panel with conversation history
5. **Minimize Question**: Collapse question card for more video space

---

## Screen 4: End Interview Confirmation Modal

### Purpose
Prevent accidental exits and confirm user intent to end the interview.

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    End Interview?                               │
│                                                                 │
│     You're currently in Stage 3 of 5                           │
│     (Problem Solving)                                           │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ ⚠️  Ending now will:                                 │    │
│     │ • Save your progress up to this point               │    │
│     │ • Generate partial feedback                          │    │
│     │ • Count as an incomplete interview                   │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│     ┌──────────────────┐  ┌──────────────────────────────┐    │
│     │ Continue Interview│  │  End & Get Feedback         │    │
│     └──────────────────┘  └──────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Screen 5: Results & Feedback Screen

### Purpose
Provide comprehensive feedback, scores, and actionable insights after the interview.

### URL: `/ai-interview/results/[id]`

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back to Interviews]                      [Share] [Download]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│              🎉 Interview Complete!                             │
│                                                                 │
│              Amazon SDE 1 Mock Interview                        │
│              January 20, 2026 • 42 minutes                      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Overall Score                          │  │
│  │                                                           │  │
│  │                    ╭─────────╮                           │  │
│  │                    │   78    │                           │  │
│  │                    │  /100   │                           │  │
│  │                    ╰─────────╯                           │  │
│  │                                                           │  │
│  │              "Strong Performance"                         │  │
│  │    You demonstrated solid technical skills and           │  │
│  │    good communication. Focus on quantifying impact.      │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Stage Breakdown                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Introduction        ████████████████████░░  85/100 Strong│  │
│  │ Experience          █████████████████░░░░░  72/100 Good  │  │
│  │ Problem Solving     ███████████████████░░░  80/100 Strong│  │
│  │ Project Deep-Dive   ██████████████░░░░░░░░  68/100 Fair  │  │
│  │ Wrap-up             █████████████████████░  88/100 Strong│  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Key Strengths                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ✓ Clear communication style                               │  │
│  │ ✓ Good technical depth in system design discussions       │  │
│  │ ✓ Structured approach to problem solving                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Areas to Improve                                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ △ Quantify impact more (use specific numbers/metrics)    │  │
│  │ △ Clarify your specific role vs team's contribution      │  │
│  │ △ Ask more clarifying questions before diving into code  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Question-by-Question Analysis                      [Expand ▼]  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Q1: "Tell me about yourself..."         Strong ████████░ │  │
│  │ Q2: "Describe a challenging project..." Good   ██████░░░ │  │
│  │ Q3: "How would you design..."          Strong ████████░ │  │
│  │ ...                                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Full Transcript                                    [View →]    │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │ 🔄 Retry Same   │  │ 📝 Practice     │  │ 🎯 Try Similar  ││
│  │    Interview    │  │    Weak Areas   │  │    Interview    ││
│  └─────────────────┘  └─────────────────┘  └─────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components

#### 1. Header
- Completion celebration
- Interview details (company, role, date, duration)
- Share/Download options

#### 2. Overall Score Card
- Large circular score display
- Performance tier label ("Strong", "Good", "Needs Work")
- Brief summary statement

#### 3. Stage Breakdown
- Progress bars for each stage
- Individual scores
- Performance tier labels

#### 4. Strengths & Improvements
- Bulleted lists of key feedback
- Actionable and specific
- Based on AI analysis

#### 5. Question Analysis (Expandable)
- Individual question scores
- Click to expand for detailed feedback

#### 6. Transcript Access
- Link to full conversation transcript
- Searchable and timestamped

#### 7. Next Actions
- Retry same interview
- Practice weak areas (targeted)
- Try similar interviews

---

## Screen 6: My Interviews / History Page

### Purpose
Show user's interview history, progress over time, and easy access to past results.

### URL: `/ai-interview/history`

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ [← AI Interviews]                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  My Interview History                                           │
│                                                                 │
│  Stats Overview                                                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │    12      │ │    78%     │ │    🔥 5    │ │   ⬆️ 15%   │  │
│  │ Interviews │ │ Avg Score  │ │ Day Streak │ │ This Month │  │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘  │
│                                                                 │
│  Progress Chart                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │     📈 Score Trend (Last 30 days)                        │  │
│  │  100│                                    ╭──            │  │
│  │   80│              ╭─────╮   ╭──────╯                    │  │
│  │   60│     ╭───────╯     ╰───╯                            │  │
│  │   40│─────╯                                              │  │
│  │     └────────────────────────────────────────────────    │  │
│  │      Jan 1    Jan 7    Jan 14   Jan 20                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Recent Interviews                                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🏢 Amazon SDE1      │ 78/100 │ Today      │ [View →]     │  │
│  │ 🏢 Google L3        │ 82/100 │ Yesterday  │ [View →]     │  │
│  │ 🏢 Meta E4          │ 71/100 │ Jan 18     │ [View →]     │  │
│  │ 🏢 Microsoft SDE    │ 85/100 │ Jan 15     │ [View →]     │  │
│  │ 🏢 Amazon SDE1      │ 65/100 │ Jan 12     │ [View →]     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [Load More]                                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components
1. **Stats Overview**: Quick metrics (total interviews, avg score, streak, improvement)
2. **Progress Chart**: Visual trend of scores over time
3. **Interview List**: Chronological list with scores and quick actions
4. **Filtering**: By company, date range, score range

---

## Navigation Flow

### Navbar Integration
```
[Logo] [Explore Mentors] [AI Interviews ▼] [Dashboard] [Profile]
                              │
                              ├── Browse Interviews
                              ├── My Interviews
                              └── Practice Weak Areas
```

### Flow Diagram
```
                    ┌─────────────┐
                    │   Navbar    │
                    │ AI Interview│
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  Browse  │ │   My     │ │ Practice │
        │Interviews│ │Interviews│ │Weak Areas│
        └────┬─────┘ └────┬─────┘ └────┬─────┘
             │            │            │
             ▼            │            │
        ┌──────────┐      │            │
        │  Brief   │◀─────┴────────────┘
        │  Screen  │
        └────┬─────┘
             │
             ▼
        ┌──────────┐
        │   Live   │
        │Interview │
        └────┬─────┘
             │
             ▼
        ┌──────────┐
        │ Results/ │──────▶ [My Interviews]
        │ Feedback │
        └──────────┘
```

---

## Design Tokens (AI Studio Theme)

### Colors
```css
/* Background */
--bg-primary: #0f0f1a;      /* Deep navy/black */
--bg-secondary: #1a1a2e;    /* Slightly lighter */
--bg-card: rgba(255,255,255,0.05);

/* Accent */
--accent-primary: #8b5cf6;  /* Purple */
--accent-secondary: #6366f1; /* Indigo */
--accent-gradient: linear-gradient(135deg, #8b5cf6, #6366f1);

/* Status */
--status-success: #22c55e;  /* Green */
--status-warning: #f59e0b;  /* Amber */
--status-error: #ef4444;    /* Red */
--status-info: #3b82f6;     /* Blue */

/* Text */
--text-primary: #ffffff;
--text-secondary: rgba(255,255,255,0.7);
--text-muted: rgba(255,255,255,0.5);
```

### Animation Guidelines
- **Orb pulse**: 2s ease-in-out infinite
- **Glow rings**: Expanding ripple effect when AI speaks
- **Transitions**: 300ms ease for most UI elements
- **Progress**: Smooth fills with spring physics

---

## Gamification Elements

### XP System
- Complete interview: +100-300 XP (based on score)
- Complete stage: +20-50 XP
- Daily interview: +50 bonus XP
- Improvement bonus: +25 XP for beating previous score

### Streaks
- Daily interview maintains streak
- Visual indicator in header
- Milestone rewards at 7, 30, 100 days

### Achievements (Future)
- "First Interview"
- "Perfect Introduction"
- "Rising Star" (3 interviews in a week)
- "Top Performer" (90+ score)

---

## Mobile Considerations

### Interview Screen (Mobile)
- Stack video panels vertically
- Larger touch targets for controls
- Swipe to toggle transcript
- Persistent mic button at bottom

### Browse/Results (Mobile)
- Single column card layout
- Sticky filter bar
- Pull to refresh
- Bottom sheet for details

---

## Technical Notes

### ElevenLabs Integration Points
1. **Brief Screen**: Initialize agent connection
2. **Interview Screen**:
   - Stream audio to ElevenLabs
   - Receive AI voice responses
   - Track conversation state
3. **End Interview**: Signal session end, trigger evaluation

### State Management
- Interview session state
- Audio stream management
- Stage progress tracking
- Real-time transcript updates

### Error Handling
- Connection lost → Reconnect attempt → Save progress
- Audio issues → Visual feedback, troubleshooting tips
- API errors → Graceful degradation, retry options

---

## Implementation Priority

### Phase 1 (MVP)
1. Browse interviews page
2. Brief screen (basic)
3. Live interview screen
4. Basic results page

### Phase 2 (Enhanced)
1. My interviews/history
2. Progress charts
3. Detailed feedback
4. Retry/practice features

### Phase 3 (Gamification)
1. XP system
2. Streaks
3. Achievements
4. Leaderboards

---

*Document Version: 1.0*
*Last Updated: January 20, 2026*
*Author: PreTest UX Team*
