# Legal Pages

## Overview

Legal documentation pages for PreTest platform. All pages are static server components located in the `(legal)` route group.

## Route Group

The parentheses in `(legal)` create a route group in Next.js App Router that organizes files without affecting URL paths:

```
app/
  (legal)/
    privacy-policy/page.tsx    → /privacy-policy
    terms-and-conditions/page.tsx → /terms-and-conditions
    refunds/page.tsx           → /refunds
```

## Routes

| Route | File | Description |
|-------|------|-------------|
| `/privacy-policy` | [privacy-policy/page.tsx](./privacy-policy.md) | Privacy policy |
| `/terms-and-conditions` | [terms-and-conditions/page.tsx](./terms-and-conditions.md) | Terms of service |
| `/refunds` | [refunds/page.tsx](./refunds.md) | Refund & cancellation policy |

## Page Structure

All legal pages follow the same structure:

```
<div className="max-w-4xl mx-auto p-6">
  <h1>Page Title</h1>
  <p>Effective Date</p>

  <h2>Section 1</h2>
  <p>Content...</p>

  <!-- Additional sections -->

  <h2>Contact Us</h2>
  <p>pretest.dev@gmail.com</p>
</div>
```

## Effective Dates

| Page | Effective Date |
|------|----------------|
| Privacy Policy | [Insert Date] |
| Terms and Conditions | 7th Sept. 2024 |
| Refunds | 6th Sept. 2024 |

## Key Policies

### Privacy Policy
- Data collection disclosure
- Usage and sharing policies
- Cookie usage
- User rights

### Terms and Conditions
- Acceptable use policy
- Account responsibilities
- Intellectual property
- Liability limitations

### Refunds
- **No refunds** under any circumstances
- **No cancellations** once booked
- Users must verify availability before booking

## Common Disclaimers

All pages include:
1. Platform is for "fun and educational purposes"
2. Not responsible for legal issues from use
3. Contact: pretest.dev@gmail.com

## Styling

Consistent across all legal pages:

```css
/* Container */
max-w-4xl mx-auto p-6

/* Main heading */
text-3xl font-bold mb-6

/* Section headings */
text-xl font-semibold mb-4

/* Paragraphs */
mb-6

/* Lists */
list-disc list-inside mb-6

/* Date meta */
text-sm text-gray-500 mb-4
```

## Navigation

Accessed via footer links:

```tsx
// In footer.tsx
<Link href="/privacy-policy">Privacy Policy</Link>
<Link href="/terms-and-conditions">Terms & Conditions</Link>
<Link href="/refunds">Refund Policy</Link>
```

## Technical Notes

- All pages are Server Components (no `"use client"`)
- No external dependencies
- No API calls (static content)
- No dynamic data
- SEO-friendly for legal compliance
