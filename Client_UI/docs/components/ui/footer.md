# Footer

**File:** `components/ui/footer.tsx`
**Type:** Component
**Client/Server:** Server Compatible (no "use client" directive)

## Overview

Application footer component with newsletter subscription form, navigation links, social media links, and policy pages. Provides consistent bottom navigation across all pages.

## Dependencies

| Package | Purpose |
|---------|---------|
| `next/image` | Optimized logo images |
| `next/link` | Client-side navigation |
| `lucide-react` | ChevronRight icon |

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Footer` | React.FC | Footer component (default export) |

## Component Structure

```
<footer>
  ├── Header Section
  │   ├── Logo (pretest icon)
  │   └── "Get Started" CTA (desktop only)
  │
  ├── <hr> Divider
  │
  └── Main Content
      ├── Newsletter Section
      │   ├── Heading
      │   └── Email Form
      │
      └── Link Grid (3 columns)
          ├── About Links
          ├── Social Links
          └── Policy Links
```

## Navigation Links

### About Section

| Link | Route | Description |
|------|-------|-------------|
| About us | `/#` | About page (placeholder) |
| Our Team | `/#` | Team page (placeholder) |
| Our Vision | `/#` | Vision page (placeholder) |

### Social Section

| Link | URL | Target |
|------|-----|--------|
| Instagram | `https://www.instagram.com/_txjas/` | `_blank` |
| Twitter | `https://x.com/SankhlaTejas` | `_blank` |
| LinkedIn | `https://www.linkedin.com/in/tejasdev/` | `_blank` |

### Policies Section

| Link | Route | Description |
|------|-------|-------------|
| Privacy Policy | `/privacy-policy` | Privacy policy page |
| Terms & Conditions | `/terms-and-conditions` | Terms page |
| Cancellation & Refund | `/refunds` | Refund policy page |

## Usage Examples

### In Layout

```tsx
// app/layout.tsx
import Footer from "@/components/ui/footer"

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Newsletter Form (Current Implementation)

```tsx
<form action="" className="mt-4 inline-flex w-full items-center md:w-3/4">
  <input
    className="flex h-10 w-full rounded-md border border-black/20 ..."
    type="email"
    placeholder="Email"
  />
  <button
    type="button"
    className="ml-4 rounded-full bg-black px-3 py-3 ..."
  >
    <ChevronRight className="h-4 w-4" />
  </button>
</form>
```

## Styling

### Container
```css
w-full p-8
```

### Header Section
```css
mx-auto flex max-w-6xl items-center
justify-between px-4 py-2 lg:px-0
```

### Link Grid
```css
grid grid-cols-2 gap-6
md:mt-0 lg:w-3/4 lg:grid-cols-3
```

### Link Columns
```css
/* Section Title */
text-lg font-semibold text-gray-700

/* Links */
text-[14px] font-medium text-gray-500
```

### Get Started Button
```css
rounded-md bg-black px-3 py-2
text-sm font-semibold text-white
shadow-sm hover:bg-black/80
```

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile | 2-column link grid, newsletter full width |
| `md` | 3-column link grid, "Get Started" CTA visible |
| `lg` | Max-width container, optimized spacing |

## Assets Used

| Asset | Path | Size | Description |
|-------|------|------|-------------|
| Icon | `/icon.png` | 60x20 | Small PreTest icon |
| Logo | `/logo_bg.png` | - | Full logo (imported but not used) |

## Related Files

**Imports from:**
- `lucide-react`
- `next/image`
- `next/link`

**Used by:**
- `app/layout.tsx` - Root layout wrapper

## Notes

- Newsletter form is currently non-functional (no action handler)
- Social links open in new tabs (`target="_blank"`)
- About links are placeholders (link to `/#`)
- Policy links connect to legal pages in `app/(legal)/`
- Logo uses imported static image for optimization
- "Get Started" CTA hidden on mobile devices
