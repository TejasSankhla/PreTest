# Components Directory

## Overview

The `components/` directory contains all reusable React components for the Client_UI application. Components are organized into logical subdirectories based on their purpose.

## Directory Structure

```
components/
├── constants/          → Icons and utility components
│   ├── icons.tsx       → SVG icon components
│   └── toggleLikeButton.tsx → Like/heart button
│
└── ui/                 → UI component library
    ├── Base components (button, input, card, etc.)
    ├── home/           → Home page specific
    └── mentor/         → Mentor feature components
```

## Subdirectories

| Directory | Purpose | Documentation |
|-----------|---------|---------------|
| [constants/](./constants/README.md) | Icons and utility components | Icons, ToggleLikeButton |
| [ui/](./ui/README.md) | Main UI component library | All UI components |

## Component Categories

### Base UI Components
Reusable primitives for building interfaces:
- Button, Input, Card, Avatar
- Carousel, DropdownMenu

### Layout Components
Application-wide layout elements:
- Navbar, Footer

### Feature Components
Domain-specific components:
- ProfileCard, MentorProfile (mentor features)
- FAQ, InfiniteScroll (home page)

### Utility Components
Helper components:
- Icons (SVG components)
- ToggleLikeButton (interaction)

## Import Patterns

```tsx
// UI Components (named exports)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

// UI Components (default exports)
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

// Constants
import { InstagramIcon, LocationIcon } from "@/components/constants/icons"
import ToggleLikeButton from "@/components/constants/toggleLikeButton"

// Feature Components
import ProfileCard from "@/components/ui/mentor/profileCard"
import MentorProfile from "@/components/ui/mentor/profile"
import Faq from "@/components/ui/home/faq"
```

## Component File Conventions

| Pattern | Example | Usage |
|---------|---------|-------|
| Named exports | `button.tsx` | Base UI components |
| Default exports | `navbar.tsx` | Feature components |
| Compound exports | `card.tsx` | Multi-part components |

## Styling Approach

- **Tailwind CSS:** All styling via utility classes
- **cn() utility:** Class merging with conflict resolution
- **CVA:** Variant-based styling for buttons
- **CSS variables:** Theme-aware colors

## Dependencies

### External
- `@radix-ui/react-*` - Accessible primitives
- `embla-carousel-react` - Carousel functionality
- `class-variance-authority` - Variant management
- `lucide-react` - Icon library
- `@heroicons/react` - Additional icons

### Internal
- `@/lib/utils` - cn() utility
- `@/context/AuthContext` - Authentication state
