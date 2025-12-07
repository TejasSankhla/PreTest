# InfiniteScroll

**File:** `components/ui/home/scrollBar.tsx`
**Type:** Component
**Client/Server:** Server Compatible (no "use client" directive)

## Overview

Infinite scrolling carousel displaying college/institution logos. Uses CSS animation to create a seamless, continuously scrolling marquee effect. Features gradient masks on edges for smooth visual transition.

## Dependencies

| Package | Purpose |
|---------|---------|
| `next/image` | Optimized image loading |

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `InfiniteScroll` | React.FC | Logo carousel (default export) |

## Displayed Colleges

| College | Image Path | Full Name |
|---------|------------|-----------|
| IITK | `/colleges/IITK.png` | IIT Kanpur |
| IIITL | `/colleges/IIITL.png` | IIIT Lucknow |
| IIITR | `/colleges/IIITR.png` | IIIT Raichur |
| IIITU | `/colleges/IIITU.png` | IIIT Una |
| IITD | `/colleges/IITD.png` | IIT Delhi |
| IITM | `/colleges/IITM.png` | IIT Madras |
| IITH | `/colleges/IITH.png` | IIT Hyderabad |

## Usage Examples

### In Home Page

```tsx
import InfiniteScroll from "@/components/ui/home/scrollBar"

export default function HomePage() {
  return (
    <main>
      {/* Hero section */}
      <section className="py-8">
        <h2>Mentors from Top Colleges</h2>
        <InfiniteScroll />
      </section>
    </main>
  )
}
```

### With Custom Container

```tsx
import InfiniteScroll from "@/components/ui/home/scrollBar"

<div className="bg-gray-100 py-12">
  <div className="text-center mb-8">
    <h2>Trusted by Students from</h2>
  </div>
  <InfiniteScroll />
</div>
```

## Component Structure

```
<div> (container with overflow hidden)
  ├── <ul> (first logo list - visible)
  │   ├── <li> IITK
  │   ├── <li> IIITL
  │   ├── <li> IIITR
  │   ├── <li> IIITU
  │   ├── <li> IITD
  │   ├── <li> IITM
  │   └── <li> IITH
  │
  └── <ul> (duplicate list - aria-hidden)
      └── [Same logos repeated]
```

## Animation Technique

The infinite scroll effect is achieved by:

1. **Duplicate Content:** Two identical `<ul>` lists placed side by side
2. **CSS Animation:** `animate-infinite-scroll` class moves both lists horizontally
3. **Seamless Loop:** When first list scrolls off-screen, second list is in position
4. **Gradient Mask:** Edge masks create fade-in/fade-out effect

## Styling

### Container
```css
max-w-full
inline-flex flex-nowrap
overflow-hidden
[mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]
```

### Logo List
```css
flex items-center
justify-center md:justify-start
flex-shrink-0
[&_li]:mx-8
[&_img]:max-w-none
animate-infinite-scroll
```

### Individual Logo
```css
height: 100px
width: 100px
mx-8 (via parent selector)
```

## CSS Animation

The `animate-infinite-scroll` class should be defined in `globals.css` or `tailwind.config.ts`:

```css
@keyframes infinite-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.animate-infinite-scroll {
  animation: infinite-scroll 25s linear infinite;
}
```

Or in Tailwind config:

```ts
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
}
```

## Accessibility

- Second `<ul>` has `aria-hidden="true"` to prevent duplicate announcements
- Images have alt text for screen readers
- Decorative content doesn't interfere with page navigation

## Related Files

**Imports from:**
- `next/image`
- Static image imports from `/public/colleges/`

**Used by:**
- `app/page.tsx` - Home page

## Assets Required

All images should be placed in `/public/colleges/`:
- `IITK.png`
- `IIITL.png`
- `IIITR.png`
- `IIITU.png`
- `IITD.png`
- `IITM.png`
- `IITH.png`

## Notes

- Image dimensions are fixed at 100x100 pixels
- Gradient mask creates smooth fade on left/right edges (100px each)
- All alt texts currently say "IIT K" - should be corrected for accessibility
- Animation runs indefinitely (`infinite`)
- Uses static imports for images (optimized by Next.js)
- `flex-shrink-0` prevents logos from compressing
