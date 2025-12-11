# PreTest Sprint Planning

> Last Updated: December 11, 2025

---

## Team Structure

| Role | Responsibility | Primary Focus |
|------|----------------|---------------|
| **Manager (You)** | Decision maker, product direction, sprint planning, blockers | Strategy, prioritization, approvals |
| **Frontend Dev** | React/Next.js implementation, component development, API integration | Building UI, state management, client-side logic |
| **Backend Dev** | NestJS APIs, database, authentication, payments, infrastructure | APIs, data layer, security, integrations |
| **UI/UX Designer** | User research, wireframes, visual design, prototypes, audits | Design specs, user flows, visual assets |

---

## Task Assignment by Priority

### Priority Legend
- **P0** = Critical, do immediately
- **P1** = High priority, do this sprint
- **P2** = Medium priority, next sprint
- **P3** = Lower priority, backlog
- **P4** = Nice to have
- **P5** = Future consideration

---

## Master Task List (Ordered by Priority)

### P0 - Critical (Do First)

| Task ID | Task | Owner | Dependencies | Sprint | Est. Hours |
|---------|------|-------|--------------|--------|------------|
| 0.1 | Platform Direction Document | **Manager** | None | 0 | 2-3h |
| 0.3 | End-to-End Flow Testing | **Frontend** + **Backend** | Backend running | 0 | 2-3h |
| 1.1 | Auth Logic Review & Security Fixes | **Backend** + **Frontend** | 0.3 E2E Testing | 1 | 4-5h |
| 1.2 | Landing Page Completion | **Frontend** | 0.4 Audit | 1 | 4-6h |
| 0.4 | Landing Page Content & Section Audit | **UI/UX** | None | 0 | 2h |
| 0.5 | Platform Logo Design | **UI/UX** | 0.1 Platform Direction | 0 | 3-4h |

### P1 - High Priority

| Task ID | Task | Owner | Dependencies | Sprint | Est. Hours |
|---------|------|-------|--------------|--------|------------|
| 0.2 | UI/UX Audit - Missing Flows & Screens | **UI/UX** | None | 0 | 3-4h |
| 2.1 | Mentor Card Redesign | **UI/UX** (design) + **Frontend** (build) | Design system | 2 | 4-5h |
| 2.5 | Empty States Design | **UI/UX** (design) + **Frontend** (build) | 0.2 UX Audit | 2 | 2-3h |
| 1.3 | Pagination - Explore Mentors Page | **Backend** (API) + **Frontend** (UI) | None | 1 | 2-3h |
| 3.3 | Mentor Filtering & Search | **Backend** (API) + **Frontend** (UI) | None | 3 | 4-5h |
| 4.1 | AI Interview Feature - PRD | **Manager** + **UI/UX** | 0.1 Platform Direction | 4 | 4-6h |
| 4.3 | Data Model Review for Scale | **Backend** + **Manager** | 4.1, 4.2 | 4 | 3-4h |

### P2 - Medium Priority

| Task ID | Task | Owner | Dependencies | Sprint | Est. Hours |
|---------|------|-------|--------------|--------|------------|
| 1.4 | Global Error States & Loading UI System | **UI/UX** (design) + **Frontend** (build) | 0.2 UX Audit | 1 | 4-5h |
| 1.5 | Mobile Responsiveness Audit & Fixes | **UI/UX** (audit) + **Frontend** (fixes) | 0.2 UX Audit | 1 | 3-4h |
| 2.2 | Scheduling Section Redesign | **UI/UX** (design) + **Frontend** (build) | None | 2 | 5-6h |
| 2.4 | User Profile Page Enhancement | **UI/UX** + **Frontend** + **Backend** | None | 2 | 3-4h |
| 3.1 | Google Sign-in Integration | **Backend** (OAuth) + **Frontend** (UI) | 1.1 Auth review | 3 | 5-6h |

### P3 - Lower Priority

| Task ID | Task | Owner | Dependencies | Sprint | Est. Hours |
|---------|------|-------|--------------|--------|------------|
| 2.3 | Bookings Page Redesign | **UI/UX** (design) + **Frontend** (build) | None | 2 | 4h |

### P4 - Nice to Have

| Task ID | Task | Owner | Dependencies | Sprint | Est. Hours |
|---------|------|-------|--------------|--------|------------|
| 4.5 | Analytics & Tracking Plan | **Manager** + **Frontend** | None | 4 | 2-3h |

### P5 - Future Consideration

| Task ID | Task | Owner | Dependencies | Sprint | Est. Hours |
|---------|------|-------|--------------|--------|------------|
| 3.2 | Email Notifications Setup | **Backend** | Email service setup | 3 | 5-6h |
| 4.2 | Billing & Subscriptions - Architecture | **Manager** + **Backend** | 0.1 Platform Direction | 4 | 4-5h |
| 4.4 | Mentor Onboarding Flow Design | **UI/UX** + **Manager** | Platform direction | 4 | 4-5h |

### P6 - Deferred

| Task ID | Task | Owner | Dependencies | Sprint | Est. Hours |
|---------|------|-------|--------------|--------|------------|
| 3.4 | Reviews & Ratings System | **Backend** (API) + **Frontend** (UI) + **UI/UX** | Sessions complete | 3 | 6-8h |
| 3.5 | Booking Reminders & Notifications | **Backend** | 3.2 Email setup | 3 | 3-4h |

