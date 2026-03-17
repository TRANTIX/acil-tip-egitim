import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Algorithm } from "@/types";
import { AlgorithmPublicDetail } from "./algorithm-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("algorithms")
    .select("title, category")
    .eq("id", id)
    .single();

  if (!data) return { title: "Algoritma Bulunamadı" };

  return {
    title: `${data.title} — Klinik Algoritma | AcilEM`,
    description: `${data.title} karar algoritması flowchart — ücretsiz erişim.`,
  };
}

export default async function AlgorithmPublicDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();

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
      <AlgorithmPublicDetail algorithm={data as Algorithm} />
    </div>
  );
}
