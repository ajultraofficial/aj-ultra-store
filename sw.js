const CACHE_NAME = "aj-ultra-shell-v2";
const APP_ROOT = "/aj-ultra-store/";
const APP_SHELL = [
  APP_ROOT,
  APP_ROOT + "manifest.webmanifest",
  APP_ROOT + "icons/icon-192.png",
  APP_ROOT + "icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname.includes("/rest/") || url.pathname.includes("/auth/")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok && url.pathname === APP_ROOT) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(APP_ROOT, copy));
        }
        return response;
      }).catch(async () => (await caches.match(APP_ROOT)) || Response.error())
    );
  }
});
