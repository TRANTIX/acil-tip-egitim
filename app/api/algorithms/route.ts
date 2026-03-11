import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { escapeIlike } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "50") || 50, 1), 100);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0") || 0, 0);

  let query = supabase
    .from("algorithms")
    .select("id, title, category, description, status, created_at")
    .eq("status", "published")
    .order("title", { ascending: true })
    .range(offset, offset + limit - 1);

  if (category) query = query.eq("category", category);
  if (search) query = query.ilike("title", `%${escapeIlike(search)}%`);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Algoritmalar yüklenemedi." }, { status: 500 });
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
  const { title, category, flowchart_data, description, source_references } = body;

  if (!title || !category || !flowchart_data) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("algorithms")
    .insert({
      title, category, flowchart_data, description, source_references,
      status: profile.role === "admin" ? "published" : "draft",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Algoritma oluşturulamadı." }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
