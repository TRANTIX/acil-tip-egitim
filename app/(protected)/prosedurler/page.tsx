import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProcedureListClient } from "./list-client";

export const metadata: Metadata = {
  title: "Prosedürler ve Algoritmalar",
  description: "Acil tıp prosedür kılavuzları ve klinik karar algoritmaları.",
};

const CATEGORIES = [
  "havayolu", "solunum", "dolaşım", "travma",
  "nöroloji", "pediatri", "toksikoloji", "genel",
];

export default async function ProsedurlerPage() {
  const supabase = await createClient();

  const [{ data: procedures }, { data: algorithms }] = await Promise.all([
    supabase
      .from("procedures")
      .select("id, title, category, indications, created_at")
      .eq("status", "published")
      .order("title", { ascending: true }),
    supabase
      .from("algorithms")
      .select("id, title, category, description, created_at")
      .eq("status", "published")
      .order("title", { ascending: true }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Prosedürler ve Algoritmalar
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          {(procedures?.length || 0)} prosedür · {(algorithms?.length || 0)} algoritma
        </p>
      </div>
      <ProcedureListClient
        procedures={procedures || []}
        algorithms={algorithms || []}
        categories={CATEGORIES}
      />
    </div>
  );
}
