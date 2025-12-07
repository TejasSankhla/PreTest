# Home Components

## Overview

The `home/` directory contains components specifically designed for the home page landing experience. These components showcase the platform's value proposition and partner institutions.

## Files

| File | Purpose | Export |
|------|---------|--------|
| [faq.tsx](./faq.md) | Frequently Asked Questions accordion | `Faq` |
| [scrollBar.tsx](./scrollBar.md) | Infinite scrolling college logos | `InfiniteScroll` |

## Quick Reference

### FAQ Component

```tsx
import Faq from "@/components/ui/home/faq"

<Faq />
```

Features:
- Accordion-style expandable questions
- Single item open at a time
- Chevron icon indicators
- 3 pre-built FAQ items

### InfiniteScroll Component

```tsx
import InfiniteScroll from "@/components/ui/home/scrollBar"

<InfiniteScroll />
```

Features:
- Continuous horizontal scroll animation
- 7 college logos (IITs and IIITs)
- Gradient mask on edges
- Accessibility-aware duplicate content

## Component Placement in Home Page

```tsx
// app/page.tsx
export default function Home() {
  return (
    <main>
      {/* Hero Section */}

      {/* Features */}

      {/* College Logos */}
      <InfiniteScroll />

      {/* How It Works */}

      {/* Statistics */}

      {/* FAQ Section */}
      <Faq />
    </main>
  )
}
```

## Styling Dependencies

### InfiniteScroll Animation

Requires CSS animation in `globals.css` or Tailwind config:

```css
@keyframes infinite-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

.animate-infinite-scroll {
  animation: infinite-scroll 25s linear infinite;
}
```

## Assets Used

College logos in `/public/colleges/`:
- IITK.png
- IIITL.png
- IIITR.png
- IIITU.png
- IITD.png
- IITM.png
- IITH.png
