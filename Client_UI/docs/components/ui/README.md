# UI Components

## Overview

The `ui/` directory contains reusable UI components following a component library pattern. Base components are built with Radix UI primitives and Tailwind CSS, while feature-specific components are organized in subdirectories.

## Directory Structure

```
ui/
├── Base Components
│   ├── avatar.tsx      → Avatar with fallback
│   ├── button.tsx      → Button with variants
│   ├── card.tsx        → Card container
│   ├── carousel.tsx    → Embla carousel
│   ├── dropdown-menu.tsx → Dropdown menu
│   ├── input.tsx       → Form input
│   ├── navbar.tsx      → Navigation bar
│   └── footer.tsx      → Page footer
│
├── home/               → Home page components
│   ├── faq.tsx         → FAQ accordion
│   └── scrollBar.tsx   → Logo carousel
│
└── mentor/             → Mentor components
    ├── profile.tsx     → Full profile + booking
    └── profileCard.tsx → Summary card
```

## Base Components

| Component | File | Description |
|-----------|------|-------------|
| [Avatar](./avatar.md) | `avatar.tsx` | User profile images with fallback |
| [Button](./button.md) | `button.tsx` | Versatile button with variants |
| [Card](./card.md) | `card.tsx` | Container component |
| [Carousel](./carousel.md) | `carousel.tsx` | Content slider |
| [DropdownMenu](./dropdown-menu.md) | `dropdown-menu.tsx` | Accessible dropdown |
| [Input](./input.md) | `input.tsx` | Form input field |
| [Navbar](./navbar.md) | `navbar.tsx` | Application header |
| [Footer](./footer.md) | `footer.tsx` | Application footer |

## Feature Components

### Home Components
- [FAQ](./home/faq.md) - Expandable FAQ section
- [InfiniteScroll](./home/scrollBar.md) - College logo carousel

### Mentor Components
- [ProfileCard](./mentor/profileCard.md) - Mentor summary card
- [MentorProfile](./mentor/profile.md) - Full profile with booking

## Quick Import Examples

```tsx
// Base components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

// Navigation
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

// Feature components
import Faq from "@/components/ui/home/faq"
import InfiniteScroll from "@/components/ui/home/scrollBar"
import ProfileCard from "@/components/ui/mentor/profileCard"
import MentorProfile from "@/components/ui/mentor/profile"
```

## Component Patterns

### Radix UI Based
- Avatar
- Dropdown Menu

### Shadcn/ui Style
- Button (CVA variants)
- Card (compound component)
- Input (styled native element)

### Custom Components
- Carousel (Embla wrapper)
- Navbar (auth-aware navigation)
- Footer (layout component)
- FAQ (accordion)
- InfiniteScroll (CSS animation)
- ProfileCard (memoized card)
- MentorProfile (full-page component)

## Styling Conventions

- All components use `cn()` utility for class merging
- Tailwind CSS for styling
- Support `className` prop for customization
- Use CSS variables for theme colors (bg-card, text-muted, etc.)
- ForwardRef pattern for base components

## Dependencies

| Package | Components Using |
|---------|-----------------|
| `@radix-ui/react-avatar` | Avatar |
| `@radix-ui/react-dropdown-menu` | DropdownMenu |
| `@radix-ui/react-slot` | Button |
| `embla-carousel-react` | Carousel |
| `class-variance-authority` | Button |
| `lucide-react` | Multiple (icons) |
| `react-razorpay` | MentorProfile |
| `react-toastify` | MentorProfile |
