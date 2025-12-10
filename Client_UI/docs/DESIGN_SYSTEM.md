# PreTest Design System

> A comprehensive design system for PreTest - the mock interview preparation platform.

---

## Platform Overview

### What is PreTest?

PreTest is a **community-powered mock interview platform** that connects college students with mentors from top companies (Google, Amazon, Microsoft, Flipkart, etc.) for real interview practice and feedback.

### Target Audience

| Segment | Percentage | Description |
|---------|------------|-------------|
| College Students | 90% | Preparing for placements, internships, upskilling |
| Fresh Graduates | 10% | <1 year experience, job hunting or switching |

### Core Value Proposition

**"Preparation ≠ Practice. That's the gap we close."** (V1)
**"Master your next interview."** (V2)

- **Community-Powered**: Mentors are peers who recently cracked interviews
- **Affordable**: Community-maintained pricing accessible to tier-2/3 colleges
- **Indian Context**: Mentors understand Indian placements and hiring
- **Not Transactional**: More like talking to a supportive senior

### Brand Voice

**Tone**: Supportive Reality Check
- Empathetic but honest
- No fluff, straight to the point
- Challenges assumptions without being harsh
- Like a senior who cares enough to tell you the truth

---

## Landing Page Variants

PreTest supports **A/B testing** with two landing page designs. Users can switch between variants using the floating dropdown in the bottom-right corner.

### V1 - Original (Orbital)
- Centered hero with "solar system" animation
- Company logos orbiting around the headline
- Gradient mesh background with floating blobs
- Traditional card-based sections

### V2 - Minimal (Modern)
- Split-screen hero (content left, visual right)
- Compact orbital system with floating context cards
- Clean white background with subtle grid pattern
- Bento grid layout for "How It Works"
- Tighter typography with -0.04em letter-spacing

### Variant Switcher

```tsx
// Fixed position bottom-right corner
<VariantSwitcher variant={variant} onVariantChange={handleVariantChange} />
```

Choice persists in `localStorage` as `landing-variant`.

---

## Typography

### Font Family: Geist

PreTest uses **Geist** - a modern sans-serif typeface designed by Vercel for optimal legibility in digital interfaces.

```css
--font-sans: var(--font-geist-sans), system-ui, sans-serif;
--font-mono: var(--font-geist-mono), monospace;
```

### Type Scale

#### Display Sizes (Headlines)

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-display-xl` | 72px (4.5rem) | 1.1 | 700 | Hero headlines (desktop) |
| `text-display-lg` | 60px (3.75rem) | 1.1 | 700 | Main headlines |
| `text-display-md` | 48px (3rem) | 1.15 | 700 | Section headlines |
| `text-display-sm` | 36px (2.25rem) | 1.2 | 700 | Sub-section headlines |

#### Heading Sizes

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-heading-xl` | 32px (2rem) | 1.25 | 600 | Card titles, H3 |
| `text-heading-lg` | 24px (1.5rem) | 1.3 | 600 | H4, subsections |
| `text-heading-md` | 20px (1.25rem) | 1.4 | 600 | H5, small titles |
| `text-heading-sm` | 18px (1.125rem) | 1.4 | 600 | H6, labels |

#### Body Sizes

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-body-xl` | 20px (1.25rem) | 1.6 | 400 | Lead paragraphs |
| `text-body-lg` | 18px (1.125rem) | 1.6 | 400 | Large body text |
| `text-body-md` | 16px (1rem) | 1.6 | 400 | Default body (base) |
| `text-body-sm` | 14px (0.875rem) | 1.5 | 400 | Secondary text |
| `text-body-xs` | 12px (0.75rem) | 1.5 | 400 | Captions |

#### Label Sizes

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-label-lg` | 14px | 1.4 | 500 | Button text, labels |
| `text-label-md` | 12px | 1.4 | 500 | Small labels |
| `text-label-sm` | 10px | 1.4 | 500 | Tiny labels |

### V2 Typography Style

The V2 variant uses tighter letter-spacing for a more modern feel:

```tsx
// V2 Hero headline
<h1
  className="text-5xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95]"
  style={{ letterSpacing: "-0.04em" }}
>
  Master your <br />
  <span className="text-gray-300">next interview.</span>
</h1>
```

---

## Color System

### Primary - Blue (Trust, Professional)

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `--primary` | `#2563eb` | `bg-primary` | Main brand blue |
| `--primary-light` | `#3b82f6` | `bg-primary-light` | Hover states |
| `--primary-lighter` | `#60a5fa` | `bg-primary-lighter` | Accents |
| `--primary-lightest` | `#dbeafe` | `bg-primary-lightest` | Light backgrounds |
| `--primary-dark` | `#1d4ed8` | `bg-primary-dark` | Active states |

### Secondary - Orange (Energy, Action, CTA)

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `--secondary` | `#f97316` | `bg-secondary` | Main CTA color |
| `--secondary-light` | `#fb923c` | `bg-secondary-light` | Hover states |
| `--secondary-lighter` | `#fdba74` | `bg-secondary-lighter` | Soft accents |
| `--secondary-lightest` | `#fff7ed` | `bg-secondary-lightest` | Warm backgrounds |
| `--secondary-dark` | `#ea580c` | `bg-secondary-dark` | Active states |