---

## Individual Workstreams

### Manager (You)
**Focus:** Strategy, decisions, unblocking team, product direction

| Priority | Task | Sprint | Hours | Status |
|----------|------|--------|-------|--------|
| P0 | 0.1 Platform Direction Document | 0 | 2-3h | [ ] |
| P1 | 4.1 AI Interview Feature - PRD (voice-based) | 4 | 4-6h | [ ] |
| P2 | 4.3 Data Model Review (with Backend) | 4 | 3-4h | [ ] |
| P4 | 4.5 Analytics & Tracking Plan | 4 | 2-3h | [ ] |
| P5 | 4.2 Billing Architecture (with Backend) | 4 | 4-5h | [ ] |

**Total Estimated:** ~16-21 hours

**Blocking others:** 0.1 blocks many downstream tasks - do first!

---

### Frontend Developer
**Focus:** React/Next.js UI, components, client-side logic, API integration

| Priority | Task | Sprint | Hours | Dependencies | Status |
|----------|------|--------|-------|--------------|--------|
| P0 | 0.3 E2E Flow Testing (with Backend) | 0 | 1-2h | Backend running | [ ] |
| P0 | 1.2 Landing Page Completion | 1 | 4-6h | 0.4 Audit | [ ] |
| P1 | 2.1 Mentor Card Redesign (build) | 2 | 3-4h | UI/UX design | [ ] |
| P1 | 2.5 Empty States (build) | 2 | 1-2h | UI/UX design | [ ] |
| P2 | 1.4 Error States & Loading UI (build) | 1 | 3-4h | UI/UX design | [ ] |
| P2 | 1.1 Auth Logic Review (frontend) | 1 | 2-3h | 0.3 E2E | [ ] |
| P3 | 1.3 Pagination UI | 1 | 1-2h | Backend API | [ ] |
| P3 | 1.5 Mobile Fixes | 1 | 2-3h | UI/UX audit | [ ] |
| P3 | 2.2 Scheduling Section (build) | 2 | 4-5h | UI/UX design | [ ] |
| P3 | 2.4 User Profile (build) | 2 | 2-3h | UI/UX design | [ ] |
| P3 | 3.3 Search/Filter UI | 3 | 2-3h | Backend API | [ ] |
| P3 | 2.3 Bookings Page (build) | 2 | 3h | UI/UX design | [ ] |
| P4 | 3.1 Google Sign-in (frontend) | 3 | 2-3h | Backend OAuth | [ ] |
| P6 | 3.4 Reviews UI | 3 | 3-4h | Backend API | [ ] |

**Total Estimated:** ~34-47 hours across 4 sprints

**Sprint 0-1 Focus:** E2E testing, landing page, error states
**Sprint 2 Focus:** Mentor card, empty states, scheduling, profile

---

### Backend Developer
**Focus:** NestJS APIs, database, auth, payments, infrastructure

| Priority | Task | Sprint | Hours | Dependencies | Status |
|----------|------|--------|-------|--------------|--------|
| P0 | 0.3 E2E Flow Testing (with Frontend) | 0 | 1-2h | None | [ ] |
| P0 | 1.1 Auth Logic & Security Review | 1 | 3-4h | 0.3 E2E | [ ] |
| P1 | 1.3 Pagination API | 1 | 1-2h | None | [ ] |
| P1 | 3.3 Search/Filter API | 3 | 2-3h | None | [ ] |
| P1 | 4.3 Data Model Review (with Manager) | 4 | 2-3h | 4.1, 4.2 | [ ] |
| P2 | 3.1 Google OAuth Integration | 3 | 3-4h | 1.1 Auth | [ ] |
| P5 | 3.2 Email Notifications Setup | 3 | 5-6h | Email service | [ ] |
| P5 | 4.2 Billing Architecture (with Manager) | 4 | 3-4h | 0.1 Platform | [ ] |
| P6 | 3.4 Reviews API | 3 | 3-4h | None | [ ] |
| P6 | 3.5 Booking Reminders (cron jobs) | 3 | 3-4h | 3.2 Email | [ ] |

**Total Estimated:** ~26-36 hours across 4 sprints

**Sprint 0-1 Focus:** E2E testing, auth hardening, pagination API
**Sprint 3 Focus:** Search, OAuth integrations

---

### UI/UX Designer
**Focus:** User research, wireframes, visual design, prototypes, audits

| Priority | Task | Sprint | Hours | Dependencies | Status |
|----------|------|--------|-------|--------------|--------|
| P0 | 0.4 Landing Page Audit | 0 | 2h | None | [ ] |
| P1 | 0.2 UI/UX Audit - Missing Flows | 0 | 3-4h | None | [ ] |
| P1 | 2.1 Mentor Card Design | 2 | 2-3h | None | [ ] |
| P1 | 4.1 AI Interview PRD (user flows) | 4 | 2-3h | 0.1 Platform | [ ] |
| P2 | 1.4 Error States & Loading Design | 1 | 2-3h | 0.2 Audit | [ ] |
| P2 | 1.5 Mobile Responsiveness Audit | 1 | 2h | 0.2 Audit | [ ] |
| P2 | 2.2 Scheduling Section Design | 2 | 3-4h | None | [ ] |
| P2 | 2.4 User Profile Design | 2 | 2h | None | [ ] |
| P3 | 2.3 Bookings Page Design | 2 | 2h | None | [ ] |
| P4 | 2.5 Empty States Design | 2 | 1-2h | 0.2 Audit | [ ] |
| P4 | 3.4 Reviews UI Design | 3 | 2h | None | [ ] |
| P5 | 4.4 Mentor Onboarding Flow | 4 | 4-5h | Platform direction | [ ] |

