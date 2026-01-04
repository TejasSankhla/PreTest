# Agent Control & Automation

> Complete guide to subagents, slash commands, skills, hooks, and automation.

---

## Overview: The 5 Control Systems

| System | Purpose | Location | Invocation |
|--------|---------|----------|------------|
| **Subagents** | Specialized AI personas | `.claude/agents/` | Auto or explicit |
| **Slash Commands** | Quick-access prompts | `.claude/commands/` | `/command-name` |
| **Skills** | Multi-file workflows | `.claude/skills/` | Auto-discovered |
| **Output Styles** | System-level behavior | `.claude/output-styles/` | `/output-style name` |
| **Hooks** | Event-based automation | Settings JSON | Automatic |

---

## 1. Subagents: Specialized Personas

Subagents are AI assistants with:
- Dedicated system prompt (custom instructions)
- Separate context window (prevents pollution)
- Restricted tool access (optional)
- Custom model selection (Sonnet, Haiku, Opus)

### File Locations
```
.claude/agents/          # Project-level (shared via git)
~/.claude/agents/        # User-level (personal, all projects)
```

### Creating Subagents

**Option 1: Interactive (Recommended)**
```
/agents
```

**Option 2: Manual File Creation**

Create `.claude/agents/your-agent.md`:

```markdown
---
name: your-agent-name
description: When and why to use this agent
tools: Read, Grep, Glob, Bash, Edit
model: sonnet
---

# System Prompt

You are an expert [role]. Your responsibilities:

1. [Key responsibility 1]
2. [Key responsibility 2]

When approaching tasks:
- Focus on [specific aspect]
- Always consider [constraint]

Output format: [specific format]
```

### Configuration Fields

| Field | Required | Options |
|-------|----------|---------|
| `name` | Yes | lowercase-with-hyphens |
| `description` | Yes | When to use (helps auto-delegation) |
| `tools` | No | Read, Grep, Glob, Bash, Edit, Write, WebFetch, WebSearch |
| `model` | No | sonnet, opus, haiku, inherit |
| `permissionMode` | No | default, acceptEdits, bypassPermissions, plan |

### Example Subagents

#### UI/UX Designer
```markdown
---
name: uiux-designer
description: Design user interfaces, review UX flows, suggest improvements. Use when working on UI components, user flows, or visual design decisions.
tools: Read, Grep, Glob, WebSearch, WebFetch
model: sonnet
---

# UI/UX Design Expert

You are a senior UI/UX designer specializing in modern web applications.

## Your Expertise
- Visual hierarchy and layout
- User flow optimization
- Accessibility (WCAG compliance)
- Responsive design patterns
- Modern design systems (Material, Tailwind)

## When Reviewing UI
1. Assess visual hierarchy
2. Check user flow clarity
3. Verify accessibility
4. Review responsive behavior
5. Suggest specific improvements with examples

## When Designing New UI
1. Research best practices for the specific pattern
2. Consider existing design system
3. Propose 2-3 approaches with trade-offs
4. Include accessibility considerations
5. Provide component structure

## Output Format
- Visual mockup descriptions
- Component hierarchy
- Specific CSS/Tailwind suggestions
- Accessibility checklist
```

#### Frontend Expert
```markdown
---
name: frontend-expert
description: Implement React/Next.js components, optimize frontend performance, review component architecture. Use for frontend implementation and optimization.
tools: Read, Grep, Glob, Bash, Edit, Write
model: sonnet
---

# Frontend Development Expert

You are a senior frontend developer specializing in React and Next.js.

## Core Competencies
- React patterns (hooks, context, composition)
- Next.js (App Router, Server Components, SSR/SSG)
- TypeScript best practices
- Performance optimization
- State management

## Implementation Approach
1. Review existing component patterns first
2. Follow established conventions
3. Use TypeScript strictly
4. Consider performance implications
5. Include loading/error states
6. Ensure accessibility

## Code Standards
- Functional components with hooks
- Props interfaces defined
- Early returns for conditionals
- Meaningful variable names
- Minimal, focused components
```

