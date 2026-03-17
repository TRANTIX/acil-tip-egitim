"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, GitBranch } from "lucide-react";

interface AlgorithmSummary {
  id: string;
  title: string;
  category: string;
  description?: string;
}

interface Props {
  algorithms: AlgorithmSummary[];
}

const CATEGORY_LABELS: Record<string, string> = {
  havayolu: "Havayolu",
  solunum: "Solunum",
  "dolaşım": "Dolaşım",
  travma: "Travma",
  "nöroloji": "Nöroloji",
  pediatri: "Pediatri",
  toksikoloji: "Toksikoloji",
  genel: "Genel",
  kardiyoloji: "Kardiyoloji",
  "resüsitasyon": "Resüsitasyon",
  enfeksiyon: "Enfeksiyon",
  pulmoner: "Pulmoner",
  noroloji: "Nöroloji",
};

export function AlgorithmListClient({ algorithms }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Mevcut kategorileri algoritmalardan çıkar
  const categories = [...new Set(algorithms.map((a) => a.category))].sort();

  const filtered = algorithms.filter((a) => {
    const matchSearch =
      !search || a.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Arama + filtre */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Algoritma ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-2 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-amber-500 focus:outline-none"
          />
        </div>
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                !selectedCategory
                  ? "bg-amber-500 text-white"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]"
              }`}
            >
              Tümü
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(cat === selectedCategory ? "" : cat)
                }
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-white"
                    : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]"
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-[var(--muted-foreground)]">
            Algoritma bulunamadı.
          </p>
        ) : (
          filtered.map((algo) => (
            <Link
              key={algo.id}
              href={`/algoritmalar/${algo.id}`}
              className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-amber-500/50 hover:bg-amber-500/5"
            >
              <GitBranch className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--foreground)]">
                  {algo.title}
                </h3>
                {algo.description && (
                  <p className="mt-0.5 text-xs text-[var(--muted-foreground)] line-clamp-2">
                    {algo.description}
                  </p>
                )}
              </div>
              <span className="shrink-0 rounded bg-[var(--muted)] px-2 py-0.5 text-xs capitalize text-[var(--muted-foreground)]">
                {CATEGORY_LABELS[algo.category] || algo.category}
              </span>
            </Link>
          ))
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-[var(--muted-foreground)]">
        Bu algoritmalar eğitim amaçlıdır. Klinik karar verme sürecinde tek başına kullanılmamalıdır.
      </p>
    </div>
  );
}