**Total Estimated:** ~28-37 hours across 4 sprints

**Sprint 0 Focus:** Audits (landing page, UX flows)
**Sprint 1 Focus:** Error states design, mobile audit
**Sprint 2 Focus:** Component designs (cards, scheduling, profile)

---

## Sprint-by-Sprint Execution Plan

### Sprint 0: Discovery (Week 1)

| Day | Manager | Frontend | Backend | UI/UX |
|-----|---------|----------|---------|-------|
| 1-2 | Platform Direction Doc | - | - | Landing Page Audit |
| 2-3 | Review audits | E2E Testing | E2E Testing | UI/UX Audit |
| 4-5 | Finalize docs, plan Sprint 1 | Document findings | Document findings | Complete audit report |

**Sprint 0 Deliverables:**
- [ ] `docs/PLATFORM_VISION.md` (Manager)
- [ ] `docs/UX_AUDIT.md` (UI/UX)
- [ ] Landing page checklist (UI/UX)
- [ ] E2E test results (Frontend + Backend)

---

### Sprint 1: Core Polish (Week 2-3)

| Task | Owner | Dependency |
|------|-------|------------|
| Error States Design | UI/UX | Start immediately |
| Error States Build | Frontend | After UI/UX design |
| Auth Review | Backend + Frontend | After E2E results |
| Landing Page Completion | Frontend | After 0.4 audit |
| Pagination API | Backend | None |
| Pagination UI | Frontend | After Backend API |
| Mobile Audit | UI/UX | After 0.2 |
| Mobile Fixes | Frontend | After UI/UX audit |

**Sprint 1 Deliverables:**
- [ ] Global Spinner, Skeleton, Error components
- [ ] 404, 500, error pages
- [ ] Complete landing page
- [ ] Paginated explore mentors
- [ ] Auth security improvements
- [ ] Mobile-responsive fixes

---

### Sprint 2: Experience Enhancement (Week 4-5)

| Task | Owner | Dependency |
|------|-------|------------|
| Mentor Card Design | UI/UX | None - start immediately |
| Mentor Card Build | Frontend | After UI/UX design |
| Scheduling Design | UI/UX | Can parallel with card |
| Scheduling Build | Frontend | After UI/UX design |
| Bookings Page Design | UI/UX | Lower priority |
| Bookings Page Build | Frontend | After design |
| User Profile Design | UI/UX | Can parallel |
| User Profile Build | Frontend + Backend | After design |
| Empty States Design | UI/UX | Lower priority |
| Empty States Build | Frontend | After design |

**Sprint 2 Deliverables:**
- [ ] New MentorCard component
- [ ] Redesigned scheduling section
- [ ] Redesigned bookings page
- [ ] Enhanced user profile
- [ ] Empty state components

---

### Sprint 3: Growth Features (Week 6-7)

| Task | Owner | Dependency |
|------|-------|------------|
| Email Service Setup | Backend | None |
| Email Templates | Backend | After setup |
| Search/Filter API | Backend | None |
| Search/Filter UI | Frontend | After API |
| Google OAuth Backend | Backend | After 1.1 auth |
| Google Sign-in Frontend | Frontend | After OAuth |
| Reviews API | Backend | Lower priority |
| Reviews UI | Frontend + UI/UX | After API |
| Booking Reminders | Backend | After email setup |

**Sprint 3 Deliverables:**
- [ ] Transactional emails working
- [ ] Mentor search and filtering
- [ ] Google Sign-in
- [ ] Reviews system (if time)
- [ ] Booking reminders

---

### Sprint 4: Platform Evolution (Week 8+)

| Task | Owner | Dependency |
|------|-------|------------|
| AI Interview PRD | Manager + UI/UX | 0.1 Platform |
| Billing Architecture | Manager + Backend | 0.1 Platform |
| Data Model Review | Backend + Manager | 4.1, 4.2 |
| Analytics Plan | Manager + Frontend | None |
| Mentor Onboarding Design | UI/UX | Lower priority |

**Sprint 4 Deliverables:**
- [ ] `docs/PRD_AI_INTERVIEW.md`
- [ ] `docs/BILLING_ARCHITECTURE.md`
- [ ] `docs/DATA_MODEL.md`
- [ ] `docs/ANALYTICS_PLAN.md`

---

## Platform Overview

**PreTest** - A mentorship platform connecting students/interview candidates with experienced or peer mentors for mock interviews and career guidance.

### Core User Journey
```
Discover → Explore Mentors → View Profile → Book Session → Pay → Attend → Improve

Also build a community for empowering youth/fresher towards networking and great collaborations.

```

