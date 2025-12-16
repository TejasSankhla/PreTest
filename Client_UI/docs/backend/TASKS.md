# Backend Developer Tasks

> **Role:** NestJS APIs, database, authentication, payments, infrastructure
> **Primary Focus:** APIs, data layer, security, integrations

---

## Task Overview by Priority

| Priority | Tasks | Total Hours |
|----------|-------|-------------|
| P0 | 2 tasks | 4-6h |
| P1 | 4 tasks | 8-11h |
| P2 | 1 task | 3-4h |
| P5 | 2 tasks | 8-10h |
| P6 | 2 tasks | 6-8h |
| **Total** | **11 tasks** | **29-39h** |

---

## P0 - Critical (Do First)

### 0.3 E2E Flow Testing (with Frontend) - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 0 |
| **Hours** | 1-2h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Support frontend testing by ensuring backend is running and test data exists.

**Tasks:**
- [ ] Ensure backend running in development mode
- [ ] Verify test mentor data exists in database
- [ ] Verify Razorpay test mode credentials work
- [ ] Support debugging any API issues found
- [ ] Document any backend bugs discovered

**Coordination:** Work with Frontend Dev to test full flow

---

### 1.1 Auth Logic & Security Review - P0
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 3-4h |
| **Dependencies** | 0.3 E2E Testing results |
| **Status** | [ ] Not Started |

**Description:**
Review and harden the authentication system.

**Tasks:**
- [ ] Audit JWT implementation (algorithm, expiration, secret)
- [ ] Review token refresh mechanism
- [ ] Implement/verify rate limiting on auth endpoints
- [ ] Add proper error codes for auth failures
- [ ] Review password hashing (bcrypt rounds)
- [ ] Add password strength validation
- [ ] Review protected route middleware
- [ ] Audit session invalidation on logout
- [ ] Document auth flow for frontend

**Security Checklist:**
- [ ] JWT secret is strong and env-based
- [ ] Token expiration is reasonable (15-30 min)
- [ ] Refresh tokens implemented securely
- [ ] Rate limiting prevents brute force
- [ ] Passwords hashed with bcrypt (12+ rounds)
- [ ] No sensitive data in JWT payload

---

## P1 - High Priority

### 1.3 Pagination API - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 1-2h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Add pagination to mentor listing endpoint.

**Tasks:**
- [ ] Add pagination params to `GET /api/mentor/`
- [ ] Support `page` and `limit` query params
- [ ] Return total count for frontend pagination
- [ ] Add cursor-based pagination option (for infinite scroll)
- [ ] Document API in response

**API Response Format:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 47,
    "totalPages": 5
  }
}
```

---

### 3.3 Search/Filter API - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 3 |
| **Hours** | 2-3h |
| **Dependencies** | None |
| **Status** | [ ] Not Started |

**Description:**
Add search and filtering to mentor endpoints.

**Tasks:**
- [ ] Add text search by name/bio
- [ ] Add filter by expertise/skills
- [ ] Add filter by price range (min/max)
- [ ] Add filter by availability (has slots this week)
- [ ] Add sort options (rating, price, sessions)
- [ ] Optimize with database indexes
- [ ] Document API parameters

**API Parameters:**
```
GET /api/mentor/
  ?search=john
  &expertise=DSA,System Design
  &minPrice=500
  &maxPrice=2000
  &hasAvailability=true
  &sort=rating:desc
  &page=1
  &limit=10
