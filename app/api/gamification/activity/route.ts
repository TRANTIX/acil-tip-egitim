import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  XP_TABLE,
  levelFromXP,
  calculateStreak,
  checkNewBadges,
} from "@/lib/gamification";
import type { ActivityType } from "@/types";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const body = await request.json();
  const { activity_type, content_id, metadata } = body as {
    activity_type: ActivityType;
    content_id?: string;
    metadata?: Record<string, unknown>;
  };

  if (!activity_type || !XP_TABLE[activity_type]) {
    return NextResponse.json({ error: "Geçersiz aktivite türü." }, { status: 400 });
  }

  const xpEarned = XP_TABLE[activity_type];

  // Aktivite kaydı oluştur
  await supabase.from("activity_log").insert({
    user_id: user.id,
    activity_type,
    content_id,
    xp_earned: xpEarned,
    metadata,
  });

  // Gamification verisini getir
  const { data: gamification } = await supabase
    .from("user_gamification")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!gamification) {
    return NextResponse.json({ error: "Gamification verisi bulunamadı." }, { status: 404 });
  }

  // XP güncelle
  const newXP = gamification.xp_total + xpEarned;
  const newLevel = levelFromXP(newXP);

  // Streak güncelle
  const { newStreak } = calculateStreak(gamification.last_active, gamification.current_streak);
  const longestStreak = Math.max(gamification.longest_streak, newStreak);
  const today = new Date().toISOString().split("T")[0];

  // Güncelle
  await supabase
    .from("user_gamification")
    .update({
      xp_total: newXP,
      level: newLevel,
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_active: today,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  // Aktivite sayılarını getir (rozet kontrolü için)
  const { data: activityCounts } = await supabase
    .from("activity_log")
    .select("activity_type")
    .eq("user_id", user.id);

  const counts: Partial<Record<ActivityType, number>> = {};
  (activityCounts || []).forEach((a) => {
    const t = a.activity_type as ActivityType;
    counts[t] = (counts[t] || 0) + 1;
  });

  // Mevcut rozetler
  const { data: existingBadges } = await supabase
    .from("user_badges")
    .select("badge_code")
    .eq("user_id", user.id);

  const existingCodes = (existingBadges || []).map((b) => b.badge_code);

  // Quiz perfect kontrolü
  const quizPerfect = activity_type === "quiz" && metadata?.score === metadata?.total;

  // Yeni rozetleri kontrol et
  const newBadgeCodes = checkNewBadges(
    {
      xpTotal: newXP,
      level: newLevel,
      currentStreak: newStreak,
      activityCounts: counts,
      quizPerfect,
    },
    existingCodes
  );

  // Yeni rozetleri kaydet
  if (newBadgeCodes.length > 0) {
    await supabase.from("user_badges").insert(
      newBadgeCodes.map((code) => ({
        user_id: user.id,
        badge_code: code,
      }))
    );
  }

  return NextResponse.json({
    data: {
      xp_earned: xpEarned,
      xp_total: newXP,
      level: newLevel,
      streak: newStreak,
      new_badges: newBadgeCodes,
    },
  });
}