---

## Current State Assessment

### Built Features
| Feature | Status | Notes |
|---------|--------|-------|
| Landing Page | 80% | V2 design implemented, needs audit |
| Explore Mentors | 70% | Basic list view, no pagination |
| Mentor Profile | 70% | Booking flow works, UI needs polish |
| Booking System | 80% | Razorpay integrated, basic flow works |
| Auth (Email) | 70% | Sign up/login works, needs review |
| My Bookings | 60% | Basic table view |
| User Profile | 50% | Minimal implementation |

### Technical Debt
- [x] Design system standardization (Button, Container atoms)
- [x] API routes centralization
- [ ] Type safety improvements
- [ ] Error handling standardization
- [ ] Loading states consistency -> Yeah need to design gloabl loader and innovative ideas here
+ Error pages/components

---

## Sprint Roadmap

---

### Sprint 0: Discovery & Validation -P0
**Duration:** 1 week
**Goal:** Validate foundation before building more features

---

#### 0.1 Platform Direction Document
| Attribute | Details |
|-----------|---------|
| **Priority** | P0 - Critical |
| **Effort** | 2-3 hours |
| **Prerequisites** | None |
| **Status** | [ ] Not Started |

**Description:**
Create a comprehensive document defining PreTest's vision, target audience, and strategic direction. This prevents building features that don't align with the core value proposition.

**Tasks:**
- [ ] Define primary user persona (student/fresher preparing for interviews)
- [ ] Define secondary persona (peer mentors, experienced professionals)
- [ ] Articulate core value proposition and differentiators
- [ ] Define MVP scope vs future vision
- [ ] Identify key competitors and positioning
- [ ] Document community-building strategy

**Impact:**
- All future feature decisions will reference this document
- Prevents scope creep and misaligned development
- Aligns team on what PreTest is and isn't

**Deliverable:** `docs/PLATFORM_VISION.md`

---

#### 0.2 UI/UX Audit - Missing Flows & Screens- P1
| Attribute | Details |
|-----------|---------|
| **Priority** | P0 - Critical |
| **Effort** | 3-4 hours |
| **Prerequisites** | None |
| **Status** | [ ] Not Started |

**Description:**
Systematically review the entire application to identify missing screens, incomplete flows, error states, and UX gaps that would confuse or block users.

**Tasks:**
- [ ] Map complete user journey from landing to booking completion
- [ ] Identify missing pages (404, 500, unauthorized, etc.)
- [ ] Document missing loading states for each async operation
- [ ] Document missing empty states (no mentors, no bookings, etc.)
- [ ] Identify missing confirmation/success screens
- [ ] Review mobile responsiveness gaps
- [ ] Check accessibility issues (a11y)
- [ ] Document unclear navigation or dead ends

**Impact:**
- Reveals critical gaps before users encounter them
- Prioritizes what actually needs building
- Improves user trust and completion rates

**Deliverable:** `docs/UX_AUDIT.md` with prioritized findings

---

#### 0.3 End-to-End Flow Testing - P1
| Attribute | Details |
|-----------|---------|
| **Priority** | P0 - Critical |
| **Effort** | 2-3 hours |
| **Prerequisites** | Backend running, Razorpay test mode |
| **Status** | [ ] Not Started |

**Description:**
Manually test the complete booking flow from a new user's perspective to verify the core product actually works end-to-end.

**Tasks:**
- [ ] Test: New user sign-up flow
- [ ] Test: User login flow (valid/invalid credentials)
- [ ] Test: Browse mentors page loads correctly
- [ ] Test: Mentor profile page displays all info
- [ ] Test: Slot selection and date picking
- [ ] Test: Razorpay payment flow (test mode)
- [ ] Test: Booking confirmation and redirect
- [ ] Test: My Bookings page shows new booking
- [ ] Test: Logout and session handling
- [ ] Document any bugs or friction points

**Impact:**
- Confirms core revenue flow works
- Catches critical bugs before real users do
- Baseline for future regression testing

**Deliverable:** E2E test results documented with screenshots/recordings

---

#### 0.4 Landing Page Content & Section Audit - P0
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 2 hours |
| **Prerequisites** | 0.1 Platform Direction (helpful but not blocking) |
| **Status** | [ ] Not Started |

**Description:**
Audit the landing page against standard SaaS/platform landing page best practices to identify missing sections and content gaps.

**Tasks:**
- [ ] Hero section - Clear value prop? Strong CTA?
- [ ] Social proof - Testimonials, logos, numbers?
- [ ] How it works - Clear 3-4 step process?
- [ ] Features/Benefits - What do users get?
- [ ] Mentor showcase - Preview of quality mentors?
- [ ] Pricing clarity - Is cost clear?
- [ ] FAQ section - Common questions answered?
- [ ] Trust signals - Security, payment safety?
- [ ] Footer - All necessary links present?
- [ ] CTA repetition - Multiple conversion points?

**Impact:**
- Improves conversion rate from visitor to sign-up
- Reduces bounce rate
- Builds trust with first-time visitors

**Deliverable:** Landing page checklist with gaps identified

---

### Sprint 1: Core Polish
**Duration:** 1-2 weeks
**Goal:** Solid, trustworthy foundation for core user flows

