
// Service Worker for Fresh Check app
const CACHE_NAME = 'freshcheck-cache-v2';
const RUNTIME_CACHE = 'freshcheck-runtime-v2';

// Resources to cache immediately on install
const PRECACHE_RESOURCES = [
  '/',
  '/index.html',
  '/src/index.css',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/manifest.json',
  '/src/App.tsx',
  '/src/main.tsx'
];

// Important URLs that should always come from the network if possible
const NETWORK_FIRST_ROUTES = [
  '/food-safety/',
  '/recalls/',
  '/search',
  '/sitemap.xml',
  '/news-sitemap.xml'
];

// Cache images and static assets
const CACHE_FIRST_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.css', '.woff', '.woff2'
];

// Install event - precache static resources
self.addEventListener('install', event => {
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Pre-caching important resources');
        return cache.addAll(PRECACHE_RESOURCES);
      })
      .catch(err => {
        console.error('Pre-caching failed:', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        console.log('Deleting old cache:', cacheToDelete);
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Helper function to determine caching strategy based on URL
const getCacheStrategy = (url) => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  
  // Always network first for API responses and dynamic routes
  if (pathname.startsWith('/api/')) {
    return 'network-only';
  }
  
  // Network first for important routes that change frequently
  if (NETWORK_FIRST_ROUTES.some(route => pathname.startsWith(route))) {
    return 'network-first';
  }
  
  // Cache first for static assets
  if (CACHE_FIRST_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    return 'cache-first';
  }
  
  // Default strategy is stale-while-revalidate for HTML and other resources
  return 'stale-while-revalidate';
};

// Fetch event handler with optimized caching strategies
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const strategy = getCacheStrategy(event.request.url);
  
  switch (strategy) {
    case 'network-only':
      // Always use network, don't cache
      event.respondWith(
        fetch(event.request).catch(error => {
          console.error('Network fetch failed:', error);
          return new Response('Network error', { status: 408 });
        })
      );
      break;
      
    case 'network-first':
      // Try network first, fall back to cache
      event.respondWith(
        fetch(event.request)
          .then(response => {
            // Clone and cache the response
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(event.request, responseToCache);
            });
            return response;
          })
          .catch(() => {
            return caches.match(event.request).then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If no cached response for specific URL, try index.html for navigation
              if (event.request.headers.get('accept')?.includes('text/html')) {
                return caches.match('/index.html');
              }
              return new Response('Network error', { status: 408 });
            });
          })
      );
      break;
      
    case 'cache-first':
      // Try cache first, then network
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            // Return cached response immediately
            return cachedResponse;
          }
          
          // If not in cache, get from network and cache for next time
          return fetch(event.request).then(response => {
            // Cache the network response
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(event.request, responseToCache);
            });
            return response;
          });
        })
      );
      break;
      
    case 'stale-while-revalidate':
    default:
      // Return cached version immediately, then update cache in background
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Update the cache with newest version
              caches.open(RUNTIME_CACHE).then(cache => {
                cache.put(event.request, networkResponse.clone());
              });
              return networkResponse;
            })
            .catch(error => {
              console.error('Fetch failed in stale-while-revalidate:', error);
              // If the fetch fails but we have a cached response, that's handled already
              // This catch is mainly for logging
            });
          
          // Return the cached response immediately or wait for network
          return cachedResponse || fetchPromise;
        })
      );
      break;
  }
});

// Listen for message events to control cache
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAR_CACHES') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => caches.delete(cache))
        );
      }).then(() => {
        console.log('Caches cleared successfully');
        event.ports[0].postMessage({ result: 'Caches cleared successfully' });
      })
    );
  }
});
