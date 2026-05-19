const CACHE_NAME = 'colectora-cache-v2'; // Se actualiza la versión para forzar la recarga
const urlsToCache = [
    '/',
    '/index.html', // Recuerda renombrar tu archivo en GitHub a index.html
    '/manifest.json',
    'https://cdn-icons-png.flaticon.com/512/854/854929.png' // Se incluye el ícono externo
];

// Instala la aplicación en el caché del teléfono
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Cache abierto y recursos guardados');
            return cache.addAll(urlsToCache);
        })
    );
});

// Intercepta las solicitudes y responde sin internet
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Retorna la respuesta en caché si existe, si no, busca en la red
            return response || fetch(event.request);
        })
    );
});

// Limpia cachés antiguos cuando se actualiza el Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
