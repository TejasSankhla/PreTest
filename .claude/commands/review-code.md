# Codebase Review

Read learnings from @.claude/context/LEARNINGS.md
For Backend, read @backend-v2/src/schemas to understand the relationships

---

Help me review: **$ARGUMENTS**

## Review scope:

If no specific target given, ask: "What should I focus on?"
- A specific file, folder, or module?
- Code quality (patterns, architecture, best practices)?
- Performance and optimization opportunities?
- Type safety and error handling?
- Specific issues (dead code, type errors, deprecated code/logic)?

## What I analyze:

### 1. Dead Code
- Unused imports
- Unused variables/functions
- Commented-out code blocks
- Unreachable code

### 2. Type Issues (TypeScript)
- `any` types that should be specific
- Missing return types
- Implicit any errors
- Redundant duplicate type definitions
- Type assertions that could be avoided

### 3. Code Smells
- Functions that are too long (>100 lines)
- Deeply nested conditionals
- Duplicate code blocks
- Magic numbers/strings without constants
- Console.logs left in production code

### 4. Consistency
- Inconsistent naming (camelCase vs snake_case)
- Mixed async patterns (callbacks vs promises vs async/await)
- Inconsistent error handling

### 5. Performance
- N+1 query patterns
- Missing memoization for expensive ops
- Unnecessary re-renders (React)
- Inefficient database queries
- Large bundle sizes or imports

### 6. Architecture & Patterns
- Code organization and structure
- Separation of concerns
- Component/module responsibilities
- Reusable patterns vs one-off implementations
- API design and contracts

### 7. Best Practices
- Error handling strategy
- Testing coverage gaps
- Documentation quality

## Output format:

**Overview:**
[Brief summary of what I reviewed - X files, Y lines of code]

**Health Score:** [Good / Needs Work / Requires Attention]

**🚨 Critical Issues (fix now):**
1. `file.ts:42` - [issue] → **Why it matters:** [impact] → **Fix:** [suggestion]

**⚠️ Medium Priority (should address):**
1. `file.ts:87` - [issue] → **Why:** [impact] → **Fix:** [suggestion]

**💡 Suggestions (nice to have):**
1. `file.ts:123` - [issue] → **Why:** [benefit] → **Fix:** [suggestion]

**✅ What's Working Well:**
- [Good pattern/practice found]
- [Another positive thing]

**Architecture Notes:**
[Observations about structure, patterns, organization - if applicable]

**Quick Wins:**
[2-3 easy fixes with high impact]

## My approach:
- **Analyze, don't just lint** - I look at patterns, not just syntax
- **Context-aware** - I consider your project's goals and constraints
- **Prioritize by impact** - What matters most for maintainability, performance, security
- **Explain the why** - Not just "this is wrong" but "here's why it matters"
- **Suggest, don't dictate** - You decide what to act on

What should I review?
