# MentorProfile

**File:** `components/ui/mentor/profile.tsx`
**Type:** Component
**Client/Server:** Client Component (`"use client"`)

## Overview

Full mentor profile page component with booking functionality. Displays mentor information, available time slots in a date carousel, and integrates with Razorpay for payment processing. Handles the complete booking flow including authentication checks.

## Dependencies

| Package | Purpose |
|---------|---------|
| `react-razorpay` | Payment gateway integration |
| `react-toastify` | Toast notifications |
| `next/image` | Optimized images |
| `next/navigation` | Router for redirects |
| `axios` | API requests |

**Internal Dependencies:**
- `@/components/ui/avatar` - Profile picture display
- `@/components/ui/carousel` - Date selection carousel
- `@/components/ui/card` - Date card styling
- `@/components/ui/button` - Action buttons
- `@/components/constants/icons` - Location icon
- `@/context/AuthContext` - User authentication
- `@/context/constants` - Backend URL, booking price, Razorpay key

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `MentorProfile` | React.FC | Full mentor profile (default export) |

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `mentor` | `Mentor` | Yes | Complete mentor data with slots |

## TypeScript Interfaces

```typescript
interface TimeSlot {
  date: string           // ISO date string
  slots: string[]        // Array of ISO time strings
}

interface Mentor {
  _id: string
  name: string
  college: string
  location: string
  profile_pic?: string
  about?: string
  slots: TimeSlot[]
}

interface MentorProfileProps {
  mentor: Mentor
}
```

## State Management

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `selectedDate` | `TimeSlot \| null` | First slot | Currently selected date |
| `selectedTimeSlot` | `string \| null` | `null` | Selected time slot |
| `loading` | `boolean` | `true` | Initial data loading |
| `bookingInProgress` | `boolean` | `false` | Booking in progress |
| `showSignInModal` | `boolean` | `false` | Sign-in modal visibility |
| `IsLoading` | `boolean` | `false` | Payment processing |

## Internal Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `handleDateClick` | `slotInfo: TimeSlot` | `void` | Selects date, resets time slot |
| `handleTimeSlotClick` | `timeSlot: string` | `void` | Selects time slot |
| `handlePaymentAndBooking` | - | `Promise<void>` | Complete booking flow |

## Component Structure

```
<Fragment>
  ├── Profile Header Section
  │   ├── Banner Image
  │   └── Avatar + Name + College + Location
  │
  ├── Main Content Section
  │   ├── About Text (left)
  │   └── Booking Widget (right)
  │       ├── "Schedule Session" heading
  │       ├── "Available Dates" label
  │       ├── Date Carousel
  │       ├── Time Slots Grid
  │       └── Book Slot Button
  │
  ├── Sign-In Modal (conditional)
  │
  └── ToastContainer
</Fragment>
```

## Booking Flow

```
User selects date
        ↓
User selects time slot
        ↓
User clicks "Book Slot"
        ↓
    ┌───────┴───────┐
    ↓               ↓
Not logged in    Logged in
    ↓               ↓
Show modal    Create order (POST /api/order/create-order)
    ↓               ↓
Redirect to    Open Razorpay payment modal
login              ↓
              Payment successful?
              ↓           ↓
            Yes          No
              ↓           ↓
         Create booking  Show error
         (POST /api/booking/:mentorId)
              ↓
         Redirect to /profile/my-bookings
```

## API Endpoints

| Method | Endpoint | Body | Purpose |
|--------|----------|------|---------|
| POST | `/api/order/create-order` | `{ amount }` | Create Razorpay order |
| POST | `/api/booking/:mentorId` | See below | Create booking after payment |

### Booking Request Body

```typescript
{
  client: string           // User ID
  slot: string             // Selected time slot
  paymentResponse: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }
}
```

## Usage Examples

### In Dynamic Route Page

```tsx
// app/mentor/[id]/page.tsx
import MentorProfile from "@/components/ui/mentor/profile"

export default function MentorPage({ mentor }) {
  if (!mentor) return <p>Mentor not found</p>
  return <MentorProfile mentor={mentor} />
}
```

## Date Carousel

```tsx
<Carousel opts={{ align: "start" }} className="w-full max-w-sm">
  <CarouselContent>
    {mentor?.slots?.map((slotInfo, index) => (
      <CarouselItem
        key={index}
        className={`basis-1/3 cursor-pointer`}
        onClick={() => handleDateClick(slotInfo)}
      >
        <Card className={selectedDate?.date === slotInfo.date
          ? "bg-blue-500" : "bg-white"
        }>
          <CardContent className="p-4">
            {/* Formatted date */}
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Time Slot Grid

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {selectedDate.slots.map((timeSlot, idx) => (
    <div
      key={idx}
      className={`p-2 border rounded-md text-center cursor-pointer ${
        selectedTimeSlot === timeSlot
          ? "bg-blue-500 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
      onClick={() => handleTimeSlotClick(timeSlot)}
    >
      {/* Formatted time */}
    </div>
  ))}
</div>
```

## Razorpay Integration

```tsx
const options = {
  key: RAZORPAY_KEY_ID,
  amount: order.amount.toString(),
  currency: order.currency,
  name: "Pretest",
  description: "Payment for mentor booking",
  order_id: order.id,
  handler: async (paymentResponse) => {
    // Create booking with payment verification
  },
  prefill: {
    name: user?.name,
    email: user?.email,
  },
  theme: {
    color: "#3399cc",
  },
}

const rzpay = new Razorpay(options)
rzpay.open()
```

## Date/Time Formatting

```tsx
// Date formatting
new Date(slotInfo.date).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  timeZone: "Asia/Kolkata",
})

// Time formatting
new Date(timeSlot).toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})
```

## Styling

### Profile Banner
```css
relative h-[250px] sm:h-[300px]
```

### Avatar
```css
h-36 w-36 sm:h-48 sm:w-48
border-8 border-orange-400
```

### Booking Widget
```css
shadow-lg border-gray-200 rounded-xl border-2
w-full p-4 md:w-2/5 flex flex-col gap-y-4
```

### Book Button
```css
bg-blue-500 text-white text-xl p-2 w-full
/* Disabled state */
opacity-50 cursor-not-allowed
```

## Related Files

**Imports from:**
- `@/components/ui/avatar`
- `@/components/ui/carousel`
- `@/components/ui/card`
- `@/components/ui/button`
- `@/components/constants/icons`
- `@/context/AuthContext`
- `@/context/constants`
- `react-razorpay`
- `react-toastify`

**Used by:**
- `app/mentor/[id]/page.tsx` - Dynamic mentor detail page

## Assets Used

| Asset | Path | Description |
|-------|------|-------------|
| Profile Banner | `/public/profile-banner.png` | Header background |
| User Placeholder | `/public/user-placeholder.png` | Default avatar |

## Notes

- Button disabled during booking process to prevent double-submission
- Toast notifications for success/error feedback
- Modal requires sign-in before booking
- Payment flow handles both success and failure cases
- Automatically redirects to bookings page on success
- Uses localStorage for user ID and token
- Time slots displayed in 12-hour format
