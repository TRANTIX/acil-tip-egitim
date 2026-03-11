import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { escapeIlike } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");
  const content_type = searchParams.get("content_type");
  const search = searchParams.get("search");
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "20") || 20, 1), 100);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0") || 0, 0);

  let query = supabase
    .from("articles")
    .select("id, title, slug, content_type, category, difficulty, reading_time, key_points, tags, published_at, author_id")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) query = query.eq("category", category);
  if (difficulty) query = query.eq("difficulty", parseInt(difficulty));
  if (content_type) query = query.eq("content_type", content_type);
  if (search) query = query.ilike("title", `%${escapeIlike(search)}%`);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "İçerikler yüklenemedi." }, { status: 500 });
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
  const { title, slug, content_type, category, difficulty, body: content, key_points, reading_time, tags } = body;

  if (!title || !slug || !content_type || !category || !content) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("articles")
    .insert({
      title,
      slug,
      content_type,
      category,
      difficulty: difficulty || 1,
      body: content,
      key_points,
      reading_time,
      tags,
      status: profile.role === "admin" ? "published" : "draft",
      author_id: user.id,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Bu slug zaten kullanımda." }, { status: 409 });
    }
    return NextResponse.json({ error: "Makale oluşturulamadı." }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
