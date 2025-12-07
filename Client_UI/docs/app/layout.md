# Root Layout

**File:** `app/layout.tsx`
**Type:** Layout (Next.js App Router)
**Client/Server:** Server Component

## Overview

Root layout component that wraps the entire application. Provides global providers, persistent navigation, consistent styling, and HTML document structure.

## Dependencies

| Package | Purpose |
|---------|---------|
| `next/font/google` | Google Fonts (Inter) |

**Internal Dependencies:**
- `@/components/ui/navbar` - Navigation header
- `@/components/ui/footer` - Page footer
- `@/context/AuthContext` - Authentication provider
- `./globals.css` - Global styles

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `metadata` | Metadata | Page metadata configuration |
| `RootLayout` | React.FC | Root layout component (default export) |

## Metadata

```typescript
export const metadata: Metadata = {
  title: "PreTest",
  description: "Get Test ready!, with PreTest",
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Page content to render |

## Component Structure

```
<html lang="en">
  <body className={inter.className}>
    <AuthProvider>
      <div className="flex flex-col min-h-screen max-w-full">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  </body>
</html>
```

## Layout Architecture

```
┌────────────────────────────────────────────┐
│                  Navbar                     │
│           (sticky, authentication-aware)    │
├────────────────────────────────────────────┤
│                                            │
│                   Main                     │
│            (flex-1, page content)          │
│                                            │
│          {children} - Page Routes          │
│                                            │
├────────────────────────────────────────────┤
│                  Footer                     │
│          (links, newsletter, social)       │
└────────────────────────────────────────────┘
```

## Features

### Global Providers
- **AuthProvider:** Wraps entire app for authentication state access

### Typography
- **Inter Font:** Google Font with Latin subset

### Layout Structure
- **Full height:** `min-h-screen` ensures footer stays at bottom
- **Flex column:** Allows main content to grow
- **Max width:** `max-w-full` prevents horizontal overflow

## Usage

This layout automatically wraps all pages in the `app/` directory.

```tsx
// Any page in app/ automatically uses this layout
// app/page.tsx
export default function HomePage() {
  return <div>Home content</div>
}
// Will be wrapped with Navbar, Footer, and AuthProvider
```

## Styling

### Body
```css
{inter.className}
/* Inter font applied to entire body */
```

### Container
```css
flex flex-col min-h-screen max-w-full
```

### Main Content
```css
flex-1
/* Grows to fill available space */
```

## Related Files

**Imports:**
- `@/components/ui/navbar`
- `@/components/ui/footer`
- `@/context/AuthContext`
- `./globals.css`

**Wraps:**
- All pages in `app/` directory

## Notes

- Single layout for entire application (no nested layouts used)
- Navbar is sticky (positioned at top while scrolling)
- Footer always at bottom due to flex layout
- AuthProvider enables `useAuth()` hook in any client component
- Global CSS imported here applies to all pages
