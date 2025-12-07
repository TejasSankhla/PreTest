# Icons

**File:** `components/constants/icons.tsx`
**Type:** Component Collection
**Client/Server:** Server Compatible (no "use client" directive)

## Overview

Collection of custom SVG icon components for social media platforms, navigation, and location indicators. All icons follow a consistent design pattern with stroke-based rendering and customizable props.

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `FacebookIcon` | React.FC | Facebook social icon |
| `InstagramIcon` | React.FC | Instagram social icon |
| `TwitterIcon` | React.FC | Twitter/X social icon |
| `MenuIcon` | React.FC | Hamburger menu icon |
| `LocationIcon` | React.FC | Map pin location icon |
| `LinkedinIcon` | React.FC | LinkedIn social icon |

## Common Icon Properties

All icons share these default SVG attributes:

| Attribute | Value | Description |
|-----------|-------|-------------|
| `width` | `24` | Default width in pixels |
| `height` | `24` | Default height in pixels |
| `viewBox` | `0 0 24 24` | SVG viewBox |
| `fill` | `none` | No fill (stroke-based) |
| `stroke` | `currentColor` | Inherits text color |
| `strokeWidth` | `2` | Stroke thickness |
| `strokeLinecap` | `round` | Rounded line ends |
| `strokeLinejoin` | `round` | Rounded line joins |

## TypeScript Types

```typescript
// Props are typed as `any` in the source
// Recommended usage with SVG props:
interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  width?: number | string
  height?: number | string
}
```

## Icon Details

### FacebookIcon

Facebook "f" logo icon.

```tsx
<FacebookIcon className="h-6 w-6" />
```

### InstagramIcon

Instagram camera icon with rounded rectangle border.

```tsx
<InstagramIcon className="h-6 w-6" />
```

### TwitterIcon

Twitter bird icon (classic design).

```tsx
<TwitterIcon className="h-6 w-6" />
```

### MenuIcon

Three horizontal lines (hamburger menu).

```tsx
<MenuIcon className="h-6 w-6" />
```

### LocationIcon

Map pin/marker icon for displaying locations.

**Note:** Uses destructured `{ props }` pattern (different from others).

```tsx
<LocationIcon props="h-5 w-5 text-gray-400" />
```

### LinkedinIcon

LinkedIn "in" logo icon.

**Note:** Uses destructured `{ props }` pattern (different from others).

```tsx
<LinkedinIcon props="h-6 w-6" />
```

## Usage Examples

### Basic Usage

```tsx
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
  LocationIcon
} from "@/components/constants/icons"

// Social links
<a href="https://facebook.com">
  <FacebookIcon className="h-6 w-6 hover:text-blue-600" />
</a>

<a href="https://instagram.com">
  <InstagramIcon className="h-6 w-6 hover:text-pink-600" />
</a>

<a href="https://twitter.com">
  <TwitterIcon className="h-6 w-6 hover:text-blue-400" />
</a>

<a href="https://linkedin.com">
  <LinkedinIcon props="h-6 w-6 hover:text-blue-700" />
</a>
```

### Location Display

```tsx
import { LocationIcon } from "@/components/constants/icons"

<div className="flex items-center gap-x-2 text-gray-400">
  <LocationIcon props="h-4 w-4 sm:h-5 sm:w-5" />
  <span>New Delhi, India</span>
</div>
```

### Social Links Row

```tsx
import {
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon
} from "@/components/constants/icons"

<div className="flex gap-4">
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <InstagramIcon className="h-5 w-5 text-gray-500 hover:text-pink-500" />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <TwitterIcon className="h-5 w-5 text-gray-500 hover:text-blue-400" />
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
    <LinkedinIcon props="h-5 w-5 text-gray-500 hover:text-blue-700" />
  </a>
</div>
```

### With Different Sizes

```tsx
import { InstagramIcon } from "@/components/constants/icons"

// Small
<InstagramIcon className="h-4 w-4" />

// Medium (default)
<InstagramIcon className="h-6 w-6" />

// Large
<InstagramIcon className="h-8 w-8" />

// Using width/height props
<InstagramIcon width={32} height={32} />
```

### With Color Override

```tsx
import { TwitterIcon } from "@/components/constants/icons"

// Using text color (stroke inherits currentColor)
<div className="text-blue-500">
  <TwitterIcon className="h-6 w-6" />
</div>

// Using className
<TwitterIcon className="h-6 w-6 text-blue-500" />
```

## Related Files

**Used by:**
- `components/ui/mentor/profileCard.tsx` - Social links, location display
- `components/ui/mentor/profile.tsx` - Location display
- Potentially footer for social links

## Notes

- `LocationIcon` and `LinkedinIcon` use `{ props }` destructuring pattern, applying props via `className`
- Other icons spread props directly onto the SVG element
- All icons use `currentColor` for stroke, inheriting parent text color
- Icons are stroke-based (no fill), making them suitable for outline style
- Consider using lucide-react for consistency with other parts of the codebase
