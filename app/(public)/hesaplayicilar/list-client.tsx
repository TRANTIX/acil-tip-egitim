"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calculator, ChevronRight } from "lucide-react";
import type { CalculatorDefinition } from "@/types/calculator";

interface Props {
  calculators: CalculatorDefinition[];
  categories: string[];
  categoryLabels: Record<string, string>;
}

export function CalculatorListClient({ calculators, categories, categoryLabels }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("hepsi");

  const filtered = useMemo(() => {
    return calculators.filter((c) => {
      const matchSearch =
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.shortName.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "hepsi" || c.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [calculators, search, activeCategory]);

  return (
    <div>
      {/* Arama */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <input
          type="text"
          placeholder="Hesaplayıcı ara (GKS, HEART, Wells...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-9 pr-4 py-2.5 text-sm
            text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)]
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Kategori filtreleri */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("hepsi")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeCategory === "hepsi"
              ? "bg-blue-600 text-white"
              : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-blue-600/50 hover:text-[var(--foreground)]"
          }`}
        >
          Hepsi ({calculators.length})
        </button>
        {categories.map((cat) => {
          const count = calculators.filter((c) => c.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-blue-600/50 hover:text-[var(--foreground)]"
              }`}
            >
              {categoryLabels[cat] || cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Sonuçlar */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-10 text-center text-[var(--muted-foreground)]">
          Sonuç bulunamadı.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((calc) => (
            <Link key={calc.id} href={`/hesaplayicilar/${calc.id}`}>
              <div className="group flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-blue-700/60 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/40 border border-blue-900/40">
                    <Calculator className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
                    {categoryLabels[calc.category] || calc.category}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <h3 className="font-semibold text-[var(--foreground)] text-sm leading-tight">
                      {calc.shortName}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    {calc.name}
                  </p>
                  <p className="mt-2 text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs text-blue-400 group-hover:gap-2 transition-all">
                  Hesapla
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-[var(--muted-foreground)]">
        Bu hesaplayıcılar yalnızca eğitim amaçlıdır. Klinik kararlar güncel
        kılavuzlar ve uzman gözetiminde verilmelidir.
      </p>
    </div>
  );
}
