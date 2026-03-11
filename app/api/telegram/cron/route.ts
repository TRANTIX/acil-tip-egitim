import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { timingSafeEqual } from "crypto";
import { sendMessage, escapeHtml } from "@/lib/telegram";

// ==========================================
// Günlük Otomatik Gönderim (Cron)
// Vercel Cron veya harici cron servisiyle çağrılır
// ==========================================

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function GET(request: NextRequest) {
  // Güvenlik: Authorization header kontrolü (sadece CRON_SECRET)
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET yapılandırılmamış." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!bearerToken || !safeCompare(bearerToken, cronSecret)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Aktif aboneleri getir
  const { data: subscribers } = await supabase
    .from("bot_subscribers")
    .select("chat_id, preferences")
    .eq("is_active", true)
    .eq("platform", "telegram");

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ message: "Aktif abone yok.", sent: 0 });
  }

  // Günün pearl'ü ve sorusu
  const pearl = await getDailyPearl(supabase);
  const question = await getDailyQuestion(supabase);

  let pearlSent = 0;
  let quizSent = 0;

  for (const sub of subscribers) {
    const prefs = (sub.preferences || {}) as {
      daily_pearl?: boolean;
      daily_quiz?: boolean;
    };

    // Pearl gönder
    if (prefs.daily_pearl !== false && pearl) {
      const success = await sendPearl(sub.chat_id, pearl);
      if (success) pearlSent++;
    }

    // Soru gönder
    if (prefs.daily_quiz !== false && question) {
      const success = await sendQuiz(sub.chat_id, question);
      if (success) quizSent++;
    }

    // Rate limiting — Telegram flood koruması
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return NextResponse.json({
    message: "Günlük gönderim tamamlandı.",
    subscribers: subscribers.length,
    pearlSent,
    quizSent,
  });
}

// ==========================================
// Günün Pearl'ü
// ==========================================
interface PearlData {
  title: string;
  body: string;
  key_points?: string[];
  category: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getDailyPearl(supabase: any): Promise<PearlData | null> {
  // Bugünün tarihini seed olarak kullanarak tutarlı bir pearl seç
  const today = new Date().toISOString().slice(0, 10);
  const seed = hashCode(today);

  const { data: articles } = await supabase
    .from("articles")
    .select("title, body, key_points, category")
    .eq("status", "published")
    .limit(100);

  if (!articles || articles.length === 0) return null;

  const index = Math.abs(seed) % articles.length;
  return articles[index];
}

// ==========================================
// Günün Sorusu
// ==========================================
interface QuestionData {
  question_text: string;
  options: { text: string; is_correct: boolean }[];
  explanation: string;
  topic: string;
  difficulty: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getDailyQuestion(supabase: any): Promise<QuestionData | null> {
  const today = new Date().toISOString().slice(0, 10);
  const seed = hashCode(today + "quiz");

  const { data: questions } = await supabase
    .from("questions")
    .select("question_text, options, explanation, topic, difficulty")
    .eq("status", "published")
    .limit(100);

  if (!questions || questions.length === 0) return null;

  const index = Math.abs(seed) % questions.length;
  return questions[index];
}

// ==========================================
// Mesaj gönderme fonksiyonları
// ==========================================
async function sendPearl(chatId: string, pearl: PearlData): Promise<boolean> {
  let text = `🌅 <b>Günün Pearl'ü</b>\n\n`;
  text += `💡 <b>${escapeHtml(pearl.title)}</b>\n`;
  text += `📂 ${escapeHtml(pearl.category)}\n\n`;

  if (pearl.key_points && pearl.key_points.length > 0) {
    text += pearl.key_points.map((p) => `• ${escapeHtml(p)}`).join("\n");
  } else {
    const snippet = pearl.body.replace(/[#*_`>\[\]]/g, "").slice(0, 500);
    text += escapeHtml(snippet);
    if (pearl.body.length > 500) text += "...";
  }

  text += `\n\n📱 ${process.env.NEXT_PUBLIC_APP_URL || "https://acilem.app"}/icerikler/yazilar`;

  return sendMessage(chatId, text);
}

async function sendQuiz(chatId: string, q: QuestionData): Promise<boolean> {
  const letters = ["A", "B", "C", "D", "E"];
  const difficultyStars = "⭐".repeat(q.difficulty || 1);

  let text = `🌅 <b>Günün Sorusu</b> ${difficultyStars}\n`;
  text += `📂 ${escapeHtml(q.topic)}\n\n`;
  text += `${escapeHtml(q.question_text)}\n\n`;

  q.options.forEach((opt, i) => {
    text += `${letters[i]}) ${escapeHtml(opt.text)}\n`;
  });

  const correctIndex = q.options.findIndex((o) => o.is_correct);
  const correctLetter = letters[correctIndex] || "?";

  text += `\n<tg-spoiler>✅ Doğru cevap: ${correctLetter}\n\n`;
  text += `💬 ${escapeHtml(q.explanation)}</tg-spoiler>`;

  text += `\n\n📱 ${process.env.NEXT_PUBLIC_APP_URL || "https://acilem.app"}/quiz`;

  return sendMessage(chatId, text);
}

// ==========================================
// Basit string hash (tarih tabanlı deterministik seçim için)
// ==========================================
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 32-bit integer
  }
  return hash;
}
