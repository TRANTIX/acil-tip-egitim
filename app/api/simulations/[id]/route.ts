import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Simülasyon oturumunu getir
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("simulation_sessions")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Oturum bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ data });
}

// Simülasyon oturumunu güncelle (mesaj ekleme, tamamlama)
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

  const body = await request.json();
  const { completed, completed_at, score, feedback } = body;
  const safeUpdate: Record<string, unknown> = {};
  if (completed !== undefined) safeUpdate.completed = completed;
  if (completed_at !== undefined) safeUpdate.completed_at = completed_at;
  if (score !== undefined) safeUpdate.score = score;
  if (feedback !== undefined) safeUpdate.feedback = feedback;

  const { data, error } = await supabase
    .from("simulation_sessions")
    .update(safeUpdate)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Oturum güncellenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
