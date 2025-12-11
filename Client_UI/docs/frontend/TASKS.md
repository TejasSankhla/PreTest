# Frontend Developer Tasks

> **Role:** React/Next.js implementation, component development, API integration
> **Primary Focus:** Building UI, state management, client-side logic

---

## Task Overview by Priority

| Priority | Tasks | Total Hours |
|----------|-------|-------------|
| P0 | 2 tasks | 5-8h |
| P1 | 2 tasks | 4-6h |
| P2 | 2 tasks | 5-7h |
| P3 | 6 tasks | 15-21h |
| P4 | 1 task | 2-3h |
| P6 | 1 task | 3-4h |
| **Total** | **14 tasks** | **34-49h** |

---

## P0 - Critical (Do First)

### 0.3 E2E Flow Testing (with Backend) - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 1-2h |
| **Dependencies** | Backend running |
| **Status** | [ ] Not Started |

**Description:**
Test the complete user flow from signup to booking completion.

**Tasks:**
- [ ] Test new user sign-up flow
- [ ] Test user login (valid/invalid credentials)
- [ ] Test explore mentors page loads
- [ ] Test mentor profile page displays all info
- [ ] Test slot selection and date picking
- [ ] Test Razorpay payment flow (test mode)
- [ ] Test booking confirmation redirect
- [ ] Test My Bookings page shows new booking
- [ ] Test logout and session handling
- [ ] Document bugs with screenshots

**Deliverable:** E2E test report with screenshots

---

### 1.2 Landing Page Completion - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 4-6h |
| **Dependencies** | 0.4 Landing Page Audit from UI/UX |
| **Status** | [ ] Not Started |

**Description:**
Implement all missing sections identified in the landing page audit.

**Tasks:**
- [ ] Add/improve FAQ section
- [ ] Add testimonials section
- [ ] Ensure "How it Works" section is clear
- [ ] Add trust badges near CTAs
- [ ] Optimize hero section copy
- [ ] Add secondary CTAs throughout
- [ ] Ensure design system consistency
- [ ] Mobile responsiveness for all sections

**Files to Modify:**
- `app/page.tsx`
- `components/landing/` sections

---

## P1 - High Priority

### 2.1 Mentor Card Redesign (Build) - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 3-4h |
| **Dependencies** | UI/UX design specs |
| **Status** | [ ] Not Started |

**Description:**
Build the redesigned mentor card component.

**Tasks:**
- [ ] Create new `MentorCard` component from design
- [ ] Include: photo, name, title/college
- [ ] Include: stats (experience, sessions, rating)
- [ ] Include: expertise tags
- [ ] Include: price + availability indicator
- [ ] Include: CTA button
- [ ] Build hover/interaction states
- [ ] Build skeleton loader for card
- [ ] Ensure responsive on mobile

**Files to Create:**
```
components/
  molecules/
    MentorCard/
      MentorCard.tsx
      MentorCardSkeleton.tsx
      index.ts
```

---

### 2.5 Empty States (Build) - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 1-2h |
| **Dependencies** | UI/UX designs |
| **Status** | [ ] Not Started |

**Tasks:**
- [ ] Build reusable `EmptyState` component
- [ ] Empty state: No mentors found
- [ ] Empty state: No bookings yet
- [ ] Empty state: Search no results

**Files to Create:**
```
components/
  molecules/
    EmptyState/
      EmptyState.tsx
      index.ts
```

---

## P2 - Medium Priority

### 1.4 Error States & Loading UI (Build) - P2
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 3-4h |
| **Dependencies** | UI/UX design specs |
| **Status** | [ ] Not Started |

**Description:**
Build the global loading and error UI components based on UI/UX designs.

**Tasks:**
- [ ] Build `components/atoms/Spinner/` - Global loading spinner
- [ ] Build `components/atoms/Skeleton/` - Skeleton loaders for cards, lists
- [ ] Build `components/molecules/ErrorBoundary/` - React error boundary
- [ ] Create `app/not-found.tsx` - Custom 404 page
- [ ] Create `app/error.tsx` - Global error page
- [ ] Create `components/molecules/Toast/` - Toast notifications
- [ ] Add loading states to all API calls in existing pages
- [ ] Add error handling to all API calls

**Files to Create:**
```
components/
  atoms/
    Spinner/
      Spinner.tsx
      index.ts
    Skeleton/
      Skeleton.tsx
      CardSkeleton.tsx
      ListSkeleton.tsx
      index.ts
  molecules/
    ErrorBoundary/
      ErrorBoundary.tsx
      index.ts
    Toast/
      Toast.tsx
      ToastProvider.tsx
      index.ts
app/
  not-found.tsx
  error.tsx
```

---

### 1.1 Auth Logic Review (Frontend) - P2
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 2-3h |
| **Dependencies** | 0.3 E2E Testing results, Backend auth review |
| **Status** | [ ] Not Started |

**Description:**
Review and fix frontend auth implementation.

**Tasks:**
- [ ] Audit token storage (localStorage vs cookies)
- [ ] Review token refresh logic
- [ ] Add proper error messages for auth failures
- [ ] Implement "Remember me" correctly
- [ ] Add password strength indicator on signup
- [ ] Fix protected route redirects
- [ ] Implement proper logout (clear all state)
- [ ] Add loading states during auth

**Files to Review:**
- `context/AuthContext.tsx`
- `app/auth/log-in/page.tsx`
- `app/auth/sign-up/page.tsx`
- `components/navbar.tsx`

---

## P3 - Lower Priority