### Tertiary - Orange Tints (Warmth, Highlights)

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `--tertiary` | `#ffedd5` | `bg-tertiary` | Light backgrounds |
| `--tertiary-light` | `#fed7aa` | `bg-tertiary-light` | Subtle highlights |
| `--tertiary-accent` | `#fdba74` | `bg-tertiary-accent` | Warm accents |

### Neutrals

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#111827` | Headlines (gray-900) |
| `--text-secondary` | `#4b5563` | Body text (gray-600) |
| `--text-tertiary` | `#9ca3af` | Muted text (gray-400) |
| `--background` | `#ffffff` | Main background |
| `--background-subtle` | `#f9fafb` | Subtle background (gray-50) |
| `--border` | `#e5e7eb` | Borders (gray-200) |

---

## Spacing System

Based on a 4px grid system:

| Token | Value | Pixels |
|-------|-------|--------|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-5` | 1.25rem | 20px |
| `--space-6` | 1.5rem | 24px |
| `--space-8` | 2rem | 32px |
| `--space-10` | 2.5rem | 40px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-20` | 5rem | 80px |
| `--space-24` | 6rem | 96px |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Small elements |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Large cards |
| `--radius-2xl` | 24px | Modal, panels |
| `--radius-3xl` | 32px | Bento cards (V2) |
| `--radius-full` | 9999px | Pills, avatars |

---

## Shadows

| Token | Usage |
|-------|-------|
| `--shadow-sm` | Subtle elevation |
| `--shadow-md` | Cards, dropdowns |
| `--shadow-lg` | Modals, popovers |
| `--shadow-xl` | Floating elements |

---

## Components

### Navbar (Updated)

The navbar uses a minimal, modern design:

```tsx
<header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-gray-100/50">
  <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
    {/* Logo */}
    <Link href="/" className="flex items-center gap-2">
      <div className="w-6 h-6 bg-secondary rounded-md flex items-center justify-center text-white text-xs font-bold">
        P
      </div>
      <span className="text-sm font-semibold tracking-tight text-gray-900">PreTest</span>
    </Link>

    {/* Auth buttons */}
    <div className="flex items-center gap-3">
      <Link href="/auth/log-in" className="text-[13px] font-medium text-gray-500 hover:text-gray-900">
        Sign in
      </Link>
      <Link href="/auth/sign-up" className="bg-gray-900 hover:bg-black text-white text-[13px] font-medium px-3 py-1.5 rounded-full">
        Get Started
      </Link>
    </div>
  </div>
</header>
```

### Buttons

#### Primary Button (Dark - V2 Style)
```tsx
<Link className="bg-gray-900 hover:bg-black text-white text-[13px] font-medium px-3 py-1.5 rounded-full shadow-sm hover:shadow-md">
  Get Started
</Link>
```

#### Secondary Button (Orange CTA)
```tsx
<Link className="bg-secondary hover:bg-secondary-dark text-white text-sm font-semibold px-6 py-3.5 rounded-full shadow-[0_1px_2px_rgba(249,115,22,0.3)]">
  Find a Mentor
</Link>
```

#### Ghost Button (Outline)
```tsx
<button className="bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 text-sm font-semibold px-6 py-3.5 rounded-full">
  View Sample Report
</button>
```

### Cards

#### Standard Card
```tsx
<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

#### Bento Card (V2)
```tsx
<div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-all">
  {/* Bento card content */}
</div>
```

#### Dark Bento Card
```tsx
<div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 text-white">
  {/* Dark card content */}
</div>
```

#### Accent Bento Card (Orange)
```tsx
<div className="bg-secondary rounded-3xl p-8 border border-orange-400 text-white">
  {/* Accent card content */}
</div>
```

### Glass UI Elements

```tsx
<div className="bg-white/40 backdrop-blur-xl rounded-full shadow-lg border border-white/50 ring-1 ring-black/5 px-5 py-2.5">
  {/* Glass content */}
</div>
```

### Floating Context Cards (V2)

```tsx
<motion.div
  className="bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] w-56"
  animate={{ y: [0, -8, 0] }}
  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
>
  {/* Card content */}
</motion.div>
```

---

## Animations

### Tailwind Animation Classes

| Class | Duration | Usage |
|-------|----------|-------|
| `animate-orbit-slow` | 30s | Outer orbit rotation |
| `animate-orbit-fast` | 20s | Inner orbit rotation |
| `animate-counter-rotate-slow` | 30s | Keep logos upright |
| `animate-counter-rotate-fast` | 20s | Keep logos upright |
| `animate-float` | 6s | Floating elements |
| `animate-pulse-glow` | 4s | Glow effects |
| `animate-infinite-scroll` | 25s | Logo scroll |
| `animate-ping` | - | Pulsing indicator |

### Framer Motion Presets

```typescript
// lib/animations.ts - Only 3 actively used exports

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export const textReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } }
};
```

**Usage across components:**
- `fadeInUp` + `staggerContainer`: All landing sections (V1 & V2)
- `textReveal`: V1 HeroSection headline only

### Floating Animation (V2)

```tsx
// Floating cards with staggered delays
<motion.div
  animate={{ y: [0, -8, 0] }}
  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
