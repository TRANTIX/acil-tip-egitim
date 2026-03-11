import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ScenarioListClient } from "./list-client";

export const metadata: Metadata = {
  title: "AI Vaka Simülasyonu",
  description: "Yapay zeka destekli interaktif acil tıp vaka simülasyonları.",
};

const CATEGORIES = [
  "kardiyoloji", "travma", "nöroloji", "enfeksiyon",
  "toksikoloji", "pediatri", "resüsitasyon", "pulmoner", "genel",
];

export default async function SimulasyonPage() {
  const supabase = await createClient();

  const { data: scenarios } = await supabase
    .from("scenarios")
    .select("id, title, category, difficulty, patient_info, initial_vitals, tags, created_at")
    .eq("status", "published")
    .order("difficulty", { ascending: true });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">AI Vaka Simülasyonu</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Yapay zeka destekli interaktif vaka simülasyonları ile pratik yapın.
        </p>
      </div>
      <ScenarioListClient
        scenarios={scenarios || []}
        categories={CATEGORIES}
      />
    </div>
  );
}
