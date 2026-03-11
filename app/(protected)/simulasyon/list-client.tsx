"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Brain, AlertCircle } from "lucide-react";

interface ScenarioSummary {
  id: string;
  title: string;
  category: string;
  difficulty: number;
  patient_info: {
    age: number;
    gender: string;
    chief_complaint: string;
  };
  tags?: string[];
}

interface Props {
  scenarios: ScenarioSummary[];
  categories: string[];
}

const CATEGORY_LABELS: Record<string, string> = {
  kardiyoloji: "Kardiyoloji",
  travma: "Travma",
  nöroloji: "Nöroloji",
  enfeksiyon: "Enfeksiyon",
  toksikoloji: "Toksikoloji",
  pediatri: "Pediatri",
  resüsitasyon: "Resüsitasyon",
  pulmoner: "Pulmoner",
  genel: "Genel",
};

const DIFFICULTY_LABELS = ["", "Kolay", "Orta", "Zor"];
const DIFFICULTY_COLORS = ["", "text-green-500", "text-yellow-500", "text-red-500"];

export function ScenarioListClient({ scenarios, categories }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);

  const filtered = scenarios.filter((s) => {
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.patient_info.chief_complaint.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || s.category === selectedCategory;
    const matchDiff = !selectedDifficulty || s.difficulty === selectedDifficulty;
    return matchSearch && matchCat && matchDiff;
  });

  return (
    <div className="space-y-6">
      {/* Uyarı */}
      <div className="flex items-start gap-3 rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
        <div className="text-sm text-[var(--muted-foreground)]">
          <p className="font-medium text-violet-400">Günlük 5 simülasyon hakkınız bulunmaktadır.</p>
          <p className="mt-0.5">Simülasyonlar Claude AI tarafından desteklenir. Her yanıt gerçek zamanlı üretilir.</p>
        </div>
      </div>

      {/* Arama + filtre */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Senaryo veya şikayet ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-2 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-violet-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d === selectedDifficulty ? 0 : d)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedDifficulty === d
                  ? "bg-violet-500 text-white"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]"
              }`}
            >
              {DIFFICULTY_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

      {/* Kategori filtresi */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            !selectedCategory
              ? "bg-violet-500 text-white"
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
                ? "bg-violet-500 text-white"
                : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]"
            }`}
          >
            {CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div>

      {/* Senaryo kartları */}
      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-[var(--muted-foreground)]">
          Senaryo bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((scenario) => (
            <Link
              key={scenario.id}
              href={`/simulasyon/${scenario.id}`}
              className="group rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-violet-500/50 hover:bg-violet-500/5"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded bg-[var(--muted)] px-2 py-0.5 text-xs capitalize text-[var(--muted-foreground)]">
                  {CATEGORY_LABELS[scenario.category] || scenario.category}
                </span>
                <span className={`text-xs font-medium ${DIFFICULTY_COLORS[scenario.difficulty]}`}>
                  {DIFFICULTY_LABELS[scenario.difficulty]}
                </span>
              </div>
              <h3 className="mb-1 font-semibold text-[var(--foreground)] group-hover:text-violet-400 transition-colors">
                {scenario.title}
              </h3>
              <p className="text-xs text-[var(--muted-foreground)]">
                {scenario.patient_info.age} yaş {scenario.patient_info.gender} — {scenario.patient_info.chief_complaint}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Brain className="h-4 w-4 text-violet-500" />
                <span className="text-xs text-violet-400">Simülasyonu Başlat</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-[var(--muted-foreground)]">
        ⚠ Simülasyonlar eğitim amaçlıdır. Gerçek klinik karar verme sürecinde kullanılmamalıdır.
      </p>
    </div>
  );
}
