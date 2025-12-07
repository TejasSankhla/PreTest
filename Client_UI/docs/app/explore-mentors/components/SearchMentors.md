# SearchMentors

**File:** `app/explore-mentors/components/SearchMentors.tsx`
**Type:** Component
**Client/Server:** Client Component (`"use client"`)

## Overview

Client-side mentor search and filter component. Receives initial mentor data from server and provides real-time filtering by name or college with debounced search input.

## Dependencies

| Package | Purpose |
|---------|---------|
| `lodash.debounce` | Input debouncing (500ms) |

**Internal Dependencies:**
- `@/components/ui/mentor/profileCard` - Mentor card display

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `SearchMentors` | React.FC | Search and filter component (default export) |

## TypeScript Interfaces

```typescript
interface InitialMentorsProps {
  initialMentors: any[]
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `initialMentors` | `any[]` | Yes | Pre-fetched mentor array from server |

## State Management

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `searchInput` | `string` | `""` | Current search query |
| `filteredMentors` | `any[]` | `initialMentors` | Filtered results |
| `totUsers` | `number` | `initialMentors.length` | Result count |

## Internal Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `handleInputChange` | `e: Event` | `void` | Debounced (500ms) input handler |

## Filtering Logic

```typescript
useEffect(() => {
  if (!searchInput) {
    setFilteredMentors(initialMentors)
  } else {
    const filtered = initialMentors.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        mentor.college.toLowerCase().includes(searchInput.toLowerCase())
    )
    setFilteredMentors(filtered)
    settotUsers(filtered.length)
  }
}, [searchInput, initialMentors])
```

Filters by:
- Mentor name (case-insensitive)
- College name (case-insensitive)

## Component Structure

```
<div>
  ├── Header Section
  │   ├── Search Bar (debounced input)
  │   └── Result Count ("Showing X Mentors")
  │
  ├── <hr> Divider
  │
  └── Results Section
      ├── ProfileCard (for each mentor)
      └── "No mentors found" (if empty)
```

## Usage

```tsx
// From server component
import SearchMentors from "./components/SearchMentors"

export default async function Page() {
  const mentors = await fetchMentors()
  return <SearchMentors initialMentors={mentors} />
}
```

## Debouncing

```typescript
const handleInputChange = debounce((e) => {
  setSearchInput(e.target.value)
}, 500)
```

- 500ms delay before filtering
- Prevents excessive re-renders while typing
- Uses lodash.debounce

## Styling

### Search Container
```css
flex items-center justify-center
py-8 md:py-12 bg-orange-50
```

### Search Input
```css
bg-gray-50 w-full border border-gray-300
text-black text-lg rounded-lg
focus:ring-blue-500 focus:border-blue-500
pl-5 p-2 sm:p-3
```

### Results Grid
```css
max-w-full my-8 sm:my-12
flex flex-col gap-y-4 sm:gap-y-12
md:flex-row flex-wrap
```

### Mentor Card Wrapper
```css
lg:w-5/12 shadow-inner border-gray-900
hover:shadow-lg relative overflow-hidden
```

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile | Single column, smaller padding |
| `md` | Two columns, larger padding |
| `lg` | Cards at 5/12 width |

## Related Files

**Imports from:**
- `@/components/ui/mentor/profileCard`
- `lodash.debounce`

**Used by:**
- `app/explore-mentors/page.tsx`

## Notes

- Search is client-side only (no API calls)
- Empty search shows all mentors
- Result count updates with filtering
- Cards link to individual mentor profiles
- Screen reader label for search input (`sr-only`)
