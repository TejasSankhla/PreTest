# Action Items & Checklists

> Prioritized tasks to get started with Claude Code optimization.

---

## Priority 1: Immediate (Do This Week)

### Create Project CLAUDE.md
- [ ] Location: `/Users/tejas/Desktop/Tejas/PreTest/CLAUDE.md`
- [ ] Use the minimal template from [01-setup.md](./01-setup.md)
- [ ] Include: stack, commands, conventions, current focus
- [ ] Time: 15 minutes

### Update Global ~/.claude/CLAUDE.md
- [ ] Add "My Preferences" section from [04-context-management.md](./04-context-management.md)
- [ ] Include: communication style, code style, decision making
- [ ] Time: 10 minutes

### Test the Workflow
- [ ] Start a new session with `/clear`
- [ ] Use a session starter template from [03-workflow.md](./03-workflow.md)
- [ ] Practice `/compact` after completing a task
- [ ] Time: 30 minutes (during regular work)

---

## Priority 2: This Sprint (Next 1-2 Weeks)

### Create DECISIONS.md
- [ ] Location: `docs/DECISIONS.md`
- [ ] Document key architectural decisions already made
- [ ] Template:
  ```markdown
  ## [Date] - [Decision Title]
  **Context:** [Why this came up]
  **Decision:** [What we chose]
  **Rationale:** [Why]
  **Alternatives considered:** [What else we looked at]
  ```

### Create Core Subagents
- [ ] `.claude/agents/uiux-designer.md`
- [ ] `.claude/agents/frontend-expert.md`
- [ ] `.claude/agents/backend-expert.md`
- [ ] `.claude/agents/code-reviewer.md`
- [ ] `.claude/agents/perf-optimizer.md`

### Create Quick Commands
- [ ] `.claude/commands/quick-review.md`
- [ ] `.claude/commands/ux-check.md`
- [ ] `.claude/commands/component.md`
- [ ] `.claude/commands/endpoint.md`

### Establish Session Habits
- [ ] Morning: Review + plan with TodoWrite
- [ ] During: One feature per session, `/compact` after milestones
- [ ] EOD: Commit + document blockers

### Practice Parallel Agents
- [ ] Try running 2 Explore agents in parallel for research
- [ ] Example: "Find all booking-related files" + "Understand auth flow"

---

## Priority 3: Ongoing Habits

### Weekly CLAUDE.md Update
- [ ] Every Monday: Update "Current Focus" section
- [ ] Takes 2 minutes

### Document Decisions As You Make Them
- [ ] When choosing between approaches, add to DECISIONS.md
- [ ] Don't batch - do it immediately

### Refine Preferences Over Time
- [ ] Notice when Claude's output isn't quite right
- [ ] Add specific instructions to global CLAUDE.md
- [ ] Example: "When writing tests, use describe/it pattern"

---

## Priority 4: Optional Enhancements

### Create Custom Slash Commands
- [ ] `.claude/commands/review.md` - Code review prompt
- [ ] `.claude/commands/feature.md` - Feature implementation prompt
- [ ] See [06-agents.md](./06-agents.md) for setup

### Set Up Hooks
- [ ] `/hooks` to configure
- [ ] PostToolUse → Auto-format on Edit
- [ ] PreToolUse → Block sensitive file edits

### Create Skills for Complex Workflows
- [ ] `.claude/skills/component-library/SKILL.md`
- [ ] Include reference files and examples

---

## Files to Create Checklist

```
Project Setup:
□ /Users/tejas/Desktop/Tejas/PreTest/CLAUDE.md
□ /Users/tejas/Desktop/Tejas/PreTest/docs/DECISIONS.md

Global Setup:
□ ~/.claude/CLAUDE.md (update with preferences)

Agents:
□ .claude/agents/uiux-designer.md
□ .claude/agents/frontend-expert.md
□ .claude/agents/backend-expert.md
□ .claude/agents/code-reviewer.md
□ .claude/agents/perf-optimizer.md

Commands:
□ .claude/commands/quick-review.md
□ .claude/commands/ux-check.md
□ .claude/commands/component.md
□ .claude/commands/endpoint.md
□ .claude/commands/commit.md
```

---

## Quick Start Script

Run this to create the directory structure:

```bash
# Create directories
mkdir -p .claude/agents
mkdir -p .claude/commands
mkdir -p .claude/skills
mkdir -p docs

# Create placeholder files
touch CLAUDE.md
touch docs/DECISIONS.md

echo "Directory structure created!"
echo "Next steps:"
echo "1. Fill in CLAUDE.md with project context"
echo "2. Run /agents to create subagents"
echo "3. Create slash commands in .claude/commands/"
```

---

## Verification Checklist

After setup, verify everything works:

```
□ /agents shows your custom agents
□ /quick-review (or your command) works
□ Claude references your CLAUDE.md context
□ /compact works after a task
□ Subagents are auto-invoked for matching tasks
```

---

## Related Documents

- [01-setup.md](./01-setup.md) - Project setup details
- [04-context-management.md](./04-context-management.md) - CLAUDE.md templates
- [06-agents.md](./06-agents.md) - Agent and command examples
