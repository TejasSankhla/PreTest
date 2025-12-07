# Constants Directory

## Overview

The `constants/` directory contains icon components and utility UI components that are used across the application. These are foundational visual elements.

## Files

| File | Purpose | Key Exports |
|------|---------|-------------|
| [icons.tsx](./icons.md) | SVG icon components | `FacebookIcon`, `InstagramIcon`, `TwitterIcon`, `MenuIcon`, `LocationIcon`, `LinkedinIcon` |
| [toggleLikeButton.tsx](./toggleLikeButton.md) | Like/heart toggle button | `ToggleLikeButton` |

## Quick Reference

### Icons

```tsx
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  MenuIcon,
  LocationIcon,
  LinkedinIcon
} from "@/components/constants/icons"

// Standard usage
<InstagramIcon className="h-6 w-6" />

// Location icon (different prop pattern)
<LocationIcon props="h-5 w-5 text-gray-400" />
```

### ToggleLikeButton

```tsx
import ToggleLikeButton from "@/components/constants/toggleLikeButton"

<ToggleLikeButton />
```

## Icon Reference

| Icon | Component | Usage |
|------|-----------|-------|
| Facebook | `FacebookIcon` | Social links |
| Instagram | `InstagramIcon` | Social links |
| Twitter | `TwitterIcon` | Social links |
| LinkedIn | `LinkedinIcon` | Social links |
| Menu | `MenuIcon` | Navigation hamburger |
| Location | `LocationIcon` | Location display |

## Design Pattern

All icons share common characteristics:
- 24x24 default size
- Stroke-based rendering (no fill)
- Uses `currentColor` for color inheritance
- SVG with rounded line caps and joins

## Usage in Application

- **Social Links:** Footer, mentor profile cards
- **Navigation:** Mobile menu toggle
- **Location:** Mentor profile, mentor cards
- **Like Button:** Mentor cards for favoriting
