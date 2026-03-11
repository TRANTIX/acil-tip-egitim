import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");

  let query = supabase
    .from("scenarios")
    .select("id, title, category, difficulty, patient_info, initial_vitals, tags, created_at")
    .eq("status", "published")
    .order("difficulty", { ascending: true });

  if (category) query = query.eq("category", category);
  if (difficulty) query = query.eq("difficulty", parseInt(difficulty));

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Senaryolar yüklenemedi." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
