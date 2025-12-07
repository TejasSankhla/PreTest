# Refunds and Cancellations Page

**File:** `app/(legal)/refunds/page.tsx`
**Type:** Page (Next.js App Router)
**Route:** `/refunds`
**Client/Server:** Server Component

## Overview

Static legal page displaying PreTest's refund and cancellation policy for mentorship session bookings. Establishes strict no-refund, no-cancellation policy.

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `RefundsAndCancellations` | React.FC | Refunds page (default export) |

## Route Group

Located in `(legal)` route group:
```
app/
  (legal)/
    refunds/
      page.tsx
```

## Effective Date

**6th Sept. 2024**

## Content Sections

| Section | Description |
|---------|-------------|
| 1. Refunds and Cancellations Policy | Overview and key points |
| 2. No Refunds | Refund prohibition |
| 3. No Cancellations | Cancellation prohibition |
| 4. Contact Us | Support contact |

## Policy Summary

### Key Points
- All bookings are **final and non-refundable**
- Confirmed bookings **cannot be canceled or rescheduled**
- No responsibility for **missed or unused sessions**
- **No exceptions** will be made

### No Refunds
Payments are strictly non-refundable under any circumstances:
- Cancellations
- No-shows
- Reschedule requests

### No Cancellations
Once booked:
- Session is final
- Cannot be canceled
- Cannot be altered

## Component Structure

```
<div className="max-w-4xl mx-auto p-6">
  ├── <h1> Refunds and Cancellations
  ├── <p> Effective Date: 6th Sept. 2024
  │
  ├── Section 1: Policy Overview
  │   ├── <h2> Title
  │   ├── <p> Introduction
  │   └── <ul> Key points
  │
  ├── Section 2: No Refunds
  │   ├── <h2> Title
  │   └── <p> Description
  │
  ├── Section 3: No Cancellations
  │   ├── <h2> Title
  │   └── <p> Description
  │
  ├── Section 4: Contact Us
  │   ├── <h2> Title
  │   └── <p> Email + policy note
  │
  └── <p> Closing statement
</div>
```

## Styling

```css
/* Container */
max-w-4xl mx-auto p-6

/* Headings */
h1: text-3xl font-bold mb-6
h2: text-xl font-semibold mb-4

/* Content */
p: mb-6
ul: list-disc list-inside mb-6

/* Meta */
.text-sm .text-gray-500 mb-4
```

## Contact Information

- **Email:** pretest.dev@gmail.com
- Note: Policy is firm, no refunds or cancellations processed

## User Guidance

> "Please ensure your availability before confirming a booking."

## Usage

```tsx
// Footer link
<Link href="/refunds">Refund Policy</Link>

// Direct URL
/refunds
```

## Related Files

**Navigated from:**
- `components/ui/footer.tsx` - Footer links

**Related Legal Pages:**
- `/privacy-policy` - Privacy policy
- `/terms-and-conditions` - Terms of service

**Related Features:**
- `components/ui/mentor/profile.tsx` - Booking flow
- `app/profile/my-bookings/page.tsx` - Booking display

## Notes

- Server component (static content)
- Strictest policy - no exceptions
- Important for payment integration (Razorpay)
- Users should verify availability before booking
- Part of `(legal)` route group
- Shortest of the three legal pages
