# Navbar

**File:** `components/ui/navbar.tsx`
**Type:** Component
**Client/Server:** Client Component (`"use client"`)

## Overview

Responsive navigation bar component with authentication-aware rendering. Displays different navigation options based on user authentication state. Features a desktop dropdown menu for authenticated users and a mobile hamburger menu with click-outside detection.

## Dependencies

| Package | Purpose |
|---------|---------|
| `next/image` | Optimized logo image |
| `next/link` | Client-side navigation |
| `next/navigation` | Router for programmatic navigation |
| `lucide-react` | Menu icons (MenuIcon, XIcon) |

**Internal Dependencies:**
- `@/context/AuthContext` - `useAuth` hook
- `@/components/ui/dropdown-menu` - Desktop user menu
- `@/components/ui/button` - Navigation buttons
- `@/components/ui/avatar` - User avatar display

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Navbar` | React.FC | Main navbar component (default export) |

## State Management

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `isMobileMenuOpen` | `boolean` | `false` | Controls mobile menu visibility |

## Internal Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `toggleMobileMenu` | - | `void` | Toggles mobile menu open/closed |
| `handleClickOutside` | `event: MouseEvent` | `void` | Closes mobile menu on outside click |

## Component Structure

```
<header>
  ├── <div> (container)
  │   ├── <Link> (logo)
  │   ├── <nav> (desktop navigation - hidden on mobile)
  │   │   ├── <Link> Home
  │   │   └── {user ? <DropdownMenu> : <AuthButtons>}
  │   └── <Button> (mobile hamburger - hidden on desktop)
  └── {isMobileMenuOpen && <MobileMenu>}
</header>
```

## Navigation Items

### Desktop (Authenticated)

| Item | Route | Action |
|------|-------|--------|
| Home | `/` | Navigate |
| My Account | `/profile` | Navigate (dropdown) |
| Bookings | `/profile/my-bookings` | Navigate (dropdown) |
| Logout | - | `logout()` (dropdown) |

### Desktop (Unauthenticated)

| Item | Route | Style |
|------|-------|-------|
| Home | `/` | Link |
| Sign Up | `/auth/sign-up` | Blue button |
| Log in | `/auth/log-in` | Gray button |

### Mobile Menu

Same items as desktop, displayed vertically in a dropdown panel.

## Usage Examples

### In Layout

```tsx
// app/layout.tsx
import Navbar from "@/components/ui/navbar"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

### Authentication Integration

The navbar automatically responds to authentication state:

```tsx
// Internal implementation
const { user, logout } = useAuth()

{user ? (
  // Show avatar dropdown with profile links
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage src="/user-placeholder.png" />
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>My Account</DropdownMenuItem>
      <DropdownMenuItem>Bookings</DropdownMenuItem>
      <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
) : (
  // Show Sign Up and Log in buttons
  <>
    <Button asChild>
      <Link href="/auth/sign-up">Sign Up</Link>
    </Button>
    <Button asChild>
      <Link href="/auth/log-in">Log in</Link>
    </Button>
  </>
)}
```

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `< md` (mobile) | Shows hamburger menu, hides desktop nav |
| `>= md` (desktop) | Shows full navigation, hides hamburger |

## Click Outside Detection

```tsx
// Sets up event listener on mount
useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside)
  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [])

// Closes menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)) {
    setIsMobileMenuOpen(false)
  }
}
```

## Styling

### Header
```css
bg-secondary sticky top-0 z-50
text-black py-4 shadow
border-b border-gray
```

### Mobile Menu Panel
```css
md:hidden absolute top-16 right-0
w-1/2 rounded-lg bg-white
shadow-lg border-2 border-gray-200
```

### Desktop Nav
```css
hidden md:flex justify-center
space-x-6 items-center
```

## Related Files

**Imports from:**
- `@/context/AuthContext`
- `@/components/ui/dropdown-menu`
- `@/components/ui/button`
- `@/components/ui/avatar`
- `lucide-react`
- `next/image`
- `next/link`
- `next/navigation`

**Used by:**
- `app/layout.tsx` - Root layout wrapper

## Assets Used

| Asset | Path | Description |
|-------|------|-------------|
| Logo | `/logo_bg.png` | Application logo |
| Avatar | `/user-placeholder.png` | Default user avatar |

## Notes

- Sticky positioning keeps navbar visible while scrolling
- Mobile menu auto-closes on:
  - Link click (except logout)
  - Click outside the menu
  - Logout action
- Avatar dropdown uses `router.push()` for navigation
- Z-index of 50 ensures navbar stays above other content
