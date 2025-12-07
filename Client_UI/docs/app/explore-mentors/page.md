# Explore Mentors Page

**File:** `app/explore-mentors/page.tsx`
**Type:** Page (Next.js App Router)
**Route:** `/explore-mentors`
**Client/Server:** Server Component (async)

## Overview

Server-side rendered page that fetches all mentors and passes them to a client-side search component. Uses server-side data fetching for initial mentor list.

## Dependencies

| Package | Purpose |
|---------|---------|
| `axios` | HTTP requests |

**Internal Dependencies:**
- `./components/SearchMentors` - Client-side search UI
- `@/context/constants` - `Backend_Base_URL`

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Page` | async React.FC | Explore mentors page (default export) |

## Server-Side Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `fetchMentors` | - | `Promise<Mentor[]>` | Fetches all mentors from API |

## API Integration

```typescript
// GET /api/mentor/
const response = await axios.get(`${Backend_Base_URL}/api/mentor/`)
// Returns: { data: Mentor[] }
```

## Component Flow

```
Server Component (page.tsx)
         │
         │ fetchMentors() - Server-side fetch
         │
         ▼
   Initial Mentors Array
         │
         │ Pass as prop
         ▼
Client Component (SearchMentors)
         │
         │ Client-side filtering
         │
         ▼
   Filtered Results Display
```

## Usage

```tsx
// Navigation to this page
<Link href="/explore-mentors">Find your mentor</Link>

// Or from router
router.push("/explore-mentors")
```

## Error Handling

```typescript
try {
  const response = await axios.get(`${Backend_Base_URL}/api/mentor/`)
  if (response.status === 200) {
    return response.data.data
  }
} catch (error: any) {
  console.error("Error fetching mentors:", error.response?.data?.msg || error.message)
  return [] // Returns empty array on error
}
```

## Related Files

**Imports from:**
- `axios`
- `@/context/constants`
- `./components/SearchMentors`

**Contains:**
- `components/SearchMentors.tsx` - Client search component

## Notes

- Data fetched on server before page renders
- Empty array returned on fetch failure (graceful degradation)
- Mentor data passed as `initialMentors` prop to client component
- No loading state needed (server-side rendering)
