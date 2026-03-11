"use client";

import { useState } from "react";
import {
  Sparkles, Loader2, CheckCircle, AlertTriangle,
  Lightbulb, Calendar as CalendarIcon,
  BookOpen, Brain, ClipboardList, Stethoscope, Activity,
} from "lucide-react";

interface WeeklyTask {
  day: string;
  task: string;
  type: string;
}

interface MentorAnalysis {
  greeting: string;
  performance_summary: string;
  strengths: string[];
  focus_areas: string[];
  weekly_plan: WeeklyTask[];
  tip_of_the_week: string;
  motivation: string;
}

const typeIcons: Record<string, React.ReactNode> = {
  quiz: <ClipboardList className="h-3.5 w-3.5 text-green-500" />,
  article: <BookOpen className="h-3.5 w-3.5 text-blue-500" />,
  simulation: <Brain className="h-3.5 w-3.5 text-purple-500" />,
  procedure: <Stethoscope className="h-3.5 w-3.5 text-orange-500" />,
  debrief: <Activity className="h-3.5 w-3.5 text-pink-500" />,
};

export function AIMentorWidget() {
  const [analysis, setAnalysis] = useState<MentorAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai-mentor", { method: "POST" });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "Analiz yapılamadı.");
        return;
      }
      const json = await res.json();
      setAnalysis(json.data);
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  }

  if (!analysis) {
    return (
      <div className="rounded-xl border border-dashed border-purple-500/30 bg-purple-500/5 p-6 text-center mb-8">
        <Sparkles className="mx-auto h-8 w-8 text-purple-500 mb-2" />
        <h3 className="text-sm font-semibold text-[var(--foreground)]">AI Eğitmen</h3>
        <p className="mt-1 text-xs text-[var(--muted-foreground)]">
          Performansını analiz edip kişiselleştirilmiş haftalık plan oluştur
        </p>
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-5 py-2 text-sm text-white transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analiz ediliyor...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Haftalık Plan Al
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Selamlama + Özet */}
      <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h3 className="text-sm font-semibold text-[var(--foreground)]">AI Eğitmen</h3>
        </div>
        <p className="text-sm text-[var(--foreground)] font-medium">{analysis.greeting}</p>
        <p className="mt-2 text-xs text-[var(--muted-foreground)]">{analysis.performance_summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Güçlü Yönler */}
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
          <h4 className="text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5 mb-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Güçlü Yönlerin
          </h4>
          <ul className="space-y-1">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--foreground)]">
                <span className="mt-1 h-1 w-1 rounded-full bg-green-500 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Odak Alanları */}
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
          <h4 className="text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5 mb-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            Bu Hafta Odaklan
          </h4>
          <ul className="space-y-1">
            {analysis.focus_areas.map((s, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--foreground)]">
                <span className="mt-1 h-1 w-1 rounded-full bg-yellow-500 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Haftalık Plan */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
        <h4 className="text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5 mb-3">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          Haftalık Plan
        </h4>
        <div className="space-y-2">
          {analysis.weekly_plan.map((task, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-[var(--background)] px-3 py-2">
              <span className="text-xs font-medium text-[var(--muted-foreground)] w-20 flex-shrink-0">{task.day}</span>
              {typeIcons[task.type] || <BookOpen className="h-3.5 w-3.5 text-gray-400" />}
              <span className="text-xs text-[var(--foreground)]">{task.task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* İpucu + Motivasyon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <h4 className="text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5 mb-2">
            <Lightbulb className="h-4 w-4 text-blue-500" />
            Haftanın İpucu
          </h4>
          <p className="text-xs text-[var(--foreground)]">{analysis.tip_of_the_week}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center">
          <p className="text-xs text-white font-medium">{analysis.motivation}</p>
        </div>
      </div>

      {/* Yenile butonu */}
      <div className="text-center">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="text-xs text-purple-600 hover:underline disabled:opacity-50"
        >
          {loading ? "Yenileniyor..." : "Planı Yenile"}
        </button>
      </div>
    </div>
  );
}
