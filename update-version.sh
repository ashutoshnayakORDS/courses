#!/bin/bash
# Auto-update service worker cache version with current timestamp
# Run this before committing course updates

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S")
SW_FILE="sw.js"

# Update the CACHE_VERSION line in sw.js
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/const CACHE_VERSION = '.*';/const CACHE_VERSION = '$TIMESTAMP';/" "$SW_FILE"
else
    # Linux
    sed -i "s/const CACHE_VERSION = '.*';/const CACHE_VERSION = '$TIMESTAMP';/" "$SW_FILE"
fi

echo "✅ Updated service worker cache version to: $TIMESTAMP"
echo "📝 Course content will be refreshed for all users on next app load"
