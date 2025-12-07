# Public Assets

## Overview

Static assets served from the `/public` directory. These files are accessible directly via their filename (e.g., `/icon.png`).

## Directory Structure

```
public/
├── bg_logo.png           # Background logo
├── check.svg             # Checkmark icon
├── icon.png              # App icon/favicon
├── logo_bg.png           # Logo with background
├── profile-banner.png    # Profile page banner
├── user-placeholder.png  # Default user avatar
│
└── colleges/             # College logos for carousel
    ├── IIITL.png
    ├── IIITR.png
    ├── IIITU.png
    ├── IITB.png
    ├── IITD.png
    ├── IITH.png
    ├── IITK.png
    └── IITM.png
```

## Asset Inventory

### Root Assets

| File | Size | Used By | Purpose |
|------|------|---------|---------|
| `bg_logo.png` | 29KB | Home page | Background branding |
| `check.svg` | 1KB | Components | Success indicator |
| `icon.png` | 20KB | App metadata | Favicon/app icon |
| `logo_bg.png` | 16KB | Navbar, Auth pages | Logo display |
| `profile-banner.png` | 42KB | Profile page | Header banner |
| `user-placeholder.png` | 20KB | Profile, Bookings | Default avatar |

### College Logos

Located in `/public/colleges/`:

| File | Institution |
|------|-------------|
| `IIITL.png` | IIIT Lucknow |
| `IIITR.png` | IIIT Ranchi |
| `IIITU.png` | IIIT Una |
| `IITB.png` | IIT Bombay |
| `IITD.png` | IIT Delhi |
| `IITH.png` | IIT Hyderabad |
| `IITK.png` | IIT Kanpur |
| `IITM.png` | IIT Madras |

## Usage Examples

### Next.js Image Component
```tsx
import Image from "next/image";

// Using imported image
import logo from "../public/logo_bg.png";
<Image src={logo} alt="PreTest Logo" width={48} height={48} />

// Using string path
<Image src="/user-placeholder.png" alt="User" width={100} height={100} />
```

### Standard img Tag
```tsx
<img
  src="/user-placeholder.png"
  alt="User"
  onError={(e) => (e.target.src = "/default-avatar.jpg")}
/>
```

### CSS Background
```css
background-image: url('/bg_logo.png');
```

## Component Usage Map

| Asset | Component | Usage |
|-------|-----------|-------|
| `logo_bg.png` | `navbar.tsx` | Site logo in header |
| `logo_bg.png` | `auth/log-in` | Login page branding |
| `logo_bg.png` | `auth/sign-up` | Sign up page branding |
| `profile-banner.png` | `profile/page.tsx` | Profile header |
| `user-placeholder.png` | `avatar.tsx` | Default avatar |
| `user-placeholder.png` | `my-bookings.tsx` | Fallback mentor photo |
| `colleges/*.png` | `scrollBar.tsx` | Infinite scroll carousel |
| `check.svg` | Various | Success states |

## College Logos Configuration

Used in the infinite scroll carousel on the home page:

```typescript
// scrollBar.tsx
const clg_logos = [
  "/colleges/IITB.png",
  "/colleges/IITD.png",
  "/colleges/IITM.png",
  "/colleges/IITK.png",
  "/colleges/IITH.png",
  "/colleges/IIITL.png",
  "/colleges/IIITR.png",
  "/colleges/IIITU.png",
];
```

## Image Optimization

Next.js automatically optimizes images used with the `Image` component:

- WebP/AVIF format conversion
- Lazy loading
- Responsive sizing
- Placeholder blur (when configured)

## Fallback Handling

```tsx
// Mentor profile picture with fallback
<img
  src={booking.mentor?.profile_pic || "/default-avatar.jpg"}
  onError={(e) => (e.target.src = "/default-avatar.jpg")}
/>
```

## File Sizes Summary

| Category | Files | Total Size |
|----------|-------|------------|
| Root assets | 6 | ~128KB |
| College logos | 8 | Variable |
| **Total** | **14** | ~150KB+ |

## Notes

- All assets served statically at build time
- No authentication required to access
- College logos used for credibility display
- User placeholder provides consistent fallback
- Profile banner creates visual header effect
