# Frontend Developer Tasks

> **Role:** React/Next.js implementation, component development, API integration
> **Primary Focus:** Building UI, state management, client-side logic

---

## Task Overview by Priority

| Priority | Tasks | Total Hours |
|----------|-------|-------------|
| P0 | 2 tasks | 5-8h |
| P1 | 4 tasks | 10-13h |
| P2 | 2 tasks | 5-7h |
| P3 | 6 tasks | 15-21h |
| P4 | 1 task | 2-3h |
| P6 | 1 task | 3-4h |
| **Total** | **16 tasks** | **40-56h** |

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

### 1.7 Deep Linking & Post-Auth Redirects - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 2-3h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Implement deep linking so users are **never blocked** and always return to their intended destination after authentication. Session expiration should not disrupt user flow.

**Core Principle:**
> Users should never lose their place. If they're on `/explore-mentors` or mid-booking and their session expires, they should land right back where they were after logging in.

**Tasks:**
- [ ] Capture current URL before redirecting to auth
- [ ] Store intended destination in:
  - Query parameter: `?returnTo=/mentor/123`
  - LocalStorage (fallback if query param lost)
  - SessionStorage (cleared after auth)
- [ ] Redirect to stored destination after successful auth
- [ ] Handle edge cases:
  - Invalid/malicious `returnTo` URLs (whitelist validation)
  - External URLs (block, only allow internal paths)
  - Auth pages as `returnTo` (redirect to `/explore-mentors` instead)
- [ ] Default behavior when no `returnTo`:
  - New sign-up → `/explore-mentors` (start browsing)
  - Returning login → `/explore-mentors` (consistent default)
- [ ] Clear stored destination after redirect
- [ ] Add loading state during redirect
- [ ] Update AuthContext with redirect logic
- [ ] Test session expiration scenarios

**Implementation Strategy:**

**1. Protected Route Middleware (or HOC)**
```tsx
// middleware.ts or useProtectedRoute.tsx
export function redirectToLogin(currentPath: string) {
  const returnTo = encodeURIComponent(currentPath);
  router.push(`/auth/log-in?returnTo=${returnTo}`);
}
```

**2. Store Intended Destination**
```tsx
// Before redirecting to auth
const currentPath = window.location.pathname + window.location.search;
localStorage.setItem('auth_return_to', currentPath);

// Or use query param
router.push(`/auth/log-in?returnTo=${encodeURIComponent(currentPath)}`);
```

**3. Redirect After Auth**
```tsx
// After successful login/signup
const returnTo = searchParams.get('returnTo') || localStorage.getItem('auth_return_to');

if (returnTo && isValidInternalPath(returnTo)) {
  localStorage.removeItem('auth_return_to');
  router.push(returnTo);
} else {
  router.push('/explore-mentors'); // Safe default
}
```

**Example Flows:**

**Flow 1: Session Expires During Booking**
```
User on /mentor/123 (booking page)
  ↓ Session expires
  ↓ Middleware detects unauthenticated state
  ↓ Redirect to /auth/log-in?returnTo=%2Fmentor%2F123
User logs in
  ↓ Read returnTo param
  ↓ Redirect to /mentor/123 (resume booking)
```

**Flow 2: Direct Landing on Protected Page**
```
User clicks email link to /mentor/456
  ↓ Not authenticated
  ↓ Redirect to /auth/log-in?returnTo=%2Fmentor%2F456
User signs up (new account)
  ↓ Read returnTo param
  ↓ Redirect to /mentor/456 (original destination)
```

**Flow 3: Session Expires on Explore Page**
```
User browsing /explore-mentors?expertise=DSA&sort=rating
  ↓ Session expires
  ↓ Redirect to /auth/log-in?returnTo=%2Fexplore-mentors%3Fexpertise%3DDSA%26sort%3Drating
User logs in
  ↓ Redirect back with filters intact
  ↓ /explore-mentors?expertise=DSA&sort=rating
```

**Security Validation:**
```tsx
function isValidInternalPath(path: string): boolean {
  // Remove any protocol/domain (prevent open redirect)
  const url = path.startsWith('/') ? path : `/${path}`;

  // Blacklist auth pages (prevent redirect loops)
  const authPages = ['/auth/log-in', '/auth/sign-up', '/auth/forgot-password'];
  if (authPages.includes(url.split('?')[0])) return false;

  // Only allow paths starting with /
  if (!url.startsWith('/')) return false;

  // Whitelist internal paths
  const allowedPrefixes = ['/', '/mentor/', '/explore-mentors', '/profile', '/bookings'];
  return allowedPrefixes.some(prefix => url.startsWith(prefix));
}
```

**Files to Modify:**
- `context/AuthContext.tsx` - Add redirect logic
- `app/auth/sign-up/page.tsx` - Read returnTo, redirect after signup
- `app/auth/log-in/page.tsx` - Read returnTo, redirect after login
- `middleware.ts` (or create) - Capture current URL before auth redirect
- `lib/utils/redirects.ts` (create) - Validation helpers

**Testing Scenarios:**
- [ ] Session expires on `/explore-mentors` → User returns to explore page
- [ ] Session expires on `/mentor/123` → User returns to mentor profile
- [ ] Session expires mid-booking → User returns to booking flow
- [ ] Direct link to protected page → User lands on that page after auth
- [ ] Malicious `returnTo` (e.g., `https://evil.com`) → Blocked, default redirect
- [ ] `returnTo=/auth/log-in` (loop prevention) → Redirect to `/explore-mentors`
- [ ] New sign-up without `returnTo` → Default to `/explore-mentors`

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
