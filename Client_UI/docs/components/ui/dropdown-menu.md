# Dropdown Menu

**File:** `components/ui/dropdown-menu.tsx`
**Type:** Component
**Client/Server:** Client Component (`"use client"`)

## Overview

Accessible dropdown menu component built on Radix UI primitives. Supports items, checkboxes, radio groups, sub-menus, labels, separators, and keyboard shortcuts. Used throughout the application for action menus and navigation dropdowns.

## Dependencies

| Package | Purpose |
|---------|---------|
| `@radix-ui/react-dropdown-menu` | Accessible dropdown primitives |
| `lucide-react` | Icons (Check, ChevronRight, Circle) |

**Internal Dependencies:**
- `@/lib/utils` - `cn()` for class merging

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `DropdownMenu` | Component | Root component (controls open state) |
| `DropdownMenuTrigger` | Component | Trigger element |
| `DropdownMenuContent` | Component | Dropdown content container |
| `DropdownMenuItem` | Component | Menu item |
| `DropdownMenuCheckboxItem` | Component | Checkable menu item |
| `DropdownMenuRadioItem` | Component | Radio menu item |
| `DropdownMenuLabel` | Component | Section label |
| `DropdownMenuSeparator` | Component | Visual divider |
| `DropdownMenuShortcut` | Component | Keyboard shortcut hint |
| `DropdownMenuGroup` | Component | Group of items |
| `DropdownMenuPortal` | Component | Portal wrapper |
| `DropdownMenuSub` | Component | Sub-menu root |
| `DropdownMenuSubContent` | Component | Sub-menu content |
| `DropdownMenuSubTrigger` | Component | Sub-menu trigger |
| `DropdownMenuRadioGroup` | Component | Radio group wrapper |

## Key Props

### DropdownMenuContent

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `sideOffset` | `number` | No | `4` | Distance from trigger |
| `align` | `"start" \| "center" \| "end"` | No | `"center"` | Alignment relative to trigger |
| `className` | `string` | No | - | Additional CSS classes |

### DropdownMenuItem

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `inset` | `boolean` | No | `false` | Add left padding (for icon alignment) |
| `disabled` | `boolean` | No | `false` | Disable the item |
| `onSelect` | `function` | No | - | Selection handler |
| `className` | `string` | No | - | Additional CSS classes |

### DropdownMenuCheckboxItem

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `checked` | `boolean` | No | - | Checked state |
| `onCheckedChange` | `function` | No | - | State change handler |

### DropdownMenuSubTrigger

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `inset` | `boolean` | No | `false` | Add left padding |

## Usage Examples

### Basic Dropdown

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### With Labels and Separators

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### User Avatar Dropdown (as used in Navbar)

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

<DropdownMenu>
  <DropdownMenuTrigger className="focus:outline-none">
    <Avatar className="cursor-pointer">
      <AvatarImage src={user?.profilePic} alt={user?.name} />
      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
    </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>
      <Link href="/profile">My Account</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Link href="/profile/my-bookings">Bookings</Link>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={logout}>
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### With Checkbox Items

```tsx
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

function FilterDropdown() {
  const [showActive, setShowActive] = useState(true)
  const [showArchived, setShowArchived] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Filter</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={showActive}
          onCheckedChange={setShowActive}
        >
          Show Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showArchived}
          onCheckedChange={setShowArchived}
        >
          Show Archived
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### With Radio Items

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

function SortDropdown() {
  const [sort, setSort] = useState("date")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Sort By</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### With Sub-menu

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>Options</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>New</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Email</DropdownMenuItem>
        <DropdownMenuItem>Twitter</DropdownMenuItem>
        <DropdownMenuItem>LinkedIn</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### With Keyboard Shortcuts

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>File</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      New
      <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Save
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Disabled Items

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem disabled>Delete (disabled)</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Styling

### DropdownMenuContent
```css
z-50 min-w-[8rem] overflow-hidden
rounded-md border bg-popover p-1
text-popover-foreground shadow-md
/* Animation classes for open/close */
data-[state=open]:animate-in
data-[state=closed]:animate-out
```

### DropdownMenuItem
```css
relative flex cursor-default select-none items-center
rounded-sm px-2 py-1.5 text-sm outline-none
transition-colors
focus:bg-accent focus:text-accent-foreground
data-[disabled]:pointer-events-none data-[disabled]:opacity-50
```

## Related Files

**Imports from:**
- `@radix-ui/react-dropdown-menu`
- `lucide-react`
- `@/lib/utils`

**Used by:**
- `components/ui/navbar.tsx` - User account dropdown

## Accessibility

- Full keyboard navigation (Arrow keys, Enter, Escape)
- Focus management (returns focus to trigger on close)
- Screen reader announcements
- Type-ahead search for items
- Proper ARIA attributes automatically applied
