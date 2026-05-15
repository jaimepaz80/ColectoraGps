const CACHE_NAME = 'colectora-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
];

// Instala la aplicación en el caché del teléfono
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

// Intercepta las solicitudes y las responde sin internet
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});

