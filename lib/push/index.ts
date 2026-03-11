import webpush from "web-push";

// VAPID ayarlarını başlat
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    `mailto:${process.env.VAPID_CONTACT_EMAIL || "noreply@acilem.app"}`,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  icon?: string;
  tag?: string;
}

export interface PushSubscriptionData {
  endpoint: string;
  p256dh: string;
  auth: string;
}

/**
 * Tek bir aboneye push bildirim gönderir.
 * Başarısız olursa (410 Gone gibi) false döner — abonelik silinmeli.
 */
export async function sendPushNotification(
  subscription: PushSubscriptionData,
  payload: PushPayload
): Promise<boolean> {
  try {
    await webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      },
      JSON.stringify(payload)
    );
    return true;
  } catch (error: unknown) {
    const statusCode = (error as { statusCode?: number }).statusCode;
    // 410 Gone veya 404 — abonelik artık geçersiz
    if (statusCode === 410 || statusCode === 404) {
      return false;
    }
    console.error("Push bildirim hatası:", error);
    return false;
  }
}
