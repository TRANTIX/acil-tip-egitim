"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, FileText, Calendar, MapPin, Clock, ChevronRight, AlertTriangle } from "lucide-react";
import type { Debrief } from "@/types";
import { DebriefForm } from "./debrief-form";

const locationLabels: Record<string, string> = {
  acil_servis: "Acil Servis",
  yogun_bakim: "Yoğun Bakım",
  travma: "Travma",
  diger: "Diğer",
};

export function DebriefPageClient() {
  const [debriefs, setDebriefs] = useState<Debrief[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchDebriefs = useCallback(async () => {
    try {
      const res = await fetch("/api/debriefs");
      const json = await res.json();
      setDebriefs(json.data || []);
    } catch {
      // hata
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDebriefs();
  }, [fetchDebriefs]);

  function handleCreated() {
    setShowForm(false);
    setLoading(true);
    fetchDebriefs();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Disclaimer */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-700 dark:text-yellow-400">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
        <p>
          Bu modül eğitim amaçlıdır. Debrief kayıtları gizlidir ve yalnızca size aittir.
          AI önerileri klinik karar yerine geçmez, eğitim rehberliği niteliğindedir.
        </p>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Nöbet Sonu Debrief</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Nöbet sonrası deneyimlerinizi kaydedin, AI destekli analiz alın
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/debrief/deneyim-haritasi"
            className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--muted-foreground)] hover:bg-[var(--border)] transition-colors"
          >
            <MapPin className="h-4 w-4" />
            Deneyim Haritası
          </Link>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
            Yeni Debrief
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8">
          <DebriefForm onSuccess={handleCreated} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="h-5 w-48 rounded bg-[var(--border)]" />
              <div className="mt-3 h-4 w-32 rounded bg-[var(--border)]" />
            </div>
          ))}
        </div>
      ) : debriefs.length === 0 && !showForm ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
          <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Henüz debrief kaydınız yok</h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            İlk nöbet debrief&apos;inizi oluşturarak deneyimlerinizi kaydetmeye başlayın.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-sm text-white transition-colors"
          >
            İlk Debrief&apos;imi Oluştur
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {debriefs.map((d) => (
            <Link
              key={d.id}
              href={`/debrief/${d.id}`}
              className="group flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-colors"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)]">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    {new Date(d.shift_date).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted-foreground)]">
                    <MapPin className="h-3 w-3" />
                    {locationLabels[d.shift_location] || d.shift_location}
                  </span>
                  {d.shift_duration && (
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                      <Clock className="h-3 w-3" />
                      {d.shift_duration} saat
                    </span>
                  )}
                </div>
                {d.overall_learning && (
                  <p className="mt-2 text-sm text-[var(--muted-foreground)] line-clamp-1">
                    {d.overall_learning}
                  </p>
                )}
              </div>
              <ChevronRight className="h-5 w-5 text-[var(--muted-foreground)] group-hover:text-blue-500 transition-colors" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
