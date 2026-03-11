import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Kullanıcının simülasyon oturumlarını getir
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "20") || 20, 1), 100);

  const { data, error } = await supabase
    .from("simulation_sessions")
    .select("id, scenario_id, score, completed, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: "Oturumlar yüklenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// Yeni simülasyon oturumu başlat
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  // Rate limiting: günlük 5 simülasyon
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("simulation_sessions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", today.toISOString());

  if (count !== null && count >= 5) {
    return NextResponse.json(
      { error: "Günlük simülasyon limitinize ulaştınız (5/gün). Yarın tekrar deneyin." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { scenario_id } = body;

  if (!scenario_id) {
    return NextResponse.json({ error: "Senaryo ID gerekli." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("simulation_sessions")
    .insert({
      user_id: user.id,
      scenario_id,
      messages: [],
      actions_taken: [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Oturum oluşturulamadı." }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
