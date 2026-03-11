import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("algorithms")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Algoritma bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
  const { title, category, flowchart_data, description, source_references, status } = body;
  const safeUpdate: Record<string, unknown> = {};
  if (title !== undefined) safeUpdate.title = title;
  if (category !== undefined) safeUpdate.category = category;
  if (flowchart_data !== undefined) safeUpdate.flowchart_data = flowchart_data;
  if (description !== undefined) safeUpdate.description = description;
  if (source_references !== undefined) safeUpdate.source_references = source_references;
  if (status !== undefined && profile.role === "admin") safeUpdate.status = status;

  const { data, error } = await supabase
    .from("algorithms")
    .update(safeUpdate)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Algoritma güncellenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
