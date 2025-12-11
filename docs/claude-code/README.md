# Claude Code SOP: Solo Developer's Guide

> A comprehensive guide for maximizing productivity with Claude Code for full-stack development, UI/UX research, code optimization, and documentation.

---

## Quick Start

1. Read [01-setup.md](./01-setup.md) - Set up your project for Claude Code
2. Create your `CLAUDE.md` file in project root
3. Review [03-workflow.md](./03-workflow.md) for daily workflow
4. Check [06-agents.md](./06-agents.md) to automate repetitive prompts

---

## Document Index

| File | Contents | When to Read |
|------|----------|--------------|
| [01-setup.md](./01-setup.md) | Project setup, CLAUDE.md template, efficiency basics | First time setup |
| [02-role-strategies.md](./02-role-strategies.md) | Frontend, backend, code cleanup, planning strategies | Role-specific work |
| [03-workflow.md](./03-workflow.md) | Daily workflow, session management, prompt templates | Daily reference |
| [04-context-management.md](./04-context-management.md) | Documentation strategy, context balancing, personalization | Optimizing output |
| [05-parallel-agents.md](./05-parallel-agents.md) | Parallel agent strategy, when to use agents | Complex tasks |
| [06-agents.md](./06-agents.md) | Subagents, slash commands, skills, hooks, automation | Automating workflows |
| [07-action-items.md](./07-action-items.md) | Prioritized checklist, files to create | Getting started |

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE CODE QUICK REFERENCE              │
├─────────────────────────────────────────────────────────────┤
│ COMMANDS                                                    │
│   /compact     - Reduce context, keep focus                 │
│   /clear       - Fresh start                                │
│   /plan        - Design before implementing                 │
│   /agents      - Manage subagents                           │
│   /hooks       - Configure automation                       │
├─────────────────────────────────────────────────────────────┤
│ WORKFLOW                                                    │
│   1. State goal clearly                                     │
│   2. Let Claude plan (TodoWrite)                            │
│   3. Review plan                                            │
│   4. Execute                                                │
│   5. Review output                                          │
│   6. Test                                                   │
│   7. Commit                                                 │
│   8. /compact                                               │
├─────────────────────────────────────────────────────────────┤
│ PROMPT FORMULA                                              │
│   [Action] + [Specific target] + [Reference] + [Constraints]│
├─────────────────────────────────────────────────────────────┤
│ AGENT SYSTEMS                                               │
│   Subagents    → .claude/agents/      (personas)            │
│   Commands     → .claude/commands/    (quick prompts)       │
│   Skills       → .claude/skills/      (complex workflows)   │
│   Hooks        → /hooks               (automation)          │
└─────────────────────────────────────────────────────────────┘
```

---

## Decision Matrices

### What Tool to Use?

| Need | Tool | Location |
|------|------|----------|
| Quick recurring prompt | Slash Command | `.claude/commands/` |
| Specialized AI role | Subagent | `.claude/agents/` |
| Complex multi-file workflow | Skill | `.claude/skills/` |
| System-wide behavior change | Output Style | `.claude/output-styles/` |
| Automatic on events | Hooks | `/hooks` |

### Should I...?

| Question | Answer |
|----------|--------|
| Document this? | Only if Claude couldn't infer it from code |
| Provide context? | Only for non-obvious patterns or preferences |
| Use an agent? | Only for exploration/research, not modifications |
| Run in parallel? | Only if tasks are truly independent |
| /compact? | After every completed subtask |

---

## File Structure

```
docs/claude-code/
├── README.md                 # This file - overview and index
├── 01-setup.md              # Project setup and efficiency
├── 02-role-strategies.md    # Role-specific strategies
├── 03-workflow.md           # Daily workflow and prompts
├── 04-context-management.md # Documentation, context, personalization
├── 05-parallel-agents.md    # Parallel agent strategy
├── 06-agents.md             # Agent control and automation
└── 07-action-items.md       # Prioritized action items
```

---

*Last updated: December 2024*
*For Claude Code documentation: https://docs.anthropic.com/claude-code*
