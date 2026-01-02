# PreTest - Product Context

> This document is read by all Claude personas to understand the product deeply.
> **This serves as PreTest's Platform Direction Document (Sprint Task 0.1)**

---

## One-Liner

**PreTest is a community-powered mock interview platform where students practice with recent grads from top companies - because preparation without practice is just theory.**

---

## The Problem

### Why Students Struggle

| Pain Point | Reality |
|------------|---------|
| **Knowledge ≠ Performance** | You can solve 300 LeetCode problems but freeze when someone's watching |
| **No practice partners** | Most students don't have seniors or connections at top companies |
| **Expensive alternatives** | Platforms like Pramp charge hefty fees for professional mentors |
| **US-centric content** | Most resources don't understand Indian placements and hiring |
| **Information overload** | Too many courses, videos, blogs - but no actual practice |

### The Core Insight

> "Preparation ≠ Practice. That's the gap we close."

Learning is not enough. Doing, applying, and performing under pressure is what matters. Students need to fail safely before their real interview.

---

## The Solution

### How PreTest Works

1. **Student signs up** (free)
2. **Browses mentors** - Filter by company, interview type, rating
3. **Books a session** - ₹49-99 per session (affordable)
4. **Gets interviewed** - Real mock interview (DSA, System Design, HR)
5. **Receives feedback** - Honest, actionable feedback from someone who recently cracked it

### Interview Types Supported

| Type | Description |
|------|-------------|
| **DSA/Coding** | Data structures, algorithms, problem-solving |
| **System Design** | Architecture, scalability, trade-offs |
| **Behavioral/HR** | Communication, situational questions |
| **Company-Specific** | Google, Amazon, Microsoft, Flipkart, etc. |

---

## Users

### Primary: Students/Learners (90%)

**Who they are:**
- College students preparing for placements/internships
- Fresh graduates (<1 year) job hunting or switching
- Tier-2/3 college students without access to mentors

**What they want:**
- Build confidence before real interviews
- Get honest feedback on blind spots
- Practice under real pressure
- Learn what's actually asked (not just theory)

**Pain points:**
- Fear of failing in real interviews
- No seniors or connections to practice with
- Don't know what to expect
- Overwhelmed by learning resources but no practice

### Secondary: Mentors (10%)

**Who they are:**
- Recent grads (6-12 months) at top companies
- Engineers at Google, Amazon, Microsoft, Flipkart, Razorpay, etc.
- People who recently cracked what students are preparing for

**What they want:**
- Earn side income (₹45-90 per session after platform cut)
- Build their network and influence
- Give back to the community
- Improve their own mentorship skills

**Why they mentor:**
- They remember the struggle
- Fresh interview experience = relevant advice
- Build reputation through ratings/reviews

---

## Business Model

| Aspect | Details |
|--------|---------|
| **Platform fee** | Free for students |
| **Session pricing** | ₹49-99 per session (platform sets price, not mentors) |
| **Launch discount** | ₹49 (50% off from ₹99) |
| **Platform cut** | 10% for infra and ops |
| **Mentor earnings** | 90% of session price |

**Future monetization:**
- Subscriptions (unlimited sessions)
- AI Interview feature (premium)
- Company partnerships

---

## Differentiators

### Why PreTest vs Alternatives

| Aspect | Others (Pramp, etc.) | PreTest |
|--------|---------------------|---------|
| **Mentors** | Expensive professionals | Affordable peers/recent grads |
| **Pricing** | ₹500-2000+ per session | ₹49-99 per session |
| **Context** | US-centric | India-focused (placements, Indian companies) |
| **Experience** | Senior professionals | Recent grads (fresh, relatable experience) |
| **Vibe** | Transactional | Community-driven (like talking to a supportive senior) |

### Core Value Props

1. **Community-Powered** - Mentors are peers who recently cracked interviews
2. **Affordable** - Accessible to tier-2/3 college students
3. **India-Focused** - Understand Indian placements and hiring
4. **Not Transactional** - More like talking to a supportive senior

---

## Community Features

