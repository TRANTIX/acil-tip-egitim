import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");
  const atlas_type = searchParams.get("atlas_type");
  const search = searchParams.get("search");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  let query = supabase
    .from("atlas_images")
    .select("id, title, atlas_type, category, image_url, diagnosis, difficulty, tags, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) query = query.eq("category", category);
  if (difficulty) query = query.eq("difficulty", parseInt(difficulty));
  if (atlas_type) query = query.eq("atlas_type", atlas_type);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Atlas görselleri yüklenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "editor"].includes(profile.role)) {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const body = await request.json();
  const {
    title, atlas_type, category, image_url, annotated_url, normal_url,
    diagnosis, description, key_findings, difficulty, clinical_context,
    differential, tags, source,
  } = body;

  if (!title || !atlas_type || !category || !image_url || !diagnosis || !description) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("atlas_images")
    .insert({
      title,
      atlas_type,
      category,
      image_url,
      annotated_url,
      normal_url,
      diagnosis,
      description,
      key_findings,
      difficulty: difficulty || 1,
      clinical_context,
      differential,
      tags,
      source,
      status: profile.role === "admin" ? "published" : "draft",
      author_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Atlas görseli oluşturulamadı." }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
