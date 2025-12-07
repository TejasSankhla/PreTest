# Auth Routes

## Overview

Authentication routes for user login and registration. Both pages integrate with AuthContext for authentication state management.

## Routes

| Route | File | Description |
|-------|------|-------------|
| `/auth/log-in` | [log-in/page.tsx](./log-in.md) | User login |
| `/auth/sign-up` | [sign-up/page.tsx](./sign-up.md) | User registration |

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Flow                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   New User                          Existing User                │
│      │                                   │                       │
│      ▼                                   ▼                       │
│ ┌─────────┐                        ┌─────────┐                   │
│ │ Sign Up │                        │  Login  │                   │
│ └────┬────┘                        └────┬────┘                   │
│      │                                   │                       │
│      │ POST /api/user/sign-up           │ POST /api/user/sign-in│
│      │                                   │                       │
│      ▼                                   ▼                       │
│ ┌─────────┐                        ┌─────────┐                   │
│ │ Success │                        │ Success │                   │
│ └────┬────┘                        └────┬────┘                   │
│      │                                   │                       │
│      │ Toast notification                │ Store in localStorage │
│      │                                   │ Redirect to /         │
│      ▼                                   │                       │
│ Navigate to Login ◄──────────────────────┘                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## API Endpoints

| Endpoint | Method | Body | Response |
|----------|--------|------|----------|
| `/api/user/sign-in` | POST | `{ email, password }` | User data + token |
| `/api/user/sign-up` | POST | `{ name, email, password, mobile_number }` | Success message |

## Form Fields

### Login

| Field | Type | Required |
|-------|------|----------|
| Email | email | Yes |
| Password | password | Yes |

### Sign Up

| Field | Type | Required |
|-------|------|----------|
| Full Name | text | Yes |
| Email | email | Yes |
| Password | password | Yes |

## Error Handling

| HTTP Status | Error Message |
|-------------|---------------|
| 401 | Invalid credentials |
| 404 | User not found, please sign up |
| 409 | User with email already exists |

## Page Features

### Login Page
- Email/password form
- Error message display
- Link to sign up

### Sign Up Page
- Registration form
- Error/success messages
- Toast notification on success
- Google sign-up button (UI only)

## Shared Elements

- PreTest logo
- Consistent form styling
- Error message display
- Centered card layout

## Related Files

- `context/AuthContext.tsx` - Authentication state
- `components/ui/navbar.tsx` - Auth buttons
