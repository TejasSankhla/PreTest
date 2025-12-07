# Carousel

**File:** `components/ui/carousel.tsx`
**Type:** Component
**Client/Server:** Client Component (`"use client"`)

## Overview

Carousel/slider component built on Embla Carousel. Provides smooth scrolling, keyboard navigation, and automatic scroll state tracking. Used in the application for displaying available booking dates and other slideable content.

## Dependencies

| Package | Purpose |
|---------|---------|
| `embla-carousel-react` | Core carousel functionality |
| `lucide-react` | Arrow icons |

**Internal Dependencies:**
- `@/lib/utils` - `cn()` for class merging
- `@/components/ui/button` - Navigation buttons

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Carousel` | React.ForwardRefExoticComponent | Main carousel container |
| `CarouselContent` | React.ForwardRefExoticComponent | Scrollable content wrapper |
| `CarouselItem` | React.ForwardRefExoticComponent | Individual slide item |
| `CarouselPrevious` | React.ForwardRefExoticComponent | Previous navigation button |
| `CarouselNext` | React.ForwardRefExoticComponent | Next navigation button |
| `CarouselApi` | Type | Embla carousel API type |

## TypeScript Interfaces

```typescript
type CarouselApi = UseEmblaCarouselType[1]

type CarouselOptions = {
  align?: "start" | "center" | "end"
  axis?: "x" | "y"
  containScroll?: "trimSnaps" | "keepSnaps" | false
  direction?: "ltr" | "rtl"
  dragFree?: boolean
  loop?: boolean
  skipSnaps?: boolean
  startIndex?: number
  // ... more Embla options
}

type CarouselProps = {
  /** Embla carousel options */
  opts?: CarouselOptions
  /** Embla carousel plugins */
  plugins?: CarouselPlugin
  /** Carousel orientation */
  orientation?: "horizontal" | "vertical"
  /** Callback to receive carousel API */
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: HTMLDivElement
  api: CarouselApi
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps
```

## Props

### Carousel

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `opts` | `CarouselOptions` | No | - | Embla carousel options |
| `plugins` | `CarouselPlugin` | No | - | Embla plugins array |
| `orientation` | `"horizontal" \| "vertical"` | No | `"horizontal"` | Scroll direction |
| `setApi` | `(api: CarouselApi) => void` | No | - | API callback |
| `className` | `string` | No | - | Additional CSS classes |

### CarouselItem

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes (including basis-*) |

### CarouselPrevious / CarouselNext

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `ButtonVariant` | No | `"outline"` | Button variant |
| `size` | `ButtonSize` | No | `"icon"` | Button size |
| `className` | `string` | No | - | Additional CSS classes |

## Usage Examples

### Basic Carousel

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

<Carousel className="w-full max-w-xs">
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Multiple Items Per View (Date Selection)

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

<Carousel
  opts={{ align: "start" }}
  className="w-full max-w-sm"
>
  <CarouselContent>
    {dates.map((date, index) => (
      <CarouselItem
        key={index}
        className="basis-1/3 cursor-pointer"
        onClick={() => handleDateClick(date)}
      >
        <Card className={selectedDate === date ? "bg-blue-500" : "bg-white"}>
          <CardContent className="p-4">
            <div className="text-xl font-semibold text-center">
              {formatDate(date)}
            </div>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### With Custom Item Width

```tsx
<Carousel>
  <CarouselContent>
    {/* Show 2 items at a time */}
    <CarouselItem className="basis-1/2">Item 1</CarouselItem>
    <CarouselItem className="basis-1/2">Item 2</CarouselItem>

    {/* Show 3 items at a time */}
    <CarouselItem className="basis-1/3">Item 3</CarouselItem>

    {/* Show 4 items at a time */}
    <CarouselItem className="basis-1/4">Item 4</CarouselItem>

    {/* Responsive */}
    <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
      Responsive Item
    </CarouselItem>
  </CarouselContent>
</Carousel>
```

### With Loop Option

```tsx
<Carousel opts={{ loop: true }}>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Vertical Carousel

```tsx
<Carousel orientation="vertical" className="h-[200px]">
  <CarouselContent className="h-[200px]">
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Accessing Carousel API

```tsx
import { Carousel, CarouselApi } from "@/components/ui/carousel"
import { useState, useEffect } from "react"

function CarouselWithAPI() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
      </Carousel>
      <p className="text-center">
        Slide {current} of {count}
      </p>
    </div>
  )
}
```

### Using useCarousel Hook

```tsx
import { useCarousel } from "@/components/ui/carousel"

// Inside a component that's a child of Carousel
function CarouselIndicators() {
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarousel()

  return (
    <div>
      <button onClick={scrollPrev} disabled={!canScrollPrev}>
        Previous
      </button>
      <button onClick={scrollNext} disabled={!canScrollNext}>
        Next
      </button>
    </div>
  )
}
```

### Without Navigation Buttons

```tsx
<Carousel opts={{ dragFree: true }}>
  <CarouselContent>
    <CarouselItem className="basis-1/3">Item 1</CarouselItem>
    <CarouselItem className="basis-1/3">Item 2</CarouselItem>
    <CarouselItem className="basis-1/3">Item 3</CarouselItem>
  </CarouselContent>
  {/* No CarouselPrevious/CarouselNext */}
</Carousel>
```

## Internal State

| State | Type | Description |
|-------|------|-------------|
| `canScrollPrev` | `boolean` | Whether previous scroll is possible |
| `canScrollNext` | `boolean` | Whether next scroll is possible |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `ArrowLeft` | Scroll to previous slide |
| `ArrowRight` | Scroll to next slide |

## Styling

### Carousel Container
```css
relative
```

### CarouselContent
```css
flex
-ml-4 (horizontal) | -mt-4 flex-col (vertical)
```

### CarouselItem
```css
min-w-0 shrink-0 grow-0 basis-full
pl-4 (horizontal) | pt-4 (vertical)
```

### Navigation Buttons
```css
absolute h-8 w-8 rounded-full
/* Horizontal positioning */
-left-12 top-1/2 -translate-y-1/2 (Previous)
-right-12 top-1/2 -translate-y-1/2 (Next)
```

## Related Files

**Imports from:**
- `embla-carousel-react`
- `lucide-react`
- `@/lib/utils`
- `@/components/ui/button`

**Used by:**
- `components/ui/mentor/profile.tsx` - Date selection carousel
- `components/ui/home/scrollBar.tsx` - Infinite scroll (different implementation)

## Notes

- Navigation buttons are positioned absolutely, requiring parent padding
- The `basis-*` class on CarouselItem controls items per view
- Keyboard navigation is automatically handled
- Buttons auto-disable when at start/end (unless loop is enabled)
- The carousel maintains scroll position on re-renders
