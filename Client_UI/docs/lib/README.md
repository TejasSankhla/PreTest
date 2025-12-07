# Lib Directory

## Overview

The `lib/` directory contains utility functions and configurations that are used across the application. These are foundational modules that other parts of the codebase depend on.

## Files

| File | Purpose | Exports |
|------|---------|---------|
| [utils.ts](./utils.md) | Class name merging utility | `cn()` |
| [axios.ts](./axios.md) | Pre-configured HTTP client | `api` (default) |

## Quick Reference

### cn() - Class Name Utility

Merge Tailwind CSS classes with conflict resolution:

```tsx
import { cn } from "@/lib/utils"

cn("px-4 py-2", isActive && "bg-blue-500", className)
```

### api - Axios Instance

Make API requests with pre-configured defaults:

```tsx
import api from "@/lib/axios"

const data = await api.get("/mentor/")
const response = await api.post("/user/sign-in", credentials)
```

## Dependencies

| Package | Used By | Purpose |
|---------|---------|---------|
| `clsx` | utils.ts | Conditional class names |
| `tailwind-merge` | utils.ts | Tailwind class deduplication |
| `axios` | axios.ts | HTTP client |

## Usage Pattern

These utilities are designed to be imported with the `@/lib/` path alias:

```tsx
// Class names
import { cn } from "@/lib/utils"

// API calls
import api from "@/lib/axios"
```
