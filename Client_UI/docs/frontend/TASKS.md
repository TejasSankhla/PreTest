# Frontend Developer Tasks

> **Role:** React/Next.js implementation, component development, API integration
> **Primary Focus:** Building UI, state management, client-side logic

---

## Task Overview by Priority

| Priority | Pending | Completed | Total Hours |
|----------|---------|-----------|-------------|
| P0 | 2 tasks | 0 | 5-8h |
| P1 | 2 tasks | 2 ✅ | 10-13h |
| P2 | 1 task | 1 ✅ | 5-7h |
| P3 | 6 tasks | 0 | 15-21h |
| P4 | 2 tasks | 0 | 4-6h |
| P6 | 1 task | 0 | 3-4h |
| **Total** | **13 pending** | **3 done** | **42-59h** |

> **Last Updated:** December 27, 2024
>
> ℹ️ Completed tasks moved to [Completed Tasks](#completed-tasks) section at bottom

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

### 1.6 Forgot Password Flow - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 3-4h |
| **Dependencies** | Backend forgot password API |
| **Status** | [ ] Not Started |

**Description:**
Implement complete forgot/reset password flow for users who can't access their accounts.

**Tasks:**
- [ ] Create `app/auth/forgot-password/page.tsx` - Email input form
- [ ] Create `app/auth/reset-password/page.tsx` - New password form (with token)
- [ ] Add "Forgot password?" link on login page (next to Password label)
- [ ] Implement email validation on forgot password page
- [ ] Add success message after email sent
- [ ] Add token validation on reset password page
- [ ] Add password strength indicator on reset form
- [ ] Add password confirmation field with validation
- [ ] Handle expired/invalid token states
- [ ] Add loading states for all API calls
- [ ] Redirect to login after successful reset
- [ ] Use design system tokens (semantic colors)
- [ ] Add password visibility toggle

**Files to Create:**
```
app/
  auth/
    forgot-password/
      page.tsx
    reset-password/
      page.tsx
```

**Files to Modify:**
- `app/auth/log-in/page.tsx` - Add "Forgot password?" link

**API Endpoints Needed (Backend):**
- `POST /api/auth/forgot-password` - Send reset email
- `POST /api/auth/reset-password` - Reset password with token

**UX Flow:**
```
Login page
  ↓ Click "Forgot password?"
Forgot Password page (enter email)
  ↓ Submit
Success message ("Check your email")
  ↓ User clicks email link
Reset Password page (token in URL)
  ↓ Enter new password
Success message
  ↓ Redirect to login
```

---

## P2 - Medium Priority

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
| **Status** | [x] Completed |

**Tasks:**
- [x] Build card-based booking layout
- [x] Separate upcoming vs past tabs
- [x] Show mentor info with photo (merged with college)
- [x] Show date/time prominently (readable format)
- [x] Add status badges
- [x] Add quick action buttons (Join Meeting / View Details)
- [x] Add empty state component
- [ ] Add skeleton loader
- [ ] Stack cards on mobile

**Files to Modify:**
- `app/profile/my-bookings/page.tsx`

---

### 2.7 Booking Details View - P3
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 4-5h |
| **Dependencies** | Backend booking details API, Reviews API |
| **Status** | [ ] Not Started |

**Description:**
Build a detailed view for past bookings where users can see session feedback, scores, and other details.

**Tasks:**
- [ ] Create booking details modal or page (`app/profile/my-bookings/[id]/page.tsx`)
- [ ] Display session summary (mentor, date, duration)
- [ ] Show session feedback from mentor (if available)
- [ ] Show user's rating/review for the session
- [ ] Add option to leave review (if not already reviewed)
- [ ] Display session scores/metrics (if applicable)
- [ ] Add session notes section
- [ ] Show meeting recording link (if available)
- [ ] Handle loading and error states
- [ ] Mobile responsive design

**Backend Requirements:**
- `GET /api/booking/:id` - Fetch booking details with feedback
- `POST /api/booking/:id/review` - Submit review for booking

**Files to Create:**
```
app/profile/my-bookings/
  └── [id]/
      └── page.tsx
components/molecules/
  └── BookingDetails/
      ├── BookingDetails.tsx
      ├── SessionFeedback.tsx
      ├── ReviewForm.tsx
      └── index.ts
```

---

## P4 - Nice to Have

### 2.6 MagicUI Component Library Integration - P4
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 2-3h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Integrate MagicUI animated components to enhance UI with subtle, delightful animations. These components work with shadcn/ui and add polish to the user experience.

**Components to Install:**
```bash
# Text & Typography
npx shadcn@latest add @magicui/typing-animation
npx shadcn@latest add @magicui/aurora-text
npx shadcn@latest add @magicui/text-reveal

# Layout & Showcase
npx shadcn@latest add @magicui/bento-grid
npx shadcn@latest add @magicui/safari
npx shadcn@latest add @magicui/iphone

# Interactive Elements
npx shadcn@latest add @magicui/rainbow-button
npx shadcn@latest add @magicui/animated-theme-toggler
npx shadcn@latest add @magicui/confetti

# Visual Effects
npx shadcn@latest add @magicui/animated-beam
```

**Tasks:**
- [ ] Install MagicUI components via shadcn CLI
- [ ] Add typing animation to hero section headline
- [ ] Add aurora-text effect to key CTAs or headings
- [ ] Use bento-grid for feature showcase on landing page
- [ ] Add confetti on successful booking confirmation
- [ ] Use rainbow-button for primary CTAs
- [ ] Add safari/iphone mockups for app previews
- [ ] Document component usage in DESIGN_SYSTEM.md

**Potential Use Cases:**
| Component | Where to Use |
|-----------|--------------|
| `typing-animation` | Hero headline, loading states |
| `aurora-text` | "Find Your Perfect Mentor" heading |
| `bento-grid` | Features section, testimonials |
| `confetti` | Booking success, signup complete |
| `rainbow-button` | Primary CTAs, special offers |
| `safari/iphone` | App demo, mentor preview mockups |
| `animated-beam` | Trust indicators, connection visuals |

**Reference:** https://magicui.design

---

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
| **Sprint 1** | Landing, Error states, Auth, Forgot Password, Post-Auth Redirects, Pagination, Mobile | 18-25h |
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

---

## ✅ Completed Tasks

> Tasks that have been shipped and verified. Kept for reference.

---

### 2.5 Empty States (Build) - P1 ✅
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 1-2h |
| **Dependencies** | UI/UX designs |
| **Status** | ✅ Completed |
| **Completed** | December 2024 |

**Tasks:**
- [x] Build reusable `EmptyState` component
- [x] Empty state: No mentors found
- [x] Empty state: No bookings yet
- [x] Empty state: Search no results

**Files Created:**
```
components/molecules/EmptyState/
  ├── EmptyState.tsx
  └── index.ts
```

---

### 1.4 Error States & Loading UI (Build) - P2 ✅
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 3-4h |
| **Status** | ✅ Completed |
| **Completed** | December 27, 2024 |

**Tasks Completed:**
- [x] `components/atoms/Spinner/` - Global loading spinner
- [x] `components/atoms/Skeleton/` - Skeleton loaders
- [x] `app/not-found.tsx` - Custom 404 page with design system
- [x] `app/error.tsx` - Global 500 error page with retry
- [x] Toast notifications using react-toastify
- [x] `hooks/useToast.ts` - Convenience hook for toasts

**Files Created:**
```
components/atoms/
  ├── Spinner/
  │   ├── Spinner.tsx
  │   └── index.ts
  └── Skeleton/
      ├── Skeleton.tsx
      └── index.ts
app/
  ├── not-found.tsx
  └── error.tsx
hooks/
  └── useToast.ts
```

---

### 1.7 Deep Linking & Post-Auth Redirects - P1 ✅
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 2-3h |
| **Status** | ✅ Completed |
| **Completed** | December 27, 2024 |

**Description:**
Implemented deep linking so users are never blocked and always return to their intended destination after authentication.

**Tasks Completed:**
- [x] Created `lib/auth-redirect.ts` - Centralized redirect utilities
- [x] Capture current URL before redirecting to auth
- [x] Store intended destination in query param and localStorage
- [x] Redirect to stored destination after successful auth
- [x] Security validation (whitelist, no external URLs, no auth loops)
- [x] Updated `AuthContext.tsx` with redirect logic
- [x] Created `hooks/useAuthGuard.ts` - Auth guard hook for protected routes
- [x] Added 401 interceptor to `lib/api/client.ts` for session expiration
- [x] Protected `/profile` and `/profile/my-bookings` routes

**Files Created/Modified:**
```
lib/
  ├── auth-redirect.ts (new)
  └── api/
      └── client.ts (modified - 401 interceptor)
hooks/
  ├── useAuthGuard.ts (new)
  └── index.ts (modified)
context/
  └── AuthContext.tsx (modified)
app/profile/
  ├── page.tsx (modified - auth guard)
  └── my-bookings/page.tsx (modified - auth guard)
```

**Security Features:**
- Path whitelist validation (only internal routes)
- Blocks external URLs (prevents open redirect attacks)
- Blocks auth pages in returnTo (prevents loops)
- Clears stored path after redirect
