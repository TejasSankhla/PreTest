# UI/UX Designer Tasks

> **Role:** User research, wireframes, visual design, prototypes, audits
> **Primary Focus:** Design specs, user flows, visual assets

---

## Task Overview by Priority

| Priority | Tasks | Total Hours |
|----------|-------|-------------|
| P0 | 2 tasks | 5-6h |
| P1 | 3 tasks | 7-10h |
| P2 | 4 tasks | 9-11h |
| P3 | 1 task | 2h |
| P4 | 2 tasks | 3-4h |
| P5 | 1 task | 4-5h |
| **Total** | **13 tasks** | **30-41h** |

---

## P0 - Critical (Do First)

### 0.6 Set Logo Variant 1 as Default - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 30min |
| **Dependencies** | 0.5 Logo Design Complete |
| **Status** | [x] Completed |

**Description:**
Set Practice Target (Variant 1) as the default logo across the entire application.

**Tasks:**
- [x] Update Logo component default prop to variant1
- [x] Apply logo to navbar
- [x] Apply logo to footer
- [x] Test on all pages
- [x] Verify scales properly (16px-64px)

**Deliverable:** Variant 1 logo live across app

---

### 0.7 Create Favicon Assets - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 1h |
| **Dependencies** | 0.6 Logo Default Set |
| **Status** | [x] Completed |

**Description:**
Generate favicon files in all required sizes for browsers and devices.

**Favicon Sizes:**
- [x] favicon.svg (scalable) - COMPLETED
- [ ] favicon.ico (16x16, 32x32 multi-resolution) - Documentation provided
- [ ] favicon-16x16.png - Documentation provided
- [ ] favicon-32x32.png - Documentation provided
- [ ] apple-touch-icon.png (180x180) - Documentation provided
- [ ] android-chrome-192x192.png - Documentation provided
- [ ] android-chrome-512x512.png - Documentation provided

**Tasks:**
- [x] Export Variant 1 SVG
- [x] Create site.webmanifest for PWA
- [x] Update app/layout.tsx with favicon metadata
- [x] Document PNG/ICO generation process (see /public/FAVICON_GENERATION.md)
- [ ] Generate PNG files (documented, ready for execution)

**Deliverable:** Favicon SVG + site.webmanifest + metadata configured + generation docs

---

### 0.8 Update Navbar with Logo + Navigation - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 2h |
| **Dependencies** | 0.6 Logo Default |
| **Status** | [x] Completed |

**Description:**
Redesign navbar with new logo and add primary navigation links.

**Navigation Structure:**
```
[Logo: 32px]  [Find Mentors] [How It Works]  ---  [Sign in] [Get Started]
```

