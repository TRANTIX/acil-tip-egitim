import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const topic = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "20") || 20, 1), 100);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0") || 0, 0);
  const random = searchParams.get("random");

  let query = supabase
    .from("questions")
    .select("id, topic, difficulty, question_text, question_image, options, explanation, source")
    .eq("status", "published")
    .range(offset, offset + limit - 1);

  if (topic) query = query.eq("topic", topic);
  if (difficulty) query = query.eq("difficulty", parseInt(difficulty));

  // Rastgele sıralama için order kullanılamıyor, client-side shuffle yapılacak
  if (!random) {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Sorular yüklenemedi." }, { status: 500 });
  }

  // Rastgele sıralama
  if (random && data) {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
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
  const { topic, difficulty, question_text, question_image, options, explanation, source } = body;

  if (!topic || !question_text || !options || !explanation) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  // En az 2 seçenek ve tam olarak 1 doğru cevap olmalı
  if (!Array.isArray(options) || options.length < 2) {
    return NextResponse.json({ error: "En az 2 seçenek gereklidir." }, { status: 400 });
  }
  const correctCount = options.filter((o: { is_correct: boolean }) => o.is_correct).length;
  if (correctCount !== 1) {
    return NextResponse.json({ error: "Tam olarak 1 doğru cevap olmalıdır." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("questions")
    .insert({
      topic,
      difficulty: difficulty || 1,
      question_text,
      question_image,
      options,
      explanation,
      source,
      status: profile.role === "admin" ? "published" : "draft",
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Soru oluşturulamadı." }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
