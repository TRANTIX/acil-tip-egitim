import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  sendMessage,
  parseCommand,
  escapeHtml,
  type TelegramUpdate,
} from "@/lib/telegram";

// ==========================================
// Telegram Webhook Handler
// ==========================================

export async function POST(request: NextRequest) {
  // Basit token doğrulama (URL'de secret)
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.TELEGRAM_BOT_TOKEN) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const update: TelegramUpdate = await request.json();
    const message = update.message;

    if (!message?.text || !message.from) {
      return NextResponse.json({ ok: true });
    }

    const chatId = String(message.chat.id);
    const parsed = parseCommand(message.text);

    if (!parsed) {
      return NextResponse.json({ ok: true });
    }

    switch (parsed.command) {
      case "start":
        await handleStart(chatId, message.from.first_name);
        break;
      case "pearl":
        await handlePearl(chatId);
        break;
      case "soru":
        await handleSoru(chatId);
        break;
      case "streak":
        await handleStreak(chatId);
        break;
      case "ayarlar":
        await handleAyarlar(chatId, parsed.args);
        break;
      case "yardim":
      case "help":
        await handleYardim(chatId);
        break;
      default:
        await sendMessage(
          chatId,
          "❓ Bilinmeyen komut. /yardim yazarak kullanılabilir komutları görebilirsiniz."
        );
    }
  } catch (error) {
    console.error("Telegram webhook hatası:", error);
  }

  // Telegram'a her zaman 200 döndür
  return NextResponse.json({ ok: true });
}

// ==========================================
// /start — Abone kaydı
// ==========================================
async function handleStart(chatId: string, firstName: string) {
  const supabase = createAdminClient();

  // Mevcut abonelik kontrolü
  const { data: existing } = await supabase
    .from("bot_subscribers")
    .select("id, is_active")
    .eq("chat_id", chatId)
    .single();

  if (existing) {
    if (!existing.is_active) {
      await supabase
        .from("bot_subscribers")
        .update({ is_active: true })
        .eq("id", existing.id);
    }
  } else {
    await supabase.from("bot_subscribers").insert({
      chat_id: chatId,
      platform: "telegram",
      is_active: true,
      preferences: { daily_pearl: true, daily_quiz: true, new_content: true },
    });
  }

  await sendMessage(
    chatId,
    `🏥 Merhaba ${escapeHtml(firstName)}!\n\n` +
      `<b>AcilEM Telegram Bot</b>'a hoş geldin!\n\n` +
      `Her gün sana acil tıp pearl'leri ve quiz soruları göndereceğim.\n\n` +
      `<b>Komutlar:</b>\n` +
      `/pearl — Günün acil tıp pearl'ü\n` +
      `/soru — Rastgele quiz sorusu\n` +
      `/streak — Streak durumun\n` +
      `/ayarlar — Bildirim tercihlerin\n` +
      `/yardim — Yardım\n\n` +
      `📱 Tam platform: ${process.env.NEXT_PUBLIC_APP_URL || "https://acilem.app"}`
  );
}

// ==========================================
// /pearl — Rastgele pearl içerik
// ==========================================
async function handlePearl(chatId: string) {
  const supabase = createAdminClient();

  // Pearl tipli makaleler + genel kısa ipuçları
  const { data: articles } = await supabase
    .from("articles")
    .select("title, body, key_points, category")
    .eq("status", "published")
    .eq("content_type", "pearl")
    .limit(50);

  if (!articles || articles.length === 0) {
    // Pearl yoksa genel makalelerden al
    const { data: fallback } = await supabase
      .from("articles")
      .select("title, body, key_points, category")
      .eq("status", "published")
      .limit(50);

    if (!fallback || fallback.length === 0) {
      await sendMessage(chatId, "📚 Henüz içerik eklenmemiş. Yakında pearl'ler gelecek!");
      return;
    }

    const article = fallback[Math.floor(Math.random() * fallback.length)];
    await sendPearlMessage(chatId, article);
    return;
  }

  const article = articles[Math.floor(Math.random() * articles.length)];
  await sendPearlMessage(chatId, article);
}

