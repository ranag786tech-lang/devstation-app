const CACHE_NAME = 'devstation-v2';
// Isay auto-detect karne dein
const BASE = location.pathname.includes('devstation-app') ? '/devstation-app' : '';

const CACHE_URLS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/devstation-logic.js',
  BASE + '/manifest.json',
  // Agar icons folder mein hain to path check karein
  BASE + '/icons/icon-96.png',
  BASE + '/icons/icon-192.png',
  BASE + '/icons/icon-512.png',
];
// ... baki code same rahega
