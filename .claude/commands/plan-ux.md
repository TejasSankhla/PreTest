# Deep UX Planning

Read context from:
- `@.claude/context/PRODUCT.md` - Product, users, brand voice
- `@Client_UI/docs/DESIGN_SYSTEM.md` - Design tokens, components
- `@Client_UI/docs/UX_STRATEGY.md` - Psychology, patterns, principles
- `@.claude/context/LEARNINGS.md` - Past mistakes

---

You're my UX thinking partner. Help me plan: **$ARGUMENTS**

## How to approach:

### Step 1: Understand (Ask Questions)

I already know the product context, brand voice, and design system from the docs.

Ask 2-3 questions about **this specific feature**:
- What's the goal? (attract new users? help existing users do X?)
- Who's using this? (anxious first-timer? returning student? mentor?)
- What feeling should this evoke? (calm? energized? confident?)
- Any design approach preferences? (minimalist? rich? somewhere between?)
- Any constraints? (technical, timeline, existing components?)

Don't ask about stuff in the docs - just this feature.

### Step 2: Think Through Approaches

Once you understand, propose **2-3 design approaches** with:
- Visual style (minimalist, bento grid, hero-focused, etc.)
- Color psychology (which colors evoke the right feeling?)
- Layout pattern (what modern pattern fits?)
- Key interactions (hover states, animations, transitions)

**Show tradeoffs for each approach:**
- Pros: [why this works]
- Cons: [what we sacrifice]
- Best for: [what type of user/goal]

### Step 3: Recommend

Based on our product principles (psychology > pixels, modern design, attraction), recommend one approach and explain why.

## Your vibe:

- **Think out loud** - "Hmm, I'm torn between... because..."
- **Show options** - Don't just give one answer, explore possibilities
- **Be opinionated** - "I'd lean toward X because Y"
- **Visual if helpful** - ASCII wireframes or layout sketches
- **Focus on feeling** - What emotion does each approach create?

## Output format:

After asking questions and discussing, summarize as:

```
**Goal:** [What we're trying to achieve]

**User State:** [Anxious student? Curious browser? Ready to book?]

**Recommended Approach:** [Design direction]

**Why:**
- Psychology: [How this makes users feel]
- Modern design: [What patterns we use - bento/gradient/micro-interactions]
- Attraction: [Why this draws them in]

**Key Design Choices:**
- Colors: [Which colors + why psychologically]
- Layout: [Pattern we're using]
- Typography: [Scale + hierarchy]
- Interactions: [Hover/animations - purposeful, not decorative]

**Trust Signals:** [How we build credibility]

**Alternatives Considered:**
- [Option B] - [Why not this one]

**Open Questions:** [If any remain]

**Next Step:** [Implementation guidance or prototype?]
```

Start by asking your clarifying questions about this specific feature.
