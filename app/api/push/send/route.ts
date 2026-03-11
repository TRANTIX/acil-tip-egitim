import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPushNotification, type PushPayload } from "@/lib/push";

// POST — tüm abonelere veya belirli kullanıcıya bildirim gönder
// Güvenlik: sadece cron secret veya admin rolü ile çağrılabilir
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // Cron secret kontrolü (Vercel cron veya harici tetikleyici)
    const isCronAuth = cronSecret && authHeader === `Bearer ${cronSecret}`;

    if (!isCronAuth) {
      // Admin kullanıcı kontrolü
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        return NextResponse.json({ error: "Yetki yok" }, { status: 403 });
      }
    }

    const { title, body, url, tag, userId } = await request.json() as PushPayload & { userId?: string };

    if (!title || !body) {
      return NextResponse.json({ error: "title ve body gerekli" }, { status: 400 });
    }

    const admin = createAdminClient();

    // Belirli kullanıcıya mı yoksa herkese mi?
    let query = admin.from("push_subscriptions").select("id, endpoint, p256dh, auth");
    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data: subscriptions, error } = await query;

    if (error) {
      console.error("Abonelik sorgulama hatası:", error);
      return NextResponse.json({ error: "Sorgu hatası" }, { status: 500 });
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ sent: 0, failed: 0 });
    }

    const payload: PushPayload = { title, body, url, tag };
    let sent = 0;
    let failed = 0;
    const expiredIds: string[] = [];

    // Paralel gönderim (flood korumalı — 50'şer batch)
    const batchSize = 50;
    for (let i = 0; i < subscriptions.length; i += batchSize) {
      const batch = subscriptions.slice(i, i + batchSize);
      const results = await Promise.all(
        batch.map(async (sub) => {
          const success = await sendPushNotification(
            { endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth },
            payload
          );
          if (success) {
            sent++;
          } else {
            failed++;
            expiredIds.push(sub.id);
          }
        })
      );
    }

    // Süresi dolmuş abonelikleri temizle
    if (expiredIds.length > 0) {
      await admin
        .from("push_subscriptions")
        .delete()
        .in("id", expiredIds);
    }

    return NextResponse.json({ sent, failed, cleaned: expiredIds.length });
  } catch (error) {
    console.error("Push gönderim hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