---

#### 1.1 Auth Logic Review & Security Fixes - P2
| Attribute | Details |
|-----------|---------|
| **Priority** | P0 - Critical |
| **Effort** | 4-5 hours |
| **Prerequisites** | 0.3 E2E Testing (identifies auth bugs) |
| **Status** | [ ] Not Started |

**Description:**
Review and harden the authentication system. Auth is the gateway to everything - if it's broken or insecure, nothing else matters.

**Tasks:**
- [ ] Audit current JWT implementation and token storage
- [ ] Review token expiration and refresh logic
- [ ] Add proper error messages for all auth failure cases
- [ ] Implement "Remember me" functionality correctly
- [ ] Add password strength validation on sign-up
- [ ] Review protected route handling (unauthorized redirects)
- [ ] Add rate limiting considerations (document for backend)
- [ ] Test edge cases: expired token, invalid token, missing token
- [ ] Implement proper logout (clear all auth state)
- [ ] Add loading states during auth operations

**Impact:**
- Security: Prevents unauthorized access
- UX: Clear feedback on auth errors
- Trust: Users feel safe with their data

**Deliverable:** Hardened auth system with documented security measures

---

#### 1.2 Landing Page Completion - P1
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 4-6 hours |
| **Prerequisites** | 0.4 Landing Page Audit |
| **Status** | [ ] Not Started |

**Description:**
Complete all missing sections identified in the landing page audit. The landing page is the first impression and primary conversion driver.

**Tasks:**
- [ ] Add/improve FAQ section with real user questions
- [ ] Add testimonials section (can use placeholders initially)
- [ ] Add "How it Works" section with clear steps
- [ ] Ensure mobile responsiveness for all sections
- [ ] Add trust badges/signals near CTAs
- [ ] Optimize hero section copy for clarity
- [ ] Add secondary CTAs throughout the page
- [ ] Ensure consistent design system usage

**Impact:**
- Higher conversion rate from visitors
- Better SEO with complete content
- Professional first impression

**Deliverable:** Complete landing page with all standard sections

---

#### 1.3 Pagination - Explore Mentors Page - P2
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 2-3 hours |
| **Prerequisites** | Backend pagination endpoint (or implement frontend pagination) |
| **Status** | [ ] Not Started |

**Description:**
Add pagination to the mentor listing page to handle growing mentor database and improve page performance.

**Tasks:**
- [ ] Decide: Server-side vs client-side pagination
- [ ] Add pagination UI component (page numbers or infinite scroll)
- [ ] Handle loading state during page transitions
- [ ] Maintain scroll position appropriately
- [ ] Add "X mentors found" count display
- [ ] Handle empty results gracefully
- [ ] Update API route if server-side pagination

**Impact:**
- Performance: Faster initial page load
- Scalability: Handles 100s of mentors
- UX: Users can browse without overwhelming scroll

**Deliverable:** Paginated mentor listing with smooth UX

---

#### 1.4 Global Error States & Loading UI System - P0
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 4-5 hours |
| **Prerequisites** | 0.2 UX Audit (identifies where these are needed) |
| **Status** | [ ] Not Started |

**Description:**
Create a consistent system for loading states and error handling across the entire application. Currently, each page handles these differently (or not at all).

**Tasks:**
- [ ] Design and build global loading spinner component
- [ ] Design and build skeleton loaders for key pages
- [ ] Create error boundary component for React errors
- [ ] Design error page templates (404, 500, offline)
- [ ] Create inline error message component
- [ ] Create toast notification system for transient errors
- [ ] Add loading states to all API calls
- [ ] Add error handling to all API calls
- [ ] Document usage patterns in design system

**Impact:**
- UX: Users always know what's happening
- Trust: Graceful error handling feels professional
- Debug: Easier to identify issues in production

**Deliverable:**
- `components/atoms/Spinner/`
- `components/atoms/Skeleton/`
- `components/molecules/ErrorBoundary/`
- `app/not-found.tsx`, `app/error.tsx`

---

#### 1.5 Mobile Responsiveness Audit & Fixes - P2
| Attribute | Details |
|-----------|---------|
| **Priority** | P2 - Medium |
| **Effort** | 3-4 hours |
| **Prerequisites** | 0.2 UX Audit |
| **Status** | [ ] Not Started |

**Description:**
Systematically test and fix mobile responsiveness issues. Many users will access PreTest from mobile devices.

**Tasks:**
- [ ] Test all pages on mobile viewport (375px, 390px)
- [ ] Test all pages on tablet viewport (768px)
- [ ] Fix navbar mobile menu issues
- [ ] Fix landing page responsive issues
- [ ] Fix mentor card layout on mobile
- [ ] Fix booking calendar on mobile
- [ ] Fix forms on mobile (input sizes, buttons)
- [ ] Test touch interactions (tap targets, swipe)

**Impact:**
- Reach: Don't lose mobile users
- SEO: Mobile-friendliness is a ranking factor
- UX: Consistent experience across devices

**Deliverable:** Mobile-responsive application across all viewports

---

### Sprint 2: Experience Enhancement
**Duration:** 1-2 weeks
**Goal:** Polish key user touchpoints for conversion and retention 

---

