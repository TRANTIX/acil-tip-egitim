import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "20") || 20, 1), 100);

  const { data, error } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: "Sonuçlar yüklenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }
  const { topic, total_questions, correct_answers, time_spent, question_ids, answers } = body;

  if (!total_questions || correct_answers === undefined) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("quiz_results")
    .insert({
      user_id: user.id,
      topic,
      total_questions,
      correct_answers,
      time_spent,
      question_ids,
      answers,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Sonuç kaydedilemedi." }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
