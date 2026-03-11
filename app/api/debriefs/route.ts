import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const { data, error } = await supabase
    .from("debriefs")
    .select("*")
    .eq("user_id", user.id)
    .order("shift_date", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: "Debriefler yüklenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const body = await request.json();
  const { shift_date, shift_location, shift_duration, overall_learning, what_would_change, mentor_question, cases } = body;

  if (!shift_date || !shift_location) {
    return NextResponse.json({ error: "Nöbet tarihi ve lokasyonu zorunludur." }, { status: 400 });
  }

  if (!cases || !Array.isArray(cases) || cases.length === 0) {
    return NextResponse.json({ error: "En az bir vaka eklemelisiniz." }, { status: 400 });
  }

  // Debrief oluştur
  const { data: debrief, error: debriefError } = await supabase
    .from("debriefs")
    .insert({
      user_id: user.id,
      shift_date,
      shift_location,
      shift_duration,
      overall_learning,
      what_would_change,
      mentor_question,
    })
    .select()
    .single();

  if (debriefError) {
    return NextResponse.json({ error: "Debrief oluşturulamadı." }, { status: 500 });
  }

  // Vakaları ekle
  const casesWithDebriefId = cases.map((c: Record<string, unknown>) => ({
    debrief_id: debrief.id,
    diagnosis: c.diagnosis,
    actions_taken: c.actions_taken,
    had_difficulty: c.had_difficulty || false,
    difficulty_area: c.difficulty_area,
    new_learning: c.new_learning,
    emotion: c.emotion,
  }));

  const { error: casesError } = await supabase
    .from("debrief_cases")
    .insert(casesWithDebriefId);

  if (casesError) {
    return NextResponse.json({ error: "Vakalar kaydedilemedi." }, { status: 500 });
  }

  // Deneyim haritasını güncelle
  for (const c of cases) {
    if (c.diagnosis) {
      const category = c.difficulty_area || "genel";
      const confidence = c.emotion === "confident" ? "competent" : c.emotion === "anxious" || c.emotion === "overwhelmed" ? "beginner" : "developing";

      try {
        // Var mı kontrol et
        const { data: existing } = await supabase
          .from("experience_map")
          .select("id, case_count")
          .eq("user_id", user.id)
          .eq("category", category)
          .eq("subcategory", c.diagnosis)
          .maybeSingle();

        if (existing) {
          await supabase
            .from("experience_map")
            .update({
              case_count: existing.case_count + 1,
              last_seen: new Date().toISOString().split("T")[0],
              confidence_level: confidence,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existing.id);
        } else {
          await supabase
            .from("experience_map")
            .insert({
              user_id: user.id,
              category,
              subcategory: c.diagnosis,
              case_count: 1,
              last_seen: new Date().toISOString().split("T")[0],
              confidence_level: confidence,
            });
        }
      } catch {
        // Deneyim haritası güncellenmezse debrief yine de başarılı
      }
    }
  }

  return NextResponse.json({ data: debrief }, { status: 201 });
}
