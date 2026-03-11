import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const supabase = await createClient();

  // Güvenlik: id parametresini sanitize et (filter injection koruması)
  const sanitizedId = id.replace(/[^a-zA-Z0-9\-_]/g, "");
  if (!sanitizedId || sanitizedId !== id) {
    return NextResponse.json({ error: "Geçersiz makale ID." }, { status: 400 });
  }

  // UUID ise id ile, değilse slug ile ara
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sanitizedId);

  let query = supabase
    .from("articles")
    .select("*")
    .eq("status", "published");

  if (isUUID) {
    query = query.eq("id", sanitizedId);
  } else {
    query = query.eq("slug", sanitizedId);
  }

  const { data, error } = await query.single();

  if (error || !data) {
    return NextResponse.json({ error: "Makale bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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
  const { title, slug, content_type, category, difficulty, body: content, key_points, reading_time, tags, status } = body;
  const safeUpdate: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (title !== undefined) safeUpdate.title = title;
  if (slug !== undefined) safeUpdate.slug = slug;
  if (content_type !== undefined) safeUpdate.content_type = content_type;
  if (category !== undefined) safeUpdate.category = category;
  if (difficulty !== undefined) safeUpdate.difficulty = difficulty;
  if (content !== undefined) safeUpdate.body = content;
  if (key_points !== undefined) safeUpdate.key_points = key_points;
  if (reading_time !== undefined) safeUpdate.reading_time = reading_time;
  if (tags !== undefined) safeUpdate.tags = tags;
  if (status !== undefined && profile.role === "admin") safeUpdate.status = status;

  const { data, error } = await supabase
    .from("articles")
    .update(safeUpdate)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Makale güncellenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
