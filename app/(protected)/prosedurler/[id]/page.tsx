import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Procedure } from "@/types";
import { ProcedureDetail } from "./procedure-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("procedures")
    .select("title, category")
    .eq("id", id)
    .single();

  if (!data) return { title: "Prosedür Bulunamadı" };

  return {
    title: `${data.title} — Prosedür Kılavuzu`,
    description: `${data.title} prosedürü adım adım kılavuz.`,
  };
}

export default async function ProcedureDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("procedures")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <ProcedureDetail procedure={data as Procedure} />
    </div>
  );
}
