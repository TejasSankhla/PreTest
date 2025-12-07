# ProfileCard

**File:** `components/ui/mentor/profileCard.tsx`
**Type:** Component
**Client/Server:** Server Compatible (no "use client" directive, but uses client components)

## Overview

Card component displaying a mentor's summary information in a list view. Features profile picture with Cloudinary optimization, mentor details, social links, like button, and navigation to full profile. Wrapped with `React.memo` for performance optimization.

## Dependencies

| Package | Purpose |
|---------|---------|
| `next/link` | Client-side navigation |
| `next/image` | Static image import |

**Internal Dependencies:**
- `@/components/constants/icons` - `LocationIcon`, `LinkedinIcon`, `InstagramIcon`
- `@/components/constants/toggleLikeButton` - Like button
- `@/components/ui/button` - View Profile button
- `@/components/ui/avatar` - Profile picture display

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `ProfileCard` | React.MemoExoticComponent | Memoized mentor card (default export) |

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `mentor` | `Mentor` | Yes | Mentor data object |

## TypeScript Interfaces

```typescript
interface Mentor {
  _id: string              // Unique identifier
  name: string             // Mentor's display name
  location: string         // Location (e.g., "New Delhi, India")
  college: string          // College/institution name
  profile_pic?: string     // Cloudinary image URL
  about?: string           // Bio/description
  linkedin_url?: string    // LinkedIn profile URL
  insta_url?: string       // Instagram profile URL
}

interface ProfileCardProps {
  mentor: Mentor
}
```

## Features

### Cloudinary Image Optimization

```tsx
const optimizedProfilePic = mentor.profile_pic
  ? mentor.profile_pic.replace(
      "/upload/",
      "/upload/c_fill,w_400,h_400,q_auto,f_auto/"
    )
  : userPlaceholder;
```

Transforms original Cloudinary URL to add:
- `c_fill` - Crop mode
- `w_400,h_400` - Resize to 400x400
- `q_auto` - Automatic quality
- `f_auto` - Automatic format

### Text Truncation

```tsx
const truncatedAbout = mentor?.about
  ? mentor.about.split(" ").slice(0, 25).join(" ") +
    (mentor.about.split(" ").length > 25 ? "..." : "")
  : "";
```

Limits "about" text to 25 words with ellipsis.

## Component Structure

```
<div> (card container)
  ├── <div> (mentor-info section)
  │   ├── <Avatar> (profile picture)
  │   └── <div> (mentor-details)
  │       ├── <div> Name
  │       ├── <div> Location with icon
  │       ├── <div> College
  │       └── <div> Truncated about text
  │
  ├── <hr> (divider)
  │
  └── <div> (mentor-actions)
      ├── <Link> LinkedIn (conditional)
      ├── <Link> Instagram (conditional)
      ├── <ToggleLikeButton>
      └── <Link> View Profile button
```

## Usage Examples

### In Mentor List

```tsx
import ProfileCard from "@/components/ui/mentor/profileCard"

function MentorList({ mentors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mentors.map((mentor) => (
        <ProfileCard key={mentor._id} mentor={mentor} />
      ))}
    </div>
  )
}
```

### With Search Results

```tsx
import ProfileCard from "@/components/ui/mentor/profileCard"

function SearchMentors({ initialMentors }) {
  const [filteredMentors, setFilteredMentors] = useState(initialMentors)

  return (
    <div className="grid gap-4">
      {filteredMentors.length > 0 ? (
        filteredMentors.map((mentor) => (
          <ProfileCard key={mentor._id} mentor={mentor} />
        ))
      ) : (
        <p>No mentors found</p>
      )}
    </div>
  )
}
```

## Styling

### Card Container
```css
w-full p-2 box-border
border-gray-200 rounded-lg border-2
flex-row
```

### Mentor Info Section
```css
flex p-4
```

### Avatar Sizes (Responsive)
```css
h-20 w-20       /* Mobile */
sm:h-32 sm:w-32 /* Small screens */
md:h-44 md:w-44 /* Medium+ screens */
```

### Name
```css
text-lg sm:text-2xl
```

### Location
```css
text-gray-400 items-center gap-x-2
text-xs sm:text-base
```

### College
```css
font-serif text-gray-700
text-sm sm:text-lg
```

### Actions Row
```css
items-center px-4 py-2 flex gap-x-4
```

## Conditional Rendering

| Element | Condition | Fallback |
|---------|-----------|----------|
| LinkedIn icon | `mentor.linkedin_url` exists | Not shown |
| Instagram icon | `mentor.insta_url` exists | Not shown |
| Profile picture | `mentor.profile_pic` exists | User placeholder |
| About text | `mentor.about` exists | Empty string |

## Performance

- **React.memo:** Prevents unnecessary re-renders when parent updates
- **Lazy loading:** Profile images use `loading="lazy"`
- **Cloudinary optimization:** Reduces image size/bandwidth

## Related Files

**Imports from:**
- `@/components/constants/icons`
- `@/components/constants/toggleLikeButton`
- `@/components/ui/button`
- `@/components/ui/avatar`
- `next/link`
- Static image: `/public/user-placeholder.png`

**Used by:**
- `app/explore-mentors/components/SearchMentors.tsx` - Mentor search results

## Notes

- Card links to `/mentor/[_id]` for full profile view
- Social links only shown if URL exists
- Like button state is local (not persisted)
- Memoization prevents re-renders unless `mentor` prop changes
- Avatar fallback shows default styling when image fails
