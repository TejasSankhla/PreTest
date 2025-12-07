# FAQ

**File:** `components/ui/home/faq.tsx`
**Type:** Component
**Client/Server:** Client Component (`"use client"`)

## Overview

Accordion-style FAQ (Frequently Asked Questions) component for the home page. Features expandable/collapsible question-answer sections with smooth transitions and toggle icons.

## Dependencies

| Package | Purpose |
|---------|---------|
| `lucide-react` | ChevronUp/ChevronDown icons |

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `Faq` | React.FC | FAQ section component (default export) |

## State Management

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `openIndex` | `number \| null` | `null` | Index of currently open FAQ item |

## Internal Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `toggleOpen` | `index: number` | `void` | Opens/closes FAQ item at given index |

## FAQ Content

| Index | Question | Topic |
|-------|----------|-------|
| 0 | What is PreTest? | Platform overview |
| 1 | Who can be a mentor...? | Mentor eligibility & booking |
| 2 | Do I need to pay...? | Pricing information |

## Usage Examples

### In Home Page

```tsx
import Faq from "@/components/ui/home/faq"

export default function HomePage() {
  return (
    <main>
      {/* Other sections */}
      <Faq />
    </main>
  )
}
```

### Standalone Usage

```tsx
import Faq from "@/components/ui/home/faq"

<section className="py-16 bg-gray-50">
  <Faq />
</section>
```

## Component Structure

```
<section>
  ├── <div> (container)
  │   ├── <div> (header)
  │   │   └── <h2> "Frequently Asked Questions"
  │   │
  │   ├── <div> (FAQ items container)
  │   │   ├── FAQ Item 0
  │   │   ├── FAQ Item 1
  │   │   └── FAQ Item 2
  │   │
  │   └── <p> "Can't find what you're looking for? Contact support"
</section>
```

## FAQ Item Structure

```tsx
<div className="rounded-md border border-gray-400 shadow-lg">
  <button onClick={() => toggleOpen(index)}>
    <span>Question text</span>
    {openIndex === index ? <ChevronUp /> : <ChevronDown />}
  </button>
  {openIndex === index && (
    <div className="px-4 pb-5">
      <p>Answer text</p>
    </div>
  )}
</div>
```

## Behavior

1. **Initial State:** All FAQ items are collapsed
2. **On Click:**
   - If item is closed → Opens the clicked item (closes any other open item)
   - If item is open → Closes it
3. **Single Open:** Only one FAQ item can be open at a time
4. **Visual Indicator:** Chevron icon rotates (Up when open, Down when closed)

## Styling

### Container
```css
mx-auto max-w-7xl px-4 py-10 md:px-0
```

### FAQ Item
```css
rounded-md border border-gray-400
shadow-lg transition-all duration-200
```

### Question Button
```css
flex w-full items-center justify-between
px-4 py-5 sm:p-6
```

### Question Text
```css
text-base sm:text-lg font-semibold text-black
```

### Answer Text
```css
text-sm sm:text-base text-gray-500
```

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| Mobile | Smaller text, reduced padding |
| `sm` | Larger text, increased padding |
| `md` | No horizontal padding on container |

## Related Files

**Imports from:**
- `lucide-react`

**Used by:**
- `app/page.tsx` - Home page

## Notes

- Only one FAQ item can be open at a time (accordion behavior)
- Support link currently points to `#` (placeholder)
- Content is hardcoded - could be converted to accept FAQ data as props
- Uses semantic `<section>` element for accessibility
- Transition classes applied for smooth open/close animation
