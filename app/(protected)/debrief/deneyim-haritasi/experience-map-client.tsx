"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, AlertTriangle } from "lucide-react";
import type { ExperienceMap } from "@/types";

const confidenceLevelColors: Record<string, string> = {
  beginner: "bg-red-500",
  developing: "bg-yellow-500",
  competent: "bg-blue-500",
  proficient: "bg-green-500",
};

const confidenceLevelLabels: Record<string, string> = {
  beginner: "Başlangıç",
  developing: "Gelişiyor",
  competent: "Yeterli",
  proficient: "İleri",
};

const categoryLabels: Record<string, string> = {
  tani: "Tanı",
  tedavi: "Tedavi",
  prosedur: "Prosedür",
  iletisim: "İletişim",
  genel: "Genel",
};

export function ExperienceMapClient() {
  const [entries, setEntries] = useState<ExperienceMap[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const url = filterCategory
          ? `/api/experience-map?category=${filterCategory}`
          : "/api/experience-map";
        const res = await fetch(url);
        const json = await res.json();
        setEntries(json.data || []);
      } catch {
        // hata
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filterCategory]);

  // Kategorilere göre grupla
  const grouped = entries.reduce<Record<string, ExperienceMap[]>>((acc, entry) => {
    const cat = entry.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(entry);
    return acc;
  }, {});

  // İstatistikler
  const totalCases = entries.reduce((sum, e) => sum + e.case_count, 0);
  const uniqueDiagnoses = entries.length;
  const categories = Object.keys(grouped);

  // Güven seviyesi dağılımı
  const confidenceDist = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.confidence_level] = (acc[e.confidence_level] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Disclaimer */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-700 dark:text-yellow-400">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
        <p>
          Deneyim haritası, debrief kayıtlarınızdan otomatik olarak oluşturulur.
          Daha fazla debrief kaydettikçe haritanız zenginleşir.
        </p>
      </div>

      {/* Header */}
      <Link
        href="/debrief"
        className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Debriefler
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
          <MapPin className="h-6 w-6 text-blue-500" />
          Deneyim Haritası
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Klinik deneyim alanlarınız ve güven seviyeleriniz
        </p>
      </div>

      {/* İstatistikler */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{totalCases}</p>
          <p className="text-xs text-[var(--muted-foreground)]">Toplam Vaka</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{uniqueDiagnoses}</p>
          <p className="text-xs text-[var(--muted-foreground)]">Farklı Tanı</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{categories.length}</p>
          <p className="text-xs text-[var(--muted-foreground)]">Kategori</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{confidenceDist["beginner"] || 0}</p>
          <p className="text-xs text-[var(--muted-foreground)]">Gelişim Gereken</p>
        </div>
      </div>

      {/* Filtre */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => { setFilterCategory(""); setLoading(true); }}
          className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
            !filterCategory ? "bg-blue-600 text-white" : "bg-[var(--border)] text-[var(--muted-foreground)] hover:bg-blue-500/10"
          }`}
        >
          Tümü
        </button>
        {Object.entries(categoryLabels).map(([val, label]) => (
          <button
            key={val}
            onClick={() => { setFilterCategory(val); setLoading(true); }}
            className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
              filterCategory === val ? "bg-blue-600 text-white" : "bg-[var(--border)] text-[var(--muted-foreground)] hover:bg-blue-500/10"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Güven Seviyesi Legenda */}
      <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-[var(--muted-foreground)]">
        {Object.entries(confidenceLevelLabels).map(([key, label]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span className={`h-3 w-3 rounded-full ${confidenceLevelColors[key]}`} />
            {label}
          </span>
        ))}
      </div>

      {/* Deneyim Haritası */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="h-5 w-32 rounded bg-[var(--border)]" />
              <div className="mt-3 flex gap-2">
                <div className="h-8 w-24 rounded bg-[var(--border)]" />
                <div className="h-8 w-20 rounded bg-[var(--border)]" />
              </div>
            </div>
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <MapPin className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
          <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Deneyim haritanız henüz boş</h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Nöbet debriefleri kaydettikçe deneyim haritanız otomatik olarak oluşturulacak.
          </p>
          <Link
            href="/debrief"
            className="mt-4 inline-block rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-sm text-white transition-colors"
          >
            Debrief Oluştur
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
                {categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((entry) => (
                  <div
                    key={entry.id}
                    className="group relative flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm hover:border-blue-500/30 transition-colors"
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${confidenceLevelColors[entry.confidence_level]}`} />
                    <span className="text-[var(--foreground)]">{entry.subcategory || entry.category}</span>
                    <span className="rounded bg-[var(--border)] px-1.5 py-0.5 text-xs text-[var(--muted-foreground)]">
                      {entry.case_count}
                    </span>
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block rounded-lg bg-[var(--foreground)] text-[var(--background)] px-3 py-1.5 text-xs whitespace-nowrap z-10">
                      {confidenceLevelLabels[entry.confidence_level]} &bull; {entry.case_count} vaka
                      {entry.last_seen && ` &bull; Son: ${new Date(entry.last_seen).toLocaleDateString("tr-TR")}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
