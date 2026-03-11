// ==========================================
// Telegram Bot API Helper
// ==========================================

const TELEGRAM_API = "https://api.telegram.org/bot";

function getToken(): string {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN tanımlı değil.");
  return token;
}

function apiUrl(method: string): string {
  return `${TELEGRAM_API}${getToken()}/${method}`;
}

// ==========================================
// Telegram API Çağrıları
// ==========================================

export async function sendMessage(
  chatId: string,
  text: string,
  options?: {
    parse_mode?: "HTML" | "MarkdownV2";
    reply_markup?: unknown;
  }
): Promise<boolean> {
  try {
    const res = await fetch(apiUrl("sendMessage"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: options?.parse_mode || "HTML",
        reply_markup: options?.reply_markup,
      }),
    });
    const data = await res.json();
    return data.ok === true;
  } catch {
    console.error(`Telegram mesaj gönderilemedi: chat_id=${chatId}`);
    return false;
  }
}

export async function setWebhook(url: string): Promise<{ ok: boolean; description?: string }> {
  const res = await fetch(apiUrl("setWebhook"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      allowed_updates: ["message"],
    }),
  });
  return res.json();
}

export async function deleteWebhook(): Promise<{ ok: boolean }> {
  const res = await fetch(apiUrl("deleteWebhook"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

// ==========================================
// Telegram Update Tipleri
// ==========================================

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: {
    id: number;
    type: string;
  };
  text?: string;
  date: number;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

// ==========================================
// Komut ayrıştırma
// ==========================================

export function parseCommand(text: string): { command: string; args: string } | null {
  const match = text.match(/^\/(\w+)(?:@\S+)?(?:\s+([\s\S]*))?$/);
  if (!match) return null;
  return { command: match[1].toLowerCase(), args: (match[2] || "").trim() };
}

// ==========================================
// HTML escape (Telegram HTML mode için)
// ==========================================

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