### 1.3 Pagination UI - P3
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 1-2h |
| **Dependencies** | Backend pagination API |
| **Status** | [ ] Not Started |

**Tasks:**
- [ ] Add pagination component (page numbers or infinite scroll)
- [ ] Handle loading state during page transitions
- [ ] Display "X mentors found" count
- [ ] Handle empty results
- [ ] Maintain scroll position

**Files to Modify:**
- `app/explore-mentors/page.tsx`

---

### 1.5 Mobile Fixes - P3
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 2-3h |
| **Dependencies** | UI/UX mobile audit |
| **Status** | [ ] Not Started |

**Tasks:**
- [ ] Fix issues identified in mobile audit
- [ ] Test on 375px, 390px viewports
- [ ] Test on tablet 768px viewport
- [ ] Fix navbar mobile menu
- [ ] Fix mentor card mobile layout
- [ ] Fix booking calendar on mobile
- [ ] Fix form inputs on mobile

---

### 2.2 Scheduling Section (Build) - P3
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 4-5h |
| **Dependencies** | UI/UX design specs |
| **Status** | [ ] Not Started |

**Tasks:**
- [ ] Build calendar/date selection UI
- [ ] Build time slot grid
- [ ] Show timezone awareness
- [ ] Show price before booking
- [ ] Show selected slot summary
- [ ] Handle "no available slots" state
- [ ] Disable past dates
- [ ] Add loading state during fetch
- [ ] Mobile touch-friendly

**Files to Modify:**
- `app/mentor/[id]/page.tsx`
- `components/ui/mentor/profile.tsx`

---

### 2.4 User Profile (Build) - P3
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 2-3h |
| **Dependencies** | UI/UX design, Backend profile API |
| **Status** | [ ] Not Started |

**Tasks:**
- [ ] Build profile header with avatar
- [ ] Add edit profile form
- [ ] Add change password form
- [ ] Show booking history/stats
- [ ] Add profile photo upload
- [ ] Handle loading/error states

**Files to Modify:**
- `app/profile/page.tsx`

---

### 3.3 Search/Filter UI - P3
| Attribute | Details |
|-----------|---------|
| **Sprint** | 3 |
| **Hours** | 2-3h |
| **Dependencies** | Backend search/filter API |
| **Status** | [ ] Not Started |

**Tasks:**
- [ ] Build search input with debounce
- [ ] Build filter sidebar/dropdown
- [ ] Filter by expertise/skills
- [ ] Filter by price range
- [ ] Filter by availability
- [ ] Sort options (rating, price)
- [ ] Clear filters button
- [ ] Handle no results state

**Files to Modify:**
- `app/explore-mentors/page.tsx`

---

### 2.3 Bookings Page (Build) - P3
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 3h |
| **Dependencies** | UI/UX design specs |
| **Status** | [ ] Not Started |

**Tasks:**
- [ ] Build card-based booking layout
- [ ] Separate upcoming vs past tabs
- [ ] Show mentor info with photo
- [ ] Show date/time prominently
- [ ] Add status badges
- [ ] Add quick action buttons
- [ ] Add empty state component
- [ ] Add skeleton loader
- [ ] Stack cards on mobile

**Files to Modify:**
- `app/profile/my-bookings/page.tsx`

---

## P4 - Nice to Have

### 3.1 Google Sign-in (Frontend) - P4
| Attribute | Details |
|-----------|---------|
| **Sprint** | 3 |
| **Hours** | 2-3h |
| **Dependencies** | Backend OAuth integration |
| **Status** | [ ] Not Started |

**Tasks:**
- [ ] Add Google sign-in button (following brand guidelines)
- [ ] Handle OAuth popup flow
- [ ] Handle account linking scenarios
- [ ] Handle error states (popup blocked, cancelled)
- [ ] Test on web and mobile browsers

**Files to Modify:**
- `app/auth/log-in/page.tsx`
- `app/auth/sign-up/page.tsx`

---

## P6 - Future

### 3.4 Reviews UI - P6
| Attribute | Details |
|-----------|---------|
| **Sprint** | 3 |
| **Hours** | 3-4h |
| **Dependencies** | Backend reviews API |
| **Status** | [ ] Not Started |

**Tasks:**
- [ ] Build star rating component
- [ ] Build review card component
- [ ] Build review submission form
- [ ] Display average rating on mentor card
- [ ] Display reviews on mentor profile
- [ ] Handle no reviews state

---

## Sprint Schedule

| Sprint | Focus | Hours |
|--------|-------|-------|
| **Sprint 0** | E2E Testing | 1-2h |
| **Sprint 1** | Landing, Error states, Auth, Pagination, Mobile | 12-18h |
| **Sprint 2** | Mentor Card, Empty States, Scheduling, Bookings, Profile | 13-17h |
| **Sprint 3** | Google Sign-in, Search/Filter, Reviews | 7-10h |

---

## Key Dependencies

```
UI/UX Design ──────────────────┐
                               ├──> Frontend Build
Backend API ───────────────────┘

Sprint 0 E2E Testing ──> Sprint 1 Auth Review

Backend Pagination API ──> Pagination UI
Backend Search API ──> Search/Filter UI
Backend OAuth ──> Google Sign-in Frontend
Backend Reviews API ──> Reviews UI
```

---

## Codebase Quick Reference

**API Client:** `lib/api/client.ts`
**API Routes:** `lib/api/routes.ts`
**Types:** `lib/api/types.ts`
**Design Atoms:** `components/atoms/` (Button, Container)
**Auth Context:** `context/AuthContext.tsx`
**Animations:** `lib/animations.ts`
