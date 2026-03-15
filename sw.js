/**
 * DevStation Service Worker
 * sw.js — Offline support + caching
 */

const CACHE_NAME    = 'devstation-v1';
const CACHE_URLS    = [
  '/',
  '/index.html',
  '/devstation-logic.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // CodeMirror CDN — cached on first load
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/htmlmixed/htmlmixed.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/css/css.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/javascript/javascript.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closebrackets.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closetag.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/selection/active-line.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/comment/comment.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldgutter.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/brace-fold.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/xml-fold.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/xml/xml.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldgutter.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/default.min.css',
];

// ── INSTALL: cache all assets
self.addEventListener('install', function(event) {
  console.log('[SW] Installing DevStation SW...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Caching app shell');
      // Cache local files strictly, CDN files with fallback
      const localFiles = CACHE_URLS.filter(u => !u.startsWith('http'));
      const cdnFiles   = CACHE_URLS.filter(u => u.startsWith('http'));

      return cache.addAll(localFiles).then(function() {
        // CDN files — cache best effort (don't fail install if CDN is offline)
        return Promise.allSettled(
          cdnFiles.map(url => cache.add(url).catch(() => {}))
        );
      });
    }).then(function() {
      console.log('[SW] Install complete');
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: clean old caches
self.addEventListener('activate', function(event) {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(key) { return key !== CACHE_NAME; })
          .map(function(key) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

// ── FETCH: cache-first strategy
self.addEventListener('fetch', function(event) {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) {
        // Serve from cache, update in background
        const fetchUpdate = fetch(event.request).then(function(fresh) {
          if (fresh && fresh.status === 200) {
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, fresh.clone());
            });
          }
          return fresh;
        }).catch(function() {});
        return cached;
      }

      // Not in cache — fetch from network
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, clone);
        });
        return response;
      }).catch(function() {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// ── MESSAGE: force update
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
