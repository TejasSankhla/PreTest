# Profile Page

**File:** `app/profile/page.tsx`
**Type:** Page (Next.js App Router)
**Route:** `/profile`
**Client/Server:** Client Component (`"use client"`)

## Overview

User profile page displaying authenticated user's personal information including name, email, and phone number. Features a banner image with avatar overlay.

## Dependencies

| Package | Purpose |
|---------|---------|
| `next/image` | Optimized image rendering |
| `next/link` | Client-side navigation |

**Internal Dependencies:**
- `@/components/ui/avatar` - User avatar display
- `@/context/AuthContext` - User data access

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Component` | React.FC | Profile page (default export) |

## Context Usage

```typescript
const { user } = useAuth();
// user: { name, email, mobile_number, ... }
```

## Component Structure

```
<div>
  └── Profile Header Section
      ├── Banner Image (profile-banner.png)
      │   └── 800x200, full width cover
      │
      └── Avatar (positioned over banner)
          ├── h-36 w-36 (mobile)
          └── h-48 w-48 (sm+)

  └── Info Card Section
      ├── User Name (h2)
      ├── Email Label + Value
      └── Phone Number Label + Value
</div>
```

## User Data Display

| Field | Source | Display |
|-------|--------|---------|
| Name | `user?.name` | H2 heading |
| Email | `user?.email` | Gray text |
| Phone | `user?.mobile_number` | Gray text |

## Styling

### Banner Section
```css
relative h-[250px] sm:h-[300px]
```

### Avatar Container
```css
absolute left-4 sm:left-32 top-[%] -translate-y-1/2
h-36 w-36 sm:h-48 sm:w-48
border-8 border-orange-400
```

### Info Card
```css
w-[80%] mx-auto border-2 bg-white
shadow-lg rounded-lg p-6
```

## Static Assets

| Asset | Path | Purpose |
|-------|------|---------|
| `profile_banner` | `/public/profile-banner.png` | Header banner |
| `avatar` | `/public/user-placeholder.png` | Fallback avatar |

## Usage

```tsx
// Navigate from navbar profile menu
<Link href="/profile">Profile</Link>

// Direct URL access (requires authentication)
/profile
```

## Authentication

- Uses `useAuth()` hook to access user data
- No explicit route protection (relies on UI hiding for non-auth)
- Displays `undefined` for missing user fields

## Related Files

**Imports from:**
- `@/components/ui/avatar`
- `@/context/AuthContext`

**Child Routes:**
- `/profile/my-bookings` - User's booking history

**Navigated from:**
- `components/ui/navbar.tsx` - Profile dropdown menu

## Notes

- Client component due to auth context usage
- Banner and avatar create overlapping visual effect
- No loading state (relies on auth context)
- Mobile-responsive with different avatar sizes
- Info card is 80% width centered container
