import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Scenario } from "@/types";
import { SimulationChat } from "./simulation-chat";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("scenarios")
    .select("title")
    .eq("id", id)
    .single();

  if (!data) return { title: "Senaryo Bulunamadı" };

  return {
    title: `${data.title} — AI Simülasyon`,
  };
}

export default async function SimulationPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: scenario, error } = await supabase
    .from("scenarios")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error || !scenario) {
    notFound();
  }

  return <SimulationChat scenario={scenario as Scenario} />;
}
