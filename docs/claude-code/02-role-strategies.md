# Role-Specific Strategies

> Tailored approaches for frontend, backend, code cleanup, planning, and UI/UX work.

---

## 1. Frontend Development

### Setup Prompt
```
"Review our component structure in src/components/ and understand:
- How we structure components (atomic design, feature-based, etc.)
- Our styling approach, 
- State management patterns
- Common utilities we use - design system, styling variables"
```

### Implementation Prompt Pattern
```
"Implement [feature/component]:
- Requirements: [bullet points]
- Reference component: [path to similar component]
- Should follow existing patterns for [styling/state/props]
- Include: TypeScript types, proper accessibility"
```

### Component Creation Checklist
- [ ] TypeScript interfaces/types defined
- [ ] Proper prop validation
- [ ] Accessibility attributes (aria-*, role, etc.)
- [ ] Responsive design considerations
- [ ] Loading and error states
- [ ] Unit tests (if applicable)

---

## 2. Backend Development

### Setup Prompt
```
"Explore our backend structure and understand:
- How controllers are organized
- Our middleware patterns
- Database models and relationships
- Error handling approach
- Authentication/authorization flow"
```

### Implementation Prompt Pattern
```
"Implement [endpoint/service]:
- Endpoint: [METHOD /path]
- Purpose: [what it does]
- Reference: [similar existing endpoint]
- Include: input validation, error handling, proper types, tests"
```

### API Development Checklist
- [ ] Input validation (zod, joi, etc.)
- [ ] Proper error responses with status codes
- [ ] Authentication/authorization checks
- [ ] Database transaction handling (if needed)
- [ ] Rate limiting considerations
- [ ] API documentation updated

---

## 3. Code Cleanup & Optimization

### Review Prompt Pattern
```
"Review [file/module/directory] for:
1. Performance issues (N+1 queries, unnecessary re-renders, memory leaks)
2. Code duplication that should be abstracted
3. Missing error handling
4. Security vulnerabilities
5. TypeScript improvements (better types, removing `any`)

Provide specific suggestions with rationale and code examples."
```

### Refactoring Prompt Pattern
```
"Refactor [file/module]:
- Goal: [what improvement we want]
- Constraints: [don't change public API, maintain backwards compatibility, etc.]
- Test after refactoring to ensure nothing breaks"
```

---

## 4. Planning & Architecture

### Feature Planning Prompt
```
"I need to implement [feature]. Create an implementation plan including:
1. Technical approach and architecture
2. Files that need to be created/modified
3. Database changes (if any)
4. API changes (if any)
5. Frontend components needed
6. Potential risks and edge cases
7. Testing strategy"
```

### Architecture Decision Prompt
```
"I'm deciding between [option A] and [option B] for [specific problem].
Analyze both approaches considering:
- Performance implications
- Maintainability
- Scalability
- Implementation complexity
- Our existing patterns

Recommend one with clear rationale."
```

---

## 5. Strategies for UI/UX (Unfamiliar Domain)

### Research-First Approach

**Step 1: Learn**
```
"Research best practices for [specific UI pattern, e.g., onboarding flows,
data tables, form wizards] in modern web applications.
- What do top products (Stripe, Linear, Notion) do?
- What are common UX patterns?
- What mistakes should I avoid?"
```

**Step 2: Propose**
```
"Based on best practices, propose 2-3 approaches for implementing
[our specific feature]. Include:
- Pros and cons of each approach
- Complexity estimate
- How it fits our existing design system"
```

**Step 3: Implement**
```
"Implement option [X] with these adjustments: [specific changes].
Follow our existing component patterns in [reference path]."
```

### Reference-Based Design
```
"Look at [reference URL or describe the UI] and implement a similar
[component/flow] that:
- Fits our existing design system in src/styles/
- Uses our component library
- Maintains consistency with existing UI"
```

### Iterative Refinement
```
Phase 1: "Implement a functional version of [component] - focus on
         functionality over polish"

Phase 2: "Review the UX of [component] and suggest improvements for:
         - Visual hierarchy
         - User feedback (loading, success, error states)
         - Accessibility
         - Mobile responsiveness"

Phase 3: "Implement these UX improvements: [list specific changes]"
```

### UX Audit Prompt
```
"Audit [page/flow] for UX issues:
- Is the user journey clear?
- Are there unnecessary friction points?
- Is feedback immediate and clear?
- Are error messages helpful?
- Is it accessible?
- Does it work well on mobile?

Provide specific, actionable improvements."
```

---

## 6. Documentation

### Documentation Generation Prompt
```
"Generate documentation for [module/API/component]:
- Overview and purpose
- Usage examples
- API reference (props, methods, endpoints)
- Common patterns and recipes
- Troubleshooting guide"
```

### Code Comments Prompt
```
"Add JSDoc comments to [file] for:
- Public functions and methods
- Complex logic that isn't self-explanatory
- Type definitions
Keep comments concise and meaningful."
```

---

## Next Steps

- [03-workflow.md](./03-workflow.md) - Daily workflow and prompt templates
- [06-agents.md](./06-agents.md) - Automate these roles with subagents
