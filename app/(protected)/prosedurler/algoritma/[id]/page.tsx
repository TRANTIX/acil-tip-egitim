import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Algorithm } from "@/types";
import { AlgorithmDetail } from "./algorithm-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("algorithms")
    .select("title, category")
    .eq("id", id)
    .single();

  if (!data) return { title: "Algoritma Bulunamadı" };

  return {
    title: `${data.title} — Klinik Algoritma`,
    description: `${data.title} karar algoritması flowchart.`,
  };
}

export default async function AlgorithmDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("algorithms")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <AlgorithmDetail algorithm={data as Algorithm} />
    </div>
  );
}
