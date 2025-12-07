# Privacy Policy Page

**File:** `app/(legal)/privacy-policy/page.tsx`
**Type:** Page (Next.js App Router)
**Route:** `/privacy-policy`
**Client/Server:** Server Component

## Overview

Static legal page displaying PreTest's privacy policy. Covers data collection, usage, sharing, security, cookies, and user rights.

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `PrivacyPolicy` | React.FC | Privacy policy page (default export) |

## Route Group

Located in `(legal)` route group:
```
app/
  (legal)/
    privacy-policy/
      page.tsx
```

The parentheses `(legal)` create a route group that doesn't affect the URL path.

## Content Sections

| Section | Description |
|---------|-------------|
| 1. Introduction | Platform purpose and disclaimer |
| 2. Information We Collect | Personal and non-personal data |
| 3. How We Use Your Information | Data usage purposes |
| 4. Sharing Your Information | Data sharing circumstances |
| 5. Data Security | Security measures disclaimer |
| 6. Cookies and Tracking | Cookie usage explanation |
| 7. Your Rights | User data rights |
| 8. Changes to Policy | Policy update notification |
| 9. Contact Us | Support email |

## Data Collected

### Personal Information
- Full Name
- Email Address
- Profile Picture (optional)
- Mentorship preferences and goals
- Communications with mentors

### Non-Personal Information
- IP Address
- Device and browser information
- Platform usage data

## Component Structure

```
<div className="max-w-4xl mx-auto p-6">
  ├── <h1> Privacy Policy
  ├── <p> Effective Date
  │
  ├── Section 1-9
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

1. Platform is for "fun and educational purposes only"
2. Not responsible for legal cases or disputes
3. No absolute security guarantee
4. Cookie disabling may limit functionality

## Contact Information

- **Email:** pretest.dev@gmail.com

## Usage

```tsx
// Footer link
<Link href="/privacy-policy">Privacy Policy</Link>

// Direct URL
/privacy-policy
```

## Related Files

**Navigated from:**
- `components/ui/footer.tsx` - Footer links

**Related Legal Pages:**
- `/terms-and-conditions` - Terms of service
- `/refunds` - Refund policy

## Notes

- Server component (no client-side interactivity)
- Effective date placeholder: `[Insert Date]`
- No external dependencies
- Static content, no API calls
- Part of `(legal)` route group for organizational purposes
