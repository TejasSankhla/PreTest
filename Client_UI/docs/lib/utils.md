# Utils

**File:** `lib/utils.ts`
**Type:** Utility
**Client/Server:** Server Compatible (no "use client" directive)

## Overview

Utility module providing a class name merging function that combines the power of `clsx` for conditional class names with `tailwind-merge` for intelligent Tailwind CSS class deduplication.

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `clsx` | 2.1.1 | Conditional class name construction |
| `tailwind-merge` | 2.5.2 | Merge Tailwind CSS classes without conflicts |

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `cn` | Function | Merges class names with Tailwind conflict resolution |

## TypeScript Interfaces

```typescript
import { type ClassValue } from "clsx"

// ClassValue can be:
// - string
// - number
// - bigint
// - boolean
// - ClassArray (recursive array of ClassValue)
// - ClassDictionary (object with boolean values)
// - null
// - undefined
```

## Function Reference

### `cn(...inputs: ClassValue[]): string`

Combines multiple class values into a single string, handling:
- Conditional classes via objects
- Array-based class lists
- Tailwind CSS class conflicts (e.g., `bg-red-500` and `bg-blue-500`)

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `...inputs` | `ClassValue[]` | Variable number of class values to merge |

**Returns:** `string` - Merged class names with Tailwind conflicts resolved

## Usage Examples

### Basic Usage

```tsx
import { cn } from "@/lib/utils"

// Simple string combination
cn("px-4 py-2", "bg-blue-500")
// Output: "px-4 py-2 bg-blue-500"
```

### Conditional Classes

```tsx
import { cn } from "@/lib/utils"

const isActive = true
const isDisabled = false

cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500",
  isDisabled && "opacity-50 cursor-not-allowed"
)
// Output: "px-4 py-2 rounded bg-blue-500"
```

### Object Syntax

```tsx
import { cn } from "@/lib/utils"

cn("base-class", {
  "active-class": true,
  "inactive-class": false,
  "hover:bg-gray-100": true
})
// Output: "base-class active-class hover:bg-gray-100"
```

### Tailwind Conflict Resolution

```tsx
import { cn } from "@/lib/utils"

// Later classes override earlier conflicting classes
cn("bg-red-500 p-4", "bg-blue-500")
// Output: "p-4 bg-blue-500" (red removed, blue wins)

cn("text-sm", "text-lg")
// Output: "text-lg" (sm removed)
```

### Component Pattern

```tsx
import { cn } from "@/lib/utils"

interface ButtonProps {
  className?: string
  variant?: "primary" | "secondary"
}

function Button({ className, variant = "primary" }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "px-4 py-2 rounded font-medium transition-colors",
        // Variant styles
        variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "secondary" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
        // Custom classes (can override defaults)
        className
      )}
    >
      Click me
    </button>
  )
}

// Usage: <Button className="mt-4" variant="primary" />
```

## Related Files

**Imports from:**
- `clsx` (external package)
- `tailwind-merge` (external package)

**Used by:**
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/input.tsx`
- `components/ui/avatar.tsx`
- `components/ui/dropdown-menu.tsx`
- `components/ui/carousel.tsx`
- Most UI components that accept className props

## Source Code

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
