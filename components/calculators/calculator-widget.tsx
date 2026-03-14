"use client";

import { useState, useCallback } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Share2,
  BookOpen,
} from "lucide-react";
import type { CalculatorDefinition, CalculatorValues } from "@/types/calculator";
import {
  calculateScore,
  getInterpretation,
  getInitialValues,
} from "@/lib/calculators";

interface CalculatorWidgetProps {
  calc: CalculatorDefinition;
}

const colorClasses = {
  green: {
    bg: "bg-green-950/40 border-green-900",
    text: "text-green-400",
    badge: "bg-green-950/60 text-green-300 border border-green-800",
    bar: "bg-green-500",
  },
  yellow: {
    bg: "bg-yellow-950/40 border-yellow-900",
    text: "text-yellow-400",
    badge: "bg-yellow-950/60 text-yellow-300 border border-yellow-800",
    bar: "bg-yellow-500",
  },
  orange: {
    bg: "bg-orange-950/40 border-orange-900",
    text: "text-orange-400",
    badge: "bg-orange-950/60 text-orange-300 border border-orange-800",
    bar: "bg-orange-500",
  },
  red: {
    bg: "bg-red-950/40 border-red-900",
    text: "text-red-400",
    badge: "bg-red-950/60 text-red-300 border border-red-800",
    bar: "bg-red-500",
  },
  blue: {
    bg: "bg-blue-950/40 border-blue-900",
    text: "text-blue-400",
    badge: "bg-blue-950/60 text-blue-300 border border-blue-800",
    bar: "bg-blue-500",
  },
};

export function CalculatorWidget({ calc }: CalculatorWidgetProps) {
  const [values, setValues] = useState<CalculatorValues>(() =>
    getInitialValues(calc)
  );
  const [copied, setCopied] = useState(false);

  const score = calculateScore(calc, values);
  const interpretation = getInterpretation(calc, score);
  const colors = interpretation ? colorClasses[interpretation.color] : colorClasses.blue;

  const scorePercent = Math.max(
    0,
    Math.min(
      100,
      ((score - calc.minScore) / (calc.maxScore - calc.minScore)) * 100
    )
  );

  const handleChange = useCallback(
    (fieldId: string, value: number | boolean | string) => {
      setValues((prev) => ({ ...prev, [fieldId]: value }));
    },
    []
  );

  async function handleShare() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Giriş Formu */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-base font-semibold text-[var(--foreground)] mb-4">
          Hasta Parametreleri
        </h2>
        <div className="flex flex-col gap-4">
          {calc.fields.map((field) => (
            <div key={field.id}>
              {field.type === "checkbox" && (
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={values[field.id] === true}
                    onChange={(e) => handleChange(field.id, e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[var(--border)] accent-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-[var(--foreground)] group-hover:text-blue-400 transition-colors leading-snug">
                    {field.label}
                    {field.value !== undefined && field.value !== 1 && (
                      <span className={`ml-1.5 text-xs ${field.value < 0 ? "text-red-400" : "text-[var(--muted-foreground)]"}`}>
                        ({field.value > 0 ? `+${field.value}` : field.value})
                      </span>
                    )}
                  </span>
                </label>
              )}

              {field.type === "select" && field.options && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[var(--foreground)]">
                    {field.label}
                  </label>
                  <select
                    value={values[field.id] as number}
                    onChange={(e) =>
                      handleChange(field.id, parseFloat(e.target.value))
                    }
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm
                      text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {field.type === "number" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[var(--foreground)]">
                    {field.label}
                    {field.unit && (
                      <span className="ml-1 text-xs text-[var(--muted-foreground)]">
                        ({field.unit})
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    min={field.min}
                    max={field.max}
                    value={values[field.id] as number}
                    onChange={(e) =>
                      handleChange(field.id, parseFloat(e.target.value) || 0)
                    }
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm
                      text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skor Sonucu */}
      <div className={`rounded-2xl border p-6 ${colors.bg}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[var(--muted-foreground)]">
            {calc.shortName} Skoru
          </span>
          {interpretation && (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors.badge}`}>
              {interpretation.label}
            </span>
          )}
        </div>

        <div className="flex items-end gap-2 mb-4">
          <span className={`text-5xl font-bold ${colors.text}`}>
            {score % 1 === 0 ? score : score.toFixed(1)}
          </span>
          <span className="text-[var(--muted-foreground)] mb-1">
            / {calc.maxScore}
          </span>
        </div>

        {/* Skor çubuğu */}
        <div className="h-2 w-full rounded-full bg-[var(--border)] overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-300 ${colors.bar}`}
            style={{ width: `${scorePercent}%` }}
          />
        </div>

        {interpretation && (
          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            {interpretation.description}
          </p>
        )}
      </div>

      {/* Klinik Not */}
      {calc.clinicalNote && (
        <div className="flex gap-3 rounded-2xl border border-blue-900/50 bg-blue-950/20 p-4">
          <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-300 leading-relaxed">{calc.clinicalNote}</p>
        </div>
      )}

      {/* Tüm Yorumlar */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-[var(--muted-foreground)]" />
          Skor Yorumları
        </h3>
        <div className="flex flex-col gap-2">
          {calc.interpretation.map((interp) => {
            const isActive = score >= interp.min && score <= interp.max;
            const c = colorClasses[interp.color];
            return (
              <div
                key={interp.label}
                className={`rounded-xl p-3 transition-all ${
                  isActive ? `${c.bg} border` : "opacity-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${isActive ? c.text : "text-[var(--muted-foreground)]"}`}>
                    {interp.label}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {interp.min === interp.max
                      ? interp.min
                      : `${interp.min}–${interp.max}`}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {interp.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kaynak ve Paylaşma */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
          <BookOpen className="h-4 w-4 text-[var(--muted-foreground)] shrink-0 mt-0.5" />
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{calc.source}</p>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
        >
          <Share2 className="h-4 w-4" />
          {copied ? "Bağlantı Kopyalandı!" : "Bağlantıyı Kopyala"}
        </button>

        <div className="flex gap-2 rounded-xl border border-yellow-900/40 bg-yellow-950/10 p-3">
          <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-400/80 leading-relaxed">{calc.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