**Tasks:**
- [x] Set logo size to 32px (md size)
- [x] Add "Find Mentors" link (→ /explore-mentors)
- [x] Add "How It Works" anchor link (→ /#how-it-works)
- [x] Improve spacing between nav items
- [x] Add active state indicators using usePathname
- [x] Update mobile menu with nav links
- [x] Test responsive breakpoints
- [x] Ensure touch targets 44px+ on mobile

**Deliverable:** Enhanced navbar with logo + navigation

---

### 0.9 Update Footer with Logo + Content - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 1h |
| **Dependencies** | 0.6 Logo Default |
| **Status** | [x] Completed |

**Description:**
Redesign footer with new logo and replace placeholder content.

**Footer Structure:**
```
[Brand Section]  [Product Links]  [Legal Links]
- Logo + tagline  - Find Mentors   - Privacy Policy
                  - How It Works   - Terms
                  - FAQ             - Refunds

[Bottom Bar]
© 2024 PreTest. All rights reserved.
```

**Tasks:**
- [x] Add logo (md size - 32px)
- [x] Add tagline: "Practice with recent grads from top companies"
- [x] Remove newsletter (no email service connected)
- [x] Remove personal social links
- [x] Add copyright notice with dynamic year
- [x] Fix "Get Started" link (→ /auth/sign-up)
- [x] Clean up placeholder content
- [x] Mobile responsive 4-column grid layout

**Deliverable:** Professional footer with logo

---

### 0.10 Create Social Sharing Assets - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 1h |
| **Dependencies** | 0.6 Logo Default |
| **Status** | [x] Completed |

**Description:**
Create Open Graph and social media images for link sharing.

**Assets Needed:**
- [x] og-image.svg (1200x630) source - COMPLETED
- [x] twitter-card.svg (1200x600) source - COMPLETED
- [x] og-logo.svg (400x400) source - COMPLETED
- [ ] PNG generation (documented, ready for execution)

**Design Requirements:**
- [x] Logo + "PreTest" wordmark
- [x] Tagline: "Master your next interview"
- [x] Brand colors (orange #f97316 + white/gray)
- [x] Clean, professional layout
- [x] Readable at small sizes

**Tasks:**
- [x] Design OG image templates (SVG sources)
- [x] Create assets in public/og/
- [x] Update app/layout.tsx with OpenGraph and Twitter metadata
- [x] Document PNG generation process (see /public/og/README.md)
- [ ] Generate PNG files (documented, ready for social media testing)
- [ ] Test with validators (after PNG generation)

**Deliverable:** OG SVG templates + metadata configured + generation docs

---

### 0.4 Landing Page Content & Section Audit - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 2h |
| **Dependencies** | None |
| **Status** | [x] Completed |

**Description:**
Audit landing page against SaaS best practices to identify gaps.

**Audit Checklist:**
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
- [ ] Mobile experience - All sections work on mobile?

**Deliverable:** Checklist with gaps identified + recommendations

---

### 0.5 Platform Logo Design - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 3-4h |
| **Dependencies** | 0.1 Platform Direction (brand identity) |
| **Status** | [x] Completed |

**Description:**
Design the PreTest brand logo for use across the platform, marketing, and social media.

**Deliverables:**
- [ ] Primary logo (full color)
- [ ] Logo variations (light/dark backgrounds)
- [ ] Favicon (16x16, 32x32, 180x180)
- [ ] Social media profile versions (square crop)
- [ ] Logo with tagline variant
- [ ] Monochrome version

**Design Considerations:**
- [ ] Reflects interview prep / practice theme
- [ ] Works at small sizes (favicon, mobile)
- [ ] Memorable and distinctive
- [ ] Professional yet approachable
- [ ] Works in both light and dark modes

**File Formats:**
- SVG (primary, scalable)
- PNG (with transparency)
- ICO (favicon)

**Deliverable:** Logo assets in `public/brand/` + Figma source file

---

## P1 - High Priority

### 0.2 UI/UX Audit - Missing Flows & Screens - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 3-4h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Systematically review the entire application to identify missing screens, flows, and UX gaps.

**Audit Areas:**

**1. User Journey Mapping**
- [ ] Map complete flow: Landing → Signup → Explore → Book → Pay → Confirm
- [ ] Identify any dead ends or unclear next steps
- [ ] Check if user always knows what to do next

**2. Missing Pages**
- [ ] 404 Not Found page
- [ ] 500 Error page
- [ ] Unauthorized/403 page
- [ ] Offline/No connection state
- [ ] Maintenance page

**3. Missing States**
- [ ] Loading states for each page
- [ ] Empty states (no mentors, no bookings, etc.)
- [ ] Error states for API failures
- [ ] Success confirmations

**4. Missing Flows**
- [ ] Password reset flow
- [ ] Email verification flow
- [ ] Booking cancellation flow
- [ ] Booking reschedule flow
- [ ] Profile edit flow

**5. Mobile UX**
- [ ] Touch targets adequate size (44x44px min)
- [ ] Forms usable on mobile
- [ ] Navigation accessible

**6. Accessibility**
- [ ] Color contrast (WCAG AA)
- [ ] Focus states visible
- [ ] Screen reader compatibility

**Deliverable:** `docs/ui-ux/UX_AUDIT.md` with prioritized findings

---

### 2.1 Mentor Card Design - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 2-3h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Design a new mentor card component for the explore page.

**Research:**
- [ ] Review competitor mentor/tutor card designs
- [ ] Identify best practices

**Design Requirements:**
- [ ] Profile photo (with fallback)
- [ ] Name and current role/company
- [ ] College/education
- [ ] Key stats (experience, sessions done, rating)
- [ ] Expertise tags (2-3 visible, +X more)
- [ ] Price display
- [ ] Availability indicator (green dot if available soon)
- [ ] CTA button
- [ ] Hover state
- [ ] Mobile responsive version

**Deliverable:** Figma design with specs for Frontend

---

### 4.1 AI Interview PRD (User Flows) - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 4 |
| **Hours** | 2-3h |
| **Dependencies** | 0.1 Platform Direction |
| **Status** | [ ] Not Started |

**Description:**
Design user flows for AI interview feature (collaboration with Manager).

**Tasks:**
- [ ] Design user flow: Start → Setup → Interview → Feedback
- [ ] Design interview type selection UI
- [ ] Design AI conversation interface (voice-based)
- [ ] Design feedback report layout
- [ ] Mobile experience considerations

**Deliverable:** User flow diagrams + wireframes

---

## P2 - Medium Priority

### 1.4 Error States & Loading Design - P2
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 2-3h |
| **Dependencies** | 0.2 UX Audit |
| **Status** | [ ] Not Started |

**Description:**
Design consistent loading and error UI patterns.

**Designs Needed:**
- [ ] Global spinner (multiple sizes)
- [ ] Skeleton loaders (card, list, profile)
- [ ] 404 page design
- [ ] 500 error page design
- [ ] Inline error message style
- [ ] Toast notification styles (success, error, warning, info)
- [ ] Empty state template

**Design Specs to Provide:**
- Colors, sizes, animations
- Skeleton shimmer effect
- Error page illustrations/copy
- Toast positioning and animation

**Deliverable:** Figma designs + specs for Frontend

---

### 1.5 Mobile Responsiveness Audit - P2
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 2h |
| **Dependencies** | 0.2 UX Audit |
| **Status** | [ ] Not Started |

**Description:**
Detailed audit of mobile experience.

**Test Viewports:**
- [ ] iPhone SE (375px)
- [ ] iPhone 14 (390px)
- [ ] iPad (768px)

**Pages to Test:**
- [ ] Landing page (all sections)
- [ ] Explore mentors
- [ ] Mentor profile
- [ ] Booking calendar
- [ ] Auth pages
- [ ] My bookings
- [ ] User profile

**Document:**
- Screenshots of issues
- Specific breakpoint problems
- Touch target issues
- Overflow/scroll issues

**Deliverable:** Mobile audit report for Frontend

---

### 2.2 Scheduling Section Design - P2
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 3-4h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Redesign the booking/scheduling UI on mentor profile.

**Research:**
- [ ] Review Calendly, Cal.com patterns
- [ ] Review other booking UIs

**Design Requirements:**
- [ ] Date selection (calendar vs carousel)
- [ ] Time slot grid with clear visual hierarchy
- [ ] Timezone display
- [ ] Price clarity before booking
- [ ] Selected slot summary
- [ ] "No available slots" state
- [ ] Loading state
- [ ] Mobile touch-friendly version

**Deliverable:** Figma design with specs

---

### 2.4 User Profile Design - P2
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 2h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Design enhanced user profile page.

**Design Requirements:**
- [ ] Profile header (avatar, name, email)
- [ ] Avatar upload interaction
- [ ] Edit profile form layout
- [ ] Change password section
- [ ] Booking stats/history summary
- [ ] Settings section
- [ ] Mobile layout

**Deliverable:** Figma design with specs

---

## P3 - Lower Priority

### 2.3 Bookings Page Design - P3
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 2h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Design card-based bookings page.

**Design Requirements:**
- [ ] Booking card layout
- [ ] Upcoming vs past visual distinction
- [ ] Mentor info with photo
- [ ] Date/time prominence
- [ ] Status badges (upcoming, completed, cancelled)
- [ ] Action buttons (join, reschedule, cancel)
- [ ] Empty state design
- [ ] Mobile stacked cards

**Deliverable:** Figma design with specs

---

## P4 - Nice to Have

### 2.5 Empty States Design - P4
| Attribute | Details |
|-----------|---------|
| **Sprint** | 2 |
| **Hours** | 1-2h |
| **Dependencies** | 0.2 UX Audit |
| **Status** | [ ] Not Started |
| **Note** | Design is P4, but Frontend build becomes P1 once design is ready |

**Description:**
Design helpful empty states.

**Empty States Needed:**
- [ ] No mentors found (search results)
- [ ] No bookings yet
- [ ] No upcoming sessions
- [ ] No reviews yet

**Pattern:**
- Illustration (simple, on-brand)
- Friendly message
- CTA button to take action

**Deliverable:** Empty state designs

---

### 3.4 Reviews UI Design - P4
| Attribute | Details |
|-----------|---------|
| **Sprint** | 3 |
| **Hours** | 2h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Design reviews and ratings UI components.

**Design Requirements:**
- [ ] Star rating component (display + input)
- [ ] Review card (avatar, name, rating, comment, date)
- [ ] Review submission form
- [ ] Reviews section on mentor profile
- [ ] Average rating display on mentor card
- [ ] "No reviews yet" state

**Deliverable:** Figma design with specs

---

## P5 - Future

### 4.4 Mentor Onboarding Flow - P5
| Attribute | Details |
|-----------|---------|
| **Sprint** | 4+ |
| **Hours** | 4-5h |
| **Dependencies** | Platform direction |
| **Status** | [ ] Not Started |

**Description:**
Design mentor-side onboarding experience.

**Flows to Design:**
- [ ] Mentor registration
- [ ] Profile setup wizard
- [ ] Availability management
- [ ] Mentor dashboard
- [ ] Earnings/payout view
- [ ] Verification process

**Deliverable:** Wireframes + user flow

---

## Sprint Schedule

| Sprint | Focus | Hours |
|--------|-------|-------|
| **Sprint 0** | Landing audit, Logo design, UX audit | 8-10h |
| **Sprint 1** | Error states design, Mobile audit | 4-5h |
| **Sprint 2** | Card, Scheduling, Bookings, Profile, Empty states | 10-13h |
| **Sprint 3** | Reviews design | 2h |
| **Sprint 4** | AI Interview flows, Mentor onboarding | 6-8h |

---

## Design Handoff Process

**For each design:**
1. Create in Figma with proper naming
2. Include all states (default, hover, active, disabled, loading, error)
3. Provide specs (colors, spacing, typography)
4. Mobile + desktop versions
5. Export assets if needed
6. Add to `docs/ui-ux/` with link to Figma

---

## Design System Reference

**Colors:** See `tailwind.config.ts` and `globals.css`
- Primary: Orange (`secondary` in code)
- Text: `text-primary`, `text-secondary`, `text-tertiary`
- Background: `background`, `background-subtle`
- Border: `border`

**Typography:**
- Font: System default
- Heading sizes: text-4xl, text-3xl, text-2xl, text-xl
- Body: text-base, text-sm

**Components Available:**
- `Button` - 6 variants, 7 sizes, 3 rounded options
- `Container` - 5 sizes, 4 padding options

**Animations:** See `lib/animations.ts`
- fadeInUp, staggerContainer, textReveal