```

---

### 4.3 Data Model Review (with Manager) - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 4 |
| **Hours** | 2-3h |
| **Dependencies** | 4.1, 4.2 |
| **Status** | [ ] Not Started |

**Description:**
Review and plan database schema for upcoming features.

**Tasks:**
- [ ] Audit current Prisma schema
- [ ] Identify missing entities (reviews, subscriptions)
- [ ] Plan schema for AI interview sessions
- [ ] Plan indexes for performance
- [ ] Document migration plan
- [ ] Consider data relationships

**Deliverable:** `docs/backend/DATA_MODEL.md`

---

### 1.4 Forgot Password API - P1
| Attribute | Details |
|-----------|---------|
| **Sprint** | 1 |
| **Hours** | 3-4h |
| **Dependencies** | Email service (3.2 Email setup or basic SMTP) |
| **Status** | [ ] Not Started |

**Description:**
Implement forgot/reset password API endpoints for account recovery.

**Tasks:**
- [ ] Create password reset token model/schema
- [ ] Implement `POST /api/auth/forgot-password` endpoint
  - Validate email exists
  - Generate secure reset token (crypto.randomBytes)
  - Set token expiration (1 hour recommended)
  - Store token in database (hashed)
  - Send reset email with token link
  - Return success even if email doesn't exist (security)
- [ ] Implement `POST /api/auth/reset-password` endpoint
  - Validate token and expiration
  - Validate new password strength
  - Hash new password
  - Update user password
  - Invalidate reset token
  - Return success response
- [ ] Add rate limiting (prevent abuse)
  - Max 3 reset requests per hour per email
  - Max 5 token validation attempts
- [ ] Add proper error handling
- [ ] Write API documentation

**Database Schema Addition:**
```prisma
model PasswordResetToken {
  id        String   @id @default(uuid())
  token     String   @unique // hashed token
  userId    String
  expiresAt DateTime
  createdAt DateTime @default(now())
  used      Boolean  @default(false)

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([token])
  @@index([userId])
}
```

**API Endpoints:**

**1. Request Password Reset**
```
POST /api/auth/forgot-password
Body: { email: string }
Response: { message: "If email exists, reset link sent" }
```

**2. Reset Password**
```
POST /api/auth/reset-password
Body: {
  token: string,
  newPassword: string
}
Response: { message: "Password reset successful" }
```

**Email Template:**
```
Subject: Reset Your PreTest Password

Hi {name},

You requested to reset your password. Click the link below to reset it:

{resetLink}

This link expires in 1 hour.

If you didn't request this, ignore this email.

- PreTest Team
```

**Security Notes:**
- [ ] Hash tokens before storing (bcrypt or SHA-256)
- [ ] Always return success message (don't leak email existence)
- [ ] Implement rate limiting
- [ ] Set short expiration (1 hour max)
- [ ] Invalidate token after use
- [ ] Log password reset attempts

---

## P2 - Medium Priority

### 3.1 Google OAuth Integration - P2
| Attribute | Details |
|-----------|---------|
| **Sprint** | 3 |
| **Hours** | 3-4h |
| **Dependencies** | 1.1 Auth review complete |
| **Status** | [ ] Not Started |

**Description:**
Implement Google OAuth backend support.

**Tasks:**
- [ ] Setup Google Cloud OAuth credentials
- [ ] Implement OAuth callback endpoint
- [ ] Handle account creation for new users
- [ ] Handle account linking for existing emails
- [ ] Store OAuth tokens securely
- [ ] Return JWT on successful auth
- [ ] Document setup for frontend

**Endpoint:**
```
POST /api/auth/google
  Body: { idToken: string }
  Response: { token: string, user: User }
