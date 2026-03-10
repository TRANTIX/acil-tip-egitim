import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, AlertTriangle, Video } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { VideoEmbed } from "@/components/content/video-embed";

interface PageProps {
  params: Promise<{ id: string }>;
}

const CATEGORY_LABELS: Record<string, string> = {
  kardiyoloji: "Kardiyoloji",
  pulmoner: "Pulmoner",
  noroloji: "Noroloji",
  enfeksiyon: "Enfeksiyon",
  travma: "Travma",
  pediatri: "Pediatri",
  resüsitasyon: "Resüsitasyon",
  toksikoloji: "Toksikoloji",
  genel: "Genel",
};

const VIDEO_TYPE_LABELS: Record<string, string> = {
  prosedur: "Prosedür",
  ders: "Ders",
  ekg_yorum: "EKG Yorum",
  usg: "USG",
  vaka_sunum: "Vaka Sunumu",
  kisa_ipucu: "Kısa İpucu",
};

const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Temel",
  2: "Orta",
  3: "İleri",
  4: "Uzman",
};

const DIFFICULTY_COLORS: Record<number, string> = {
  1: "text-green-400 border-green-800/40 bg-green-950/30",
  2: "text-blue-400 border-blue-800/40 bg-blue-950/30",
  3: "text-orange-400 border-orange-800/40 bg-orange-950/30",
  4: "text-red-400 border-red-800/40 bg-red-950/30",
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m} dk`;
  const h = Math.floor(m / 60);
  const remainMin = m % 60;
  return `${h} sa ${remainMin > 0 ? `${remainMin} dk` : ""}`.trim();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("videos")
    .select("title, description, category")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!data) return { title: "Video Bulunamadı" };

  return {
    title: data.title,
    description: data.description || `${data.category} kategorisinde video`,
  };
}

export default async function VideoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: video } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!video) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Geri butonu */}
      <Link
        href="/icerikler/videolar"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Videolar
      </Link>

      {/* Meta bilgiler */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {video.video_type && (
          <span className="rounded-full border border-green-800/40 bg-green-950/30 px-2.5 py-1 text-xs text-green-400 font-medium">
            {VIDEO_TYPE_LABELS[video.video_type] || video.video_type}
          </span>
        )}
        <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted-foreground)]">
          {CATEGORY_LABELS[video.category] || video.category}
        </span>
        {video.difficulty && (
          <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${DIFFICULTY_COLORS[video.difficulty] || ""}`}>
            {DIFFICULTY_LABELS[video.difficulty]}
          </span>
        )}
      </div>

      {/* Başlık */}
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
        {video.title}
      </h1>

      {/* Süre ve tarih */}
      <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)] mb-6">
        {video.duration && (
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatDuration(video.duration)}
          </span>
        )}
        {video.published_at && (
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(video.published_at).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      {/* Video Player */}
      <div className="mb-6">
        <VideoEmbed url={video.video_url} title={video.title} />
      </div>

      {/* Açıklama */}
      {video.description && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 mb-6">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
            <Video className="h-4 w-4 text-green-400" />
            Video Hakkında
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
            {video.description}
          </p>
        </div>
      )}

      {/* Etiketler */}
      {video.tags && video.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {video.tags.map((tag: string) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted-foreground)]"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-xl border border-yellow-800/40 bg-yellow-950/20 px-4 py-3 text-xs text-yellow-300/80">
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
        <span>
          Bu içerik yalnızca eğitim amaçlıdır. Klinik kararlar güncel kılavuzlar
          ve uzman gözetiminde verilmelidir.
        </span>
      </div>
    </div>
  );
}
