# Setup & Efficiency Guide

> Initial setup and best practices for maximizing Claude Code efficiency.

---

## 1. Project Setup

### Create `CLAUDE.md` in Project Root

This file provides Claude with persistent context about your project.

#### Minimal Effective Template (~30 lines)

```markdown
# [Project Name]

## Stack
- [Framework], [Language], [Styling]
- [Database] + [ORM]
- Auth: [Auth solution]

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm test` - Run tests

## Conventions
- Components: `src/components/` (structure type)
- API routes: `src/app/api/`
- Validation library: [zod/joi/etc]
- [Any non-obvious patterns]

## Current Focus
- [Current feature/sprint]
- [Known issues]

## Key Decisions
- [Decision 1 and why]
- [Decision 2 and why]
```

**Update "Current Focus" weekly.**

### Directory Structure

```
project-root/
├── CLAUDE.md              # Project context for Claude
├── .claude/
│   ├── agents/            # Custom subagents
│   ├── commands/          # Slash commands
│   └── skills/            # Complex workflows
└── docs/
    └── claude-code/       # This documentation
```

---

## 2. Maximizing Efficiency

### Session Management Commands

| Command | When to Use |
|---------|-------------|
| `/compact` | When context feels heavy, after completing a major task |
| `/clear` | Starting a completely new task unrelated to previous work |
| `/plan` | Before implementing complex features requiring design decisions |
| `/agents` | Managing custom subagents |
| `/hooks` | Setting up automation |

### Efficiency Best Practices

#### 1. Be Specific in Prompts
```
❌ "Add validation"
✅ "Add email validation to the signup form in src/components/auth/SignupForm.tsx using zod schema"
```

#### 2. Provide Context Upfront
```
❌ "Fix the bug"
✅ "Fix the authentication bug where users get logged out after refresh.
    Relevant files: src/hooks/useAuth.ts, src/context/AuthContext.tsx"
```

#### 3. Reference Existing Patterns
```
"Implement the UserProfile component following the same patterns used in
src/components/dashboard/Settings.tsx"
```

#### 4. Let Claude Explore First
```
"Before implementing, explore the codebase to understand how we handle
[authentication/state/API calls], then propose an approach"
```

#### 5. Use Plan Mode for Complex Tasks
```
"I need to add a payment integration. Use /plan to design the approach
before implementation"
```

### Context Management

- **Fresh sessions for new features** - Avoids context pollution
- **Compact after milestones** - Keeps relevant context, removes noise
- **One major feature per session** - Better focus and cleaner commits

### Context Load Indicators

| Symptom | Solution |
|---------|----------|
| Claude repeating itself | `/compact` |
| Slower responses | `/compact` |
| Mixing up file names | `/compact` or `/clear` |
| Forgetting earlier decisions | Restate key context |
| Off-topic suggestions | Refocus with specific prompt |

---

## 3. Key Principles

| Principle | Description |
|-----------|-------------|
| **Context is King** | Always provide relevant files, patterns, and constraints |
| **Plan Before Code** | Use `/plan` for non-trivial features |
| **Explore First** | Let Claude understand existing patterns before implementing |
| **Trust but Verify** | Let Claude work autonomously, then review |
| **Iterate Fast** | Small PRs, frequent commits, quick feedback loops |
| **Document Decisions** | Record why, not just what |
| **One Thing at a Time** | Focus on single task per session |
| **Test as You Go** | Write/run tests alongside implementation |

---

## 4. Common Pitfalls

### Don't Do This

1. **Vague prompts**
   ```
   ❌ "Fix the bug"
   ❌ "Make it better"
   ❌ "Add the feature"
   ```

2. **No context provided**
   ```
   ❌ "Create a user component" (without showing existing patterns)
   ```

3. **Too many tasks at once**
   ```
   ❌ "Build auth, add email verification, implement password reset, and add 2FA"
   ```

4. **Not reviewing output** - Accepting all changes without reading

5. **Never compacting** - Running very long sessions without `/compact`

### Do This Instead

1. **Specific prompts**
   ```
   ✅ "Fix the authentication bug where JWT tokens aren't being refreshed
       correctly in src/hooks/useAuth.ts"
   ```

2. **Provide context**
   ```
   ✅ "Create a UserProfile component following the pattern in
       src/components/dashboard/Settings.tsx"
   ```

3. **Break down tasks**
   ```
   ✅ "Let's implement authentication step by step:
       1. First, set up the auth context
       2. Then, implement login/logout
       3. Add protected routes
       4. Finally, add token refresh"
   ```

4. **Review and iterate**
   ```
   ✅ Review changes → Request adjustments → Test → Commit
   ```

5. **Manage context**
   ```
   ✅ /compact after completing each major task
   ```

---

## Next Steps

- [02-role-strategies.md](./02-role-strategies.md) - Role-specific strategies
- [03-workflow.md](./03-workflow.md) - Daily workflow and prompts
