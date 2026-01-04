# Social Sharing Assets Generation Guide

This directory contains social media Open Graph (OG) images for link sharing.

## Source Files

SVG templates are provided for easy editing and regeneration:

- **og-image.svg** (1200x630) - For Facebook, LinkedIn
- **twitter-card.svg** (1200x600) - For Twitter/X
- **og-logo.svg** (400x400) - Square logo for social profiles

## Required PNG Outputs

Generate these PNG files from the SVG sources:

1. `og-image.png` (1200x630) - Primary OG image
2. `twitter-card.png` (1200x600) - Twitter card
3. `og-logo.png` (400x400) - Square logo

## Generation Methods

### Option 1: Using Online Tools (Easiest)

**CloudConvert**: https://cloudconvert.com/svg-to-png
1. Upload SVG file
2. Set quality to 100%
3. Download PNG
4. Repeat for all 3 files

**SVGOMG + Manual Export**:
1. Open SVG in browser
2. Right-click → "Save Image As" → PNG
3. May need to use screenshot tool for exact dimensions

### Option 2: Using ImageMagick (Command Line)

```bash
# Navigate to og directory
cd Client_UI/public/og

# Generate OG image (1200x630)
convert og-image.svg -resize 1200x630 -quality 95 og-image.png

# Generate Twitter card (1200x600)
convert twitter-card.svg -resize 1200x600 -quality 95 twitter-card.png

# Generate square logo (400x400)
convert og-logo.svg -resize 400x400 -quality 95 og-logo.png
```

**Install ImageMagick**:
- macOS: `brew install imagemagick`
- Ubuntu: `sudo apt-get install imagemagick`
- Windows: Download from https://imagemagick.org/

### Option 3: Using Sharp (Node.js)

Create `scripts/generate-og-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  { input: 'og-image.svg', output: 'og-image.png', width: 1200, height: 630 },
  { input: 'twitter-card.svg', output: 'twitter-card.png', width: 1200, height: 600 },
  { input: 'og-logo.svg', output: 'og-logo.png', width: 400, height: 400 },
];

const ogDir = path.join(__dirname, '../public/og');

async function generateOGImages() {
  for (const { input, output, width, height } of images) {
    const svgBuffer = fs.readFileSync(path.join(ogDir, input));

    await sharp(svgBuffer)
      .resize(width, height)
      .png({ quality: 95 })
      .toFile(path.join(ogDir, output));

    console.log(`✓ Generated ${output} (${width}x${height})`);
  }
}

generateOGImages()
  .then(() => console.log('All OG images generated!'))
  .catch(err => console.error('Error:', err));
```

Run:
```bash
npm install sharp
node scripts/generate-og-images.js
```

### Option 4: Using Figma (For Designers)

1. Import SVG into Figma
2. Select frame
3. Export as PNG at 2x resolution
4. Resize if needed in Figma before export

## Metadata Configuration

The metadata is already configured in `app/layout.tsx`. After generating PNGs, update:

```typescript
export const metadata: Metadata = {
  title: "PreTest - Master Your Next Interview",
  description: "Practice with recent grads from top companies. Get personalized mock interviews and feedback to ace your next interview.",
  openGraph: {
    title: "PreTest - Master Your Next Interview",
    description: "Practice with recent grads from top companies",
    url: "https://pretest.com", // Update with actual URL
    siteName: "PreTest",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "PreTest - Master your next interview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PreTest - Master Your Next Interview",
    description: "Practice with recent grads from top companies",
    images: ["/og/twitter-card.png"],
    creator: "@pretest", // Update with actual Twitter handle
  },
};
```

## Customization

To customize the OG images:

1. **Edit SVG files** directly - they're plain text XML
2. **Change colors**:
   - Orange accent: `#f97316`
   - Dark text: `#111827`
   - Gray text: `#6b7280`, `#9ca3af`
3. **Update text**:
   - Brand name: "PreTest"
   - Main tagline: "Master your next interview"
   - Sub-tagline: "Practice with recent grads from top companies"
4. **Regenerate PNGs** after changes

## Validation and Testing

After generating PNG files, validate:

### 1. File Validation
```bash
# Check file sizes (should be under 1MB each)
ls -lh *.png

# Verify dimensions
file *.png
```

### 2. Social Media Validators

**Facebook/LinkedIn Sharing Debugger**:
- URL: https://developers.facebook.com/tools/debug/
- Enter your site URL
- Check image preview
- Click "Scrape Again" if needed

**Twitter Card Validator**:
- URL: https://cards-dev.twitter.com/validator
- Enter your site URL
- Verify card preview

**LinkedIn Post Inspector**:
- URL: https://www.linkedin.com/post-inspector/
- Enter your site URL
- Check preview

### 3. Visual Quality Checks
- [ ] Text is readable at small sizes
- [ ] Logo is crisp and clear
- [ ] Colors match brand (#f97316 orange)
- [ ] No pixelation or artifacts
- [ ] Background is clean white
- [ ] Accent borders visible

## Optimization (Optional)

Reduce file size while maintaining quality:

```bash
# Using pngquant
pngquant --quality=80-95 --ext .png --force og/*.png

# Using optipng
optipng -o7 og/*.png
```

Target sizes:
- og-image.png: < 200KB
- twitter-card.png: < 200KB
- og-logo.png: < 50KB

## Troubleshooting

### Images not showing in preview
- Clear social media cache using validators
- Ensure files are publicly accessible (not behind auth)
- Check file paths in metadata (should be `/og/og-image.png`)
- Verify PNG files exist in `/public/og/` directory

### Blurry images
- Increase PNG quality (95-100%)
- Ensure SVG → PNG conversion maintains dimensions
- Use 2x resolution if needed (2400x1260 → resize to 1200x630)

### Wrong aspect ratio
- Verify exact dimensions: 1200x630 (OG), 1200x600 (Twitter)
- Don't use "fit" or "contain" - use exact resize
- Check Twitter requires 2:1 ratio (1200:600 = 2:1)

### Text rendering issues
- Use web-safe fonts (system-ui, -apple-system)
- Ensure sufficient contrast (WCAG AA minimum)
- Test on actual social media platforms

## Next Steps

After generating OG images:
- [ ] Generate all PNG files using one of the methods above
- [ ] Place PNG files in `/public/og/` directory
- [ ] Update metadata in `app/layout.tsx` with production URL
- [ ] Test with Facebook Sharing Debugger
- [ ] Test with Twitter Card Validator
- [ ] Test with LinkedIn Post Inspector
- [ ] Update Task 0.10 status to completed in TASKS.md
- [ ] Commit and deploy

## Design Rationale

**Color Choices**:
- White background: Clean, professional, works on all platforms
- Orange accent (#f97316): Brand color, draws attention
- Dark gray text (#111827): High contrast, readable
- Light gray sub-text (#6b7280): Hierarchy, not overwhelming

**Layout**:
- Logo on left: Visual anchor, brand recognition
- Text on right: Natural reading flow (left to right)
- Accent borders: Frame the content, subtle brand reinforcement
- Centered alignment: Professional, balanced

**Typography**:
- System fonts: Fast loading, native feel
- 96px brand name: Large enough for recognition
- 42px tagline: Secondary hierarchy
- 28px sub-tagline: Tertiary information
- Negative letter-spacing: Modern, tight, professional
