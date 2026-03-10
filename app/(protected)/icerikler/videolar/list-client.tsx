"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Video,
  ChevronRight,
  Clock,
  Tag,
} from "lucide-react";
import type { Video as VideoType } from "@/types";

interface Props {
  videos: Partial<VideoType>[];
  categories: string[];
  videoTypes: { value: string; label: string }[];
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

const VIDEO_TYPE_ICONS: Record<string, string> = {
  prosedur: "🩺",
  ders: "📹",
  ekg_yorum: "💓",
  usg: "📡",
  vaka_sunum: "🏥",
  kisa_ipucu: "⚡",
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m} dk`;
  const h = Math.floor(m / 60);
  const remainMin = m % 60;
  return `${h} sa ${remainMin > 0 ? `${remainMin} dk` : ""}`.trim();
}

export function VideoListClient({ videos, categories, videoTypes }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("hepsi");
  const [activeType, setActiveType] = useState("hepsi");

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      const q = search.toLowerCase();
      const matchSearch =
        q === "" ||
        v.title?.toLowerCase().includes(q) ||
        v.description?.toLowerCase().includes(q) ||
        v.tags?.some((t) => t.toLowerCase().includes(q));
      const matchCategory =
        activeCategory === "hepsi" || v.category === activeCategory;
      const matchType =
        activeType === "hepsi" || v.video_type === activeType;
      return matchSearch && matchCategory && matchType;
    });
  }, [videos, search, activeCategory, activeType]);

  return (
    <div>
      {/* Arama */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <input
          type="text"
          placeholder="Video ara (başlık, açıklama, etiket...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-9 pr-4 py-2.5 text-sm
            text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)]
            focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Video türü filtreleri */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveType("hepsi")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeType === "hepsi"
              ? "bg-green-600 text-white"
              : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-green-600/50 hover:text-[var(--foreground)]"
          }`}
        >
          Tümü ({videos.length})
        </button>
        {videoTypes.map((vt) => {
          const count = videos.filter((v) => v.video_type === vt.value).length;
          if (count === 0) return null;
          return (
            <button
              key={vt.value}
              onClick={() => setActiveType(vt.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeType === vt.value
                  ? "bg-green-600 text-white"
                  : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-green-600/50 hover:text-[var(--foreground)]"
              }`}
            >
              {vt.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Kategori filtreleri */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("hepsi")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeCategory === "hepsi"
              ? "bg-emerald-600 text-white"
              : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-emerald-600/50 hover:text-[var(--foreground)]"
          }`}
        >
          Tüm Kategoriler
        </button>
        {categories.map((cat) => {
          const count = videos.filter((v) => v.category === cat).length;
          if (count === 0) return null;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-emerald-600/50 hover:text-[var(--foreground)]"
              }`}
            >
              {CATEGORY_LABELS[cat] || cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Sonuçlar */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-10 text-center text-[var(--muted-foreground)]">
          <Video className="mx-auto h-10 w-10 mb-3 opacity-40" />
          <p className="font-medium">Sonuç bulunamadı</p>
          <p className="text-xs mt-1">Farklı filtreler veya arama terimleri deneyin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((video) => (
            <Link key={video.id} href={`/icerikler/videolar/${video.id}`}>
              <div className="group flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-green-700/60 hover:shadow-md transition-all cursor-pointer">
                {/* Üst bölüm */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-950/40 border border-green-900/40 text-lg">
                    {VIDEO_TYPE_ICONS[video.video_type || ""] || <Video className="h-5 w-5 text-green-400" />}
                  </div>
                  <div className="flex items-center gap-2">
                    {video.difficulty && (
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${DIFFICULTY_COLORS[video.difficulty] || ""}`}>
                        {DIFFICULTY_LABELS[video.difficulty]}
                      </span>
                    )}
                    <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
                      {CATEGORY_LABELS[video.category || ""] || video.category}
                    </span>
                  </div>
                </div>

                {/* Başlık + Açıklama */}
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--foreground)] text-sm leading-tight mb-2">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed line-clamp-2 mb-3">
                      {video.description}
                    </p>
                  )}

                  {/* Etiketler */}
                  {video.tags && video.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {video.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-0.5 rounded-md bg-[var(--muted)]/50 px-1.5 py-0.5 text-[10px] text-[var(--muted-foreground)]"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Alt bölüm */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                    {video.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(video.duration)}
                      </span>
                    )}
                    {video.published_at && (
                      <span>
                        {new Date(video.published_at).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-400 group-hover:gap-2 transition-all">
                    İzle
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-[var(--muted-foreground)]">
        Bu içerikler yalnızca eğitim amaçlıdır. Klinik kararlar güncel
        kılavuzlar ve uzman gözetiminde verilmelidir.
      </p>
    </div>
  );
}
