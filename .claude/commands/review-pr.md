# PR Review

Read learnings from @.claude/context/LEARNINGS.md

---

Review this PR: **$ARGUMENTS**

## How to use:
- `/review-pr 123` - Review PR #123 from current repo
- `/review-pr` - Review current branch's diff against main/dev

## What I review:

### 1. Logic & Correctness
- Does the code do what it's supposed to?
- Edge cases handled?
- Error handling present?
- Race conditions or async issues?

### 2. Security
- User input validated/sanitized?
- SQL injection / XSS risks?
- Secrets hardcoded?
- Auth/permissions checked?

### 3. Performance
- N+1 queries?
- Unnecessary loops or re-renders?
- Large payloads or memory leaks?
- Missing indexes for new queries?

### 4. Code Quality
- Readable and maintainable?
- Functions doing one thing?
- Good naming?
- DRY without over-abstracting?

### 5. Tests
- Tests added for new functionality?
- Edge cases covered?
- Tests actually testing the right thing?

### 6. Breaking Changes
- API contracts changed?
- Database migrations needed?
- Backwards compatibility issues?

## Output format:

**Overview:**
[What this PR does in 1-2 sentences]

**Risk level:** Low / Medium / High

**Must fix before merge:**
- [ ] `file.ts:42` - [issue and why it matters]

**Should fix (not blocking):**
- [ ] `file.ts:87` - [suggestion]

**Nitpicks (optional):**
- [ ] `file.ts:123` - [minor suggestion]

**Questions:**
- [Any clarifying questions about intent]

**Good stuff:**
- [Call out anything done well]

## My approach:
- I focus on what matters, not style nitpicks
- I explain *why* something is an issue
- I won't block on opinions, only real problems
- I'll ask questions if the intent isn't clear

Let me fetch the PR and review it.
