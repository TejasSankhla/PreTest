# Client_UI Technical Documentation

## Overview

PreTest Client_UI is a Next.js application that enables users to discover, browse, and book mentorship sessions with verified mentors from premier institutions.

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js (App Router) | 14.2.5 |
| Language | TypeScript | 5.x |
| UI Library | React | 18.x |
| Styling | Tailwind CSS | 3.4.1 |
| Component Primitives | Radix UI | Various |
| HTTP Client | Axios | 1.7.4 |
| Payment Gateway | Razorpay | 2.0.1 |
| State Management | React Context API | - |
| Carousel | Embla Carousel | 8.2.0 |
| Notifications | React Toastify | 10.0.5 |

## Project Structure

```
Client_UI/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── auth/               # Authentication pages
│   ├── explore-mentors/    # Mentor discovery
│   ├── mentor/[id]/        # Dynamic mentor profiles
│   ├── profile/            # User profile & bookings
│   └── (legal)/            # Legal pages (privacy, terms, refunds)
├── components/             # Reusable UI components
│   ├── constants/          # Icons and utility components
│   └── ui/                 # Base UI components
│       ├── home/           # Home page specific components
│       └── mentor/         # Mentor-related components
├── context/                # React Context providers
├── lib/                    # Utility functions & configurations
└── public/                 # Static assets
```

## Documentation Index

### Core Utilities
- [lib/](./lib/README.md) - Utility functions and configurations
  - [utils.ts](./lib/utils.md) - Class name merging utility
  - [axios.ts](./lib/axios.md) - Configured Axios instance

### State Management
- [context/](./context/README.md) - React Context providers
  - [AuthContext.tsx](./context/AuthContext.md) - Authentication state & methods
  - [constants.ts](./context/constants.md) - Environment configuration

### UI Components
- [components/](./components/README.md) - All reusable components
  - [ui/](./components/ui/README.md) - Base UI components
    - [button.md](./components/ui/button.md)
    - [input.md](./components/ui/input.md)
    - [card.md](./components/ui/card.md)
    - [avatar.md](./components/ui/avatar.md)
    - [carousel.md](./components/ui/carousel.md)
    - [dropdown-menu.md](./components/ui/dropdown-menu.md)
    - [navbar.md](./components/ui/navbar.md)
    - [footer.md](./components/ui/footer.md)
  - [ui/home/](./components/ui/home/README.md) - Home page components
    - [faq.md](./components/ui/home/faq.md)
    - [scrollBar.md](./components/ui/home/scrollBar.md)
  - [ui/mentor/](./components/ui/mentor/README.md) - Mentor components
    - [profile.md](./components/ui/mentor/profile.md)
    - [profileCard.md](./components/ui/mentor/profileCard.md)
  - [constants/](./components/constants/README.md) - Icon and utility components
    - [icons.md](./components/constants/icons.md)
    - [toggleLikeButton.md](./components/constants/toggleLikeButton.md)

### Application Pages
- [app/](./app/README.md) - All application routes
  - [layout.md](./app/layout.md) - Root layout
  - [page.md](./app/page.md) - Home page
  - [auth/](./app/auth/README.md) - Authentication routes
    - [log-in.md](./app/auth/log-in.md)
    - [sign-up.md](./app/auth/sign-up.md)
  - [explore-mentors/](./app/explore-mentors/README.md) - Mentor discovery
    - [page.md](./app/explore-mentors/page.md)
    - [SearchMentors.md](./app/explore-mentors/components/SearchMentors.md)
  - [mentor/\[id\]/](./app/mentor/[id]/page.md) - Mentor detail page
  - [profile/](./app/profile/README.md) - User profile routes
    - [page.md](./app/profile/page.md)
    - [my-bookings/page.md](./app/profile/my-bookings/page.md)
  - [legal/](./app/legal/README.md) - Legal pages

### Static Assets
- [public/](./public/README.md) - Images and static files

## Key Features

### Authentication
- JWT-based authentication
- Login and Sign-up flows
- Persistent sessions via localStorage
- Protected routes for user-specific content

### Mentor Discovery
- Browse all available mentors
- Search and filter by name/college
- Debounced search for performance
- Responsive grid layout

### Booking System
- Date and time slot selection
- Razorpay payment integration
- Booking confirmation flow
- View upcoming and past bookings

### User Profile
- View personal information
- Access booking history
- Session management

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BACKEND_BASE_URL` | Backend API base URL |
| `NEXT_PUBLIC_BOOKING_PRICE` | Default booking price |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | Cloudinary API key |

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/sign-in` | User authentication |
| POST | `/api/user/sign-up` | User registration |
| GET | `/api/mentor/` | Fetch all mentors |
| GET | `/api/mentor/:id` | Fetch mentor details |
| POST | `/api/order/create-order` | Create payment order |
| POST | `/api/booking/:mentorId` | Create booking |
| GET | `/api/booking/user/upcoming/:userId` | Upcoming bookings |
| GET | `/api/booking/user/prev/:userId` | Past bookings |
