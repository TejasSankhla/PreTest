# Avatar

**File:** `components/ui/avatar.tsx`
**Type:** Component
**Client/Server:** Client Component (`"use client"`)

## Overview

User avatar component built on Radix UI Avatar primitives. Displays user profile images with automatic fallback support when images fail to load. Commonly used for displaying user profile pictures throughout the application.

## Dependencies

| Package | Purpose |
|---------|---------|
| `@radix-ui/react-avatar` | Accessible avatar primitives |

**Internal Dependencies:**
- `@/lib/utils` - `cn()` for class merging

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Avatar` | React.ForwardRefExoticComponent | Container component |
| `AvatarImage` | React.ForwardRefExoticComponent | Image element |
| `AvatarFallback` | React.ForwardRefExoticComponent | Fallback content |

## TypeScript Interfaces

```typescript
// Avatar extends Radix Avatar Root props
type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>

// AvatarImage extends Radix Avatar Image props
type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>

// AvatarFallback extends Radix Avatar Fallback props
type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
```

## Props

### Avatar (Container)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `AvatarPrimitive.Root` | No | - | Radix Avatar Root props |

### AvatarImage

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | `string` | Yes | - | Image source URL |
| `alt` | `string` | Yes | - | Alt text for accessibility |
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `AvatarPrimitive.Image` | No | - | Radix Avatar Image props |

### AvatarFallback

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `delayMs` | `number` | No | - | Delay before showing fallback |
| `className` | `string` | No | - | Additional CSS classes |
| `children` | `ReactNode` | No | - | Fallback content (initials, icon) |
| `...props` | `AvatarPrimitive.Fallback` | No | - | Radix Avatar Fallback props |

## Usage Examples

### Basic Avatar with Fallback

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/user.jpg" alt="User profile" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### With User Initials Fallback

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

function UserAvatar({ user }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Avatar>
      <AvatarImage src={user.profilePic} alt={`${user.name}'s profile`} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
```

### Different Sizes

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Small (default is h-10 w-10)
<Avatar className="h-8 w-8">
  <AvatarImage src="/user.jpg" alt="Small avatar" />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

// Medium
<Avatar className="h-12 w-12">
  <AvatarImage src="/user.jpg" alt="Medium avatar" />
  <AvatarFallback>MD</AvatarFallback>
</Avatar>

// Large
<Avatar className="h-16 w-16">
  <AvatarImage src="/user.jpg" alt="Large avatar" />
  <AvatarFallback>LG</AvatarFallback>
</Avatar>

// Extra Large (as used in mentor profile)
<Avatar className="h-36 w-36 sm:h-48 sm:w-48 border-8 border-orange-400">
  <AvatarImage src={mentor.profile_pic} alt={mentor.name} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### With Border/Ring

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<Avatar className="ring-2 ring-blue-500 ring-offset-2">
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```

### Avatar Group

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<div className="flex -space-x-4">
  {users.map((user) => (
    <Avatar key={user.id} className="border-2 border-white">
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>{user.initials}</AvatarFallback>
    </Avatar>
  ))}
</div>
```

### With Icon Fallback

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"

<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>
    <User className="h-4 w-4" />
  </AvatarFallback>
</Avatar>
```

### In Navbar Dropdown

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>
    <Avatar className="cursor-pointer">
      <AvatarImage src={user.profilePic} alt={user.name} />
      <AvatarFallback>
        {user.name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  </DropdownMenuTrigger>
  {/* ... dropdown content */}
</DropdownMenu>
```

### With Object-Fit Cover

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<Avatar className="h-48 w-48">
  <AvatarImage
    src={profilePic}
    alt="Profile"
    className="object-cover w-full h-full"
  />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Styling

### Avatar Container
```css
relative flex h-10 w-10
shrink-0 overflow-hidden rounded-full
```

### AvatarImage
```css
aspect-square h-full w-full
```

### AvatarFallback
```css
flex h-full w-full items-center justify-center
rounded-full bg-muted
```

## How Fallback Works

1. Image starts loading
2. If image loads successfully, it's displayed
3. If image fails to load (or no src provided), fallback is shown
4. Optional `delayMs` prop delays fallback appearance (useful for fast connections)

## Related Files

**Imports from:**
- `@radix-ui/react-avatar`
- `@/lib/utils`

**Used by:**
- `components/ui/navbar.tsx` - User dropdown trigger
- `components/ui/mentor/profile.tsx` - Large mentor avatar
- `components/ui/mentor/profileCard.tsx` - Mentor card avatar
- `app/profile/page.tsx` - User profile avatar
- `app/profile/my-bookings/page.tsx` - Booking list avatars

## Accessibility

- Radix UI provides proper accessibility attributes
- Always provide meaningful `alt` text for AvatarImage
- Fallback content (initials) should be meaningful
- Screen readers announce image alt or fallback content
