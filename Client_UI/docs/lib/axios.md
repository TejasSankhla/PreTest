# Axios Instance

**File:** `lib/axios.ts`
**Type:** Configuration / HTTP Client
**Client/Server:** Server Compatible

## Overview

Pre-configured Axios instance for making HTTP requests to the backend API. Provides consistent default settings for all API calls including base URL, timeout, and headers.

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `axios` | 1.7.4 | HTTP client |

**Internal Dependencies:**
- `@/context/constants` - Backend base URL configuration

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `api` | AxiosInstance | Configured axios instance (default export) |

## Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| `baseURL` | `NEXT_PUBLIC_API_BASE_URL` or `Backend_Base_URL/api/` | API endpoint base |
| `timeout` | `10000` (10 seconds) | Request timeout in milliseconds |
| `Content-Type` | `application/json` | Default content type header |

## Usage Examples

### Basic GET Request

```tsx
import api from "@/lib/axios"

// Fetch all mentors
const fetchMentors = async () => {
  try {
    const response = await api.get("/mentor/")
    return response.data
  } catch (error) {
    console.error("Failed to fetch mentors:", error)
    throw error
  }
}
```

### GET Request with Parameters

```tsx
import api from "@/lib/axios"

// Fetch specific mentor
const fetchMentor = async (mentorId: string) => {
  const response = await api.get(`/mentor/${mentorId}`)
  return response.data
}
```

### POST Request

```tsx
import api from "@/lib/axios"

interface LoginCredentials {
  email: string
  password: string
}

const login = async (credentials: LoginCredentials) => {
  const response = await api.post("/user/sign-in", credentials)
  return response.data
}
```

### POST Request with Authorization

```tsx
import api from "@/lib/axios"

const createOrder = async (amount: number, token: string) => {
  const response = await api.post(
    "/order/create-order",
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}
```

### Error Handling Pattern

```tsx
import api from "@/lib/axios"
import axios from "axios"

const fetchData = async () => {
  try {
    const response = await api.get("/endpoint")
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      if (error.response?.status === 401) {
        console.error("Unauthorized")
      } else if (error.response?.status === 404) {
        console.error("Not found")
      } else {
        console.error(`Error: ${error.response?.status} - ${error.message}`)
      }
    } else {
      // Handle non-Axios errors
      console.error("Unexpected error:", error)
    }
    throw error
  }
}
```

## TypeScript Types

```typescript
import { AxiosInstance, AxiosResponse, AxiosError } from "axios"

// Response type helper
interface ApiResponse<T> {
  success: boolean
  data: T
  msg?: string
}

// Usage with typed response
const fetchMentor = async (id: string): Promise<ApiResponse<Mentor>> => {
  const response: AxiosResponse<ApiResponse<Mentor>> = await api.get(`/mentor/${id}`)
  return response.data
}
```

## Related Files

**Imports from:**
- `axios` (external package)
- `@/context/constants` - `Backend_Base_URL`

**Used by:**
- `app/explore-mentors/page.tsx` - Fetching mentors list
- `context/AuthContext.tsx` - Authentication requests (uses raw axios, could use this)
- `components/ui/mentor/profile.tsx` - Order creation

## Notes

- The instance uses a fallback to `Backend_Base_URL/api/` if `NEXT_PUBLIC_API_BASE_URL` is not set
- Timeout is set to 10 seconds to handle slow connections
- Currently does not include request/response interceptors for token injection or error handling
- For authenticated requests, the token must be manually added to headers

## Source Code

```typescript
import { Backend_Base_URL } from "@/context/constants";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || `${Backend_Base_URL}/api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```
