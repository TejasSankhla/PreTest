# Daily Workflow & Prompt Templates

> Daily workflow patterns and ready-to-use prompt templates.

---

## 1. Daily Workflow Template

### Morning Setup (15 mins)

```
□ Review yesterday's progress
□ Check any failed CI/CD or error logs
□ Plan today's tasks using TodoWrite
□ Identify the single most important task
```

**Morning Planning Prompt:**
```
"Today I need to work on: [list tasks]
Help me prioritize and break these down into actionable items.
Consider dependencies and tackle the hardest problem first."
```

### Development Sessions (Focus Blocks)

```
Session Structure:
├── State the goal clearly
├── Let Claude plan (TodoWrite)
├── Review and adjust plan
├── Execute with minimal interruption
├── Review output
├── Test changes
├── Commit with meaningful message
└── /compact before next task
```

**Feature Development Flow:**
```
1. "Explore the codebase to understand [relevant area]"
2. "Plan the implementation for [feature]"
3. "Implement [specific component/module]"
4. "Write tests for [what was implemented]"
5. "Review for edge cases and error handling"
6. "Commit changes"
```

### Code Review Time

```
"Review today's changes:
- Check for bugs and edge cases
- Verify error handling
- Look for performance issues
- Ensure code follows our patterns
- Verify tests are adequate"
```

### End of Day (10 mins)

```
□ Run full test suite
□ Commit any uncommitted work
□ Document any decisions made
□ Note blockers for tomorrow
□ Update CLAUDE.md if project context changed
```

**EOD Documentation Prompt:**
```
"Summarize today's work:
- What was implemented
- Any technical decisions made and why
- Known issues or TODOs
- What to continue tomorrow"
```

---

## 2. Prompt Templates Library

### Feature Implementation

```
"Implement [feature name]:

**Requirements:**
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

**Reference:** [path to similar existing code]

**Constraints:**
- [Performance requirements]
- [Security considerations]
- [Compatibility needs]

**Deliverables:**
- [ ] Implementation
- [ ] Types/interfaces
- [ ] Error handling
- [ ] Tests
- [ ] Documentation updates

Start by exploring relevant files, then propose an approach before implementing."
```

### Bug Fix

```
"**Bug Report:**
- **Description:** [What's happening]
- **Expected:** [What should happen]
- **Actual:** [What's actually happening]
- **Steps to reproduce:** [1, 2, 3...]
- **Relevant files:** [paths]
- **Error messages:** [if any]

Investigate the root cause and implement a fix. Explain what caused the issue."
```

### Code Review

```
"Review [file/directory/PR] with focus on:

**Correctness:**
- Logic errors
- Edge cases not handled
- Race conditions

**Security:**
- Input validation
- Authentication/authorization
- Data exposure

**Performance:**
- N+1 queries
- Unnecessary re-renders
- Memory leaks
- Bundle size impact

**Maintainability:**
- Code clarity
- Proper abstractions
- Test coverage

Be critical and specific. Provide code examples for suggested changes."
```

### Learning & Research

```
"I need to implement [unfamiliar concept/technology]:

1. **Explain:** What is it and why is it used?
2. **Patterns:** How is it typically implemented?
3. **Best practices:** What should I do/avoid?
4. **Our context:** How should we implement it given our:
   - Tech stack: [stack]
   - Existing patterns: [patterns]
   - Constraints: [constraints]
5. **Example:** Show me a concrete implementation example"
```

### API Design

```
"Design API for [feature]:

**Requirements:**
- [What it needs to do]

**Consider:**
- RESTful conventions
- Error responses
- Pagination (if applicable)
- Rate limiting
- Authentication requirements
- Backwards compatibility

**Output:**
- Endpoint specifications
- Request/response schemas
- Error codes and messages
- Example requests"
```

### Database Schema

```
"Design database schema for [feature]:

**Requirements:**
- [Data we need to store]
- [Relationships]
- [Query patterns]

**Consider:**
- Normalization vs denormalization
- Indexing strategy
- Future scalability
- Migration from existing schema (if applicable)

**Output:**
- Schema definition
- Indexes needed
- Migration script
- Example queries"
```

### Performance Optimization

```
"Optimize [component/endpoint/query]:

**Current state:**
- [Current performance metrics]
- [Pain points]

**Analyze:**
- Bottlenecks
- Unnecessary operations
- Caching opportunities
- Query optimization

**Constraints:**
- [Don't break existing functionality]
- [Maintain code readability]

**Output:**
- Specific optimizations with rationale
- Expected improvement
- Any trade-offs"
```

### Refactoring

```
"Refactor [code/module]:

**Goal:** [What we want to achieve - better readability, performance, etc.]

**Current issues:**
- [Issue 1]
- [Issue 2]

**Constraints:**
- [ ] Don't change public API
- [ ] Maintain backwards compatibility
- [ ] Keep tests passing

**Approach:**
1. First, analyze the current implementation
2. Propose refactoring strategy
3. Implement incrementally
4. Verify with tests"
```

---

## 3. Session Starters

Copy-paste these to start common session types:

### New Feature Session
```
Starting work on [feature name].

Context:
- Goal: [what we're building]
- Related files: [paths]
- Constraints: [any limitations]

Please explore the relevant code first, then propose an implementation plan.
```

### Bug Fix Session
```
Fixing bug: [description]

Symptoms:
- [What's happening]

Relevant files:
- [paths]

Please investigate and propose a fix.
```

### Refactoring Session
```
Refactoring [area]:

Goals:
- [What we want to improve]

Constraints:
- Don't break existing functionality
- Keep tests passing

Please analyze first, then propose a refactoring strategy.
```

### Learning Session
```
I need to understand [topic/technology] to implement [feature].

Please:
1. Explain the concept
2. Show common patterns
3. Recommend an approach for our codebase
4. Provide implementation examples
```

---

## Next Steps

- [04-context-management.md](./04-context-management.md) - Optimize context and personalization
- [06-agents.md](./06-agents.md) - Automate these prompts with slash commands
