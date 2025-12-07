# Mentor Components

## Overview

The `mentor/` directory contains components for displaying mentor information, from summary cards to full profile pages with booking functionality.

## Files

| File | Purpose | Export |
|------|---------|--------|
| [profileCard.tsx](./profileCard.md) | Mentor summary card for lists | `ProfileCard` |
| [profile.tsx](./profile.md) | Full mentor profile with booking | `MentorProfile` |

## Quick Reference

### ProfileCard

```tsx
import ProfileCard from "@/components/ui/mentor/profileCard"

<ProfileCard mentor={mentorData} />
```

Used in:
- Explore mentors page
- Search results

Features:
- Cloudinary image optimization
- Truncated bio (25 words)
- Social links (LinkedIn, Instagram)
- Like button
- Link to full profile

### MentorProfile

```tsx
import MentorProfile from "@/components/ui/mentor/profile"

<MentorProfile mentor={mentorData} />
```

Used in:
- Dynamic mentor detail page (`/mentor/[id]`)

Features:
- Full mentor information
- Date selection carousel
- Time slot grid
- Razorpay payment integration
- Authentication check
- Booking creation

## Data Flow

```
Mentor List (explore-mentors)
    │
    ▼
ProfileCard (summary view)
    │
    │ "View Profile" click
    ▼
MentorProfile (full view + booking)
    │
    │ Complete booking
    ▼
User's Bookings Page
```

## Required Mentor Data

### For ProfileCard

```typescript
{
  _id: string
  name: string
  location: string
  college: string
  profile_pic?: string
  about?: string
  linkedin_url?: string
  insta_url?: string
}
```

### For MentorProfile

```typescript
{
  _id: string
  name: string
  college: string
  location: string
  profile_pic?: string
  about?: string
  slots: Array<{
    date: string
    slots: string[]
  }>
}
```

## Booking Flow

1. User views mentor profile
2. Selects date from carousel
3. Selects available time slot
4. Clicks "Book Slot"
5. If not authenticated → Sign-in modal
6. If authenticated → Razorpay payment
7. On successful payment → Booking created
8. Redirect to bookings page

## Integration Points

- **Authentication:** `useAuth()` hook for user state
- **Payment:** Razorpay SDK
- **API:** Backend booking endpoints
- **Notifications:** React Toastify
