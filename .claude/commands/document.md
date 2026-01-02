# Documentation

Read the product context from @.claude/context/PRODUCT.md
Read learnings from @.claude/context/LEARNINGS.md

---

Help me document: **$ARGUMENTS**

## Documentation types:

### If documenting a feature/flow:
```markdown
# [Feature Name]

# Problem Statement

# Vocabulary ( if any )

# Solutions/Approaches ( If applicable )
Description of how the feature should work
Step by Step breakdown of the steps involved in bullet points

For e.g. -

1. user visits landing page and clicks Select Mentor CTA
2. User navagates to explore-mentors page
and so on


## Folder/File Structure
- `path/to/file.ts` - [what it does]
- `path/to/another.ts` - [what it does]

## API endpoints (if applicable)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/x   | Does X      |

## Edge cases / gotchas
- [Thing to watch out for]
```


### If documenting a decision (ADR):
```markdown
# [Decision Title]

**Date:** [Date]
**Status:** Accepted / Superseded / Deprecated

## Context
[Why we needed to make this decision]

## Decision
[What we decided]

## Alternatives considered
- [Option A] - [Why not]
- [Option B] - [Why not]

## Consequences
- [Good consequence]
- [Trade-off or risk]
```

### If documenting an API:
```markdown
# [Endpoint/Function Name]

## Overview
[What it does in one line]

## Request
```json
{
  "field": "type - description"
}
```

## Response
```json
{
  "field": "type - description"
}
```

## Errors
| Code | Meaning |
|------|---------|
| 400  | [When this happens] |
| 404  | [When this happens] |

## Example
[Working example]
```

## Guidelines:
- Keep it scannable (headers, bullets, tables)
- Document the "why" not just the "what"
- Include examples where helpful
- Link to related docs/files
- Don't over-document - just enough to be useful

What are we documenting? I'll ask clarifying questions if needed.
