# How Course Updates Work

Your PWA now has **automatic content updates**! Here's how it works:

## Update Strategy

### For Users (Automatic):
1. When you push updates to GitHub, users get fresh content automatically
2. App checks for updates every 30 seconds when the tab is active
3. When new content is detected, a green banner appears: "New content available!"
4. Users click "Update Now" to refresh, or dismiss and update later
5. On next app launch, they get the latest version automatically

### For You (When Updating Content):

**Option 1: Quick Update (Recommended)**
```bash
./update-version.sh          # Updates cache version
git add .
git commit -m "Update courses"
git push
```

**Option 2: Manual Update**
1. Edit your course files (courses.js, modules, etc.)
2. Open `sw.js` and update this line:
   ```javascript
   const CACHE_VERSION = '2026-01-30T08:30:00'; // Change to current timestamp
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update courses"
   git push
   ```

## What Happens When You Update:

### Immediately After Push:
- New files are live on GitHub Pages (~1-2 minutes)

### For Active Users:
- App checks for updates within 30 seconds
- Green banner appears: "New content available!"
- User clicks "Update Now" → instant refresh with new content

### For Users Who Closed the App:
- Next time they open the app, they get the latest version automatically
- No banner needed, just fresh content

## Update Frequency

The app checks for updates:
- ✅ On app launch (always)
- ✅ Every 30 seconds while app is open
- ✅ When user switches back to the tab

## Caching Strategy

### Network First (Always Fresh):
- All JavaScript files (.js)
- All HTML files (.html)
- All CSS files (.css)
- All module files (modules/*.js)

These files are **always fetched from the network first** when online, so users get fresh content immediately.

### Cache First (Fast Loading):
- Images
- Icons
- Static assets

These files load from cache for speed.

### Offline Mode:
- If user is offline, cached versions are used
- All content remains accessible

## Testing Updates

### Test Locally:
1. Make changes to course content
2. Run `./update-version.sh`
3. Open DevTools (F12) → Application → Service Workers
4. Click "Update" to test the update flow
5. You should see the update banner appear

### Test on GitHub Pages:
1. Push your changes
2. Wait 1-2 minutes for GitHub Pages to deploy
3. Open your installed app
4. Within 30 seconds, you should see the update banner
5. Click "Update Now" to verify fresh content loads

## Troubleshooting

### Users Not Getting Updates:
1. Check that you updated the cache version in `sw.js`
2. Verify changes are pushed to GitHub
3. Wait 1-2 minutes for GitHub Pages deployment

### Update Banner Not Showing:
- Make sure the CACHE_VERSION in `sw.js` was changed
- Check browser console for errors
- Ensure service worker is registered (DevTools → Application → Service Workers)

### Users Have Old Content:
- Tell them to click the "Update Now" button when banner appears
- Or close and reopen the app
- Or do a hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

## Best Practices

1. **Always run `./update-version.sh` before committing course updates**
   - This ensures the cache version changes
   - Users will be notified of new content

2. **Use meaningful commit messages**
   ```bash
   git commit -m "Add lesson on REST APIs"
   git commit -m "Fix typo in microservices module"
   ```

3. **Test locally before pushing**
   - Make sure everything works
   - Check for JavaScript errors in console

4. **For major updates, consider adding a changelog**
   - Users appreciate knowing what changed
   - Add a "What's New" section in your courses

## Example Workflow

```bash
# 1. Edit course content
code courses.js

# 2. Update cache version
./update-version.sh

# 3. Test locally
open index.html
# (Check browser, verify changes work)

# 4. Commit and push
git add .
git commit -m "Add new API design patterns lesson"
git push

# 5. Done! Users get updates automatically
```

## Summary

**You:** Edit courses → Run `./update-version.sh` → Commit → Push

**Users:** Get a green banner → Click "Update Now" → Fresh content!

That's it! No app store approval, no manual downloads, just instant updates.
