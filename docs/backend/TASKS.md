# Backend Tasks

> NestJS APIs, database, auth, payments

---

## Active

### 1.1 Auth Security Review 🟡 50%
- [x] JWT implementation (secret, expiry, strategy)
- [x] Password hashing (bcrypt, configurable rounds)
- [x] JwtAuthGuard for protected routes
- [ ] Rate limiting on auth endpoints
- [ ] Token refresh mechanism
- [ ] Password strength validation

---

## Up Next

### 1.3 Pagination API
- [ ] Add `page` and `limit` params to GET /mentor
- [ ] Return pagination metadata (total, totalPages)
- [ ] Handle empty results

### 1.4 Forgot Password API
- [ ] Create PasswordResetToken schema
- [ ] POST /auth/forgot-password endpoint
- [ ] POST /auth/reset-password endpoint
- [ ] Rate limiting (3 requests/hour)

### 3.3 Search/Filter API
- [ ] Text search by name
- [ ] Filter by expertise (needs schema field)
- [ ] Filter by price range (needs schema field)
- [ ] Sort options (rating, price)

---

## Backlog

| ID | Task | Priority |
|----|------|----------|
| 3.1 | Google OAuth for user auth | P2 |
| 3.4 | Reviews API | P6 |
| 3.5 | Booking Reminders (cron) | P6 |
| 4.2 | Billing Architecture | P5 |
| 4.3 | Data Model Review | P1 |

---

## Notes

**Schema gaps identified:**
- Missing `expertise: string[]` field
- Missing `pricePerSession: number` field
- Missing `PasswordResetToken` model
- Missing `Review` model

**Email service:** ✅ Resend configured with booking confirmation templates
