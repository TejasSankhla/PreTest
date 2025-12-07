# AuthContext

**File:** `context/AuthContext.tsx`
**Type:** Context Provider
**Client/Server:** Client Component (`"use client"`)

## Overview

React Context provider that manages authentication state throughout the application. Handles user login, registration, logout, and persists authentication state to localStorage.

## Dependencies

| Package | Purpose |
|---------|---------|
| `react` | Context API, hooks |
| `next/navigation` | Router for redirects |
| `axios` | HTTP requests |
| `react-toastify` | Toast notifications |

**Internal Dependencies:**
- `@/context/constants` - `Backend_Base_URL`

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `AuthProvider` | React.FC | Context provider component |
| `useAuth` | Hook | Access authentication context |

## TypeScript Interfaces

```typescript
interface User {
  /** Unique user identifier */
  id: string;
  /** User's display name */
  name: string;
  /** User's email address */
  email: string;
  /** Optional mobile number */
  mobile_number?: string;
}

interface Credentials {
  /** User's name (required for sign-up) */
  name?: string;
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
  /** Optional mobile number */
  mobile_number?: string;
}

interface AuthContextType {
  /** Current authenticated user or null */
  user: User | null;
  /** Login function */
  login: (credentials: Credentials) => Promise<void>;
  /** Sign up function */
  signUp: (credentials: Credentials) => Promise<void>;
  /** Logout function */
  logout: () => void;
  /** Current error message */
  ErrorMessage: string | null;
  /** Function to set error message */
  setErrorMessage: (msg: string) => void;
}
```

## Context Value

| Property | Type | Description |
|----------|------|-------------|
| `user` | `User \| null` | Current authenticated user |
| `login` | `Function` | Authenticate user with credentials |
| `signUp` | `Function` | Register new user |
| `logout` | `Function` | Clear authentication state |
| `ErrorMessage` | `string \| null` | Current error message |
| `setErrorMessage` | `Function` | Update error message |

## API Endpoints

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/user/sign-in` | `Credentials` | `{ success: boolean, data: User }` |
| POST | `/api/user/sign-up` | `Credentials` | `{ success: boolean, msg?: string }` |

## Usage Examples

### Wrapping Application

```tsx
// app/layout.tsx
import { AuthProvider } from "@/context/AuthContext"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### Using the Auth Hook

```tsx
"use client"
import { useAuth } from "@/context/AuthContext"

function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) {
    return <p>Please log in</p>
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Login Flow

```tsx
"use client"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"

function LoginForm() {
  const { login, ErrorMessage, setErrorMessage } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("") // Clear previous errors

    try {
      await login({ email, password })
      // Redirects to "/" on success
    } catch (error) {
      // ErrorMessage is already set by login function
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {ErrorMessage && <p className="text-red-500">{ErrorMessage}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

### Sign Up Flow

```tsx
"use client"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

function SignUpForm() {
  const { signUp, ErrorMessage, setErrorMessage } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile_number: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    try {
      await signUp(formData)
      toast.success("Account created successfully!")
      router.push("/auth/log-in")
    } catch (error) {
      // ErrorMessage is already set
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {ErrorMessage && <p className="text-red-500">{ErrorMessage}</p>}
      {/* Form fields */}
    </form>
  )
}
```

### Conditional Rendering Based on Auth

```tsx
"use client"
import { useAuth } from "@/context/AuthContext"

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <a href="/auth/log-in">Login</a>
          <a href="/auth/sign-up">Sign Up</a>
        </>
      )}
    </nav>
  )
}
```

## State Management

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `user` | `User \| null` | `null` | Current user (loaded from localStorage on mount) |
| `token` | `string` | `""` | JWT token (loaded from localStorage on mount) |
| `ErrorMessage` | `string` | `""` | Current error message |

## Error Handling

| HTTP Status | Error Message |
|-------------|---------------|
| 401 | "Invalid credentials" |
| 404 | "User not found, please sign up" |
| 409 | "User with email already exists, Try logging in." |
| Other | "Error: {status} - {message}" |
| Network | "An unexpected error occurred. Please try again later." |

## localStorage Keys

| Key | Value | Description |
|-----|-------|-------------|
| `user` | JSON string | Serialized user object |
| `token` | JSON string | JWT authentication token |

## Internal Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `login` | `credentials: Credentials` | `Promise<void>` | Authenticate and store user |
| `signUp` | `credentials: Credentials` | `Promise<void>` | Register new user |
| `logout` | none | `void` | Clear auth state and redirect |

## Related Files

**Imports from:**
- `@/context/constants` - `Backend_Base_URL`

**Used by:**
- `app/layout.tsx` - Provider wrapper
- `app/auth/log-in/page.tsx` - Login page
- `app/auth/sign-up/page.tsx` - Sign up page
- `app/profile/page.tsx` - User profile
- `app/profile/my-bookings/page.tsx` - User bookings
- `components/ui/navbar.tsx` - Navigation authentication state
- `components/ui/mentor/profile.tsx` - Booking authentication check

## Notes

- The context must be used within an `AuthProvider` - using `useAuth()` outside will throw an error
- User data and token persist across page reloads via localStorage
- On successful login, user is automatically redirected to home page (`/`)
- On logout, user is redirected to home page and localStorage is cleared
- The `token` state is currently stored but the Authorization header in requests uses the token from the existing state, not localStorage directly during the request
