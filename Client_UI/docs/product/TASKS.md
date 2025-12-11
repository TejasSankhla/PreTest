# Product Manager Tasks

> **Role:** Decision maker, product direction, sprint planning, unblocking team
> **Primary Focus:** Strategy, prioritization, approvals, documentation

---

## Task Overview by Priority

| Priority | Tasks | Total Hours |
|----------|-------|-------------|
| P0 | 1 task | 2-3h |
| P1 | 1 task | 4-6h |
| P2 | 1 task | 3-4h |
| P4 | 1 task | 2-3h |
| P5 | 1 task | 4-5h |
| **Total** | **5 tasks** | **16-21h** |

---

## P0 - Critical (Do First)

### 0.1 Platform Direction Document - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 2-3h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Define PreTest's vision, target audience, and strategic direction. This document guides all future decisions.

**Document Structure:**

```markdown
# PreTest Platform Vision

## 1. Mission Statement
What is PreTest's core purpose? (1-2 sentences)

## 2. Target Users

### Primary Persona: Interview Candidate
- Demographics (age, education level, career stage)
- Pain points
- Goals
- Current alternatives they use

### Secondary Persona: Mentor
- Demographics
- Motivations (money, impact, networking)
- Concerns

## 3. Value Proposition
- What problem does PreTest solve?
- Why is PreTest better than alternatives?
- What makes PreTest unique?

## 4. MVP Scope
### In Scope (Now)
- [List features]

### Out of Scope (Future)
- [List features to defer]

## 5. Competitive Landscape
| Competitor | Strengths | Weaknesses | Our Differentiation |
|------------|-----------|------------|---------------------|
| Pramp | | | |
| InterviewBit | | | |
| etc. | | | |

## 6. Community Vision
How will PreTest build community for empowering youth/freshers?
- Networking features
- Collaboration opportunities
- Peer connections

## 7. Revenue Model
- Current: Pay-per-session
- Future considerations

## 8. Success Metrics
- North star metric
- Leading indicators
- Lagging indicators
```

**Tasks:**
- [ ] Write Mission Statement
- [ ] Define primary user persona with details
- [ ] Define mentor persona
- [ ] Articulate unique value proposition
- [ ] Define MVP scope boundaries
- [ ] Research and document competitors
- [ ] Document community building strategy
- [ ] Define revenue model direction
- [ ] Establish success metrics

**Impact:**
- All feature decisions reference this document
- Team aligned on what PreTest is and isn't
- Prevents scope creep

**Deliverable:** `docs/product/PLATFORM_VISION.md`

---

## P1 - High Priority

### 4.1 AI Interview Feature - PRD - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 4 |
| **Hours** | 4-6h |
| **Dependencies** | 0.1 Platform Direction |
| **Collaboration** | UI/UX Designer (user flows) |
| **Status** | [ ] Not Started |

**Description:**
Create detailed Product Requirements Document for AI-powered mock interview feature.

**PRD Structure:**

```markdown
# AI Interview Feature PRD

## 1. Overview
- Problem statement
- Solution summary
- Success metrics

## 2. User Stories
- As a candidate, I want to...
- As a returning user, I want to...

## 3. Interview Types
- Behavioral interviews
- Technical interviews (DSA, System Design)
- Case interviews (PM, consulting)
- HR/Culture fit

## 4. User Flow
1. Select interview type
2. Configure (company, role, difficulty)
3. Start session
4. AI conducts interview
5. Receive feedback report

## 5. Feedback Report
- Overall score
- Category breakdowns
- Specific feedback
- Improvement suggestions
- Comparison to benchmarks

## 6. Technical Requirements
- LLM provider (OpenAI, Anthropic)
- Voice-based interface (MVP)
- Session recording
- Real-time processing

## 7. Integration with Mentors
- AI practice + human review?
- AI as warm-up before mentor session?

## 8. MVP Scope
### Phase 1 (MVP)
- [ ] Voice-based interview
- [ ] 2-3 interview types
- [ ] Basic feedback report

### Phase 2
- [ ] All interview types
- [ ] Advanced analytics
- [ ] Practice history

## 9. Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| AI quality | High | Extensive prompt engineering |
| Cost per session | Medium | Usage limits, caching |
| Voice API reliability | High | Fallback options |

## 10. Open Questions
- Voice API provider?
- Pricing model for AI sessions?
```

**Tasks:**
- [ ] Define core use cases
- [ ] Specify interview types
- [ ] Design feedback report format
- [ ] Plan voice interface
- [ ] Plan integration with mentor bookings
- [ ] Estimate technical complexity
- [ ] Define MVP vs full vision
- [ ] Work with UI/UX on user flows

**Deliverable:** `docs/product/PRD_AI_INTERVIEW.md`

---

## P2 - Medium Priority

### 4.3 Data Model Review - P2
| Attribute | Details |
|-----------|---------|
| **Sprint** | 4 |
| **Hours** | 3-4h |
| **Dependencies** | 4.1, 4.2 |
| **Collaboration** | Backend Developer |
| **Status** | [ ] Not Started |

