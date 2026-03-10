import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { VideoListClient } from "./list-client";

export const metadata: Metadata = { title: "Videolar" };

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

export default async function VideolarPage() {
  const supabase = await createClient();

  const { data: videos } = await supabase
    .from("videos")
    .select("id, title, description, category, difficulty, video_url, duration, video_type, tags, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Videolar</h1>
        <p className="mt-1 text-[var(--muted-foreground)] text-sm">
          {videos?.length || 0} video
        </p>
      </div>
      <VideoListClient
        videos={videos || []}
        categories={CATEGORIES}
        videoTypes={VIDEO_TYPES}
      />
    </div>
  );
}
