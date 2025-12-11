# Parallel Agent Strategy

> When and how to use multiple agents effectively without losing context.

---

## 1. When to Use Parallel Agents

| Use Case | Parallel? | Why |
|----------|-----------|-----|
| Research + Implementation | No | Implementation depends on research |
| Multiple independent files | Yes | No dependencies |
| Frontend + Backend for same feature | Careful | May have shared types/contracts |
| Code review + New feature | Yes | Independent tasks |
| Tests + Implementation | No | Tests depend on implementation |

---

## 2. Parallel Work Pattern

```
"I need to work on these independent tasks in parallel:

Task 1: [Explore agent] Research how authentication is handled
Task 2: [Explore agent] Find all API endpoints that need rate limiting

Run these in parallel and report findings."
```

---

## 3. Sequential Dependency Pattern

```
"Phase 1: Research the booking flow (use Explore agent)
Phase 2: [WAIT for Phase 1] Plan implementation based on findings
Phase 3: [WAIT for Phase 2] Implement the changes"
```

---

## 4. Agent Distribution Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    YOUR MAIN SESSION                    │
│                  (Orchestrator Role)                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Explore   │  │   Explore   │  │    Plan     │     │
│  │   Agent 1   │  │   Agent 2   │  │   Agent     │     │
│  │             │  │             │  │             │     │
│  │ "Find all   │  │ "How does   │  │ "Design     │     │
│  │  booking    │  │  payment    │  │  the auth   │     │
│  │  related    │  │  flow work?"│  │  refactor"  │     │
│  │  files"     │  │             │  │             │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│         │                │                │             │
│         └────────────────┴────────────────┘             │
│                          │                              │
│                    Main session                         │
│                 receives all results                    │
│                 and coordinates next                    │
│                       steps                             │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Anti-Patterns to Avoid

| Don't | Do Instead |
|-------|------------|
| Spawn agents for tiny tasks | Handle small tasks in main session |
| Parallel agents modifying same files | Sequential modifications |
| Too many agents at once (>3) | Limit to 2-3 focused agents |
| Agents without clear deliverables | Specific, measurable outcomes |

---

## 6. Effective Agent Prompts

### For Exploration
```
"Explore [specific area] and report:
1. Key files involved
2. Current implementation pattern
3. Dependencies and relationships
4. Potential issues or concerns"
```

### For Planning
```
"Create implementation plan for [feature]:
1. Required changes by file
2. Order of implementation
3. Potential risks
4. Testing approach"
```

---

## 7. Built-in Agent Types

| Agent | Purpose | Model | Use For |
|-------|---------|-------|---------|
| **Explore** | Fast codebase exploration | Haiku | Finding files, understanding patterns |
| **General-purpose** | Complex multi-step tasks | Sonnet | Research requiring exploration + modification |
| **Plan** | Architecture design | Sonnet | Feature planning in `/plan` mode |

---

## 8. Practical Examples

### Example 1: Research Before Implementation
```
"Before implementing the new booking calendar:

1. Use Explore agent to find all booking-related files
2. Use Explore agent to understand how we handle date/time
3. Report findings, then I'll plan implementation"
```

### Example 2: Parallel Independent Research
```
"Run these in parallel:

1. [Explore] Find all components using the old Button component
2. [Explore] Search for any direct color values not using design tokens
3. [Explore] List all API endpoints that don't have rate limiting

Report all findings together."
```

### Example 3: Feature with Clear Phases
```
"Implementing user notifications:

Phase 1 (Parallel research):
- [Explore] Find existing notification patterns
- [Explore] Check how we handle real-time updates

Phase 2 (Sequential, after research):
- Plan the implementation
- Implement backend first
- Then implement frontend
- Add tests"
```

---

## 9. Context Management with Agents

### Keep Main Session Clean
- Use agents for exploration/research
- Return to main session for actual code changes
- `/compact` in main session after receiving agent results

### Consolidate Agent Findings
```
"Summarize the findings from both explore agents into:
1. Key files to modify
2. Patterns to follow
3. Risks to consider"
```

### Don't Lose Context
- State the overall goal in main session
- Agents return findings, you synthesize
- Document decisions in main session

---

## Next Steps

- [06-agents.md](./06-agents.md) - Create custom subagents for your roles
- [07-action-items.md](./07-action-items.md) - Get started with prioritized tasks
