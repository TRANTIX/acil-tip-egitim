import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { PodcastListClient } from "./list-client";

export const metadata: Metadata = { title: "Podcastler" };

const CATEGORIES = [
  "kardiyoloji", "pulmoner", "noroloji", "enfeksiyon",
  "travma", "pediatri", "resüsitasyon", "toksikoloji", "genel",
];

const FORMATS = [
  { value: "konu_anlatimi", label: "Konu Anlatımı" },
  { value: "vaka_tartismasi", label: "Vaka Tartışması" },
  { value: "soylesi", label: "Söyleşi" },
  { value: "kilavuz", label: "Kılavuz" },
  { value: "gunun_sorusu", label: "Günün Sorusu" },
];

export default async function PodcastlerPage() {
  const supabase = await createClient();

  const { data: podcasts } = await supabase
    .from("podcasts")
    .select("id, title, description, category, difficulty, audio_url, duration, episode_number, format, tags, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Podcastler</h1>
        <p className="mt-1 text-[var(--muted-foreground)] text-sm">
          {podcasts?.length || 0} bölüm
        </p>
      </div>
      <PodcastListClient
        podcasts={podcasts || []}
        categories={CATEGORIES}
        formats={FORMATS}
      />
    </div>
  );
}
