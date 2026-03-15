/**
 * DevStation Service Worker
 * sw.js — Offline support + caching
 */

const CACHE_NAME = 'devstation-v2';
const BASE       = '/devstation-app';

const CACHE_URLS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/devstation-logic.js',
  BASE + '/manifest.json',
  BASE + '/icons/icon-96.png',
  BASE + '/icons/icon-192.png',
  BASE + '/icons/icon-512.png',
];

// INSTALL
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_URLS);
    })
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k)   { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// FETCH — cache first, network fallback
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200) return response;
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, clone);
        });
        return response;
      }).catch(function() {
        if (event.request.mode === 'navigate') {
          return caches.match(BASE + '/index.html');
        }
      });
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