#### Backend Performance
```markdown
---
name: perf-optimizer
description: Analyze and optimize API endpoints, database queries, and response times. Use for performance issues, slow queries, or optimization tasks.
tools: Read, Grep, Glob, Bash, Edit
model: sonnet
---

# Backend Performance Optimizer

You are a backend performance specialist.

## Focus Areas
1. Database queries (N+1, missing indexes, sequential queries)
2. API response times
3. Memory usage
4. Query optimization

## Optimization Process
1. Identify current performance metrics
2. Analyze bottlenecks
3. Implement optimization
4. Measure improvement
5. Report before/after metrics

## Output Format
- Response time comparison (before/after)
- Root cause analysis
- Implementation with code examples
- Verification approach
```

#### Code Reviewer
```markdown
---
name: code-reviewer
description: Review code for bugs, security issues, performance problems, and best practices. Use proactively after implementing features.
tools: Read, Grep, Glob, Bash
model: sonnet
---

# Code Review Expert

You are a senior engineer conducting thorough code reviews.

## Review Checklist
1. **Correctness**: Logic errors, edge cases, race conditions
2. **Security**: Input validation, auth, data exposure
3. **Performance**: N+1 queries, re-renders, memory leaks
4. **Maintainability**: Clarity, abstractions, test coverage
5. **TypeScript**: Type safety, avoiding `any`

## Review Format
### Critical (Must Fix)
- [Issue with code example and fix]

### Warnings (Should Fix)
- [Issue with explanation]

### Suggestions (Consider)
- [Improvement idea]

Be specific. Provide code examples for every suggestion.
```

### Using Subagents

**Automatic Delegation**: Claude auto-delegates when task matches description.

**Explicit Invocation**:
```
Use the uiux-designer to review this component
Have the frontend-expert implement this feature
Ask the code-reviewer to check these changes
```

**Managing Agents**:
```
/agents              # List, create, edit, delete agents
```

---

## 2. Slash Commands: Quick-Access Prompts

Slash commands are for **simple, frequently-used prompts**.

### File Locations
```
.claude/commands/        # Project-level
~/.claude/commands/      # User-level
```

### Creating Slash Commands

**Basic Command** (`.claude/commands/quick-review.md`):
```markdown
Review the recent changes for:
1. Bugs and edge cases
2. Performance issues
3. Security concerns

Be concise and specific.
```

Usage: `/quick-review`

**With Arguments** (`.claude/commands/component.md`):
```markdown
---
description: Create a new React component
---

Create a React component named: $ARGUMENTS

Requirements:
- TypeScript with proper interfaces
- Follow existing patterns in src/components/
- Include loading and error states
- Ensure accessibility
```

Usage: `/component UserProfile`

**With Context Injection** (`.claude/commands/pr-review.md`):
```markdown
---
description: Review PR changes
allowed-tools: Bash(git diff:*), Read, Grep
---

## Recent Changes
!`git diff HEAD~1`

## Changed Files
!`git diff --name-only HEAD~1`

Review these changes for:
1. Code quality
2. Security issues
3. Performance impact
4. Missing tests
```

**With File References** (`.claude/commands/compare.md`):
```markdown
---
description: Compare implementations
---

Compare: @$ARGUMENTS

Analyze differences in:
- Performance
- Readability
- Maintainability
```

Usage: `/compare src/old.ts src/new.ts`

### Recommended Commands

| Command | Purpose | File |
|---------|---------|------|
| `/quick-review` | Fast code review | `quick-review.md` |
| `/component` | Create new component | `component.md` |
| `/endpoint` | Create API endpoint | `endpoint.md` |
| `/ux-check` | Quick UX audit | `ux-check.md` |
| `/perf-check` | Performance analysis | `perf-check.md` |
| `/commit` | Generate commit message | `commit.md` |

---

## 3. Skills: Complex Multi-File Workflows

Skills are for **complex workflows with supporting resources**.

### Structure
```
.claude/skills/skill-name/
├── SKILL.md          # Required - main instructions
├── reference.md      # Optional - reference docs
├── examples/         # Optional - example files
└── scripts/          # Optional - utility scripts
```

### Creating a Skill

