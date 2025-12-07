# Context Directory

## Overview

The `context/` directory contains React Context providers and configuration constants for managing global application state, specifically authentication.

## Files

| File | Purpose | Key Exports |
|------|---------|-------------|
| [AuthContext.tsx](./AuthContext.md) | Authentication state management | `AuthProvider`, `useAuth` |
| [constants.ts](./constants.md) | Environment configuration | `Backend_Base_URL`, `bookingPrice`, `RAZORPAY_KEY_ID` |

## Architecture

```
┌─────────────────────────────────────────┐
│              AuthProvider               │
│  ┌───────────────────────────────────┐  │
│  │         Application Tree          │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │   Components using useAuth  │  │  │
│  │  │   - Navbar                  │  │  │
│  │  │   - Profile pages           │  │  │
│  │  │   - Booking components      │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Quick Reference

### Authentication

```tsx
// In any client component
import { useAuth } from "@/context/AuthContext"

function MyComponent() {
  const { user, login, logout, ErrorMessage } = useAuth()

  // Check if user is authenticated
  if (user) {
    console.log(`Logged in as: ${user.name}`)
  }
}
```

### Configuration Constants

```tsx
import { Backend_Base_URL, bookingPrice, RAZORPAY_KEY_ID } from "@/context/constants"

// API calls
const url = `${Backend_Base_URL}/api/endpoint`

// Payment integration
const paymentOptions = {
  key: RAZORPAY_KEY_ID,
  amount: bookingPrice
}
```

## Auth Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Login   │────▶│ Backend  │────▶│ Success  │
│  Form    │     │   API    │     │ Redirect │
└──────────┘     └──────────┘     └──────────┘
     │                                  │
     │                                  ▼
     │                           ┌──────────┐
     │                           │ Store in │
     │                           │localStorage│
     │                           └──────────┘
     │                                  │
     ▼                                  ▼
┌──────────┐                     ┌──────────┐
│  Error   │                     │  Update  │
│ Message  │                     │ Context  │
└──────────┘                     └──────────┘
```

## State Persistence

Authentication state persists across page reloads via localStorage:

| Key | Description |
|-----|-------------|
| `user` | User object (id, name, email, mobile_number) |
| `token` | JWT authentication token |

## Setup Requirements

Ensure environment variables are configured:

```env
NEXT_PUBLIC_BACKEND_BASE_URL=https://api.example.com
NEXT_PUBLIC_BOOKING_PRICE=100
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_key_xxxxx
```
