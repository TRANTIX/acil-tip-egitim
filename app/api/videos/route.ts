import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { escapeIlike } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");
  const video_type = searchParams.get("video_type");
  const search = searchParams.get("search");
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "20") || 20, 1), 100);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0") || 0, 0);

  let query = supabase
    .from("videos")
    .select("id, title, description, category, difficulty, video_url, duration, video_type, tags, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) query = query.eq("category", category);
  if (difficulty) query = query.eq("difficulty", parseInt(difficulty));
  if (video_type) query = query.eq("video_type", video_type);
  if (search) query = query.ilike("title", `%${escapeIlike(search)}%`);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Videolar yüklenemedi." }, { status: 500 });
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
  const { title, description, category, difficulty, video_url, duration, video_type, tags } = body;

  if (!title || !category || !video_url) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("videos")
    .insert({
      title,
      description,
      category,
      difficulty: difficulty || 1,
      video_url,
      duration,
      video_type,
      tags,
      status: profile.role === "admin" ? "published" : "draft",
      author_id: user.id,
      published_at: profile.role === "admin" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Video oluşturulamadı." }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
