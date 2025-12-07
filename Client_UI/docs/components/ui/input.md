# Input

**File:** `components/ui/input.tsx`
**Type:** Component
**Client/Server:** Server Compatible (no "use client" directive)

## Overview

Styled form input component that extends the native HTML input element. Provides consistent styling for text inputs, file inputs, and other input types with focus states and disabled styling.

## Dependencies

**Internal Dependencies:**
- `@/lib/utils` - `cn()` for class merging

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Input` | React.ForwardRefExoticComponent | Styled input component |
| `InputProps` | Interface | Props type definition |

## TypeScript Interfaces

```typescript
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Inherits all standard HTML input attributes:
// - type, value, onChange, placeholder, disabled, required, etc.
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `type` | `string` | No | `"text"` | Input type (text, email, password, file, etc.) |
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `InputHTMLAttributes` | No | - | All native input props |

## Usage Examples

### Basic Text Input

```tsx
import { Input } from "@/components/ui/input"

<Input placeholder="Enter your name" />
```

### With Label

```tsx
import { Input } from "@/components/ui/input"

<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <Input
    id="email"
    type="email"
    placeholder="john@example.com"
  />
</div>
```

### Different Input Types

```tsx
import { Input } from "@/components/ui/input"

// Email
<Input type="email" placeholder="email@example.com" />

// Password
<Input type="password" placeholder="••••••••" />

// Number
<Input type="number" min={0} max={100} />

// File
<Input type="file" />

// Search
<Input type="search" placeholder="Search..." />
```

### Controlled Input

```tsx
import { Input } from "@/components/ui/input"
import { useState } from "react"

function ControlledInput() {
  const [value, setValue] = useState("")

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  )
}
```

### With Form Validation

```tsx
import { Input } from "@/components/ui/input"

<form onSubmit={handleSubmit}>
  <Input
    type="email"
    required
    placeholder="Enter email"
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  />
  <button type="submit">Submit</button>
</form>
```

### Disabled State

```tsx
import { Input } from "@/components/ui/input"

<Input disabled placeholder="Disabled input" />
```

### With Icon (wrapper pattern)

```tsx
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input className="pl-10" placeholder="Search..." />
</div>
```

### With Error State

```tsx
import { Input } from "@/components/ui/input"

<div className="space-y-1">
  <Input
    className="border-red-500 focus-visible:ring-red-500"
    placeholder="Invalid input"
  />
  <p className="text-sm text-red-500">This field is required</p>
</div>
```

### File Input

```tsx
import { Input } from "@/components/ui/input"

<Input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("Selected file:", file.name)
    }
  }}
/>
```

### In Form Context

```tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  )
}
```

## Styling

Default classes applied:

```css
flex h-10 w-full rounded-md
border border-input
bg-background
px-3 py-2 text-sm
ring-offset-background
placeholder:text-muted-foreground
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
disabled:cursor-not-allowed
disabled:opacity-50
```

File input specific:

```css
file:border-0
file:bg-transparent
file:text-sm
file:font-medium
```

## Related Files

**Imports from:**
- `@/lib/utils`

**Used by:**
- `app/auth/log-in/page.tsx` - Login form inputs
- `app/auth/sign-up/page.tsx` - Registration form inputs
- `app/explore-mentors/components/SearchMentors.tsx` - Search input
- `components/ui/footer.tsx` - Newsletter input

## Accessibility

- Supports all native input accessibility features
- Proper focus ring for keyboard navigation
- Disabled state is visually indicated
- Works with `<label>` elements via `id` prop
- Supports `aria-*` attributes
