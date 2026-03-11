"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ClipboardList, GitBranch } from "lucide-react";

interface ProcedureSummary {
  id: string;
  title: string;
  category: string;
  indications?: string;
}

interface AlgorithmSummary {
  id: string;
  title: string;
  category: string;
  description?: string;
}

interface Props {
  procedures: ProcedureSummary[];
  algorithms: AlgorithmSummary[];
  categories: string[];
}

const CATEGORY_LABELS: Record<string, string> = {
  havayolu: "Havayolu",
  solunum: "Solunum",
  dolaşım: "Dolaşım",
  travma: "Travma",
  nöroloji: "Nöroloji",
  pediatri: "Pediatri",
  toksikoloji: "Toksikoloji",
  genel: "Genel",
};

type Tab = "prosedurler" | "algoritmalar";

export function ProcedureListClient({ procedures, algorithms, categories }: Props) {
  const [tab, setTab] = useState<Tab>("prosedurler");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProcedures = procedures.filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const filteredAlgorithms = algorithms.filter((a) => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Tab seçimi */}
      <div className="flex gap-1 rounded-lg bg-[var(--muted)] p-1">
        <button
          onClick={() => setTab("prosedurler")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "prosedurler"
              ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          <ClipboardList className="h-4 w-4" />
          Prosedürler ({procedures.length})
        </button>
        <button
          onClick={() => setTab("algoritmalar")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "algoritmalar"
              ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          <GitBranch className="h-4 w-4" />
          Algoritmalar ({algorithms.length})
        </button>
      </div>

      {/* Arama + filtre */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-2 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              !selectedCategory
                ? "bg-emerald-500 text-white"
                : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]"
            }`}
          >
            Tümü
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-white"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]"
              }`}
            >
              {CATEGORY_LABELS[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Prosedürler listesi */}
      {tab === "prosedurler" && (
        <div className="space-y-2">
          {filteredProcedures.length === 0 ? (
            <p className="py-10 text-center text-sm text-[var(--muted-foreground)]">
              Prosedür bulunamadı.
            </p>
          ) : (
            filteredProcedures.map((proc) => (
              <Link
                key={proc.id}
                href={`/prosedurler/${proc.id}`}
                className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/5"
              >
                <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--foreground)]">{proc.title}</h3>
                  {proc.indications && (
                    <p className="mt-0.5 text-xs text-[var(--muted-foreground)] line-clamp-1">
                      {proc.indications}
                    </p>
                  )}
                </div>
                <span className="shrink-0 rounded bg-[var(--muted)] px-2 py-0.5 text-xs capitalize text-[var(--muted-foreground)]">
                  {CATEGORY_LABELS[proc.category] || proc.category}
                </span>
              </Link>
            ))
          )}
        </div>
      )}

      {/* Algoritmalar listesi */}
      {tab === "algoritmalar" && (
        <div className="space-y-2">
          {filteredAlgorithms.length === 0 ? (
            <p className="py-10 text-center text-sm text-[var(--muted-foreground)]">
              Algoritma bulunamadı.
            </p>
          ) : (
            filteredAlgorithms.map((algo) => (
              <Link
                key={algo.id}
                href={`/prosedurler/algoritma/${algo.id}`}
                className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-amber-500/50 hover:bg-amber-500/5"
              >
                <GitBranch className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--foreground)]">{algo.title}</h3>
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
      )}

      {/* Tıbbi disclaimer */}
      <p className="text-center text-xs text-[var(--muted-foreground)]">
        ⚠ Bu kılavuzlar eğitim amaçlıdır. Klinik karar verme sürecinde tek başına kullanılmamalıdır.
      </p>
    </div>
  );
}
