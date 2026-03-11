import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("atlas_images")
    .select("*")
    .eq("status", "published")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Atlas görseli bulunamadı." }, { status: 404 });
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
  const { title, atlas_type, category, image_url, annotated_url, normal_url, diagnosis, description, key_findings, difficulty, clinical_context, differential, tags, source, status } = body;
  const safeUpdate: Record<string, unknown> = {};
  if (title !== undefined) safeUpdate.title = title;
  if (atlas_type !== undefined) safeUpdate.atlas_type = atlas_type;
  if (category !== undefined) safeUpdate.category = category;
  if (image_url !== undefined) safeUpdate.image_url = image_url;
  if (annotated_url !== undefined) safeUpdate.annotated_url = annotated_url;
  if (normal_url !== undefined) safeUpdate.normal_url = normal_url;
  if (diagnosis !== undefined) safeUpdate.diagnosis = diagnosis;
  if (description !== undefined) safeUpdate.description = description;
  if (key_findings !== undefined) safeUpdate.key_findings = key_findings;
  if (difficulty !== undefined) safeUpdate.difficulty = difficulty;
  if (clinical_context !== undefined) safeUpdate.clinical_context = clinical_context;
  if (differential !== undefined) safeUpdate.differential = differential;
  if (tags !== undefined) safeUpdate.tags = tags;
  if (source !== undefined) safeUpdate.source = source;
  if (status !== undefined && profile.role === "admin") safeUpdate.status = status;

  const { data, error } = await supabase
    .from("atlas_images")
    .update(safeUpdate)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Atlas görseli güncellenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
