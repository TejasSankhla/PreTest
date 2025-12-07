# ToggleLikeButton

**File:** `components/constants/toggleLikeButton.tsx`
**Type:** Component
**Client/Server:** Client Component (`"use client"`)

## Overview

Interactive heart/like button component that toggles between outline and solid states. Used for favoriting or liking items throughout the application, such as mentor profiles.

## Dependencies

| Package | Purpose |
|---------|---------|
| `@heroicons/react/24/outline` | Outline heart icon |
| `@heroicons/react/24/solid` | Solid heart icon |

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `ToggleLikeButton` | React.FC | Like toggle button (default export) |

## State Management

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `liked` | `boolean` | `false` | Whether the item is liked |

## Internal Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `toggleLike` | - | `void` | Toggles liked state between true/false |

## Usage Examples

### Basic Usage

```tsx
import ToggleLikeButton from "@/components/constants/toggleLikeButton"

<ToggleLikeButton />
```

### In Mentor Card

```tsx
import ToggleLikeButton from "@/components/constants/toggleLikeButton"

<div className="mentor-card">
  <div className="card-header flex justify-between">
    <h3>Mentor Name</h3>
    <ToggleLikeButton />
  </div>
  {/* Card content */}
</div>
```

### In Grid Layout

```tsx
import ToggleLikeButton from "@/components/constants/toggleLikeButton"

<div className="grid grid-cols-3 gap-4">
  {mentors.map((mentor) => (
    <div key={mentor.id} className="relative">
      <div className="absolute top-2 right-2">
        <ToggleLikeButton />
      </div>
      {/* Mentor card content */}
    </div>
  ))}
</div>
```

## Component Behavior

1. **Initial State:** Button shows outline heart icon (not liked)
2. **On Click:** Toggles between:
   - Outline `HeartIcon` (unliked state)
   - Solid `HeartIcon` (liked state)
3. **Visual Feedback:** Smooth color transition via `transition-colors duration-200`

## Visual States

| State | Icon | Appearance |
|-------|------|------------|
| Unliked | `OutlineHeartIcon` | Stroke-only heart |
| Liked | `SolidHeartIcon` | Filled heart |

## Styling

```css
/* Button container */
flex items-center justify-center p-2
transition-colors duration-200

/* Icon */
h-6 w-6
```

## TypeScript Types

```typescript
// Component signature
function ToggleLikeButton(): JSX.Element

// No props currently accepted
// To make it controlled, you could extend like:
interface ToggleLikeButtonProps {
  liked?: boolean
  onLikeChange?: (liked: boolean) => void
}
```

## Potential Enhancements

```tsx
// Controlled version with callback
function ToggleLikeButton({
  liked: initialLiked = false,
  onLikeChange
}: ToggleLikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)

  const toggleLike = () => {
    const newState = !liked
    setLiked(newState)
    onLikeChange?.(newState)
  }

  return (
    <button onClick={toggleLike} className="...">
      {liked ? <SolidHeartIcon /> : <OutlineHeartIcon />}
    </button>
  )
}
```

## Related Files

**Imports from:**
- `@heroicons/react/24/outline`
- `@heroicons/react/24/solid`

**Used by:**
- `components/ui/mentor/profileCard.tsx` - Mentor card like button

## Notes

- Currently maintains local state only (not persisted)
- No API integration for saving liked status
- Icon size is fixed at `h-6 w-6` (24x24 pixels)
- Uses Heroicons v2 (24px variant)
- No color styling applied by default - inherits from parent
- Transition provides smooth visual feedback on state change