async function sendPearlMessage(
  chatId: string,
  article: { title: string; body: string; key_points?: string[]; category: string }
) {
  let text = `💡 <b>${escapeHtml(article.title)}</b>\n`;
  text += `📂 ${escapeHtml(article.category)}\n\n`;

  // Key points varsa onları göster
  if (article.key_points && article.key_points.length > 0) {
    text += article.key_points
      .map((p) => `• ${escapeHtml(p)}`)
      .join("\n");
  } else {
    // Body'den ilk 500 karakter
    const snippet = article.body.replace(/[#*_`>\[\]]/g, "").slice(0, 500);
    text += escapeHtml(snippet);
    if (article.body.length > 500) text += "...";
  }

  text += `\n\n📱 Devamı: ${process.env.NEXT_PUBLIC_APP_URL || "https://acilem.app"}/icerikler/yazilar`;

  await sendMessage(chatId, text);
}

// ==========================================
// /soru — Rastgele quiz sorusu
// ==========================================
async function handleSoru(chatId: string) {
  const supabase = createAdminClient();

  const { data: questions } = await supabase
    .from("questions")
    .select("question_text, options, explanation, topic, difficulty")
    .eq("status", "published")
    .limit(100);

  if (!questions || questions.length === 0) {
    await sendMessage(chatId, "📝 Henüz soru eklenmemiş. Yakında sorular gelecek!");
    return;
  }

  const q = questions[Math.floor(Math.random() * questions.length)];
  const options = q.options as { text: string; is_correct: boolean }[];
  const difficultyStars = "⭐".repeat(q.difficulty || 1);

  let text = `📝 <b>Quiz Sorusu</b> ${difficultyStars}\n`;
  text += `📂 ${escapeHtml(q.topic)}\n\n`;
  text += `${escapeHtml(q.question_text)}\n\n`;

  const letters = ["A", "B", "C", "D", "E"];
  options.forEach((opt, i) => {
    text += `${letters[i]}) ${escapeHtml(opt.text)}\n`;
  });

  // Doğru cevap ve açıklama (spoiler olarak)
  const correctIndex = options.findIndex((o) => o.is_correct);
  const correctLetter = letters[correctIndex] || "?";

  text += `\n<tg-spoiler>✅ Doğru cevap: ${correctLetter}\n\n`;
  text += `💬 ${escapeHtml(q.explanation)}</tg-spoiler>`;

  text += `\n\n📱 Daha fazla: ${process.env.NEXT_PUBLIC_APP_URL || "https://acilem.app"}/quiz`;

  await sendMessage(chatId, text);
}

// ==========================================
// /streak — Streak durumu (platform bağlantısı varsa)
// ==========================================
async function handleStreak(chatId: string) {
  const supabase = createAdminClient();

  // Abone kaydını kontrol et
  const { data: sub } = await supabase
    .from("bot_subscribers")
    .select("user_id")
    .eq("chat_id", chatId)
    .eq("is_active", true)
    .single();

  if (!sub?.user_id) {
    await sendMessage(
      chatId,
      "🔗 Streak bilgin için platformdaki hesabınla bağlantı kurman gerekiyor.\n\n" +
        `Profil sayfandan Telegram bağlantısını yapabilirsin:\n${process.env.NEXT_PUBLIC_APP_URL || "https://acilem.app"}/profil`
    );
    return;
  }

  const { data: gamification } = await supabase
    .from("user_gamification")
    .select("xp_total, level, current_streak, longest_streak")
    .eq("user_id", sub.user_id)
    .single();

  if (!gamification) {
    await sendMessage(chatId, "📊 Henüz aktivite kaydın yok. Platforma giriş yaparak öğrenmeye başla!");
    return;
  }

  const g = gamification;
  let text = `🔥 <b>Streak Durumun</b>\n\n`;
  text += `🔥 Güncel streak: <b>${g.current_streak} gün</b>\n`;
  text += `🏆 En uzun streak: <b>${g.longest_streak} gün</b>\n`;
  text += `⭐ Toplam XP: <b>${g.xp_total}</b>\n`;
  text += `📊 Seviye: <b>${g.level}</b>\n\n`;

  if (g.current_streak >= 7) {
    text += "🎉 Harika gidiyorsun! Streak'ini korumaya devam et!";
  } else if (g.current_streak >= 3) {
    text += "💪 İyi gidiyorsun! Devam et!";
  } else {
    text += "🚀 Bugün platforma giriş yaparak streak'ini artır!";
  }

  await sendMessage(chatId, text);
}

// ==========================================
// /ayarlar — Bildirim tercihleri
// ==========================================
async function handleAyarlar(chatId: string, args: string) {
  const supabase = createAdminClient();

  // Mevcut abonelik
  const { data: sub } = await supabase
    .from("bot_subscribers")
    .select("id, preferences")
    .eq("chat_id", chatId)
    .eq("is_active", true)
    .single();

  if (!sub) {
    await sendMessage(chatId, "Önce /start komutuyla abone olman gerekiyor.");
    return;
  }

  const prefs = (sub.preferences || {
    daily_pearl: true,
    daily_quiz: true,
    new_content: true,
  }) as { daily_pearl: boolean; daily_quiz: boolean; new_content: boolean };

  // Argüman yoksa mevcut ayarları göster
  if (!args) {
    let text = `⚙️ <b>Bildirim Ayarların</b>\n\n`;
    text += `💡 Günlük pearl: ${prefs.daily_pearl ? "✅ Açık" : "❌ Kapalı"}\n`;
    text += `📝 Günlük soru: ${prefs.daily_quiz ? "✅ Açık" : "❌ Kapalı"}\n`;
    text += `📢 Yeni içerik: ${prefs.new_content ? "✅ Açık" : "❌ Kapalı"}\n\n`;
    text += `Değiştirmek için:\n`;
    text += `/ayarlar pearl — Pearl bildirimini aç/kapat\n`;
    text += `/ayarlar soru — Soru bildirimini aç/kapat\n`;
    text += `/ayarlar icerik — Yeni içerik bildirimini aç/kapat\n`;
    text += `/ayarlar kapat — Tüm bildirimleri kapat (abonelik iptal)`;
    await sendMessage(chatId, text);
    return;
  }

  const arg = args.toLowerCase().trim();

  if (arg === "kapat") {
    await supabase
      .from("bot_subscribers")
      .update({ is_active: false })
      .eq("id", sub.id);
    await sendMessage(
      chatId,
      "🔕 Aboneliğin iptal edildi. Tekrar abone olmak için /start yaz."
    );
    return;
  }

  const toggleMap: Record<string, keyof typeof prefs> = {
    pearl: "daily_pearl",
    soru: "daily_quiz",
    icerik: "new_content",
  };

  const key = toggleMap[arg];
  if (!key) {
    await sendMessage(chatId, "❓ Geçersiz ayar. /ayarlar yazarak seçenekleri gör.");
    return;
  }

  prefs[key] = !prefs[key];

  await supabase
    .from("bot_subscribers")
    .update({ preferences: prefs })
    .eq("id", sub.id);

  const labels: Record<string, string> = {
    daily_pearl: "Günlük pearl",
    daily_quiz: "Günlük soru",
    new_content: "Yeni içerik",
  };

  await sendMessage(
    chatId,
    `${prefs[key] ? "✅" : "❌"} ${labels[key]} bildirimi ${prefs[key] ? "açıldı" : "kapatıldı"}.`
  );
}

// ==========================================
// /yardim — Komut listesi
// ==========================================
async function handleYardim(chatId: string) {
  const text =
    `🏥 <b>AcilEM Bot — Komutlar</b>\n\n` +
    `/pearl — Günün acil tıp pearl'ü\n` +
    `/soru — Rastgele quiz sorusu\n` +
    `/streak — Streak ve XP durumun\n` +
    `/ayarlar — Bildirim tercihlerin\n` +
    `/yardim — Bu mesajı göster\n\n` +
    `Her gün sabah 08:00'de otomatik pearl ve soru gönderiyorum! 🌅\n\n` +
    `📱 Platform: ${process.env.NEXT_PUBLIC_APP_URL || "https://acilem.app"}`;

  await sendMessage(chatId, text);
}
