// Service Worker for Learning Platform PWA
const CACHE_NAME = 'learning-platform-v1';
const urlsToCache = [
  '/courses/',
  '/courses/index.html',
  '/courses/styles.css',
  '/courses/theme.js',
  '/courses/courses.js',
  '/courses/navigation.js',
  '/courses/renderers.js',
  '/courses/interviews.js',
  '/courses/modules/module0-prerequisites.js',
  '/courses/modules/module1-foundations.js',
  '/courses/modules/module6-message-queues.js',
  '/courses/modules/module7-apis.js',
  '/courses/modules/module8-microservices.js',
  '/courses/modules/module9-advanced-patterns.js',
  '/courses/modules/module10-observability.js',
  '/courses/modules/module11-real-designs.js'
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

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          console.log('[Service Worker] Serving from cache:', event.request.url);
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // If both cache and network fail, show offline page
          console.log('[Service Worker] Fetch failed for:', event.request.url);
          // You could return a custom offline page here
        });
      })
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
