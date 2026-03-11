import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { data: debrief, error } = await supabase
    .from("debriefs")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !debrief) {
    return NextResponse.json({ error: "Debrief bulunamadı." }, { status: 404 });
  }

  // Vakaları da getir
  const { data: cases } = await supabase
    .from("debrief_cases")
    .select("*")
    .eq("debrief_id", id)
    .order("created_at", { ascending: true });

  return NextResponse.json({ data: { ...debrief, cases: cases || [] } });
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

  const body = await request.json();
  const { overall_learning, what_would_change, mentor_question } = body;
  const safeUpdate: Record<string, unknown> = {};
  if (overall_learning !== undefined) safeUpdate.overall_learning = overall_learning;
  if (what_would_change !== undefined) safeUpdate.what_would_change = what_would_change;
  if (mentor_question !== undefined) safeUpdate.mentor_question = mentor_question;

  const { data, error } = await supabase
    .from("debriefs")
    .update(safeUpdate)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Debrief güncellenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