`.claude/skills/component-library/SKILL.md`:
```markdown
---
name: component-library
description: Create consistent UI components following our design system
allowed-tools: Read, Grep, Glob, Write, Edit
---

# Component Library Skill

## When to Use
- Creating new UI components
- Ensuring design consistency
- Following atomic design patterns

## Component Template
See @examples/component-template.tsx

## Design Tokens
See @reference/design-tokens.md

## Process
1. Check existing similar components
2. Use appropriate atomic level (atom/molecule/organism)
3. Follow naming conventions
4. Include TypeScript interfaces
5. Add Storybook story
```

### Skill vs Slash Command

| Aspect | Slash Command | Skill |
|--------|---------------|-------|
| Complexity | Single prompt | Multi-file workflow |
| Discovery | Manual (`/cmd`) | Auto-discovered |
| Resources | None | Reference files, examples |
| Use Case | Quick tasks | Complex workflows |

---

## 4. Output Styles: System-Level Behavior

Output styles modify Claude's **entire system prompt**.

### Built-in Styles
- **Default**: Standard behavior
- **Explanatory**: Educational insights
- **Learning**: TODO markers for learning

### Creating Custom Style

`.claude/output-styles/reviewer.md`:
```markdown
---
name: reviewer
description: Code review focused behavior
keep-coding-instructions: true
---

You are in code review mode. For all interactions:

1. Be critical and thorough
2. Prioritize by severity
3. Provide specific code examples
4. Explain the "why" behind issues
5. Focus on security, performance, maintainability
```

Usage: `/output-style reviewer`

---

## 5. Hooks: Event-Based Automation

Hooks run **automatically** at lifecycle events.

### Hook Events

| Event | When | Use Case |
|-------|------|----------|
| PreToolUse | Before tool runs | Block sensitive operations |
| PostToolUse | After tool runs | Auto-format files |
| UserPromptSubmit | Before processing | Add context |
| SessionStart | Session begins | Load preferences |

### Setting Up Hooks

```
/hooks
```

### Example Hooks

**Auto-format TypeScript on Edit**:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$TOOL_INPUT\" | jq -r '.file_path' | grep -q '\\.tsx\\?$'; then npx prettier --write \"$(echo \"$TOOL_INPUT\" | jq -r '.file_path')\"; fi"
          }
        ]
      }
    ]
  }
}
```

**Block Edits to Sensitive Files**:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$TOOL_INPUT\" | jq -r '.file_path' | grep -qE '(\\.env|package-lock\\.json)'; then exit 2; fi"
          }
        ]
      }
    ]
  }
}
```

---

## 6. Choosing the Right Tool

```
┌─────────────────────────────────────────────────────────────┐
│                    DECISION FLOWCHART                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Is it a simple, quick prompt?                              │
│     YES → Slash Command (.claude/commands/)                 │
│     NO  ↓                                                   │
│                                                             │
│  Does it need a specialized persona/role?                   │
│     YES → Subagent (.claude/agents/)                        │
│     NO  ↓                                                   │
│                                                             │
│  Does it need multiple reference files?                     │
│     YES → Skill (.claude/skills/)                           │
│     NO  ↓                                                   │
│                                                             │
│  Should it change Claude's overall behavior?                │
│     YES → Output Style (.claude/output-styles/)             │
│     NO  ↓                                                   │
│                                                             │
│  Should it run automatically on events?                     │
│     YES → Hooks (settings.json)                             │
│     NO  → Just use a prompt                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Recommended Setup for Solo Developer

### Step 1: Create Core Subagents
```bash
mkdir -p .claude/agents
```

Create these agents:
- `uiux-designer.md` - UI/UX expertise
- `frontend-expert.md` - React/Next.js implementation
- `backend-expert.md` - API and database
- `code-reviewer.md` - Code review
- `perf-optimizer.md` - Performance optimization

### Step 2: Create Quick Commands
```bash
mkdir -p .claude/commands
```

Create these commands:
- `quick-review.md` - Fast code review
- `ux-check.md` - Quick UX audit
- `component.md` - New component template
- `endpoint.md` - New API endpoint template

### Step 3: Set Up Hooks
```
/hooks
```
- PostToolUse → Auto-format on Edit
- PreToolUse → Block sensitive file edits

### Step 4: Commit Everything
```bash
git add .claude/
git commit -m "Add Claude Code agents and commands"
```

---

## Next Steps

- [07-action-items.md](./07-action-items.md) - Prioritized checklist to get started
