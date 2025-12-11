# NestJS Backend Code Review Guidelines

> A comprehensive checklist for reviewing the backend-v2 codebase to ensure quality, consistency, and best practices.

---

## Table of Contents

1. [Project Structure & Architecture](#1-project-structure--architecture)
2. [TypeScript Best Practices](#2-typescript-best-practices)
3. [NestJS-Specific Patterns](#3-nestjs-specific-patterns)
4. [DRY Principle](#4-dry-principle)
5. [Error Handling](#5-error-handling)
6. [Security Audit](#6-security-audit)
7. [Database & Mongoose](#7-database--mongoose)
8. [Configuration Management](#8-configuration-management)
9. [Logging & Observability](#9-logging--observability)
10. [Testing](#10-testing)
11. [Performance](#11-performance)
12. [Code Quality Checklist](#12-code-quality-checklist)
13. [Quick Audit Commands](#13-quick-audit-commands)

---

## 1. Project Structure & Architecture

### 1.1 Module Organization

| Check | Description |
|-------|-------------|
| [ ] | Each feature has its own module (`*.module.ts`) |
| [ ] | Modules properly import/export dependencies |
| [ ] | No circular dependencies between modules |
| [ ] | Shared utilities in `common/` directory |
| [ ] | Services properly scoped (singleton vs request-scoped) |

### 1.2 File Naming Conventions

```
CORRECT                    INCORRECT
─────────────────────────────────────────
user.controller.ts         UserController.ts
user.service.ts            userService.ts
user.module.ts             User.Module.ts
create-user.dto.ts         CreateUserDTO.ts
user.schema.ts             UserSchema.ts
```

### 1.3 Expected Folder Structure

```
src/
├── common/                    # Shared utilities
│   ├── decorators/           # Custom decorators
│   ├── filters/              # Exception filters
│   ├── guards/               # Auth guards
│   ├── interceptors/         # Response interceptors
│   └── utils/                # Helper functions
├── config/                    # Configuration modules
│   ├── app.config.ts         # PORT, CORS origins
│   ├── database.config.ts    # MongoDB connection
│   ├── jwt.config.ts         # JWT settings
│   ├── payment.config.ts     # Razorpay credentials
│   ├── google.config.ts      # Google Calendar OAuth
│   └── email.config.ts       # Resend API
├── modules/                   # Feature modules
│   └── [feature]/
│       ├── dto/              # Data Transfer Objects
│       ├── [feature].controller.ts
│       ├── [feature].service.ts
│       └── [feature].module.ts
├── schemas/                   # Mongoose schemas
├── services/                  # Shared external services
├── app.module.ts
└── main.ts
```

---

## 2. TypeScript Best Practices

### 2.1 Type Safety

| Check | Description |
|-------|-------------|
| [ ] | No `any` types - use proper typing or `unknown` |
| [ ] | No implicit `any` - enable `strict: true` in tsconfig |
| [ ] | Explicit return types on public methods |
| [ ] | Interface over type for object shapes |
| [ ] | Enums for fixed sets of values |

**Examples:**

```typescript
// BAD - Avoid any
async findAll(filter: any): any {
  // ...
}

// GOOD - Explicit types
async findAll(filter: MentorFilterDto): Promise<Mentor[]> {
  // ...
}
```

### 2.2 Null Safety

| Check | Description |
|-------|-------------|
| [ ] | Use optional chaining (`?.`) |
| [ ] | Use nullish coalescing (`??`) |
| [ ] | Proper null checks before operations |

```typescript
// BAD - Unsafe access
const name = user.profile.name;

// GOOD - Safe access with fallback
const name = user?.profile?.name ?? 'Unknown';
```

### 2.3 Type Assertions

| Check | Description |
|-------|-------------|
| [ ] | Avoid `as` assertions where possible |
| [ ] | Use type guards instead |

```typescript
// BAD - Unsafe assertion
const user = data as User;

// GOOD - Type guard
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'email' in data
  );
}

if (isUser(data)) {
  // data is now typed as User
}
```

---

## 3. NestJS-Specific Patterns

### 3.1 Dependency Injection

| Check | Description |
|-------|-------------|
| [ ] | All dependencies injected via constructor |
| [ ] | Using `@Injectable()` decorator on services |
| [ ] | No direct instantiation with `new` |

```typescript
// BAD - Direct instantiation
const service = new UserService();

// GOOD - Dependency injection
constructor(private readonly userService: UserService) {}
```

### 3.2 DTOs & Validation

| Check | Description |
|-------|-------------|
| [ ] | All request bodies use DTOs |
| [ ] | class-validator decorators on all DTO fields |
| [ ] | class-transformer for type conversion |
| [ ] | Separate Create/Update DTOs |

**Example DTO:**

```typescript
import { IsNotEmpty, IsString, IsEmail, IsNumber, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  age: number;
}
```

### 3.3 Controllers

| Check | Description |
|-------|-------------|
| [ ] | Thin controllers - business logic in services |
| [ ] | Proper HTTP status codes with `@HttpCode()` |
| [ ] | Route parameters validated |
| [ ] | Consistent route naming (kebab-case) |

```typescript
// BAD - Logic in controller
@Get(':id')
async getUser(@Param('id') id: string) {
  const user = await this.userModel.findById(id);
  if (!user) throw new NotFoundException();
  user.lastAccess = new Date();
  await user.save();
  return user;
}

// GOOD - Delegate to service
@Get(':id')
async getUser(@Param('id') id: string): Promise<User> {
  return this.userService.findById(id);
}
```

### 3.4 Services

| Check | Description |
|-------|-------------|
| [ ] | Single responsibility per service |
| [ ] | Properly throwing NestJS exceptions |
| [ ] | No direct HTTP response manipulation |

```typescript
// BAD - Manual error response
if (!user) {
  return { error: 'Not found', status: 404 };
}

// GOOD - NestJS exception
if (!user) {
  throw new NotFoundException('User not found');
}
```

### 3.5 Guards & Interceptors

| Check | Description |
|-------|-------------|
| [ ] | Auth logic in guards, not controllers |
| [ ] | Response transformation in interceptors |
| [ ] | Global guards registered in `main.ts` |

---

## 4. DRY Principle

### 4.1 Common Violations to Flag

| Violation | Solution |
|-----------|----------|
| Repeated validation logic | Create shared validators |
| Duplicate query patterns | Extract to base service |
| Similar error handling | Create utility functions |
| Repeated response formatting | Use interceptors |

### 4.2 Extract Reusable Logic

```typescript
// BAD - Repeated in multiple services
const user = await this.userModel.findById(id);
if (!user) throw new NotFoundException('User not found');

// GOOD - Extracted utility
async findByIdOrFail<T>(
  model: Model<T>,
  id: string,
  entity: string
): Promise<T> {
  const doc = await model.findById(id);
  if (!doc) {
    throw new NotFoundException(`${entity} not found`);
  }
  return doc;
}
```

### 4.3 Custom Decorators

```typescript
// Combine common decorators
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function ApiAuth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
  );
}

// Usage
@ApiAuth()
@Get('profile')
async getProfile() {}
```

---

## 5. Error Handling

### 5.1 Exception Types

| Exception | HTTP Code | Use Case |
|-----------|-----------|----------|
| `BadRequestException` | 400 | Invalid input |
| `UnauthorizedException` | 401 | Auth required |
| `ForbiddenException` | 403 | Access denied |
| `NotFoundException` | 404 | Resource not found |
| `ConflictException` | 409 | Duplicate resource |
| `InternalServerErrorException` | 500 | Server error |

### 5.2 Exception Handling Checklist

| Check | Description |
|-------|-------------|
| [ ] | Using NestJS built-in exceptions |
| [ ] | Global exception filter handles all errors |
| [ ] | Consistent error response format |
| [ ] | No sensitive data in error messages |

### 5.3 Async Error Handling

```typescript
// BAD - Fire and forget (unhandled)
this.emailService.send(email);

// GOOD - Properly handled
try {
  await this.emailService.send(email);
} catch (error) {
  this.logger.error('Email failed', error.stack);
  // Decide: throw or continue without email
}
```

---

## 6. Security Audit

### 6.1 Authentication & Authorization

| Check | Description |
|-------|-------------|
| [ ] | JWT properly validated |
| [ ] | Token expiry enforced |
| [ ] | Sensitive routes protected with guards |
| [ ] | Role-based access implemented |

### 6.2 Input Validation

| Check | Description |
|-------|-------------|
| [ ] | All user inputs validated |
| [ ] | File uploads validated (type, size) |
| [ ] | URL parameters sanitized |
| [ ] | Query params validated |

### 6.3 Data Exposure

| Check | Description |
|-------|-------------|
| [ ] | Passwords excluded from responses |
| [ ] | Sensitive fields not logged |
| [ ] | No secrets in code |

```typescript
// BAD - Password exposed
return user;

// GOOD - Exclude sensitive fields
return user.toObject({
  transform: (_, ret) => {
    delete ret.password;
    return ret;
  }
});

// OR use class-transformer
@Exclude()
password: string;
```

### 6.4 Security Headers

| Check | Description |
|-------|-------------|
| [ ] | CORS properly configured |
| [ ] | Rate limiting on sensitive endpoints |
| [ ] | Helmet middleware enabled |

---

## 7. Database & Mongoose

### 7.1 Schema Design

| Check | Description |
|-------|-------------|
| [ ] | Proper indexes on queried fields |
| [ ] | Refs using `Types.ObjectId` |
| [ ] | Timestamps enabled |
| [ ] | Schema options configured |

```typescript
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class User {
  @Prop({ required: true, index: true })
  email: string;
}
```

### 7.2 Query Optimization

| Check | Description |
|-------|-------------|
| [ ] | Using `.lean()` for read-only queries |
| [ ] | Selecting only needed fields |
| [ ] | Proper pagination implemented |
| [ ] | No N+1 query problems |

```typescript
// BAD - Fetches everything
const users = await this.userModel.find();

// GOOD - Optimized query
const users = await this.userModel
  .find({ isActive: true })
  .select('name email createdAt')
  .sort({ createdAt: -1 })
  .limit(20)
  .lean();
```

### 7.3 Transactions

| Check | Description |
|-------|-------------|
| [ ] | Multi-document operations use transactions |
| [ ] | Proper rollback on failure |

```typescript
const session = await this.connection.startSession();
session.startTransaction();

try {
  await this.userModel.create([userData], { session });
  await this.profileModel.create([profileData], { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

---

## 8. Configuration Management

### 8.1 Environment Variables

| Check | Description |
|-------|-------------|
| [ ] | All secrets in `.env` |
| [ ] | Using `ConfigService` not `process.env` |
| [ ] | Validation on startup |
| [ ] | Separate configs per concern |

```typescript
// BAD - Direct env access
const secret = process.env.JWT_SECRET;

// GOOD - ConfigService
const secret = this.configService.get<string>('jwt.secret');
```

### 8.2 Config Validation

```typescript
// config/jwt.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiry: process.env.JWT_EXPIRY || '7d',
}));

// Validate with Joi or class-validator on bootstrap
```

---

## 9. Logging & Observability

### 9.1 Logging

| Check | Description |
|-------|-------------|
| [ ] | Using NestJS Logger (not console.log) |
| [ ] | Proper log levels |
| [ ] | Request correlation IDs |
| [ ] | No sensitive data logged |

```typescript
import { Logger } from '@nestjs/common';

// BAD
console.log('User created');
console.log('Password:', password);

// GOOD
private readonly logger = new Logger(UserService.name);

this.logger.log(`User created: ${userId}`);
this.logger.error('Failed to create user', error.stack);
```

### 9.2 Log Levels

| Level | Use Case |
|-------|----------|
| `debug` | Development details |
| `log` | General info |
| `warn` | Potential issues |
| `error` | Errors with stack trace |

### 9.3 Health Checks

| Check | Description |
|-------|-------------|
| [ ] | `/health` endpoint exists |
| [ ] | Database connectivity checked |
| [ ] | External services monitored |

---

## 10. Testing

### 10.1 Unit Tests

| Check | Description |
|-------|-------------|
| [ ] | Services have unit tests |
| [ ] | External dependencies mocked |
| [ ] | Edge cases covered |
| [ ] | Error scenarios tested |

### 10.2 E2E Tests

| Check | Description |
|-------|-------------|
| [ ] | Critical flows tested |
| [ ] | Auth flows tested |
| [ ] | Error responses validated |

### 10.3 Test File Location

```
src/
├── modules/
│   └── user/
│       ├── user.service.ts
│       └── user.service.spec.ts    # Unit test
test/
└── user.e2e-spec.ts                # E2E test
```

---

## 11. Performance

### 11.1 Async Operations

| Check | Description |
|-------|-------------|
| [ ] | Using `Promise.all()` for parallel ops |
| [ ] | No blocking operations |
| [ ] | Proper timeout handling |

```typescript
// BAD - Sequential (slow)
const user = await this.getUser(id);
const orders = await this.getOrders(id);
const notifications = await this.getNotifications(id);

// GOOD - Parallel (fast)
const [user, orders, notifications] = await Promise.all([
  this.getUser(id),
  this.getOrders(id),
  this.getNotifications(id),
]);
```

### 11.2 Caching

| Check | Description |
|-------|-------------|
| [ ] | Expensive operations cached |
| [ ] | Cache invalidation strategy |
| [ ] | TTL configured appropriately |

---

## 12. Code Quality Checklist

| Area | Requirement |
|------|-------------|
| **Naming** | Variables/functions describe purpose |
| **Functions** | Single responsibility, <50 lines |
| **Comments** | Only for complex logic |
| **Magic Numbers** | Use named constants |
| **Dead Code** | No commented-out code |
| **Imports** | No unused imports |
| **Formatting** | Prettier enforced |

---

## 13. Quick Audit Commands

Run these commands from the `backend-v2` directory:

```bash
# Find 'any' type usage
grep -r "any" src/ --include="*.ts" | grep -v node_modules

# Find console.log statements
grep -r "console.log" src/ --include="*.ts"

# Find direct process.env usage (should use ConfigService)
grep -r "process.env" src/ --include="*.ts" | grep -v main.ts

# Find TODO/FIXME comments
grep -rn "TODO\|FIXME\|HACK" src/ --include="*.ts"

# Find empty catch blocks
grep -rn "catch.*{\s*}" src/ --include="*.ts"

# Find functions without return types
grep -rn "async.*(.*).*{" src/ --include="*.ts" | grep -v ": Promise"

# Check for unused exports
npx ts-prune
```

---

## Review Priority Order

1. **Security** - Auth, input validation, data exposure
2. **Error Handling** - Proper exceptions, no unhandled errors
3. **Type Safety** - No `any`, proper typing
4. **NestJS Patterns** - DI, guards, interceptors
5. **DRY Violations** - Repeated code extraction
6. **Performance** - N+1 queries, blocking operations
7. **Code Quality** - Naming, structure, formatting

---

## Reviewer Checklist Template

```markdown
## Code Review: [PR/Feature Name]

### Security
- [ ] Auth properly implemented
- [ ] Inputs validated
- [ ] No sensitive data exposed

### Type Safety
- [ ] No `any` types
- [ ] Explicit return types
- [ ] Proper null handling

### NestJS Patterns
- [ ] Thin controllers
- [ ] Business logic in services
- [ ] Proper exception handling

### Code Quality
- [ ] DRY - no duplication
- [ ] Clear naming
- [ ] Adequate test coverage

### Notes
-
```

---

*Last Updated: December 2024*
