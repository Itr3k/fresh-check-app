
// Service Worker for Fresh Check app
const CACHE_NAME = 'freshcheck-cache-v3';
const RUNTIME_CACHE = 'freshcheck-runtime-v3';

// Resources to cache immediately on install - critical path resources
const PRECACHE_RESOURCES = [
  '/',
  '/index.html',
  '/src/index.css',
  '/favicon.ico',
  '/manifest.json'
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
  
  // Always network only for API responses
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

// Performance optimization: limit cache size
const limitCacheSize = async (cacheName, maxItems) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    // Delete oldest items when cache gets too large
    await cache.delete(keys[0]);
    // Recursively trim until we're at max size
    await limitCacheSize(cacheName, maxItems);
  }
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
              // Limit cache size
              limitCacheSize(RUNTIME_CACHE, 100);
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
              // Limit cache size
              limitCacheSize(RUNTIME_CACHE, 100);
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
                // Limit cache size
                limitCacheSize(RUNTIME_CACHE, 50);
              });
              return networkResponse;
            })
            .catch(error => {
              console.error('Fetch failed in stale-while-revalidate:', error);
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