>
```

---

## Landing Page Structure

### V1 - Original

| Section | Description |
|---------|-------------|
| Hero | Centered headline with orbital company logos |
| Trust Bar | Dual-direction logo scrolls (colleges + companies) |
| How It Works | 3-step cards in a row |
| Stats | Metrics on orange gradient background |
| FAQ | Accordion questions |

### V2 - Minimal

| Section | Description |
|---------|-------------|
| Hero | Split layout - content left, orbital visual right |
| Trust Bar | Text-based college names scrolling |
| How It Works | Bento grid (4 cards: 2 small + 2 wide) |
| Stats | Split layout - features left, stats grid right |
| FAQ | Accordion questions |

### V2 Hero Floating Cards

The V2 hero includes three floating context cards:

1. **Offer Received Card** (Top Right)
   - Green success indicator
   - Company and level (e.g., "Google L3")
   - Progress bar

2. **Interview Feedback Card** (Bottom Left)
   - Overall score (9.2/10)
   - 5 category breakdowns:
     - Introduction (green)
     - Problem Solving (orange)
     - Communication (blue)
     - Projects (purple)
     - Code Quality (emerald)
   - Color-coded progress bars with scores

3. **Live Session Card** (Top Left)
   - Dark themed (gray-900)
   - Pulsing red "Live" indicator
   - Session progress bar
   - Time display (32:15)

---

## File Structure

```
Client_UI/
├── app/
│   ├── globals.css              # Design tokens & base styles
│   ├── layout.tsx               # Geist font setup
│   ├── page.tsx                 # Landing page with variant switching
│   └── explore-mentors/
│       └── page.tsx             # Mentor listing (dynamic rendering)
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx      # V1 Hero with orbital animation
│   │   ├── OrbitingLogos.tsx    # V1 Orbital logo component
│   │   ├── TrustBar.tsx         # V1 Dual logo scroll
│   │   ├── VariantSwitcher.tsx  # A/B test dropdown
│   │   └── v2/
│   │       ├── index.ts             # V2 barrel exports
│   │       ├── HeroSectionV2.tsx    # V2 Split hero with floating cards
│   │       ├── TrustBarV2.tsx       # V2 Text-based trust bar
│   │       ├── HowItWorksV2.tsx     # V2 Bento grid (4 cards)
│   │       └── StatsSectionV2.tsx   # V2 Split stats layout
│   └── ui/
│       ├── navbar.tsx           # Navigation (glassmorphism, minimal)
│       ├── button.tsx           # Button component
│       ├── footer.tsx           # Footer
│       ├── home/
│       │   └── faq.tsx          # FAQ accordion (shared)
│       └── ...
├── lib/
│   └── animations.ts            # Framer Motion presets (3 exports)
├── public/
│   ├── colleges/                # College logos (IIT, IIIT)
│   └── companies/               # Company logos (Google, Amazon, etc.)
├── tailwind.config.ts           # Extended theme config
└── docs/
    ├── DESIGN_SYSTEM.md         # This file
    └── LANDING_PAGE_REDESIGN_PLAN.md
```

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|------------|-------|-------|
| Mobile | < 640px | Single column, stacked |
| Tablet (sm) | 640px+ | 2 columns |
| Desktop (md) | 768px+ | Enhanced layout |
| Large (lg) | 1024px+ | Full features, orbits visible |
| XL | 1280px+ | Maximum width content |

### Mobile-First Approach

```tsx
// Example responsive classes
<h1 className="text-display-sm sm:text-display-md lg:text-display-lg">
  Headline
</h1>

// Orbital animation: hidden on mobile
<div className="hidden lg:block">
  {/* Orbit system */}
</div>

// V2 Hero: stacks on mobile
<div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
  {/* Content */}
</div>
```

---

## Accessibility

- Minimum contrast ratio: 4.5:1 for body text
- Focus states on all interactive elements
- Semantic HTML structure
- ARIA labels where needed
- Reduced motion support via `prefers-reduced-motion`

---

## Performance Guidelines

1. **Images**: Use Next.js `<Image>` with proper sizing
2. **Fonts**: Geist loaded via `next/font` (automatic optimization)
3. **Animations**: Use CSS transforms, avoid layout thrashing
4. **Lazy Loading**: Below-fold sections loaded on demand
5. **Variant Loading**: Both variants are bundled (consider code-splitting for production)

---

*Document Version: 2.1*
*Last Updated: December 10, 2024*
*Design System by PreTest Team*

---

## Changelog

### v2.1 (Dec 10, 2024)
- Removed unused animation exports from `lib/animations.ts`
- Updated file structure to reflect current state
- Clarified animation usage across components

### v2.0 (Dec 2024)
- Added V2 landing page variant documentation
- Added navbar redesign specs
- Added floating context cards documentation
