# Card

**File:** `components/ui/card.tsx`
**Type:** Component
**Client/Server:** Server Compatible (no "use client" directive)

## Overview

Compound card component for displaying content in a contained, styled container. Consists of multiple sub-components that can be composed together: Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter.

## Dependencies

**Internal Dependencies:**
- `@/lib/utils` - `cn()` for class merging

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Card` | React.ForwardRefExoticComponent | Main card container |
| `CardHeader` | React.ForwardRefExoticComponent | Header section |
| `CardTitle` | React.ForwardRefExoticComponent | Title element (h3) |
| `CardDescription` | React.ForwardRefExoticComponent | Description text |
| `CardContent` | React.ForwardRefExoticComponent | Main content area |
| `CardFooter` | React.ForwardRefExoticComponent | Footer section |

## TypeScript Interfaces

```typescript
// All components extend HTMLDivElement attributes (except CardTitle)
type CardProps = React.HTMLAttributes<HTMLDivElement>
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>
type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
type CardContentProps = React.HTMLAttributes<HTMLDivElement>
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>
```

## Component Props

### Card

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `HTMLAttributes` | No | - | All div attributes |

### CardHeader

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `HTMLAttributes` | No | - | All div attributes |

### CardTitle

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `HTMLAttributes` | No | - | All heading attributes |

### CardDescription

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `HTMLAttributes` | No | - | All paragraph attributes |

### CardContent

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `HTMLAttributes` | No | - | All div attributes |

### CardFooter

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `HTMLAttributes` | No | - | All div attributes |

## Usage Examples

### Basic Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content of the card</p>
  </CardContent>
  <CardFooter>
    <p>Footer content</p>
  </CardFooter>
</Card>
```

### Simple Card (Content Only)

```tsx
import { Card, CardContent } from "@/components/ui/card"

<Card>
  <CardContent className="p-6">
    <p>Simple card with just content</p>
  </CardContent>
</Card>
```

### Card with Button

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Subscription Plan</CardTitle>
    <CardDescription>Pro membership</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-bold">$29/month</p>
    <ul className="mt-4 space-y-2">
      <li>Unlimited access</li>
      <li>Priority support</li>
      <li>Custom features</li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Subscribe</Button>
  </CardFooter>
</Card>
```

### Card Grid

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{item.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### Clickable Card

```tsx
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

<Link href="/details">
  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
    <CardContent className="p-6">
      <p>Click to view details</p>
    </CardContent>
  </Card>
</Link>
```

### Card with Image

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

<Card className="overflow-hidden">
  <Image
    src="/image.jpg"
    alt="Card image"
    width={400}
    height={200}
    className="w-full object-cover"
  />
  <CardHeader>
    <CardTitle>Image Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card with header image</p>
  </CardContent>
</Card>
```

### Date Selection Card (as used in mentor profile)

```tsx
import { Card, CardContent } from "@/components/ui/card"

<Card className={isSelected ? "bg-blue-500" : "bg-white"}>
  <CardContent className="p-4">
    <div className={`text-xl font-semibold text-center ${
      isSelected ? "text-white" : "text-black"
    }`}>
      {formattedDate}
    </div>
  </CardContent>
</Card>
```

## Styling

### Card Container
```css
rounded-lg border
bg-card text-card-foreground
shadow-sm
```

### CardHeader
```css
flex flex-col space-y-1.5 p-6
```

### CardTitle
```css
text-2xl font-semibold
leading-none tracking-tight
```

### CardDescription
```css
text-sm text-muted-foreground
```

### CardContent
```css
p-6 pt-0
```

### CardFooter
```css
flex items-center p-6 pt-0
```

## Related Files

**Imports from:**
- `@/lib/utils`

**Used by:**
- `components/ui/mentor/profile.tsx` - Date selection cards in carousel
- `components/ui/mentor/profileCard.tsx` - Mentor card display

## Notes

- Sub-components are optional - use only what you need
- CardContent has `pt-0` by default to work with CardHeader's padding
- CardFooter has `pt-0` by default, items are flex-aligned
- All components support ref forwarding
- Customize colors via Tailwind CSS variables (bg-card, text-card-foreground, etc.)
