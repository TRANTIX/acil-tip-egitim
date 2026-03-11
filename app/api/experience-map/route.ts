import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let query = supabase
    .from("experience_map")
    .select("*")
    .eq("user_id", user.id)
    .order("case_count", { ascending: false });

  if (category) query = query.eq("category", category);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Deneyim haritası yüklenemedi." }, { status: 500 });
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
  const { category, subcategory, confidence_level } = body;

  if (!category) {
    return NextResponse.json({ error: "Kategori zorunludur." }, { status: 400 });
  }

  // Upsert: varsa case_count artır, yoksa oluştur
  const { data: existing } = await supabase
    .from("experience_map")
    .select("id, case_count")
    .eq("user_id", user.id)
    .eq("category", category)
    .eq("subcategory", subcategory || "")
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from("experience_map")
      .update({
        case_count: existing.case_count + 1,
        last_seen: new Date().toISOString().split("T")[0],
        confidence_level: confidence_level || undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Deneyim haritası güncellenemedi." }, { status: 500 });
    }
    return NextResponse.json({ data });
  }

  const { data, error } = await supabase
    .from("experience_map")
    .insert({
      user_id: user.id,
      category,
      subcategory,
      case_count: 1,
      last_seen: new Date().toISOString().split("T")[0],
      confidence_level: confidence_level || "beginner",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Deneyim kaydı oluşturulamadı." }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
