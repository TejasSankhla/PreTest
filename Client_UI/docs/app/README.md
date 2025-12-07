# App Directory

## Overview

Next.js 14 App Router pages and routes for the PreTest mentorship platform. Uses file-based routing with support for dynamic routes, route groups, and layouts.

## Directory Structure

```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Home page (/)
├── globals.css             # Global styles
├── favicon.ico             # Site favicon
│
├── auth/
│   ├── log-in/
│   │   └── page.tsx        # /auth/log-in
│   └── sign-up/
│       └── page.tsx        # /auth/sign-up
│
├── explore-mentors/
│   ├── page.tsx            # /explore-mentors
│   └── components/
│       └── SearchMentors.tsx
│
├── mentor/
│   └── [id]/
│       └── page.tsx        # /mentor/:id (dynamic)
│
├── profile/
│   ├── page.tsx            # /profile
│   └── my-bookings/
│       └── page.tsx        # /profile/my-bookings
│
└── (legal)/                # Route group (no URL impact)
    ├── privacy-policy/
    │   └── page.tsx        # /privacy-policy
    ├── terms-and-conditions/
    │   └── page.tsx        # /terms-and-conditions
    └── refunds/
        └── page.tsx        # /refunds
```

## Routes Overview

| Route | Type | Client/Server | Description |
|-------|------|---------------|-------------|
| `/` | Page | Server | [Home page](./page.md) |
| `/auth/log-in` | Page | Client | [Login](./auth/log-in.md) |
| `/auth/sign-up` | Page | Client | [Registration](./auth/sign-up.md) |
| `/explore-mentors` | Page | Server | [Mentor discovery](./explore-mentors/page.md) |
| `/mentor/[id]` | Dynamic | Client | [Mentor profile](./mentor/[id]/page.md) |
| `/profile` | Page | Client | [User profile](./profile/page.md) |
| `/profile/my-bookings` | Page | Client | [Booking history](./profile/my-bookings.md) |
| `/privacy-policy` | Page | Server | [Privacy policy](./legal/privacy-policy.md) |
| `/terms-and-conditions` | Page | Server | [Terms](./legal/terms-and-conditions.md) |
| `/refunds` | Page | Server | [Refund policy](./legal/refunds.md) |

## Route Documentation

| Section | README | Description |
|---------|--------|-------------|
| Auth | [auth/README.md](./auth/README.md) | Authentication routes |
| Explore Mentors | [explore-mentors/README.md](./explore-mentors/README.md) | Mentor discovery |
| Profile | [profile/README.md](./profile/README.md) | User profile section |
| Legal | [legal/README.md](./legal/README.md) | Legal pages |

## Root Layout

**File:** [layout.tsx](./layout.md)

Wraps entire application with:
- `AuthProvider` for authentication state
- Global fonts (Inter from Google Fonts)
- Metadata configuration
- Navbar and Footer components

```tsx
<html>
  <body>
    <AuthProvider>
      <Navbar />
      {children}
      <Footer />
    </AuthProvider>
  </body>
</html>
```

## Page Types

### Server Components
- Home page (`/`)
- Explore mentors (`/explore-mentors`)
- Legal pages (`/privacy-policy`, `/terms-and-conditions`, `/refunds`)

### Client Components
- Auth pages (require form state)
- Mentor detail page (requires URL params)
- Profile pages (require auth context)
- SearchMentors component (requires interactivity)

## Data Fetching Patterns

### Server-Side Fetch
```tsx
// explore-mentors/page.tsx
async function fetchMentors() {
  const response = await axios.get(`${Backend_Base_URL}/api/mentor/`);
  return response.data.data;
}
```

### Client-Side Fetch
```tsx
// mentor/[id]/page.tsx
useEffect(() => {
  axios.get(`${Backend_Base_URL}/api/mentor/${id}`)
    .then(response => setMentor(response.data.data));
}, [id]);
```

## Dynamic Routes

### Mentor Profile
```
/mentor/[id]
  └── [id] extracted from pathname
  └── Example: /mentor/abc123 → id = "abc123"
```

## Route Groups

### `(legal)` Group
Organizes legal pages without affecting URLs:
```
app/(legal)/privacy-policy/page.tsx → /privacy-policy
app/(legal)/terms-and-conditions/page.tsx → /terms-and-conditions
app/(legal)/refunds/page.tsx → /refunds
```

## API Endpoints Used

| Endpoint | Method | Used By |
|----------|--------|---------|
| `/api/user/sign-in` | POST | Login page |
| `/api/user/sign-up` | POST | Sign up page |
| `/api/mentor/` | GET | Explore mentors |
| `/api/mentor/:id` | GET | Mentor detail |
| `/api/booking/user/upcoming/:userId` | GET | My bookings |
| `/api/booking/user/prev/:userId` | GET | My bookings |

## Authentication Flow

```
Unauthenticated User
        │
        ├─► /auth/sign-up → Register → /auth/log-in
        │
        └─► /auth/log-in → Login → / (with auth)
                              │
                              └─► Access:
                                  • /profile
                                  • /profile/my-bookings
                                  • Booking functionality
```

## Navigation Structure

```
Navbar
  ├── Logo → /
  ├── Explore → /explore-mentors
  │
  ├── [Not Authenticated]
  │   ├── Log In → /auth/log-in
  │   └── Sign Up → /auth/sign-up
  │
  └── [Authenticated]
      └── Profile Dropdown
          ├── Profile → /profile
          ├── My Bookings → /profile/my-bookings
          └── Logout → / (clears auth)

Footer
  ├── Privacy Policy → /privacy-policy
  ├── Terms & Conditions → /terms-and-conditions
  └── Refund Policy → /refunds
```

## File Count

| Category | Files |
|----------|-------|
| Layouts | 1 |
| Pages | 11 |
| Route Components | 1 |
| **Total** | **13** |