#### 2.1 Mentor Card Redesign - P1
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 4-5 hours |
| **Prerequisites** | Design system atoms complete |
| **Status** | [ ] Not Started |

**Description:**
Redesign the mentor card component to better showcase mentors and encourage clicks. The card is the primary discovery mechanism.

**Tasks:**
- [ ] Research: Look at competitor mentor/tutor cards
- [ ] Design: New card layout with better hierarchy
- [ ] Include: Profile photo, name, title/college
- [ ] Include: Key stats (experience, sessions, rating)
- [ ] Include: Expertise tags/skills
- [ ] Include: Price and availability indicator
- [ ] Include: Clear CTA button
- [ ] Build: Responsive card component
- [ ] Build: Card hover/interaction states
- [ ] Add: Skeleton loader for card

**Impact:**
- Conversion: Better cards = more profile clicks
- Trust: Professional presentation builds credibility
- Discovery: Users can quickly scan and compare

**Deliverable:** `components/molecules/MentorCard/`

---

#### 2.2 Scheduling Section Redesign - P2
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 5-6 hours |
| **Prerequisites** | 2.1 or can be parallel |
| **Status** | [ ] Not Started |

**Description:**
Redesign the booking/scheduling UI on the mentor profile page. Current carousel is functional but not intuitive.

**Tasks:**
- [ ] Research: Calendar/booking UI patterns
- [ ] Design: Clearer date selection (calendar view vs carousel)
- [ ] Design: Time slot grid with better visual hierarchy
- [ ] Show: Timezone awareness and display
- [ ] Show: Price clearly before booking
- [ ] Add: Selected slot summary before payment
- [ ] Handle: No available slots state
- [ ] Handle: Past dates disabled
- [ ] Add: Loading state during availability fetch
- [ ] Mobile: Ensure touch-friendly on mobile

**Impact:**
- Conversion: Clearer booking = higher completion
- Trust: Professional scheduling builds confidence
- UX: Reduced confusion and support requests

**Deliverable:** Redesigned scheduling section in mentor profile

---

#### 2.3 Bookings Page Redesign - P3
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 4 hours |
| **Prerequisites** | None |
| **Status** | [ ] Not Started |

**Description:**
Redesign the My Bookings page from a basic table to a more user-friendly interface with better information hierarchy.

**Tasks:**
- [ ] Design: Card-based layout vs table
- [ ] Show: Upcoming vs past bookings clearly
- [ ] Show: Mentor info with photo
- [ ] Show: Date/time prominently
- [ ] Show: Session status (upcoming, completed, cancelled)
- [ ] Add: Quick actions (join meeting, reschedule, cancel)
- [ ] Add: Empty state for no bookings
- [ ] Add: Loading skeleton
- [ ] Mobile: Stack cards on mobile

**Impact:**
- UX: Users can manage bookings easily
- Engagement: Clear next steps increase session attendance
- Support: Reduces "where's my booking" questions

**Deliverable:** Redesigned bookings page with card layout

---

#### 2.4 User Profile Page Enhancement - P2
| Attribute | Details |
|-----------|---------|
| **Priority** | P2 - Medium |
| **Effort** | 3-4 hours |
| **Prerequisites** | None |
| **Status** | [ ] Not Started |

**Description:**
Enhance the user profile page with more functionality and better design.

**Tasks:**
- [ ] Design: Profile header with avatar and info
- [ ] Add: Edit profile functionality
- [ ] Add: Change password option
- [ ] Show: Booking history/stats
- [ ] Show: Account settings
- [ ] Add: Notification preferences (future)
- [ ] Add: Profile photo upload
- [ ] Handle: Loading and error states

**Impact:**
- Engagement: Users invest in their profile
- Trust: Complete profiles feel more legitimate
- Features: Foundation for future personalization

**Deliverable:** Enhanced user profile page

---

#### 2.5 Empty States Design - P4
| Attribute | Details |
|-----------|---------|
| **Priority** | P2 - Medium |
| **Effort** | 2-3 hours |
| **Prerequisites** | 0.2 UX Audit identifies all empty states |
| **Status** | [ ] Not Started |

**Description:**
Design and implement helpful empty states throughout the application instead of blank pages or generic "No data" messages.

**Tasks:**
- [ ] Empty state: No mentors found (with search suggestions)
- [ ] Empty state: No bookings yet (with CTA to explore)
- [ ] Empty state: No upcoming sessions (encourage booking)
- [ ] Empty state: Search no results
- [ ] Create: Reusable EmptyState component
- [ ] Include: Illustration + message + CTA pattern

**Impact:**
- UX: Users never feel lost or stuck
- Conversion: Empty states guide to next action
- Polish: Professional attention to detail

**Deliverable:** `components/molecules/EmptyState/` + implementations

---

### Sprint 3: Growth Features 
**Duration:** 2 weeks
**Goal:** Reduce friction, expand capabilities, enable growth

---

#### 3.1 Google Sign-in Integration - P3
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 5-6 hours |
| **Prerequisites** | 1.1 Auth review complete, Google OAuth credentials |
| **Status** | [ ] Not Started |

**Description:**
Add Google Sign-in to reduce friction in the registration/login process. Social auth significantly improves conversion.

