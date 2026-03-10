import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ArticleListClient } from "./list-client";

export const metadata: Metadata = { title: "Yazılı İçerikler" };

const CATEGORIES = [
  "kardiyoloji", "pulmoner", "noroloji", "enfeksiyon",
  "travma", "pediatri", "resüsitasyon", "toksikoloji", "genel",
];

const CONTENT_TYPES = [
  { value: "konu_anlatimi", label: "Konu Anlatımı" },
  { value: "kilavuz_ozeti", label: "Kılavuz Özeti" },
  { value: "vaka_tartismasi", label: "Vaka Tartışması" },
  { value: "pearl", label: "Pearl" },
  { value: "makale_ozeti", label: "Makale Özeti" },
];

export default async function YazilarPage() {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, content_type, category, difficulty, reading_time, key_points, tags, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Yazılı İçerikler</h1>
        <p className="mt-1 text-[var(--muted-foreground)] text-sm">
          {articles?.length || 0} içerik
        </p>
      </div>
      <ArticleListClient
        articles={articles || []}
        categories={CATEGORIES}
        contentTypes={CONTENT_TYPES}
      />
    </div>
  );
}
