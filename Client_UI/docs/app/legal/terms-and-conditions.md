# Terms and Conditions Page

**File:** `app/(legal)/terms-and-conditions/page.tsx`
**Type:** Page (Next.js App Router)
**Route:** `/terms-and-conditions`
**Client/Server:** Server Component

## Overview

Static legal page displaying PreTest's terms of service. Covers usage rules, account responsibilities, intellectual property, disclaimers, and liability limitations.

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `TermsAndConditions` | React.FC | Terms page (default export) |

## Route Group

Located in `(legal)` route group:
```
app/
  (legal)/
    terms-and-conditions/
      page.tsx
```

## Content Sections

| Section | Description |
|---------|-------------|
| 1. Introduction | Platform overview and agreement |
| 2. Use of the Service | Acceptable use policy |
| 3. User Accounts | Account responsibilities |
| 4. Intellectual Property | Content ownership |
| 5. Disclaimers | "As is" service disclaimer |
| 6. Limitation of Liability | Liability restrictions |
| 7. Termination | Account termination rights |
| 8. Changes to Terms | Terms update policy |
| 9. Contact Us | Support email |

## Effective Date

**7th Sept. 2024**

## Key Terms

### Prohibited Uses
- Violating applicable laws or regulations
- Restricting others' use of the service
- Transmitting harmful or unlawful content

### Account Responsibilities
- Provide accurate registration information
- Maintain account security
- Report unauthorized access
- Accept responsibility for account activity

### Intellectual Property
- All content is property of PreTest and licensors
- No copying, modifying, or distributing without permission

### Liability Limitations
- No liability for indirect, incidental, or consequential damages
- No liability for loss of profits, revenues, or data
- Includes legal disputes arising from use

## Component Structure

```
<div className="max-w-4xl mx-auto p-6">
  ├── <h1> Terms and Conditions
  ├── <p> Effective Date: 7th Sept. 2024
  │
  ├── Sections 1-9
  │   ├── <h2> Section Title
  │   ├── <p> Description
  │   └── <ul> List items (where applicable)
  │
  └── Contact: pretest.dev@gmail.com
</div>
```

## Styling

```css
/* Container */
max-w-4xl mx-auto p-6

/* Headings */
h1: text-3xl font-bold mb-6
h2: text-xl font-semibold mb-4

/* Content */
p: mb-6
ul: list-disc list-inside mb-6

/* Meta */
.text-sm .text-gray-500 mb-4
```

## Key Disclaimers

1. Service provided "as is" and "as available"
2. No warranties, express or implied
3. Platform for "fun and educational purposes"
4. Not responsible for legal issues from use

## Termination Rights

PreTest may terminate access:
- Immediately, without prior notice
- For Terms breach
- To protect service or other users

## Contact Information

- **Email:** pretest.dev@gmail.com

## Usage

```tsx
// Footer link
<Link href="/terms-and-conditions">Terms & Conditions</Link>

// Direct URL
/terms-and-conditions
```

## Related Files

**Navigated from:**
- `components/ui/footer.tsx` - Footer links

**Related Legal Pages:**
- `/privacy-policy` - Privacy policy
- `/refunds` - Refund policy

## Notes

- Server component (static content)
- No external dependencies
- No API calls
- Binding agreement upon service use
- Part of `(legal)` route group