**Tasks:**
- [ ] Setup: Google Cloud Console OAuth credentials
- [ ] Backend: Google OAuth callback endpoint (coordinate with backend)
- [ ] Frontend: Add Google sign-in button to login page
- [ ] Frontend: Add Google sign-in button to signup page
- [ ] Handle: Account linking (existing email + Google)
- [ ] Handle: Error states (popup blocked, cancelled)
- [ ] UI: Follow Google branding guidelines
- [ ] Test: Full flow on web and mobile browsers

**Impact:**
- Conversion: 20-40% of users prefer social login
- Trust: Google auth feels secure
- UX: One-click signup vs form filling

**Deliverable:** Working Google Sign-in on auth pages

---

#### 3.2 Email Notifications Setup - P2
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 5-6 hours |
| **Prerequisites** | Email service (SendGrid/Resend), Backend integration |
| **Status** | [ ] Not Started |

**Description:**
Implement transactional email notifications for key user actions. Email is critical for booking confirmations and reminders.

**Tasks:**
- [ ] Setup: Email service provider (Resend recommended)
- [ ] Template: Welcome email on signup
- [ ] Template: Booking confirmation email
- [ ] Template: Booking reminder (24h before)
- [ ] Template: Session completed / feedback request
- [ ] Template: Password reset email
- [ ] Backend: Trigger emails on appropriate events
- [ ] Test: Email delivery and formatting

**Impact:**
- Engagement: Users don't forget their sessions
- Trust: Confirmation emails feel professional
- Retention: Re-engagement through email

**Deliverable:** Transactional email system with key templates

---

#### 3.3 Mentor Filtering & Search - P2
| Attribute | Details |
|-----------|---------|
| **Priority** | P2 - Medium |
| **Effort** | 4-5 hours |
| **Prerequisites** | Backend filter/search endpoints |
| **Status** | [ ] Not Started |

**Description:**
Add filtering and search capabilities to the mentor exploration page for better discovery.

**Tasks:**
- [ ] Add: Search by name/keyword
- [ ] Add: Filter by expertise/skills
- [ ] Add: Filter by price range
- [ ] Add: Filter by availability (has slots this week)
- [ ] Add: Sort options (rating, price, newest)
- [ ] UI: Filter sidebar or dropdown panel
- [ ] UX: Clear filters option
- [ ] Handle: No results state

**Impact:**
- Discovery: Users find relevant mentors faster
- Conversion: Better matches = higher booking rate
- Scale: Essential as mentor count grows

**Deliverable:** Search and filter UI on explore page

---

#### 3.4 Reviews & Ratings System - P4
| Attribute | Details |
|-----------|---------|
| **Priority** | P2 - Medium |
| **Effort** | 6-8 hours |
| **Prerequisites** | Backend review endpoints, completed session tracking |
| **Status** | [ ] Not Started |

**Description:**
Implement a reviews and ratings system for mentors to build social proof and trust.

**Tasks:**
- [ ] Design: Star rating component
- [ ] Design: Review card component
- [ ] Add: Review submission form (post-session)
- [ ] Display: Average rating on mentor card
- [ ] Display: Reviews on mentor profile page
- [ ] Handle: No reviews state
- [ ] Backend: Review CRUD endpoints
- [ ] Moderation: Flag inappropriate reviews (future)

**Impact:**
- Trust: Social proof increases conversion
- Quality: Incentivizes mentors to perform well
- Discovery: Ratings help users choose

**Deliverable:** Review system on mentor profiles

---

#### 3.5 Booking Reminders & Notifications - P4
| Attribute | Details |
|-----------|---------|
| **Priority** | P2 - Medium |
| **Effort** | 3-4 hours |
| **Prerequisites** | 3.2 Email setup |
| **Status** | [ ] Not Started |

**Description:**
Implement booking reminder system to reduce no-shows and improve session attendance.

**Tasks:**
- [ ] Email: 24-hour reminder before session
- [ ] Email: 1-hour reminder before session
- [ ] In-app: Show upcoming session banner
- [ ] Consider: Browser push notifications (future)
- [ ] Backend: Scheduled job for reminders

**Impact:**
- Attendance: Reduces no-show rate significantly
- UX: Users appreciate reminders
- Revenue: More completed sessions

**Deliverable:** Automated reminder system

---

### Sprint 4: Platform Evolution (Planning) - P4
**Duration:** Planning phase
**Goal:** Define architecture and specs for major upcoming features

---

#### 4.1 AI Interview Feature - PRD - P1
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 4-6 hours |
| **Prerequisites** | 0.1 Platform Direction |
| **Status** | [ ] Not Started |

**Description:**
Create a detailed Product Requirements Document for the AI-powered mock interview feature.

**Tasks:**
- [ ] Define: Core use cases and user stories
- [ ] Define: Interview types (behavioral, technical, case)
- [ ] Design: User flow from start to feedback
- [ ] Specify: AI/LLM requirements and capabilities
- [ ] Specify: Feedback report format
- [ ] Consider: Voice vs text interface
- [ ] Consider: Integration with mentor bookings
- [ ] Estimate: Technical complexity and dependencies
- [ ] Identify: MVP scope vs full vision

**Impact:**
- Direction: Clear spec prevents building wrong thing
- Estimation: Better planning for development
- Alignment: Team agrees on what we're building