| Feature | Status | Description |
|---------|--------|-------------|
| **Reviews & Ratings** | Live | Students rate mentors after sessions |
| **Mentor Profiles** | Live | Company, experience, sessions completed |
| **Alumni Network** | Planned | Connect with mentors from your target company |
| **Discussion Forums** | Planned | Community Q&A and tips |

---

## Current Status

### What's Live
- [x] Student signup/login
- [x] Mentor profiles
- [x] Booking system
- [x] Payments
- [x] Reviews & ratings

### What We're Building (Priority Order)

| Feature | Priority | Status |
|---------|----------|--------|
| Landing page redesign | High | In Progress |
| Bug fixes & polish | High | In Progress |
| Discounts system | High | Planned |
| Subscription model | Medium | Planned |
| AI Interview | Medium | Planned |

---

## MVP Scope - NOW vs LATER

> **This section defines clear boundaries between current MVP and future features**

### ✅ NOW - In MVP (Current Focus)

**Core User Journey:**
1. **Discovery**
   - Landing page with clear value prop
   - Browse/explore mentors (with basic filtering)
   - View mentor profiles (company, experience, ratings, reviews)

2. **Booking & Payment**
   - Select time slot from mentor availability
   - Razorpay payment integration
   - Booking confirmation

3. **Session Management**
   - View upcoming bookings
   - View past bookings/history
   - Basic booking details (date, time, mentor, status)

4. **Feedback Loop**
   - Post-session reviews (star rating + comment)
   - Display reviews on mentor profiles
   - Mentor rating aggregation

5. **Auth & Profile**
   - Email/password signup & login
   - Basic user profile
   - Forgot password flow
   - Deep linking & session management

**Features Being Polished (Pre-Launch):**
- [ ] Landing page real data integration (pending users)
- [ ] FAQ expansion (8-10 questions)
- [ ] Mobile responsiveness audit
- [ ] E2E flow testing
- [ ] Auth security hardening
- [ ] Error handling & loading states

---

### ⏳ LATER - Post-MVP (Deferred)

**Phase 1 - Growth & Retention (3-6 months):**
- **Pricing Strategy**
  - Freemium vs paid model decision
  - Usage limits for free tier
  - Subscription tiers (if applicable)
  - Discount/coupon system
  - Referral program

- **Enhanced Discovery**
  - Advanced filtering (expertise, price range, availability)
  - Search functionality
  - Pagination for mentor listings
  - Mentor recommendations (personalized)

- **User Experience**
  - Google OAuth / social login
  - Email notifications (booking confirmations, reminders)
  - Booking reminders (24h, 1h before session)
  - Reschedule/cancel flow
  - Session recordings & feedback downloads

**Phase 2 - Platform Features (6-12 months):**
- **AI Interview Feature** 🤖
  - Voice-based AI interviewer
  - Customizable (company, role, difficulty)
  - Instant feedback reports
  - Unlimited practice (24/7 availability)
  - Complements human mentors

- **Community Building**
  - Discussion forums / Q&A
  - Mentor leaderboards
  - Student success stories
  - Alumni network (connect by target company)
  - WhatsApp/Discord community groups

- **Mentor Platform**
  - Mentor dashboard (earnings, sessions, ratings)
  - Availability management (calendar sync)
  - Payout system automation
  - Mentor onboarding flow
  - Performance analytics for mentors

**Phase 3 - Expansion (12+ months):**
- **Enterprise/B2B**
  - College partnerships
  - Bulk booking for placement cells
  - White-label solutions

- **Advanced Analytics**
  - Student progress tracking
  - Interview performance metrics
  - Personalized improvement roadmaps
  - Success rate tracking (offers received)

- **Monetization Experiments**
  - Subscription bundles
  - Corporate mentor programs
  - Premium features (priority matching, unlimited AI)

---

### 🚫 OUT OF SCOPE (Not Building)

**We are NOT:**
- A course platform (we do practice, not teaching)
- Building for experienced professionals (focus: students & fresh grads)
- Offering placement guarantees (honest preparation, not false promises)
- A job board or recruiting platform
- Building video conferencing (use Google Meet/Zoom for now)
- Creating a learning management system (LMS)

---

### AI Interview Feature (Upcoming)

