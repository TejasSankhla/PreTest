# PreTest UX Strategy Guide

> Strategic context for UI/UX decisions. Read this before planning or reviewing designs.

---

## Our Design Philosophy

### 1. Psychology Over Pixels

Design isn't about making things pretty - it's about making students **feel** something:
- **Calm, not anxious** - They're already nervous about interviews
- **Empowered, not overwhelmed** - Clear next steps, not 10 options
- **Supported, not sold to** - Like talking to a senior, not a salesman
- **Confident, not skeptical** - Trust signals early and often

**Every design decision should answer: "How does this make a nervous student feel?"**

---

## Design Principles

### 1. Attraction Through Authenticity

We're not trying to look like Google. We're PreTest - community-powered, honest, supportive.

**What attracts our users:**
- Real mentor faces (not stock photos)
- Honest reviews (not cherry-picked 5-stars)
- Clear pricing (no "Contact us" mystery)
- Modern but warm aesthetic (professional without corporate)

### 2. Modern Design Language

**Patterns we use:**
- **Bento grids** - Varied card sizes, visual interest without clutter
- **Subtle gradients** - Warmth and depth (purpose-driven, not decorative)
- **Micro-interactions** - Hover states, smooth transitions (150-300ms)
- **Honey accents** - Warm orange highlights for energy and action
- **Generous whitespace** - Let content breathe, don't pack the screen

**What we avoid:**
- Corporate blue templates
- Generic stock photography
- Busy, cluttered layouts
- Harsh shadows or neon colors
- Decorative animations without purpose

### 3. Mobile-First Reality

Our users are college students - many browse on phones with spotty WiFi.

**Design rules:**
- 375px width is the baseline (iPhone SE)
- Touch targets: 44px minimum
- Content readable without zooming (16px+ body text)
- Images optimized for slow connections
- No horizontal scrolling

### 4. Trust Through Transparency

Students are skeptical. They've seen too many "placement guarantee" scams.

**How we build trust:**
- Mentor credentials visible early (company logos, titles)
- Reviews with real names and photos (when possible)
- Transparent pricing (no hidden fees)
- Clear value prop (why PreTest vs free YouTube?)
- Social proof (X students helped, Y sessions completed)

---

## Color Psychology

### Primary: Blue (#2563eb)
**Emotion:** Trust, professional, calm
**Use for:** Backgrounds, secondary buttons, trust elements
**Why:** Reduces anxiety, feels reliable

### Secondary: Orange (#f97316)
**Emotion:** Energy, action, warmth
**Use for:** CTAs ("Book Session"), highlights, accents
**Why:** Drives action without aggression, feels friendly

### Neutrals: Slate Scale
**Use for:** Text, borders, subtle backgrounds
**Why:** Clean, modern, not harsh

### Semantic Colors
- **Green:** Success, confirmation
- **Red:** Errors, warnings
- **Yellow:** Caution, info

**Color Rule:** Use color with intent. Every color choice should have a psychological reason.

---

## Typography Hierarchy

### Geist Font Family
- **Geist Sans:** Body text, UI elements
- **Geist Mono:** Code, technical content (if applicable)

### Scale
- **Display (48-72px):** Hero headlines, major CTAs
- **Heading (18-32px):** Section titles
- **Body (14-18px):** Paragraph text, descriptions
- **Label (10-14px):** UI labels, metadata

**Typography Rule:** BIG headlines (grab attention) + generous line-height (easy reading) + short paragraphs (scannable).

---

## Layout Patterns

### Bento Grids (Varied Card Sizes)

Use when showing multiple related items with different importance levels.

**Example: "How It Works" section**
```
┌─────────────┬──────┐
│   Step 1    │ Step │
│  (Featured) │  2   │
├─────────────┼──────┤
│  Step 3     │ Step │
│             │  4   │
└─────────────┴──────┘
```

**When to use:**
- Feature showcases
- Mentor highlights (featured + recent)
- Dashboard sections (primary + quick actions)

**When NOT to use:**
- Simple lists (use regular grid)
- Long content (use standard layout)

### Hero Sections

**Structure:**
1. One-line headline (problem or value prop)
2. Supporting sentence (expand on headline)
3. Primary CTA (obvious, action-oriented)
4. Trust signal or social proof

**Example:**
```
Headline: "Fail safely here, not in your real interview"
Subheadline: "Practice with recent grads from Google, Amazon, Flipkart"
CTA: "Find a Mentor"
Trust: "Join 500+ students who practiced before their placement"
```

### Mentor Cards

**Essential elements:**
- Mentor photo (builds connection)
- Name + title
- Company logo (trust signal)
- Rating + review count (social proof)
- Interview types (DSA, System Design, etc.)
- Price + "Book" CTA

