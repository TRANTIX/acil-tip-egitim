"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ImageIcon,
  ChevronRight,
  Tag,
} from "lucide-react";
import type { AtlasImage } from "@/types";

interface Props {
  images: Partial<AtlasImage>[];
  categories: string[];
  atlasTypes: { value: string; label: string }[];
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

const ATLAS_TYPE_ICONS: Record<string, string> = {
  ekg: "💓",
  rontgen: "🦴",
  bt: "🧠",
  usg: "📡",
  klinik_foto: "📸",
};

export function AtlasListClient({ images, categories, atlasTypes }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("hepsi");
  const [activeType, setActiveType] = useState("hepsi");

  const filtered = useMemo(() => {
    return images.filter((img) => {
      const q = search.toLowerCase();
      const matchSearch =
        q === "" ||
        img.title?.toLowerCase().includes(q) ||
        img.diagnosis?.toLowerCase().includes(q) ||
        img.tags?.some((t) => t.toLowerCase().includes(q));
      const matchCategory =
        activeCategory === "hepsi" || img.category === activeCategory;
      const matchType =
        activeType === "hepsi" || img.atlas_type === activeType;
      return matchSearch && matchCategory && matchType;
    });
  }, [images, search, activeCategory, activeType]);

  return (
    <div>
      {/* Arama */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <input
          type="text"
          placeholder="Görsel ara (başlık, tanı, etiket...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-9 pr-4 py-2.5 text-sm
            text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)]
            focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Atlas türü filtreleri */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveType("hepsi")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeType === "hepsi"
              ? "bg-orange-600 text-white"
              : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-orange-600/50 hover:text-[var(--foreground)]"
          }`}
        >
          Tümü ({images.length})
        </button>
        {atlasTypes.map((at) => {
          const count = images.filter((img) => img.atlas_type === at.value).length;
          if (count === 0) return null;
          return (
            <button
              key={at.value}
              onClick={() => setActiveType(at.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeType === at.value
                  ? "bg-orange-600 text-white"
                  : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-orange-600/50 hover:text-[var(--foreground)]"
              }`}
            >
              {at.label} ({count})
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
          const count = images.filter((img) => img.category === cat).length;
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
          <ImageIcon className="mx-auto h-10 w-10 mb-3 opacity-40" />
          <p className="font-medium">Sonuç bulunamadı</p>
          <p className="text-xs mt-1">Farklı filtreler veya arama terimleri deneyin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((img) => (
            <Link key={img.id} href={`/icerikler/atlas/${img.id}`}>
              <div className="group flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-orange-700/60 hover:shadow-md transition-all cursor-pointer">
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] bg-black/80 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.image_url}
                    alt={img.title || ""}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="rounded-lg bg-black/70 px-2 py-1 text-xs text-white font-medium">
                      {ATLAS_TYPE_ICONS[img.atlas_type || ""] || ""}{" "}
                      {atlasTypes.find((t) => t.value === img.atlas_type)?.label || img.atlas_type}
                    </span>
                  </div>
                </div>

                {/* İçerik */}
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[var(--foreground)] text-sm leading-tight flex-1">
                      {img.title}
                    </h3>
                    {img.difficulty && (
                      <span className={`ml-2 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${DIFFICULTY_COLORS[img.difficulty] || ""}`}>
                        {DIFFICULTY_LABELS[img.difficulty]}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-orange-400 font-medium mb-2 line-clamp-1">
                    {img.diagnosis}
                  </p>

                  {/* Etiketler */}
                  {img.tags && img.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {img.tags.slice(0, 3).map((tag) => (
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

                  {/* Alt */}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
                      {CATEGORY_LABELS[img.category || ""] || img.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-orange-400 group-hover:gap-2 transition-all">
                      İncele
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
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
