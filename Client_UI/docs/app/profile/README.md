# Profile Routes

## Overview

User profile section containing personal information display and booking management. Requires authentication to access meaningful data.

## Routes

| Route | File | Description |
|-------|------|-------------|
| `/profile` | [page.tsx](./page.md) | User profile page |
| `/profile/my-bookings` | [my-bookings/page.tsx](./my-bookings.md) | Booking history |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Profile Section                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  /profile                          /profile/my-bookings          │
│      │                                   │                       │
│      ▼                                   ▼                       │
│ ┌──────────────┐                  ┌──────────────────┐          │
│ │ User Info    │                  │ Bookings List    │          │
│ │              │                  │                  │          │
│ │ • Name       │                  │ ┌──────────────┐ │          │
│ │ • Email      │                  │ │  Upcoming    │ │          │
│ │ • Phone      │                  │ └──────────────┘ │          │
│ │              │                  │ ┌──────────────┐ │          │
│ │ (from Auth)  │                  │ │    Past      │ │          │
│ └──────────────┘                  │ └──────────────┘ │          │
│                                   └──────────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Profile Page
```
useAuth() → user object → Display fields
```

### My Bookings Page
```
1. Get userId from localStorage/context
2. Fetch bookings based on active tab
3. Cache responses to avoid refetching
4. Display in table format
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/booking/user/upcoming/:userId` | GET | Future bookings |
| `/api/booking/user/prev/:userId` | GET | Past bookings |

## Features

### Profile Page
- Banner image with avatar overlay
- Personal information display
- Mobile-responsive layout

### My Bookings Page
- Tab navigation (Upcoming/Past)
- Data caching per tab
- Meeting link access
- Formatted date/time display
- Responsive table

## Navigation

Accessed from the navbar profile dropdown menu:
- "Profile" → `/profile`
- "My Bookings" → `/profile/my-bookings`

## Authentication

Both pages use `useAuth()` hook for user data. No explicit route guards - pages display empty/undefined if not authenticated.

## Related Files

- `context/AuthContext.tsx` - User data provider
- `components/ui/navbar.tsx` - Navigation with profile menu
