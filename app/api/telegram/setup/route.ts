import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { setWebhook, deleteWebhook } from "@/lib/telegram";

// ==========================================
// Webhook Kurulum Endpoint'i
// Tek seferlik çağrılır: GET /api/telegram/setup?secret=BOT_TOKEN
// Silmek için: GET /api/telegram/setup?secret=BOT_TOKEN&action=delete
// ==========================================

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret") || "";
  const action = request.nextUrl.searchParams.get("action");
  const token = process.env.TELEGRAM_BOT_TOKEN || "";

  if (!secret || !token || !safeCompare(secret, token)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  if (action === "delete") {
    const result = await deleteWebhook();
    return NextResponse.json({ action: "delete", ...result });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_APP_URL tanımlı değil." },
      { status: 500 }
    );
  }

  const webhookUrl = `${appUrl}/api/telegram/webhook?secret=${encodeURIComponent(secret)}`;
  const result = await setWebhook(webhookUrl);

  return NextResponse.json({
    action: "set",
    webhookUrl: webhookUrl.replace(secret, "***"),
    ...result,
  });
}
