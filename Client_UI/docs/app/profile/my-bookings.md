# My Bookings Page

**File:** `app/profile/my-bookings/page.tsx`
**Type:** Page (Next.js App Router)
**Route:** `/profile/my-bookings`
**Client/Server:** Client Component (`"use client"`)

## Overview

Booking management page allowing users to view their upcoming and past mentorship sessions. Features tabbed navigation, data caching, and a detailed booking table with meeting links.

## Dependencies

| Package | Purpose |
|---------|---------|
| `axios` | HTTP requests |
| `next/link` | Navigation to meeting links |

**Internal Dependencies:**
- `@/components/ui/button` - Action buttons
- `@/context/AuthContext` - User authentication
- `@/context/constants` - `Backend_Base_URL`

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Page` | React.FC | My bookings page (default export) |

## State Management

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `activeButton` | `string` | `"upcoming"` | Current tab selection |
| `bookings` | `any[]` | `[]` | Currently displayed bookings |
| `bookingsData` | `object` | `{ upcoming: [], past: [] }` | Cached booking data |
| `isDataFetched` | `object` | `{ upcoming: false, past: false }` | Fetch status flags |

## API Integration

### Upcoming Bookings
```typescript
GET /api/booking/user/upcoming/:userId
Response: { data: Booking[] }
```

### Past Bookings
```typescript
GET /api/booking/user/prev/:userId
Response: { data: Booking[] }
```

## Data Caching Strategy

```typescript
// Check if data already fetched
if (isDataFetched[activeButton]) {
  setBookings(bookingsData[activeButton]);
  return; // Skip API call
}

// Fetch and cache
const response = await axios.get(url);
setBookingsData(prev => ({
  ...prev,
  [activeButton]: response.data.data
}));
setIsDataFetched(prev => ({
  ...prev,
  [activeButton]: true
}));
```

## Component Flow

```
Page Load
    │
    ├─► Get userId from localStorage OR authContext
    │
    ├─► activeButton = "upcoming" (default)
    │
    └─► useEffect triggered
            │
            ├─► Check isDataFetched[activeButton]
            │       │
            │       ├─► true: Use cached data
            │       │
            │       └─► false: Fetch from API
            │               │
            │               ├─► Cache response
            │               │
            │               └─► Mark as fetched
            │
            └─► setBookings(data)

Tab Switch
    │
    ├─► handleButtonClick(buttonType)
    │
    └─► setActiveButton → triggers useEffect
```

## Component Structure

```
<div className="w-full h-full">
  └── Bookings Container (w-4/5)
      │
      ├── Tab Buttons
      │   ├── "Upcoming Bookings" button
      │   └── "Past Bookings" button
      │
      └── Bookings Table
          ├── Header Row
          │   ├── Mentor
          │   ├── College
          │   ├── Slot
          │   ├── Booked on
          │   └── Meeting Link
          │
          └── Body Rows (for each booking)
              ├── Mentor Avatar + Name
              ├── College + Branch
              ├── Slot DateTime
              ├── Created Date
              └── Meeting Link Button
```

## Booking Object Shape

```typescript
interface Booking {
  mentor: {
    name: string;
    college: string;
    branch: string;
    profile_pic: string;
  };
  slot: string;        // ISO date string
  createdAt: string;   // ISO date string
  meeting_link?: string;
}
```

## Table Columns

| Column | Data Source | Format |
|--------|-------------|--------|
| Mentor | `booking.mentor?.name` | Avatar + Name |
| College | `booking.mentor?.college` | College + Branch |
| Slot | `booking.slot` | Formatted DateTime |
| Booked on | `booking.createdAt` | Date only |
| Meeting Link | `booking.meeting_link` | Button (Link or "Not available") |

## Date Formatting

```typescript
// Slot display
new Date(booking.slot).toLocaleString("en-US", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})
// Output: "Mon, Sep 9, 2024, 10:00 AM"

// Created date
new Date(booking.createdAt).toLocaleDateString()
// Output: "9/9/2024"
```

## Tab Button Styling

```typescript
// Active state
"bg-blue-500 text-white shadow-lg"

// Inactive state
"bg-gray-200 text-black hover:bg-gray-400"
```

## Meeting Link States

| State | Button | Style |
|-------|--------|-------|
| Available | Link to `meeting_link` | `bg-blue-600 text-white` |
| Unavailable | "Not available" | `bg-red-600 text-white` |

## Error Handling

```typescript
catch (error) {
  console.log("Error fetching bookings: ", error);
}
```

- Errors logged to console
- No user-facing error UI
- Empty table displayed on error

## Usage

```tsx
// From profile dropdown
<Link href="/profile/my-bookings">My Bookings</Link>

// Direct URL
/profile/my-bookings
```

## Related Files

**Imports from:**
- `@/components/ui/button`
- `@/context/AuthContext`
- `@/context/constants`

**Parent Route:**
- `/profile` - User profile page

**Navigated from:**
- `components/ui/navbar.tsx` - Profile dropdown

## Notes

- Uses both localStorage and AuthContext for userId (fallback pattern)
- Data is cached per tab to avoid redundant API calls
- Meeting links can be null (displays "Not available")
- Table is horizontally scrollable on mobile
- No pagination (displays all bookings)
- Profile pictures have onError fallback to default avatar
