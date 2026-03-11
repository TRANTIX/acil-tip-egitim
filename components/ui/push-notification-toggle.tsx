"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, BellOff } from "lucide-react";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotificationToggle() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  const checkSubscription = useCallback(async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    setIsSupported(true);
    setPermission(Notification.permission);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch {
      // Sessizce devam et
    }
  }, []);

  useEffect(() => {
    checkSubscription();
  }, [checkSubscription]);

  const subscribe = async () => {
    if (!vapidPublicKey) return;
    setLoading(true);

    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== "granted") {
        setLoading(false);
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
      });

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: subscription.toJSON() }),
      });

      if (res.ok) {
        setIsSubscribed(true);
      }
    } catch (err) {
      console.error("Push abonelik hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });

        await subscription.unsubscribe();
      }

      setIsSubscribed(false);
    } catch (err) {
      console.error("Push iptal hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  // Desteklenmiyorsa veya VAPID key yoksa gösterme
  if (!isSupported || !vapidPublicKey) return null;

  // İzin reddedildiyse bilgi göster
  if (permission === "denied") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs text-[var(--muted-foreground)]">
        <BellOff className="h-4 w-4 shrink-0" />
        <span>Bildirimler tarayıcı ayarlarından engellendi</span>
      </div>
    );
  }

  return (
    <button
      onClick={isSubscribed ? unsubscribe : subscribe}
      disabled={loading}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
        isSubscribed
          ? "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20"
          : "border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]"
      }`}
      aria-label={isSubscribed ? "Bildirimleri kapat" : "Bildirimleri aç"}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isSubscribed ? (
        <Bell className="h-4 w-4" />
      ) : (
        <BellOff className="h-4 w-4" />
      )}
      <span>{isSubscribed ? "Bildirimler Açık" : "Bildirimleri Aç"}</span>
    </button>
  );
}
