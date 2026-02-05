// Service Worker for Smart Farming Assistant
// Provides offline functionality and caching

const CACHE_NAME = 'smart-farming-v1.0.0';
const STATIC_CACHE_NAME = 'smart-farming-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'smart-farming-dynamic-v1.0.0';

// Static assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/js/app.js',
    '/js/weather.js',
    '/js/soil.js',
    '/js/crops.js',
    '/js/language.js',
    '/manifest.json',
    // Font Awesome (CDN fallback)
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    // Google Fonts (local fallback)
    'https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap'
];

// Dynamic assets (API calls, etc.)
const DYNAMIC_ASSETS = [
    // Weather API endpoints will be cached dynamically
    // Geocoding API endpoints will be cached dynamically
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE_NAME)
                .then(cache => {
                    console.log('Caching static assets...');
                    return cache.addAll(STATIC_ASSETS.map(url => {
                        // Handle both relative and absolute URLs
                        return url.startsWith('http') ? url : new Request(url, { mode: 'cors' });
                    }));
                })
                .catch(err => {
                    console.warn('Failed to cache some static assets:', err);
                    // Continue anyway - partial caching is better than no caching
                }),
            
            // Initialize dynamic cache
            caches.open(DYNAMIC_CACHE_NAME)
        ])
        .then(() => {
            console.log('Service Worker installed successfully');
            // Force activation of new service worker
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            return cacheName !== STATIC_CACHE_NAME && 
                                   cacheName !== DYNAMIC_CACHE_NAME;
                        })
                        .map(cacheName => {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            }),
            
            // Claim all clients
            self.clients.claim()
        ])
        .then(() => {
            console.log('Service Worker activated successfully');
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle different types of requests
    if (isStaticAsset(request)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
    } else if (isAPIRequest(request)) {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
    } else if (isImageRequest(request)) {
        event.respondWith(cacheFirst(request, DYNAMIC_CACHE_NAME));
    } else {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
    }
});

// Strategy: Cache First (for static assets)
async function cacheFirst(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            // Return cached version
            return cachedResponse;
        }
        
        // Fetch from network and cache
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Cache First strategy failed:', error);
        
        // Return offline fallback for HTML requests
        if (request.headers.get('accept')?.includes('text/html')) {
            return createOfflinePage();
        }
        
        throw error;
    }
}

// Strategy: Network First (for API calls and dynamic content)
async function networkFirst(request, cacheName) {
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful responses
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('Network request failed, trying cache:', error);
        
        // Fall back to cache
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline fallback for HTML requests
        if (request.headers.get('accept')?.includes('text/html')) {
            return createOfflinePage();
        }
        
        throw error;
    }
}

// Helper functions
function isStaticAsset(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    return pathname.endsWith('.css') ||
           pathname.endsWith('.js') ||
           pathname.endsWith('.html') ||
           pathname.endsWith('.json') ||
           pathname === '/' ||
           url.hostname === 'fonts.googleapis.com' ||
           url.hostname === 'fonts.gstatic.com' ||
           url.hostname === 'cdnjs.cloudflare.com';
}

function isAPIRequest(request) {
    const url = new URL(request.url);
    
    return url.hostname === 'api.openweathermap.org' ||
           url.hostname === 'api.postalpincode.in' ||
           url.pathname.includes('/api/');
}

function isImageRequest(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    return pathname.endsWith('.jpg') ||
           pathname.endsWith('.jpeg') ||
           pathname.endsWith('.png') ||
           pathname.endsWith('.gif') ||
           pathname.endsWith('.svg') ||
           pathname.endsWith('.webp');
}

function createOfflinePage() {
    const offlineHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Smart Farming Assistant - Offline</title>
        <style>
            body {
                font-family: 'Inter', sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #2e7d32, #4caf50);
                color: white;
                text-align: center;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .offline-container {
                background: rgba(255, 255, 255, 0.1);
                padding: 2rem;
                border-radius: 12px;
                backdrop-filter: blur(10px);
                max-width: 400px;
                margin: 0 auto;
            }
            .offline-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
                opacity: 0.8;
            }
            h1 {
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
            p {
                margin-bottom: 2rem;
                opacity: 0.9;
                line-height: 1.6;
            }
            .retry-btn {
                background: white;
                color: #2e7d32;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            .retry-btn:hover {
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="offline-container">
            <div class="offline-icon">📱</div>
            <h1>You're Offline</h1>
            <p>Smart Farming Assistant works offline too! You can still access cached weather data, soil information, and crop recommendations.</p>
            <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
        </div>
        <script>
            // Check for connectivity and auto-reload
            window.addEventListener('online', () => {
                window.location.reload();
            });
        </script>
    </body>
    </html>
    `;
    
    return new Response(offlineHTML, {
        headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache'
        }
    });
}

// Background sync for when connection is restored
self.addEventListener('sync', event => {
    console.log('Background sync triggered:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Notify all clients that sync is happening
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'BACKGROUND_SYNC',
                data: 'Syncing data...'
            });
        });
        
        // Perform sync operations here
        // This could include updating cached data, sending stored form data, etc.
        
        console.log('Background sync completed');
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handling (for future weather alerts)
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const title = data.title || 'Smart Farming Assistant';
    const options = {
        body: data.body || 'New farming alert available',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        data: data,
        actions: [
            {
                action: 'view',
                title: 'View Alert'
            },
            {
                action: 'dismiss',
                title: 'Dismiss'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling from main thread
self.addEventListener('message', event => {
    const { type, data } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
        
        case 'CACHE_API_RESPONSE':
            // Cache specific API responses
            cacheAPIResponse(data.url, data.response);
            break;
        
        case 'CLEAR_CACHE':
            // Clear specific cache
            clearCache(data.cacheName);
            break;
    }
});

async function cacheAPIResponse(url, responseData) {
    try {
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        const response = new Response(JSON.stringify(responseData), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=300' // 5 minutes
            }
        });
        await cache.put(url, response);
    } catch (error) {
        console.error('Failed to cache API response:', error);
    }
}

async function clearCache(cacheName) {
    try {
        await caches.delete(cacheName);
        console.log('Cache cleared:', cacheName);
    } catch (error) {
        console.error('Failed to clear cache:', error);
    }
}
