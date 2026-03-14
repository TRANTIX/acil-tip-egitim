import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { PublicVideoListClient } from "./list-client";

export const metadata: Metadata = {
  title: "Ücretsiz Videolar",
  description: "Acil tıp eğitim videoları — ücretsiz erişim",
};

const CATEGORIES = [
  "kardiyoloji", "pulmoner", "noroloji", "enfeksiyon",
  "travma", "pediatri", "resüsitasyon", "toksikoloji", "genel",
];

const VIDEO_TYPES = [
  { value: "prosedur", label: "Prosedür" },
  { value: "ders", label: "Ders" },
  { value: "ekg_yorum", label: "EKG Yorum" },
  { value: "usg", label: "USG" },
  { value: "vaka_sunum", label: "Vaka Sunumu" },
  { value: "kisa_ipucu", label: "Kısa İpucu" },
];

export default async function PublicVideolarPage() {
  const supabase = createAdminClient();

  const { data: videos } = await supabase
    .from("videos")
    .select("id, title, description, category, difficulty, video_url, duration, video_type, is_premium, tags, published_at")
    .eq("status", "published")
    .eq("is_premium", false)
    .order("published_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Eğitim Videoları</h1>
        <p className="mt-1 text-[var(--muted-foreground)] text-sm">
          Ücretsiz erişimli acil tıp eğitim videoları — {videos?.length || 0} video
        </p>
      </div>
      <PublicVideoListClient
        videos={videos || []}
        categories={CATEGORIES}
        videoTypes={VIDEO_TYPES}
      />
    </div>
  );
}
