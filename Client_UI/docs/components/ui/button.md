# Button

**File:** `components/ui/button.tsx`
**Type:** Component
**Client/Server:** Server Compatible (no "use client" directive)

## Overview

Flexible, accessible button component built with Class Variance Authority (CVA) for variant management. Supports multiple visual variants, sizes, and can render as different elements via the `asChild` prop.

## Dependencies

| Package | Purpose |
|---------|---------|
| `@radix-ui/react-slot` | Render delegation for `asChild` |
| `class-variance-authority` | Variant management |

**Internal Dependencies:**
- `@/lib/utils` - `cn()` for class merging

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Button` | React.ForwardRefExoticComponent | Main button component |
| `buttonVariants` | CVA Function | Variant class generator |

## TypeScript Interfaces

```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child element instead of button */
  asChild?: boolean
}

// Variant types (inferred from CVA)
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type ButtonSize = "default" | "sm" | "lg" | "icon"
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `ButtonVariant` | No | `"default"` | Visual style variant |
| `size` | `ButtonSize` | No | `"default"` | Button size |
| `asChild` | `boolean` | No | `false` | Render as Slot (use child element) |
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `ButtonHTMLAttributes` | No | - | All native button props |

## Variants

### Visual Variants

| Variant | Description | Classes |
|---------|-------------|---------|
| `default` | Primary action | `bg-primary text-primary-foreground hover:bg-primary/90` |
| `destructive` | Dangerous action | `bg-destructive text-destructive-foreground hover:bg-destructive/90` |
| `outline` | Bordered | `border border-input bg-background hover:bg-accent` |
| `secondary` | Secondary action | `bg-secondary text-secondary-foreground hover:bg-secondary/80` |
| `ghost` | Minimal | `hover:bg-accent hover:text-accent-foreground` |
| `link` | Text link style | `text-primary underline-offset-4 hover:underline` |

### Size Variants

| Size | Description | Classes |
|------|-------------|---------|
| `default` | Standard size | `h-10 px-4 py-2` |
| `sm` | Small | `h-9 rounded-md px-3` |
| `lg` | Large | `h-11 rounded-md px-8` |
| `icon` | Square icon button | `h-10 w-10` |

## Usage Examples

### Basic Usage

```tsx
import { Button } from "@/components/ui/button"

// Default button
<Button>Click me</Button>

// With variant
<Button variant="destructive">Delete</Button>

// With size
<Button size="lg">Large Button</Button>

// Combined
<Button variant="outline" size="sm">Small Outline</Button>
```

### All Variants

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### As Link (asChild)

```tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Renders as <a> tag with button styles
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### With Icon

```tsx
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

<Button>
  Continue
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>

// Icon-only button
<Button variant="outline" size="icon">
  <ArrowRight className="h-4 w-4" />
</Button>
```

### Disabled State

```tsx
import { Button } from "@/components/ui/button"

<Button disabled>Disabled Button</Button>
```

### With Loading State

```tsx
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <Button disabled={loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? "Submitting..." : "Submit"}
    </Button>
  )
}
```

### Using buttonVariants Directly

```tsx
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

// Apply button styles to any element
<Link
  href="/signup"
  className={buttonVariants({ variant: "outline", size: "lg" })}
>
  Sign Up
</Link>
```

### Form Submit Button

```tsx
import { Button } from "@/components/ui/button"

<form onSubmit={handleSubmit}>
  {/* Form fields */}
  <Button type="submit">Submit</Button>
</form>
```

## Styling

Base classes applied to all buttons:

```css
inline-flex items-center justify-center
whitespace-nowrap rounded-md
text-sm font-medium
ring-offset-background
transition-colors
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
disabled:pointer-events-none
disabled:opacity-50
```

## Related Files

**Imports from:**
- `@radix-ui/react-slot`
- `class-variance-authority`
- `@/lib/utils`

**Used by:**
- `components/ui/carousel.tsx` - Navigation buttons
- `components/ui/navbar.tsx` - Auth buttons
- `components/ui/footer.tsx` - CTA buttons
- `components/ui/mentor/profile.tsx` - Booking button
- `components/ui/mentor/profileCard.tsx` - View profile button
- `app/auth/log-in/page.tsx` - Login button
- `app/auth/sign-up/page.tsx` - Sign up button

## Accessibility

- Supports keyboard navigation (Enter/Space to activate)
- Proper focus ring styling for visibility
- `disabled` state removes from tab order
- Uses semantic `<button>` element by default