**Deliverable:** `docs/PRD_AI_INTERVIEW.md`

---

#### 4.2 Billing & Subscriptions - Architecture - P2
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 4-5 hours |
| **Prerequisites** | 0.1 Platform Direction, Revenue model decisions |
| **Status** | [ ] Not Started |

**Description:**
Design the billing architecture for subscriptions, packages, or pay-per-session models.

**Tasks:**
- [ ] Decide: Revenue model (subscription vs per-session vs hybrid)
- [ ] Design: Pricing tiers if subscription
- [ ] Design: Database schema for billing
- [ ] Choose: Payment provider (Razorpay subscriptions, Stripe)
- [ ] Plan: Mentor payout system
- [ ] Consider: Refund and cancellation policies
- [ ] Consider: Free tier or trial
- [ ] Document: API endpoints needed

**Impact:**
- Revenue: Clear path to monetization
- Scale: Proper billing architecture from start
- Trust: Professional payment handling

**Deliverable:** `docs/BILLING_ARCHITECTURE.md`

---

#### 4.3 Data Model Review for Scale - P2
| Attribute | Details |
|-----------|---------|
| **Priority** | P1 - High |
| **Effort** | 3-4 hours |
| **Prerequisites** | 4.1 and 4.2 to understand future needs |
| **Status** | [ ] Not Started |

**Description:**
Review and plan database schema changes needed to support upcoming features and scale.

**Tasks:**
- [ ] Audit: Current data model
- [ ] Identify: Missing entities (reviews, subscriptions, AI sessions)
- [ ] Plan: Schema migrations needed
- [ ] Consider: Indexing for performance
- [ ] Consider: Data relationships and integrity
- [ ] Document: Recommended changes

**Impact:**
- Scale: Database ready for growth
- Performance: Proper indexing prevents slowdowns
- Features: Schema supports upcoming features

**Deliverable:** `docs/DATA_MODEL.md` with migration plan

---

#### 4.4 Mentor Onboarding Flow Design - P5
| Attribute | Details |
|-----------|---------|
| **Priority** | P2 - Medium |
| **Effort** | 4-5 hours |
| **Prerequisites** | Platform direction |
| **Status** | [ ] Not Started |

**Description:**
Design the mentor-side experience for onboarding new mentors to the platform.

**Tasks:**
- [ ] Design: Mentor registration flow
- [ ] Design: Profile setup wizard
- [ ] Design: Availability management UI
- [ ] Design: Mentor dashboard
- [ ] Design: Earnings/payout view
- [ ] Consider: Verification process
- [ ] Consider: Quality guidelines

**Impact:**
- Supply: Easier to onboard mentors
- Quality: Better mentor profiles
- Scale: Self-service mentor onboarding

**Deliverable:** Mentor flow wireframes/specs

---

#### 4.5 Analytics & Tracking Plan - P4
| Attribute | Details |
|-----------|---------|
| **Priority** | P2 - Medium |
| **Effort** | 2-3 hours |
| **Prerequisites** | None |
| **Status** | [ ] Not Started |

**Description:**
Define what metrics to track and implement analytics for data-driven decisions.

**Tasks:**
- [ ] Define: Key metrics (signups, bookings, completion rate)
- [ ] Define: Funnel stages to track
- [ ] Choose: Analytics tool (PostHog, Mixpanel, GA4)
- [ ] Plan: Event tracking implementation
- [ ] Document: Tracking plan spreadsheet

**Impact:**
- Decisions: Data-driven product decisions
- Growth: Identify drop-off points
- Optimization: Measure improvement efforts

**Deliverable:** `docs/ANALYTICS_PLAN.md`

---

## Backlog

### High Priority (Unscheduled)
- [ ] Session video call integration
- [ ] Mentor availability management
- [ ] Booking cancellation/reschedule
- [ ] Payment refund handling
- [ ] Mentor payout system

### Medium Priority
- [ ] Blog/Resources section
- [ ] Testimonials management
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Accessibility audit

### Low Priority / Nice to Have
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Mentor mobile app

---

## Success Metrics

### Sprint 0
- [ ] Clear platform direction documented
- [ ] All UX gaps identified
- [ ] E2E booking flow works 100%

### Sprint 1
- [ ] Auth error rate < 1%
- [ ] Landing page bounce rate baseline established
- [ ] Page load time < 3s

### Sprint 2
- [ ] Booking completion rate tracked
- [ ] User feedback on new designs

### Sprint 3
- [ ] Social sign-in adoption rate
- [ ] Email open rates

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2024-12-11 | Sprint 0 first | Need direction before building features |
| 2024-12-11 | Atomic design system | Consistency, reusability |
| 2024-12-11 | Centralized API routes | Type safety, maintainability |

---

## Notes

### Current Sprint: Sprint 0

**Focus Areas:**
1. Platform direction clarity
2. UX gap analysis
3. E2E validation

**Blocked:**
- None currently

**Risks:**
- Building features without clear direction
- Missing critical user flows
- Technical debt accumulation

---

## Quick Links

- [Design System](./DESIGN_SYSTEM.md)
- [API Routes](/lib/api/routes.ts)
- [Component Library](/components/atoms/)