**What it is:**
- AI plays the role of a Senior Engineer interviewer
- Customized based on: role, company, resume, job description
- Practice anytime without booking a mentor

**Why it matters:**
- 24/7 availability
- Unlimited practice
- Consistent experience
- Complements human mentors (not replaces)

---

## Brand Voice

### Tone: Supportive Reality Check

**We are:**
- Empathetic but honest
- No fluff, straight to the point
- Like a senior who cares enough to tell you the truth
- Challenging assumptions without being harsh

**We say:**
- "We've all been there" ✓
- "Here's what actually works" ✓
- "Make your mistakes here, not there" ✓
- "The gap between knowing and doing" ✓

**We don't say:**
- "You're amazing!" ✗ (too fluffy)
- "Transform your career!" ✗ (too sales-y)
- "Best platform ever!" ✗ (too generic)

---

## Product Principles

1. **Practice > Preparation** - We optimize for doing, not just learning
2. **Affordable > Premium** - Accessible to everyone, not just privileged students
3. **Community > Transaction** - Building relationships, not just bookings
4. **Honest > Nice** - Real feedback helps more than sugar-coating
5. **India-First** - Built for Indian students and placements

---

## Success Metrics

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| **Sessions completed** | Growing | Core value delivery |
| **Return usage** | >30% book again | Product-market fit |
| **Mentor rating** | >4.5 avg | Quality of experience |
| **Conversion (visit→signup)** | >3% | Landing page effectiveness |
| **Student success rate** | Track | Ultimate outcome |

---

## Technical Context

| Aspect | Details |
|--------|---------|
| **Frontend** | Next.js, TypeScript, Tailwind |
| **Backend** | Node.js, Express |
| **Database** | PostgreSQL, Prisma ORM |
| **Auth** | [TBD - NextAuth?] |
| **Payments** | [TBD - Razorpay?] |
| **AI** | OpenAI API (for AI Interview) |
| **Deployment** | [TBD] |

---

## Design & Implementation References

> **For detailed implementation guidance, read these docs:**

| Document | Path | What It Contains |
|----------|------|------------------|
| **Design System** | `Client_UI/docs/DESIGN_SYSTEM.md` | Typography (Geist font), color tokens, spacing scale, component specs, animation presets |
| **Landing Page Plan** | `Client_UI/docs/LANDING_PAGE_REDESIGN_PLAN.md` | Messaging strategy, section-by-section copy, psychological framework, implementation phases |

### Design System Quick Reference

**Typography**: Geist font family (Sans + Mono)
- Display: 48-72px, tight tracking
- Body: 16-18px, relaxed line height
- Code: Geist Mono

**Core Colors**:
- Primary: Deep purple (`#6366f1` / Indigo-500)
- Secondary: Warm amber accents
- Neutrals: Slate scale for text/backgrounds

**Spacing**: 4px base unit (4, 8, 12, 16, 24, 32, 48, 64, 96)

**Animation**: Subtle, purposeful - 150-300ms durations

### Landing Page Messaging Framework

**Core Message**: "Preparation ≠ Practice. That's the gap."

**Psychological Hooks**:
1. Pattern interrupt - Challenge the "grind more" assumption
2. Empathy - "We've all been there"
3. Social proof - Recent grads from target companies
4. Low-risk entry - ₹49 launch price

**Key Sections** (in order):
1. Hero - Core message + CTA
2. Problem - The gap between knowing and doing
3. Solution - How PreTest works
4. Social Proof - Mentor companies + reviews
5. Pricing - Simple, affordable
6. FAQ - Common objections
7. Final CTA - Clear next step

---

## Key Pages/Flows

| Page | Purpose |
|------|---------|
| **Landing** | Convert visitors to signups |
| **Explore Mentors** | Browse and filter mentors |
| **Mentor Profile** | View mentor details, book session |
| **Booking Flow** | Select time, pay, confirm |
| **Dashboard** | Upcoming sessions, history |
| **AI Interview** | (Planned) Practice with AI |

---

## Open Questions

- [ ] Subscription pricing tiers?
- [ ] AI Interview pricing?
- [ ] Referral program details?
- [ ] Mentor onboarding process?

---

*Last updated: December 2024*