```

---

## P5 - Future Consideration

### 3.2 Email Notifications Setup - P5
| Attribute | Details |
|-----------|---------|
| **Sprint** | 3 |
| **Hours** | 5-6h |
| **Dependencies** | Email service provider (Resend/SendGrid) |
| **Status** | [ ] Not Started |

**Description:**
Implement transactional email system.

**Tasks:**
- [ ] Setup email service (Resend recommended)
- [ ] Create email templates folder structure
- [ ] Template: Welcome email on signup
- [ ] Template: Booking confirmation
- [ ] Template: 24h booking reminder
- [ ] Template: Session completed (feedback request)
- [ ] Template: Password reset
- [ ] Add email sending service class
- [ ] Trigger emails on appropriate events
- [ ] Add email queue for reliability (optional)
- [ ] Test email delivery

**Email Templates Needed:**
| Template | Trigger Event |
|----------|---------------|
| Welcome | User signup |
| Booking Confirmed | Order completed |
| Reminder (24h) | Cron job |
| Session Complete | After meeting time |
| Password Reset | Reset request |

---

### 4.2 Billing Architecture (with Manager) - P5
| Attribute | Details |
|-----------|---------|
| **Sprint** | 4 |
| **Hours** | 3-4h |
| **Dependencies** | 0.1 Platform Direction |
| **Status** | [ ] Not Started |

**Description:**
Design billing system architecture for future implementation.

**Tasks:**
- [ ] Review current Razorpay integration
- [ ] Document payment flow and webhooks
- [ ] Design subscription model if needed
- [ ] Plan mentor payout system
- [ ] Design refund flow
- [ ] Plan invoice generation
- [ ] Document database schema changes

**Deliverable:** `docs/backend/BILLING_ARCHITECTURE.md`

---

## P6 - Future

### 3.4 Reviews API - P6
| Attribute | Details |
|-----------|---------|
| **Sprint** | 3 |
| **Hours** | 3-4h |
| **Dependencies** | Session completion tracking |
| **Status** | [ ] Not Started |

**Description:**
Implement reviews and ratings system.

**Tasks:**
- [ ] Create Review schema/model
- [ ] Add `POST /api/reviews` - Create review
- [ ] Add `GET /api/mentor/:id/reviews` - Get mentor reviews
- [ ] Add `GET /api/reviews/can-review/:bookingId` - Check if can review
- [ ] Calculate average rating on mentor
- [ ] Update mentor rating on new review
- [ ] Add validation (1 review per booking)

**Database Schema:**
```prisma
model Review {
  id        String   @id @default(uuid())
  rating    Int      // 1-5
  comment   String?
  userId    String
  mentorId  String
  bookingId String   @unique
  createdAt DateTime @default(now())

  user    User    @relation(fields: [userId], references: [id])
  mentor  Mentor  @relation(fields: [mentorId], references: [id])
  booking Booking @relation(fields: [bookingId], references: [id])
}
```

---

### 3.5 Booking Reminders (Cron Jobs) - P6
| Attribute | Details |
|-----------|---------|
| **Sprint** | 3 |
| **Hours** | 3-4h |
| **Dependencies** | 3.2 Email setup |
| **Status** | [ ] Not Started |

**Description:**
Implement scheduled booking reminders.

**Tasks:**
- [ ] Setup cron job scheduler (node-cron or NestJS Schedule)
- [ ] Query upcoming bookings (24h ahead)
- [ ] Send reminder emails
- [ ] Query upcoming bookings (1h ahead)
- [ ] Send final reminder emails
- [ ] Log reminder sends
- [ ] Handle timezone considerations

**Cron Schedule:**
```
// Run every hour
0 * * * * -> Check for bookings 24h away
0 * * * * -> Check for bookings 1h away
```

---

## Sprint Schedule

| Sprint | Focus | Hours |
|--------|-------|-------|
| **Sprint 0** | E2E Testing support | 1-2h |
| **Sprint 1** | Auth security, Pagination API, Forgot Password API | 7-10h |
| **Sprint 3** | Search API, Google OAuth, Email (P5), Reviews (P6), Reminders (P6) | 16-21h |
| **Sprint 4** | Data Model, Billing Architecture | 5-7h |

---

## Key Dependencies

```
Sprint 0 E2E Testing ──> Auth Security Review
                               │
Auth Review ───────────────────┴──> Google OAuth

Email Service Setup ──> Booking Reminders

Platform Direction ──> Billing Architecture ──> Data Model Review
```

---

## Infrastructure Notes

**Current Stack:**
- NestJS backend
- PostgreSQL database
- Prisma ORM
- Razorpay payments
- JWT authentication

**Environment Variables Needed:**
```env
# Email (Resend)
RESEND_API_KEY=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Existing
DATABASE_URL=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## API Endpoints Reference

**Existing:**
- `POST /api/user/sign-in`
- `POST /api/user/sign-up`
- `GET /api/mentor/`
- `GET /api/mentor/:id`
- `GET /api/mentor/:id/available-slots`
- `POST /api/order/create`
- `POST /api/booking/create`
- `GET /api/booking/upcoming/:userId`
- `GET /api/booking/previous/:userId`

**To Add:**
- `POST /api/auth/google` (OAuth)
- `GET /api/mentor/?page&limit&search&...` (pagination/filter)
- `POST /api/reviews` (create review)
- `GET /api/mentor/:id/reviews` (get reviews)
