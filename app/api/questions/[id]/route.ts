import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("status", "published")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Soru bulunamadı." }, { status: 404 });
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
  const { topic, difficulty, question_text, question_image, options, explanation, source, status } = body;
  const safeUpdate: Record<string, unknown> = {};
  if (topic !== undefined) safeUpdate.topic = topic;
  if (difficulty !== undefined) safeUpdate.difficulty = difficulty;
  if (question_text !== undefined) safeUpdate.question_text = question_text;
  if (question_image !== undefined) safeUpdate.question_image = question_image;
  if (options !== undefined) safeUpdate.options = options;
  if (explanation !== undefined) safeUpdate.explanation = explanation;
  if (source !== undefined) safeUpdate.source = source;
  if (status !== undefined && profile.role === "admin") safeUpdate.status = status;

  const { data, error } = await supabase
    .from("questions")
    .update(safeUpdate)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Soru güncellenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
