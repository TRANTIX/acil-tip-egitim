import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("scenarios")
    .select("id, title, category, difficulty, patient_info, initial_vitals, lab_results, imaging_results, tags, status, created_at")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Senaryo bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ data });
}
