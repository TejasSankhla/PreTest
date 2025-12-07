# Mentor Detail Page

**File:** `app/mentor/[id]/page.tsx`
**Type:** Page (Next.js App Router - Dynamic Route)
**Route:** `/mentor/[id]`
**Client/Server:** Client Component (`"use client"`)

## Overview

Dynamic mentor profile page that fetches and displays individual mentor details based on URL parameter. Provides booking functionality via the MentorProfile component.

## Dependencies

| Package | Purpose |
|---------|---------|
| `axios` | HTTP requests |
| `next/navigation` | Extract ID from pathname |

**Internal Dependencies:**
- `@/components/ui/mentor/profile` - Full profile display
- `@/context/constants` - `Backend_Base_URL`

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `MentorDetails` | React.FC | Mentor detail page (default export) |

## Dynamic Routing

```
/mentor/[id]
  └── [id] is extracted from URL path

Example URLs:
- /mentor/abc123 → id = "abc123"
- /mentor/xyz789 → id = "xyz789"
```

## State Management

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `mentor` | `Mentor \| null` | `null` | Fetched mentor data |
| `loading` | `boolean` | `true` | Loading state |

## ID Extraction

```typescript
const id = usePathname().split("/").pop()
// /mentor/abc123 → "abc123"
```

## API Integration

```typescript
// GET /api/mentor/:id
axios.get(`${Backend_Base_URL}/api/mentor/${id}`)
  .then((response) => {
    setMentor(response.data.data)
    setLoading(false)
  })
```

## Component Flow

```
Page Load
    │
    ├─► usePathname() → Extract ID
    │
    ├─► useEffect triggered
    │   │
    │   ├─► setLoading(true)
    │   │
    │   └─► axios.get(/api/mentor/:id)
    │           │
    │           ├─► Success: setMentor(data)
    │           │
    │           └─► Error: console.error
    │
    └─► setLoading(false)

Render:
    ├─► loading ? "Loading profile..."
    ├─► mentor ? <MentorProfile />
    └─► else: "No mentor found"
```

## Component Structure

```
<div>
  {loading ? (
    Loading Screen
  ) : mentor ? (
    <MentorProfile mentor={mentor} />
  ) : (
    "No mentor found"
  )}
</div>
```

## Usage

Navigate via ProfileCard or direct URL:

```tsx
// From ProfileCard
<Link href={`/mentor/${mentor._id}`}>
  <Button>View Profile</Button>
</Link>

// Direct URL
/mentor/6508a1b2c3d4e5f6a7b8c9d0
```

## Loading State

```tsx
<div className="w-full h-screen flex justify-center items-center">
  <div className="text-2xl flex text-center items-center justify-center font-semibold">
    Loading profile...
  </div>
</div>
```

## Error Handling

- Fetch errors are logged to console
- Failed fetch shows "No mentor found"
- No explicit error UI (graceful fallback)

## Related Files

**Imports from:**
- `axios`
- `next/navigation`
- `@/components/ui/mentor/profile`
- `@/context/constants`

**Navigation from:**
- `components/ui/mentor/profileCard.tsx`
- Direct URL access

## Notes

- Uses `usePathname` instead of `useParams` for ID extraction
- Fetch occurs client-side (not SSR)
- Loading state covers full screen height
- MentorProfile handles all booking functionality
- ID is extracted by splitting pathname and getting last segment
