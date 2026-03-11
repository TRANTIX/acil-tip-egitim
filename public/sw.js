// AcilEM Service Worker — Offline Hesaplayıcılar, Kılavuzlar ve Push Notifications
const CACHE_NAME = "acilem-v1";

// Uygulama kabuğu + offline'da kesinlikle olması gereken sayfalar
const PRECACHE_URLS = [
  "/",
  "/hesaplayicilar",
  "/hesaplayicilar/gks",
  "/hesaplayicilar/heart",
  "/hesaplayicilar/wells-pe",
  "/hesaplayicilar/curb65",
  "/hesaplayicilar/qsofa",
  "/hesaplayicilar/cha2ds2vasc",
  "/hesaplayicilar/pecarn",
  "/hesaplayicilar/ped-gks",
  "/hesaplayicilar/nihss",
  "/hesaplayicilar/centor",
  "/manifest.json",
];

// Install — precache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activate — eski cache'leri temizle
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch — Network first, fallback to cache
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // API ve auth isteklerini cache'leme
  if (
    request.url.includes("/api/") ||
    request.url.includes("/auth/") ||
    request.method !== "GET"
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Başarılı yanıtları cache'e kaydet
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            // Sadece aynı origin'deki sayfaları cache'le
            if (request.url.startsWith(self.location.origin)) {
              cache.put(request, clone);
            }
          });
        }
        return response;
      })
      .catch(() => {
        // Offline — cache'den getir
        return caches.match(request).then((cached) => {
          if (cached) return cached;

          // Cache'de yoksa offline sayfası göster
          if (request.headers.get("accept")?.includes("text/html")) {
            return caches.match("/");
          }

          return new Response("Offline", { status: 503 });
        });
      })
  );
});

// Push notification handler
self.addEventListener("push", (event) => {
  const defaultData = {
    title: "AcilEM",
    body: "Yeni bir bildiriminiz var!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    url: "/dashboard",
  };

  let data = defaultData;
  try {
    if (event.data) {
      data = { ...defaultData, ...event.data.json() };
    }
  } catch {
    // JSON parse hatası — varsayılan veriyi kullan
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      data: { url: data.url },
      vibrate: [200, 100, 200],
      tag: data.tag || "acilem-notification",
      renotify: true,
    })
  );
});

// Bildirime tıklama handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // Güvenlik: sadece aynı origin relative path'lere izin ver
  const rawUrl = event.notification.data?.url || "/dashboard";
  const url = (typeof rawUrl === "string" && rawUrl.startsWith("/") && !rawUrl.startsWith("//"))
    ? rawUrl
    : "/dashboard";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      // Açık pencere varsa oraya odaklan
      const fullUrl = self.location.origin + url;
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.navigate(fullUrl);
          return client.focus();
        }
      }
      // Yoksa yeni pencere aç
      return self.clients.openWindow(fullUrl);
    })
  );
});