**Description:**
Review data model for scalability with upcoming features.

**Review Areas:**
- [ ] Current schema adequacy
- [ ] AI interview session storage
- [ ] Subscription/billing data
- [ ] Review/ratings data
- [ ] Analytics events
- [ ] Community features data

**Deliverable:** `docs/product/DATA_MODEL.md` (with Backend)

---

## P4 - Nice to Have

### 4.5 Analytics & Tracking Plan - P4
| Attribute | Details |
|-----------|---------|
| **Sprint** | 4 |
| **Hours** | 2-3h |
| **Dependencies** | None |
| **Collaboration** | Frontend (implementation), UI/UX (funnel mapping) |
| **Status** | [ ] Not Started |

**Description:**
Define metrics and tracking plan for data-driven decisions.

**Document Structure:**
```markdown
# Analytics Plan

## North Star Metric
[Single metric that indicates success]

## Key Metrics
| Metric | Definition | Target |
|--------|------------|--------|
| Signup Rate | Visitors → Signups | X% |
| Booking Rate | Signups → First Booking | Y% |
| Completion Rate | Bookings → Completed | Z% |
| Repeat Rate | Users with 2+ bookings | A% |

## Conversion Funnel
Landing → Signup → Explore → View Profile → Book → Pay → Complete

## Events to Track
| Event | Properties | Trigger |
|-------|------------|---------|
| page_view | page, referrer | Every page |
| signup_started | method | Form open |
| signup_completed | method | Success |
| mentor_viewed | mentor_id | Profile open |
| booking_started | mentor_id, slot | Calendar click |
| payment_initiated | amount | Razorpay open |
| booking_completed | booking_id | Success |

## Tool Recommendation
- PostHog (product analytics + feature flags)
- Or: Mixpanel, Amplitude

## Implementation Priority
1. Core funnel events
2. Error tracking
3. Feature usage
```

**Deliverable:** `docs/product/ANALYTICS_PLAN.md`

---

## P5 - Future Consideration

### 4.2 Billing & Subscriptions Architecture - P5
| Attribute | Details |
|-----------|---------|
| **Sprint** | 4 |
| **Hours** | 4-5h |
| **Dependencies** | 0.1 Platform Direction |
| **Collaboration** | Backend Developer |
| **Status** | [ ] Not Started |

**Description:**
Define billing strategy and architecture for future monetization.

**Decision Points:**

**1. Revenue Model**
- [ ] Pay-per-session only (current)
- [ ] Subscription tiers
- [ ] Hybrid (subscription + per-session)
- [ ] Credits/packages

**2. If Subscription:**
| Tier | Price | Includes |
|------|-------|----------|
| Free | ₹0 | Limited AI practice |
| Pro | ₹X/mo | Unlimited AI + Y mentor sessions |
| Premium | ₹Y/mo | Everything + priority matching |

**3. Mentor Payouts**
- Commission model (X% to platform)
- Payout frequency (weekly, monthly)
- Minimum payout threshold

**4. Pricing Strategy**
- Student-friendly pricing
- India market pricing
- Introductory offers

**Deliverable:** `docs/product/BILLING_ARCHITECTURE.md`

---

## Manager Responsibilities Beyond Tasks

### Sprint Management
- [ ] Run sprint planning meetings
- [ ] Daily/weekly check-ins with team
- [ ] Unblock team members
- [ ] Prioritize incoming requests
- [ ] Manage scope changes

### Review & Approval
- [ ] Review UI/UX audit findings
- [ ] Approve design directions
- [ ] Review E2E test results
- [ ] Sign off on sprint deliverables

### Stakeholder Communication
- [ ] Update stakeholders on progress
- [ ] Gather feedback from early users
- [ ] Document decisions and rationale

---

## Sprint Schedule

| Sprint | Focus | Hours |
|--------|-------|-------|
| **Sprint 0** | Platform Direction Document | 2-3h |
| **Sprint 1-3** | Reviews, unblocking, decisions | Ongoing |
| **Sprint 4** | AI PRD, Data Model, Analytics, Billing | 13-18h |

---

## Decision Log Template

Use this to document key decisions:

```markdown
## Decision: [Title]
**Date:** YYYY-MM-DD
**Status:** Decided / Under Discussion

### Context
[Why is this decision needed?]

### Options Considered
1. Option A - [Pros/Cons]
2. Option B - [Pros/Cons]
3. Option C - [Pros/Cons]

### Decision
[What was decided]

### Rationale
[Why this option was chosen]

### Implications
[What this means for the team/product]
```

---

## Quick Links

- [Sprint Plan](../SPRINT_PLAN.md)
- [Frontend Tasks](../frontend/TASKS.md)
- [Backend Tasks](../backend/TASKS.md)
- [UI/UX Tasks](../ui-ux/TASKS.md)
