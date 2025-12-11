# Context Management & Personalization

> Documentation strategy, context balancing, and personalizing Claude's output.

---

## 1. Documentation Strategy

### What to Document (High ROI)

| What | Why | Where |
|------|-----|-------|
| **Project context** | Claude needs to understand your stack, conventions | `CLAUDE.md` (root) |
| **Non-obvious decisions** | Why you chose X over Y | `docs/DECISIONS.md` or inline comments |
| **Custom patterns** | Your specific abstractions, utilities | Brief comments + `CLAUDE.md` |
| **Environment setup** | API keys structure, services needed | `README.md` or `.env.example` |
| **Current focus/sprint** | What you're actively working on | `CLAUDE.md` (update weekly) |

### What to Skip (Low ROI)

| What | Why Skip |
|------|----------|
| **Standard framework patterns** | Claude knows React, Next.js, Express patterns |
| **Obvious code comments** | Self-documenting code is better |
| **API docs for popular libraries** | Claude has this knowledge |
| **Step-by-step tutorials** | Claude can generate these on demand |
| **Verbose JSDoc on simple functions** | Only document complex/non-obvious logic |

---

## 2. Context Balancing

### The 70/30 Rule

```
70% - Let Claude explore and infer from code
30% - Explicit context you provide
```

### When to Provide Context

| Situation | Action |
|-----------|--------|
| Starting new feature | Point to 1-2 reference files |
| Bug in specific area | Mention the file path |
| Following unusual pattern | Explain why briefly |
| Multiple valid approaches | State your preference |

### When to Let Claude Explore

| Situation | Action |
|-----------|--------|
| Understanding codebase structure | Let it use Explore agent |
| Finding related files | Let it search |
| Standard implementations | Trust its knowledge |

### Context Refresh Pattern

```
Session Start:    "Working on [feature]. Reference: [1 file path]"
Mid-Session:      /compact (after completing a subtask)
Context Heavy:    "Focus only on [specific file/function] now"
New Direction:    /clear and start fresh
```

### Context Load Indicators

| Symptom | Solution |
|---------|----------|
| Claude repeating itself | `/compact` |
| Slower responses | `/compact` |
| Mixing up file names | `/compact` or `/clear` |
| Forgetting earlier decisions | Restate key context |
| Off-topic suggestions | Refocus with specific prompt |

---

## 3. Personalization Setup

### Global Preferences (`~/.claude/CLAUDE.md`)

Add these sections to your global Claude config:

```markdown
## My Preferences

### Communication Style
- Be direct, skip unnecessary preamble
- Show code first, explain after (if needed)
- Use bullet points over paragraphs
- Challenge my assumptions when you see issues

### Code Style
- Prefer explicit over clever
- Early returns over nested conditionals
- Descriptive variable names
- Minimal comments (code should be self-documenting)

### Decision Making
- When multiple approaches exist, pick one and explain trade-off briefly
- Don't ask for confirmation on minor decisions
- Flag only significant architectural choices

### Output Format
- For small changes: Just show the code
- For complex changes: Brief plan → code → summary
- For research: Bullet points with key insights

### Things I Care About
- Performance (especially DB queries)
- Type safety
- Clean git history
- Mobile responsiveness
```

### Project-Specific Overrides

In your project's `CLAUDE.md`, add overrides:

```markdown
## Project-Specific Preferences
- [Domain context - e.g., "This is a learning platform - prioritize UX clarity"]
- [User priority - e.g., "We optimize for mentor experience first"]
- [Constraints - e.g., "Keep bundle size minimal (users on slow connections)"]
```

### Personality Tuning Examples

**For more opinionated output:**
```markdown
- Don't hedge. Make decisions and explain briefly.
- If my approach is wrong, say so directly.
```

**For more exploratory output:**
```markdown
- Present 2-3 options for significant decisions
- Explain trade-offs before recommending
```

**For faster iteration:**
```markdown
- Skip explanations unless I ask
- Just show the code changes
```

---

## 4. Minimal CLAUDE.md Template

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

## My Preferences
- Be direct, show code first
- Early returns, explicit over clever
- Flag only significant decisions
```

**Target: ~30 lines. Update "Current Focus" weekly.**

---

## Next Steps

- [05-parallel-agents.md](./05-parallel-agents.md) - Parallel agent strategy
- [06-agents.md](./06-agents.md) - Full agent control guide
