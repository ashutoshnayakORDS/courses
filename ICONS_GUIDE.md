# PWA Icons Setup Guide

Your PWA is almost ready! You just need to add icons for the app to be installable.

## Quick Solution: Use a Free Icon Generator

Visit one of these websites and upload a logo or create a simple icon:

1. **PWA Asset Generator** (Recommended)
   - Visit: https://www.pwabuilder.com/imageGenerator
   - Upload a 512x512 image
   - Download the generated icons
   - Extract to `/courses/icons/` folder

2. **RealFaviconGenerator**
   - Visit: https://realfavicongenerator.net/
   - Upload your image
   - Select PWA options
   - Download and extract to `/courses/icons/`

## Required Icon Sizes

Create PNG icons in these sizes and save them in the `icons/` folder:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Simple DIY Solution

If you want to create a simple text-based icon quickly:

1. Create a 512x512 image with your initials or a simple design
2. Use any online tool like Canva, Figma, or even PowerPoint
3. Export as PNG
4. Use the PWA Asset Generator to create all sizes automatically

## Using the Provided SVG (Temporary)

I've created a simple SVG icon in `icons/icon.svg` that you can use temporarily. However, for the best experience, you should replace it with proper PNG icons.

## After Adding Icons

1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Add PWA support with icons"
   git push
   ```

2. Visit your GitHub Pages site: `https://[username].github.io/courses/`

3. On mobile (Android):
   - Open Chrome
   - Visit your site
   - Tap the menu (three dots)
   - Tap "Install app" or "Add to Home screen"

4. On mobile (iOS):
   - Open Safari
   - Visit your site
   - Tap the Share button
   - Tap "Add to Home Screen"

5. On desktop (Chrome/Edge):
   - Visit your site
   - Look for the install icon in the address bar
   - Click to install

## Verifying Your PWA

1. Open Chrome DevTools (F12)
2. Go to "Application" tab
3. Check "Manifest" - should show all your app details
4. Check "Service Workers" - should show "activated and running"
5. Go to "Lighthouse" tab
6. Run a PWA audit to see your score

Your app is now installable and works offline!
