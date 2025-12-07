# Sign Up Page

**File:** `app/auth/sign-up/page.tsx`
**Type:** Page (Next.js App Router)
**Route:** `/auth/sign-up`
**Client/Server:** Client Component (`"use client"`)

## Overview

User registration page with form for creating a new account. Collects user details and integrates with AuthContext for registration. Includes Google sign-up button (UI only).

## Dependencies

| Package | Purpose |
|---------|---------|
| `lucide-react` | ArrowRight icon |
| `next/image` | Logo image |
| `react-toastify` | Success notification |

**Internal Dependencies:**
- `@/context/AuthContext` - `signUp` function, `ErrorMessage`, `setErrorMessage`

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `LogIn` | React.FC | Sign up page component (default export) |

## State Management

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `name` | `string` | `""` | Full name input |
| `email` | `string` | `""` | Email input |
| `password` | `string` | `""` | Password input |
| `mobile_number` | `string` | `""` | Mobile number (unused in form) |
| `userMessage` | `string` | `""` | Success message display |

## Internal Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `handleSubmit` | `e: React.FormEvent` | `Promise<void>` | Form submission handler |

## Form Fields

| Field | Type | Required | HTML ID |
|-------|------|----------|---------|
| Full Name | `text` | Yes | `name` |
| Email address | `email` | Yes | `email` |
| Password | `password` | Yes | `password` |

## Component Structure

```
<main>
  <section>
    <div> (centered container)
      ├── Logo Image
      ├── "Sign up to create account" heading
      ├── "Already have an account? Sign In" link
      ├── <form>
      │   ├── Full Name Input
      │   ├── Email Input
      │   ├── Password Input
      │   ├── Error/Success Message
      │   └── "Create Account" Button
      └── "Sign up with Google" Button (UI only)
    </div>
  </section>
</main>
```

## Registration Flow

```
User fills form
       ↓
Form submitted
       ↓
signUp({ name, email, password, mobile_number }) called
       ↓
   ┌───────┴───────┐
   ↓               ↓
Success         Failure
   ↓               ↓
Toast success   Display ErrorMessage
```

## Message Display

```tsx
{ErrorMessage ? (
  <div className="error-message text-center text-lg font-medium text-red-600">
    {ErrorMessage}
  </div>
) : (
  <div className="success-message text-center text-lg font-medium text-green-500">
    {userMessage}
  </div>
)}
```

## Error Messages

From AuthContext:
- "User with email already exists, Try logging in." (409 conflict)
- Generic error messages for other failures

## Usage

Navigate to `/auth/sign-up` to access this page.

```tsx
// Link from other pages
<Link href="/auth/sign-up">Sign Up</Link>

// From Navbar
<Button asChild>
  <Link href="/auth/sign-up">Sign Up</Link>
</Button>
```

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

### Submit Button
```css
inline-flex w-full items-center justify-center
rounded-md bg-black px-3.5 py-2.5
font-semibold leading-7 text-white
hover:bg-black/80
```

### Google Button
```css
relative inline-flex w-full items-center justify-center
rounded-md border border-gray-400 bg-white
px-3.5 py-2.5 font-semibold text-gray-700
hover:bg-gray-100
```

## Navigation Links

| Link | Route | Description |
|------|-------|-------------|
| Sign In | `#` | Login page (broken link) |

## API Integration

```tsx
await signUp({ name, email, password, mobile_number })
// Calls: POST /api/user/sign-up
```

## Related Files

**Imports from:**
- `@/context/AuthContext`
- `lucide-react`
- `next/image`
- `react-toastify`

**Assets:**
- `../../icon.png` (PreTest logo)

**Linked from:**
- Login page (`/auth/log-in`)
- Navbar sign up button

## Notes

- Google sign-up button is non-functional (UI placeholder)
- "Sign In" link has broken href (`#`)
- `mobile_number` field not displayed in form but passed to API
- Success shows toast notification
- Does not auto-redirect to login after successful registration
- Form fields use native inputs (not Input component)
- Component named `LogIn` but is actually sign-up page
