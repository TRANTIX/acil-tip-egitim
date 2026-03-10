"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  ChevronRight,
  Clock,
  BookOpen,
  Tag,
} from "lucide-react";
import type { Article } from "@/types";

interface Props {
  articles: Partial<Article>[];
  categories: string[];
  contentTypes: { value: string; label: string }[];
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

const CONTENT_TYPE_ICONS: Record<string, string> = {
  konu_anlatimi: "📘",
  kilavuz_ozeti: "📋",
  vaka_tartismasi: "🏥",
  pearl: "💎",
  makale_ozeti: "📄",
};

export function ArticleListClient({ articles, categories, contentTypes }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("hepsi");
  const [activeType, setActiveType] = useState("hepsi");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        q === "" ||
        a.title?.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q)) ||
        a.key_points?.some((kp) => kp.toLowerCase().includes(q));
      const matchCategory =
        activeCategory === "hepsi" || a.category === activeCategory;
      const matchType =
        activeType === "hepsi" || a.content_type === activeType;
      return matchSearch && matchCategory && matchType;
    });
  }, [articles, search, activeCategory, activeType]);

  return (
    <div>
      {/* Arama */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <input
          type="text"
          placeholder="İçerik ara (başlık, etiket, anahtar nokta...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-9 pr-4 py-2.5 text-sm
            text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)]
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* İçerik türü filtreleri */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveType("hepsi")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeType === "hepsi"
              ? "bg-blue-600 text-white"
              : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-blue-600/50 hover:text-[var(--foreground)]"
          }`}
        >
          Tümü ({articles.length})
        </button>
        {contentTypes.map((ct) => {
          const count = articles.filter((a) => a.content_type === ct.value).length;
          if (count === 0) return null;
          return (
            <button
              key={ct.value}
              onClick={() => setActiveType(ct.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeType === ct.value
                  ? "bg-blue-600 text-white"
                  : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-blue-600/50 hover:text-[var(--foreground)]"
              }`}
            >
              {ct.label} ({count})
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
          const count = articles.filter((a) => a.category === cat).length;
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
          <BookOpen className="mx-auto h-10 w-10 mb-3 opacity-40" />
          <p className="font-medium">Sonuç bulunamadı</p>
          <p className="text-xs mt-1">Farklı filtreler veya arama terimleri deneyin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article) => (
            <Link key={article.id} href={`/icerikler/yazilar/${article.slug}`}>
              <div className="group flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-blue-700/60 hover:shadow-md transition-all cursor-pointer">
                {/* Üst bölüm: ikon + kategori + zorluk */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/40 border border-blue-900/40 text-lg">
                    {CONTENT_TYPE_ICONS[article.content_type || ""] || <FileText className="h-5 w-5 text-blue-400" />}
                  </div>
                  <div className="flex items-center gap-2">
                    {article.difficulty && (
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${DIFFICULTY_COLORS[article.difficulty] || ""}`}>
                        {DIFFICULTY_LABELS[article.difficulty]}
                      </span>
                    )}
                    <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
                      {CATEGORY_LABELS[article.category || ""] || article.category}
                    </span>
                  </div>
                </div>

                {/* Başlık */}
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--foreground)] text-sm leading-tight mb-2">
                    {article.title}
                  </h3>

                  {/* Anahtar noktalar (ilk 2) */}
                  {article.key_points && article.key_points.length > 0 && (
                    <ul className="space-y-1 mb-3">
                      {article.key_points.slice(0, 2).map((kp, i) => (
                        <li key={i} className="text-xs text-[var(--muted-foreground)] leading-relaxed flex items-start gap-1.5">
                          <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                          <span className="line-clamp-1">{kp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Etiketler */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.slice(0, 3).map((tag) => (
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
                    {article.reading_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.reading_time} dk
                      </span>
                    )}
                    {article.published_at && (
                      <span>
                        {new Date(article.published_at).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-400 group-hover:gap-2 transition-all">
                    Oku
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
