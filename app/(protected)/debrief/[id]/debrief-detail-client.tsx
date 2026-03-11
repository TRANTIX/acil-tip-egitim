"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, Calendar, MapPin, Clock, Brain, Loader2,
  CheckCircle, AlertTriangle, BookOpen, Sparkles, MessageCircle,
  ThumbsUp, Frown, Meh, Smile
} from "lucide-react";
import type { Debrief, DebriefCase } from "@/types";

interface DebriefWithCases extends Debrief {
  cases: DebriefCase[];
}

interface AIAnalysis {
  summary: string;
  strengths: string[];
  improvements: string[];
  study_topics: string[];
  mentor_answer: string | null;
  encouragement: string;
}

const locationLabels: Record<string, string> = {
  acil_servis: "Acil Servis",
  yogun_bakim: "Yoğun Bakım",
  travma: "Travma",
  diger: "Diğer",
};

const emotionIcons: Record<string, React.ReactNode> = {
  confident: <ThumbsUp className="h-4 w-4 text-green-500" />,
  normal: <Smile className="h-4 w-4 text-blue-500" />,
  anxious: <Meh className="h-4 w-4 text-yellow-500" />,
  overwhelmed: <Frown className="h-4 w-4 text-red-500" />,
};

const emotionLabels: Record<string, string> = {
  confident: "Kendinden emin",
  normal: "Normal",
  anxious: "Endişeli",
  overwhelmed: "Bunalmış",
};

const difficultyAreaLabels: Record<string, string> = {
  tani: "Tanı koyma",
  tedavi: "Tedavi planı",
  prosedur: "Prosedür uygulama",
  iletisim: "İletişim",
};

export function DebriefDetailClient({ debriefId }: { debriefId: string }) {
  const [debrief, setDebrief] = useState<DebriefWithCases | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState("");

  useEffect(() => {
    async function fetchDebrief() {
      try {
        const res = await fetch(`/api/debriefs/${debriefId}`);
        const json = await res.json();
        setDebrief(json.data);
      } catch {
        // hata
      } finally {
        setLoading(false);
      }
    }
    fetchDebrief();
  }, [debriefId]);

  async function handleAnalyze() {
    setAnalyzing(true);
    setAnalyzeError("");
    try {
      const res = await fetch(`/api/debriefs/${debriefId}/analyze`, {
        method: "POST",
      });
      if (!res.ok) {
        const json = await res.json();
        setAnalyzeError(json.error || "Analiz yapılamadı.");
        return;
      }
      const json = await res.json();
      setAnalysis(json.data);
    } catch {
      setAnalyzeError("Bağlantı hatası.");
    } finally {
      setAnalyzing(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 rounded bg-[var(--border)]" />
          <div className="h-4 w-48 rounded bg-[var(--border)]" />
          <div className="h-40 rounded-xl bg-[var(--border)]" />
        </div>
      </div>
    );
  }

  if (!debrief) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 text-center">
        <p className="text-[var(--muted-foreground)]">Debrief bulunamadı.</p>
        <Link href="/debrief" className="mt-4 inline-block text-blue-600 hover:underline">
          Geri dön
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <Link
        href="/debrief"
        className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Tüm Debriefler
      </Link>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            {new Date(debrief.shift_date).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })} Nöbet Debrief
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {locationLabels[debrief.shift_location]}
            </span>
            {debrief.shift_duration && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {debrief.shift_duration} saat
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {debrief.cases.length} vaka
            </span>
          </div>
        </div>
      </div>

      {/* Vakalar */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">Vakalar</h2>
        <div className="space-y-3">
          {debrief.cases.map((c, i) => (
            <div
              key={c.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-600">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-[var(--foreground)]">{c.diagnosis}</h3>
                </div>
                {c.emotion && (
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                    {emotionIcons[c.emotion]}
                    {emotionLabels[c.emotion]}
                  </span>
                )}
              </div>

              {c.actions_taken && (
                <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                  <span className="font-medium text-[var(--foreground)]">Yapılanlar:</span> {c.actions_taken}
                </p>
              )}

              {c.had_difficulty && c.difficulty_area && (
                <div className="mt-2 inline-flex items-center gap-1 rounded-lg bg-yellow-500/10 px-2.5 py-1 text-xs text-yellow-700 dark:text-yellow-400">
                  <AlertTriangle className="h-3 w-3" />
                  Zorluk: {difficultyAreaLabels[c.difficulty_area]}
                </div>
              )}

              {c.new_learning && (
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  <span className="font-medium text-[var(--foreground)]">Öğrenme:</span> {c.new_learning}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Genel Değerlendirme */}
      {(debrief.overall_learning || debrief.what_would_change || debrief.mentor_question) && (
        <div className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">Genel Değerlendirme</h2>
          {debrief.overall_learning && (
            <div className="mb-3">
              <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">En önemli öğrenme</p>
              <p className="text-sm text-[var(--foreground)]">{debrief.overall_learning}</p>
            </div>
          )}
          {debrief.what_would_change && (
            <div className="mb-3">
              <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">Farklı ne yapardı</p>
              <p className="text-sm text-[var(--foreground)]">{debrief.what_would_change}</p>
            </div>
          )}
          {debrief.mentor_question && (
            <div>
              <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">Mentöre soru</p>
              <p className="text-sm text-[var(--foreground)]">{debrief.mentor_question}</p>
            </div>
          )}
        </div>
      )}

      {/* AI Analiz */}
      {!analysis ? (
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-8 text-center">
          <Brain className="mx-auto h-10 w-10 text-purple-500" />
          <h3 className="mt-3 text-lg font-semibold text-[var(--foreground)]">AI Analiz</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Claude ile nöbet performansınızın analizini alın, güçlü yönlerinizi ve gelişim alanlarınızı keşfedin.
          </p>
          {analyzeError && (
            <p className="mt-2 text-sm text-red-500">{analyzeError}</p>
          )}
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-2.5 text-sm text-white transition-colors"
          >
            {analyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analiz ediliyor...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                AI ile Analiz Et
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Özet */}
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold text-[var(--foreground)]">AI Analiz Özeti</h3>
            </div>
            <p className="text-sm text-[var(--foreground)]">{analysis.summary}</p>
          </div>

          {/* Güçlü Yönler */}
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold text-[var(--foreground)]">Güçlü Yönler</h3>
            </div>
            <ul className="space-y-1.5">
              {analysis.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Gelişim Alanları */}
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold text-[var(--foreground)]">Gelişim Alanları</h3>
            </div>
            <ul className="space-y-1.5">
              {analysis.improvements.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Çalışma Konuları */}
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold text-[var(--foreground)]">Çalışılması Gereken Konular</h3>
            </div>
            <ul className="space-y-1.5">
              {analysis.study_topics.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Mentör Yanıtı */}
          {analysis.mentor_answer && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-[var(--muted-foreground)]" />
                <h3 className="font-semibold text-[var(--foreground)]">Mentör Yanıtı</h3>
              </div>
              <p className="text-sm text-[var(--foreground)]">{analysis.mentor_answer}</p>
            </div>
          )}

          {/* Motivasyon */}
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white text-center">
            <p className="text-sm font-medium">{analysis.encouragement}</p>
          </div>
        </div>
      )}
    </div>
  );
}
