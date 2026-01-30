// Service Worker for Learning Platform PWA
// Auto-generated timestamp: This ensures cache updates when you push changes
const CACHE_VERSION = '2026-01-30T02:55:14'; // Auto-update this on each deploy
const CACHE_NAME = `learning-platform-${CACHE_VERSION}`;

const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './theme.js',
  './courses.js',
  './navigation.js',
  './renderers.js',
  './interviews.js',
  './modules/module0-prerequisites.js',
  './modules/module1-foundations.js',
  './modules/module6-message-queues.js',
  './modules/module7-apis.js',
  './modules/module8-microservices.js',
  './modules/module9-advanced-patterns.js',
  './modules/module10-observability.js',
  './modules/module11-real-designs.js'
];

// Install event - cache all resources
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - Network first for HTML/JS/CSS, cache fallback for offline
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // For course content files, always try network first to get fresh content
  const isDynamic = url.pathname.endsWith('.js') ||
                    url.pathname.endsWith('.html') ||
                    url.pathname.endsWith('.css') ||
                    url.pathname.includes('/modules/');

  if (isDynamic) {
    // Network first, fallback to cache (ensures fresh content)
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone and cache the fresh response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(event.request);
        })
    );
  } else {
    // For other resources (images, icons), cache first
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
