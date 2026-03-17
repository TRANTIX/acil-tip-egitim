import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { AlgorithmListClient } from "./list-client";

export const metadata: Metadata = {
  title: "Klinik Algoritmalar — AcilEM",
  description:
    "Acil tıpta sık kullanılan klinik karar algoritmaları. Flowchart formatında, ücretsiz erişim.",
};

export default async function AlgoritmalarPage() {
  const supabase = createAdminClient();

  const { data: algorithms } = await supabase
    .from("algorithms")
    .select("id, title, category, description, created_at")
    .eq("status", "published")
    .order("title", { ascending: true });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Klinik Algoritmalar
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Acil tıpta sık kullanılan karar algoritmaları — ücretsiz erişim.
          {algorithms && algorithms.length > 0 && ` ${algorithms.length} algoritma`}
        </p>
      </div>
      <AlgorithmListClient algorithms={algorithms || []} />
    </div>
  );
}
