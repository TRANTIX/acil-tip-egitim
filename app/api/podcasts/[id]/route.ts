import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("podcasts")
    .select("*")
    .eq("status", "published")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Podcast bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
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
  const { title, description, category, difficulty, audio_url, duration, episode_number, format, tags, status } = body;
  const safeUpdate: Record<string, unknown> = {};
  if (title !== undefined) safeUpdate.title = title;
  if (description !== undefined) safeUpdate.description = description;
  if (category !== undefined) safeUpdate.category = category;
  if (difficulty !== undefined) safeUpdate.difficulty = difficulty;
  if (audio_url !== undefined) safeUpdate.audio_url = audio_url;
  if (duration !== undefined) safeUpdate.duration = duration;
  if (episode_number !== undefined) safeUpdate.episode_number = episode_number;
  if (format !== undefined) safeUpdate.format = format;
  if (tags !== undefined) safeUpdate.tags = tags;
  if (status !== undefined && profile.role === "admin") safeUpdate.status = status;

  const { data, error } = await supabase
    .from("podcasts")
    .update(safeUpdate)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Podcast güncellenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
