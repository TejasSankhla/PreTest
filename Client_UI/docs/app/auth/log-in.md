# Login Page

**File:** `app/auth/log-in/page.tsx`
**Type:** Page (Next.js App Router)
**Route:** `/auth/log-in`
**Client/Server:** Client Component (`"use client"`)

## Overview

User login page with email and password authentication. Integrates with AuthContext for authentication and displays error messages on failed attempts.

## Dependencies

| Package | Purpose |
|---------|---------|
| `lucide-react` | ArrowRight icon |
| `next/image` | Logo image |

**Internal Dependencies:**
- `@/context/AuthContext` - `login` function, `ErrorMessage`

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `LogIn` | React.FC | Login page component (default export) |

## State Management

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `email` | `string` | `""` | Email input value |
| `password` | `string` | `""` | Password input value |

## Internal Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `handleSubmit` | `e: React.FormEvent` | `Promise<void>` | Form submission handler |

## Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Email | `email` | Yes | Browser email validation |
| Password | `password` | Yes | None |

## Component Structure

```
<main>
  <section>
    <div> (centered container)
      ├── Logo Image
      ├── "Sign in to your account" heading
      ├── "Don't have an account?" link
      ├── <form>
      │   ├── Email Input
      │   ├── Password Input
      │   ├── Error Message (conditional)
      │   └── Submit Button
    </div>
  </section>
</main>
```

## Authentication Flow

```
User enters credentials
        ↓
Form submitted
        ↓
login({ email, password }) called
        ↓
    ┌───────┴───────┐
    ↓               ↓
Success          Failure
    ↓               ↓
Redirect to /   Display ErrorMessage
```

## Usage

Navigate to `/auth/log-in` to access this page.

```tsx
// Link from other pages
<Link href="/auth/log-in">Log in</Link>

// Programmatic navigation
router.push("/auth/log-in")
```

## Error Display

```tsx
{ErrorMessage && (
  <div className="err-msg text-red-500 text-center font-medium text-lg">
    {ErrorMessage}
  </div>
)}
```

Error messages from AuthContext:
- "Invalid credentials" (401)
- "User not found, please sign up" (404)
- Generic error messages

## Styling

### Container
```css
flex items-center justify-center
px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24
```

### Form Card
```css
xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md
```

### Input Fields
```css
flex h-10 w-full rounded-md border border-gray-300
bg-transparent px-3 py-2 text-sm
placeholder:text-gray-400
focus:outline-none focus:ring-1 focus:ring-gray-400
```

### Submit Button
```css
inline-flex w-full items-center justify-center
rounded-md bg-black px-3.5 py-2.5
font-semibold leading-7 text-white
hover:bg-black/80
```

## Navigation Links

| Link | Route | Description |
|------|-------|-------------|
| Create a free account | `/auth/sign-up` | Registration page |

## Related Files

**Imports from:**
- `@/context/AuthContext`
- `lucide-react`
- `next/image`

**Assets:**
- `../../icon.png` (PreTest logo)

**Linked to:**
- Sign Up page (`/auth/sign-up`)
- Navbar login button

## Notes

- No "forgot password" functionality implemented
- Uses native HTML inputs (not Input component)
- Successful login redirects to home via AuthContext
- Error messages persist until next login attempt
- Logo image uses relative import path
