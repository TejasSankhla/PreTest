# Home Page

**File:** `app/page.tsx`
**Type:** Page (Next.js App Router)
**Route:** `/`
**Client/Server:** Server Component

## Overview

Landing page for the PreTest application. Showcases the platform's value proposition with a hero section, feature highlights, partner institution logos, how-it-works guide, statistics, and FAQ.

## Dependencies

| Package | Purpose |
|---------|---------|
| `lucide-react` | Icons (CheckIcon, Copy, Code, Heart) |
| `next/link` | Client-side navigation |

**Internal Dependencies:**
- `@/components/ui/button` - CTA buttons
- `@/components/ui/home/scrollBar` - College logo carousel
- `@/components/ui/home/faq` - FAQ section

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Component` | React.FC | Home page component (default export) |

## Page Sections

### 1. Hero Section
- Main headline: "Build Your Career The Right Way"
- Subheadline with strikethrough "Random Way"
- Description paragraph
- CTA buttons: "Book a free trial" & "Find your mentor"

### 2. Feature Highlights (Desktop)
- No payment required
- Verified Mentors Only
- Reschedule Anytime

### 3. College Logo Carousel
- "Mentors from top colleges" heading
- InfiniteScroll component with IIT/IIIT logos

### 4. How PreTest Works
- 4-step process:
  1. Sign Up
  2. Book a Mentor
  3. Prepare & Learn
  4. Get Notified

### 5. Statistics Section
```typescript
const stats = [
  { id: 1, name: "Students mentored by our experts", value: "200+" },
  { id: 2, name: "Mentors from top colleges", value: "47+" },
  { id: 3, name: "positive feedback for mentors", value: "100%" },
]
```

### 6. FAQ Section
- Faq component with expandable questions

## Page Structure

```
<main>
  <section> (Hero + Content)
    ├── Hero Section
    │   ├── Headlines
    │   ├── Description
    │   ├── CTA Buttons
    │   └── Feature Checkmarks
    │
    ├── College Logos
    │   └── <InfiniteScroll />
    │
    ├── How It Works
    │   └── 4-Step Grid
    │
    └── Statistics
        └── 3-Stat Grid

  <Faq /> (FAQ Section)
</main>
```

## Navigation Links

| Button | Route | Description |
|--------|-------|-------------|
| Book a free trial | `/explore-mentors` | Outline button |
| Find your mentor | `/explore-mentors` | Primary button |

## Usage

This is the root page, accessible at `/`.

```
https://pretest.com/        → app/page.tsx
```

## Styling

### Hero Section
```css
pt-10 md:pt-20 bg-secondary
```

### Headlines
```css
/* Main headline */
text-3xl sm:text-5xl md:text-6xl text-black font-medium

/* Strikethrough subtitle */
text-3xl md:text-6xl sm:text-5xl italic font-serif
```

### Statistics Section
```css
bg-orange-50 py-8 sm:py-16
```

### Grid Layouts
```css
/* How it works */
grid grid-cols-1 md:grid-cols-2 gap-6

/* Statistics */
grid grid-cols-1 lg:grid-cols-3
```

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| Mobile | Single column, smaller text, features hidden |
| `sm` | Larger text, horizontal CTAs, features visible |
| `md` | 2-column grid for "How it works" |
| `lg` | 3-column grid for statistics |

## Related Files

**Imports from:**
- `@/components/ui/button`
- `@/components/ui/home/scrollBar`
- `@/components/ui/home/faq`
- `lucide-react`
- `next/link`

**Layout:** Wrapped by `app/layout.tsx`

## Notes

- Page is a Server Component (no "use client")
- All interactive elements use client components
- Statistics are hardcoded (not fetched)
- Both CTA buttons link to same destination (`/explore-mentors`)
- Feature checkmarks hidden on mobile (`hidden sm:flex`)
