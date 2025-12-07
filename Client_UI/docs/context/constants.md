# Constants

**File:** `context/constants.ts`
**Type:** Configuration
**Client/Server:** Server Compatible

## Overview

Central configuration module that exports environment variables as constants. Provides a single source of truth for backend URL, booking prices, and payment gateway configuration.

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Backend_Base_URL` | `string \| undefined` | Backend API base URL |
| `bookingPrice` | `string \| undefined` | Default booking price for sessions |
| `RAZORPAY_KEY_ID` | `string \| undefined` | Razorpay public key for payments |

## Environment Variables

| Variable | Constant | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BACKEND_BASE_URL` | `Backend_Base_URL` | Backend server URL (e.g., `https://api.pretest.com`) |
| `NEXT_PUBLIC_BOOKING_PRICE` | `bookingPrice` | Price in smallest currency unit (e.g., `100` for INR 100) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `RAZORPAY_KEY_ID` | Razorpay publishable key |

## Usage Examples

### Importing Constants

```tsx
import { Backend_Base_URL, bookingPrice, RAZORPAY_KEY_ID } from "@/context/constants"
```

### API Request Configuration

```tsx
import { Backend_Base_URL } from "@/context/constants"

const response = await axios.post(
  `${Backend_Base_URL}/api/user/sign-in`,
  credentials
)
```

### Payment Integration

```tsx
import { RAZORPAY_KEY_ID, bookingPrice } from "@/context/constants"

const options = {
  key: RAZORPAY_KEY_ID,
  amount: bookingPrice,
  currency: "INR",
  name: "Pretest",
  // ...other options
}
```

### Conditional Usage

```tsx
import { Backend_Base_URL } from "@/context/constants"

// With fallback
const apiUrl = Backend_Base_URL || "http://localhost:3000"

// Check if configured
if (!Backend_Base_URL) {
  console.warn("Backend URL not configured")
}
```

## TypeScript Types

```typescript
// The constants are typed as string | undefined
// since environment variables may not be set

const Backend_Base_URL: string | undefined
const bookingPrice: string | undefined
const RAZORPAY_KEY_ID: string | undefined
```

## Related Files

**Used by:**
- `context/AuthContext.tsx` - API endpoints for authentication
- `lib/axios.ts` - Base URL configuration
- `components/ui/mentor/profile.tsx` - Payment and booking flow

## Setup

Ensure these variables are set in your `.env` or `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_BASE_URL=https://your-backend-url.com
NEXT_PUBLIC_BOOKING_PRICE=100
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

## Notes

- All variables use the `NEXT_PUBLIC_` prefix, making them available in both client and server code
- Values are `undefined` if the environment variables are not set
- For production, ensure all required variables are configured in your deployment environment

## Source Code

```typescript
const Backend_Base_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const bookingPrice = process.env.NEXT_PUBLIC_BOOKING_PRICE;
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

export { Backend_Base_URL, bookingPrice, RAZORPAY_KEY_ID };
```
