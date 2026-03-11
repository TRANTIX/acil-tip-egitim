import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { xpProgress, levelTitle } from "@/lib/gamification";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  // Gamification verisi
  const { data: gamification } = await supabase
    .from("user_gamification")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!gamification) {
    return NextResponse.json({ error: "Gamification verisi bulunamadı." }, { status: 404 });
  }

  // Rozetler
  const { data: badges } = await supabase
    .from("user_badges")
    .select("badge_code, earned_at")
    .eq("user_id", user.id)
    .order("earned_at", { ascending: false });

  // Son aktiviteler
  const { data: activities } = await supabase
    .from("activity_log")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  // Aktivite sayıları (rozet kontrolü için)
  const { data: activityCounts } = await supabase
    .from("activity_log")
    .select("activity_type")
    .eq("user_id", user.id);

  const counts: Record<string, number> = {};
  (activityCounts || []).forEach((a) => {
    counts[a.activity_type] = (counts[a.activity_type] || 0) + 1;
  });

  const progress = xpProgress(gamification.xp_total);
  const title = levelTitle(progress.level);

  return NextResponse.json({
    data: {
      ...gamification,
      progress,
      title,
      badges: badges || [],
      activities: activities || [],
      activityCounts: counts,
    },
  });
}