**Visual priority:**
1. Company logo (eye goes here first)
2. Rating (validation)
3. CTA button (action)

---

## Micro-Interactions

**Button Hover (200ms):**
- Scale: 1.02
- Shadow: Slight elevation
- Background: Subtle color shift

**Card Hover (250ms):**
- Lift effect (shadow change)
- Border color shift
- Content reveal (if applicable)

**Loading States:**
- Skeleton screens (no spinners)
- Gentle pulse animation
- Progress indicators for multi-step flows

**Success States:**
- Quick bounce animation (100ms)
- Color change (green confirmation)
- Checkmark icon

**Interaction Rule:** Every interaction should feel responsive, not laggy. 200-300ms max.

---

## Spacing & Rhythm

**Base unit: 4px**

**Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96

**Common uses:**
- 4-8px: Tight spacing (icon + text)
- 12-16px: Card padding, button padding
- 24-32px: Section spacing
- 48-64px: Major section breaks
- 96px: Hero section padding

**Spacing Rule:** More whitespace than you think. Cramped layouts = anxiety.

---

## Accessibility Essentials

### Color Contrast
- Body text: 4.5:1 minimum (WCAG AA)
- Large text (18px+): 3:1 minimum
- Interactive elements: Clear focus states

### Touch Targets
- Buttons: 44px × 44px minimum
- Links: 16px padding around text
- Form inputs: 48px height minimum

### Semantic HTML
- Use proper heading hierarchy (h1 → h6)
- Label all form inputs
- Alt text for all images
- ARIA labels for icons

---

## Brand Voice in Design

### Supportive Reality Check

**What this means for design:**
- Copy is direct, not fluffy ("Practice safely" not "Transform your career!")
- Visuals are honest, not staged (real mentors, real reviews)
- CTAs are clear, not manipulative ("Book Session" not "Don't miss out!")
- Feedback is constructive, not harsh (helpful, not mean)

**Tone examples:**

✅ **Good:**
- "We've all been there"
- "Make your mistakes here, not in the interview"
- "Practice with someone who just cracked it"

❌ **Bad:**
- "You're amazing!"
- "Guaranteed placement!"
- "Best platform in the world!"

---

## Review Checklist

Use this for every design:

**Psychology & Emotion**
- [ ] Does this calm or stress a nervous student?
- [ ] Does it feel supportive (senior) or sales-y (company)?
- [ ] Is the value prop clear in 3 seconds?

**Visual Design**
- [ ] Is the visual hierarchy obvious? (What draws the eye first?)
- [ ] Are colors used with psychological intent?
- [ ] Is there generous whitespace?
- [ ] Do animations serve a purpose (not just decoration)?

**Mobile Experience**
- [ ] Works at 375px width?
- [ ] Touch targets 44px+?
- [ ] Text readable without zooming?
- [ ] No horizontal scrolling?

**Trust Signals**
- [ ] Mentor credentials visible early?
- [ ] Social proof present (ratings, reviews)?
- [ ] Pricing transparent (no surprises)?

**Copy & Messaging**
- [ ] Does copy match "Supportive Reality Check" tone?
- [ ] Headlines state value, not features?
- [ ] CTAs are action-oriented?

**Accessibility**
- [ ] Color contrast meets WCAG AA?
- [ ] Focus states visible?
- [ ] Semantic HTML used?

---

## Common Anti-Patterns (Avoid These)

❌ **Too many options** - Paradox of choice leads to paralysis
❌ **Buried CTAs** - Primary action not obvious
❌ **Missing trust signals** - No mentor credentials or social proof visible
❌ **Corporate stock photos** - Generic, not authentic
❌ **Sales-y copy** - "Transform your life!" instead of "Practice safely"
❌ **Decorative gradients** - Pretty but purposeless
❌ **Tiny mobile buttons** - <44px touch targets
❌ **Cluttered layouts** - No breathing room
❌ **Vague value prop** - "Best platform" vs "Practice with Google engineers"

---

## When Planning New Designs

Ask yourself:

**1. User Psychology**
- Who is this for? (Student or Mentor?)
- What's their emotional state? (Anxious? Curious? Ready to book?)
- What feeling should this evoke? (Calm? Energized? Confident?)

**2. Design Approach**
- What modern patterns fit? (Bento grid? Simple list? Hero section?)
- What colors convey the right emotion?
- How much whitespace do we need?

**3. Trust & Attraction**
- What makes them believe this will help?
- What makes them want to click?
- What could make them skeptical?

**4. Tradeoffs**
- Option A vs B - which serves the psychology better?
- Simpler vs richer - which fits our users?
- Fast to ship vs perfect - what's the 80/20?

---

*Last updated: December 2024*
*For PreTest UI/UX Strategic Planning*
