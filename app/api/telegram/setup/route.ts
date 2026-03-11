import { NextRequest, NextResponse } from "next/server";
import { setWebhook, deleteWebhook } from "@/lib/telegram";

// ==========================================
// Webhook Kurulum Endpoint'i
// Tek seferlik çağrılır: GET /api/telegram/setup?secret=BOT_TOKEN
// Silmek için: GET /api/telegram/setup?secret=BOT_TOKEN&action=delete
// ==========================================

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const action = request.nextUrl.searchParams.get("action");

  if (secret !== process.env.TELEGRAM_BOT_TOKEN) {
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
