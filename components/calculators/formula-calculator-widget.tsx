"use client";

import { useState, useCallback } from "react";
import {
  AlertTriangle,
  Info,
  Share2,
  BookOpen,
  Syringe,
  Droplets,
  Calculator,
} from "lucide-react";
import type { CalculatorDefinition, CalculatorValues, DrugDose } from "@/types/calculator";
import {
  calculateScore,
  getInterpretation,
  getInitialValues,
  getCalculatedOsmolality,
  getDeltaDelta,
} from "@/lib/calculators";

interface FormulaCalculatorWidgetProps {
  calc: CalculatorDefinition;
}

const colorClasses = {
  green: {
    bg: "bg-green-950/40 border-green-900",
    text: "text-green-400",
    badge: "bg-green-950/60 text-green-300 border border-green-800",
  },
  yellow: {
    bg: "bg-yellow-950/40 border-yellow-900",
    text: "text-yellow-400",
    badge: "bg-yellow-950/60 text-yellow-300 border border-yellow-800",
  },
  orange: {
    bg: "bg-orange-950/40 border-orange-900",
    text: "text-orange-400",
    badge: "bg-orange-950/60 text-orange-300 border border-orange-800",
  },
  red: {
    bg: "bg-red-950/40 border-red-900",
    text: "text-red-400",
    badge: "bg-red-950/60 text-red-300 border border-red-800",
  },
  blue: {
    bg: "bg-blue-950/40 border-blue-900",
    text: "text-blue-400",
    badge: "bg-blue-950/60 text-blue-300 border border-blue-800",
  },
};

function getNum(values: CalculatorValues, id: string): number {
  const v = values[id];
  return typeof v === "number" ? v : 0;
}

export function FormulaCalculatorWidget({ calc }: FormulaCalculatorWidgetProps) {
  const [values, setValues] = useState<CalculatorValues>(() =>
    getInitialValues(calc)
  );
  const [copied, setCopied] = useState(false);

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

  const score = calculateScore(calc, values);
  const interpretation = getInterpretation(calc, score);
  const colors = interpretation ? colorClasses[interpretation.color] : colorClasses.blue;

  // Tüm sayısal alanların doldurulup doldurulmadığını kontrol et
  const hasValidInput = calc.fields
    .filter((f) => f.type === "number")
    .every((f) => getNum(values, f.id) > 0);

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
                    step="any"
                    value={values[field.id] as number || ""}
                    onChange={(e) =>
                      handleChange(field.id, parseFloat(e.target.value) || 0)
                    }
                    placeholder={field.unit ? `${field.unit} girin` : "Değer girin"}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm
                      text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500
                      placeholder:text-[var(--muted-foreground)]/40"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sonuç — Tip bazlı render */}
      {calc.calculate === "drug_table" && (
        <DrugTableResult calc={calc} values={values} hasValidInput={hasValidInput} />
      )}

      {calc.calculate === "custom_parkland" && (
        <ParklandResult values={values} hasValidInput={hasValidInput} />
      )}

      {calc.calculate !== "drug_table" && calc.calculate !== "custom_parkland" && hasValidInput && (
        <FormulaScoreResult
          calc={calc}
          score={score}
          interpretation={interpretation}
          colors={colors}
          values={values}
        />
      )}

      {!hasValidInput && calc.calculate !== "drug_table" && calc.calculate !== "custom_parkland" && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center">
          <Calculator className="h-8 w-8 text-[var(--muted-foreground)] mx-auto mb-2 opacity-40" />
          <p className="text-sm text-[var(--muted-foreground)]">
            Sonucu görmek için tüm değerleri girin
          </p>
        </div>
      )}

      {/* Klinik Not */}
      {calc.clinicalNote && (
        <div className="flex gap-3 rounded-2xl border border-blue-900/50 bg-blue-950/20 p-4">
          <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-300 leading-relaxed">{calc.clinicalNote}</p>
        </div>
      )}

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

// ─── Formül Skor Sonucu (RTS, Cockroft, Anyon, Ozmolal) ─────────
function FormulaScoreResult({
  calc,
  score,
  interpretation,
  colors,
  values,
}: {
  calc: CalculatorDefinition;
  score: number;
  interpretation: ReturnType<typeof getInterpretation>;
  colors: (typeof colorClasses)[keyof typeof colorClasses];
  values: CalculatorValues;
}) {
  const deltaDelta = calc.calculate === "custom_anyon" ? getDeltaDelta(values) : null;
  const calcOsm = calc.calculate === "custom_ozmolal" ? getCalculatedOsmolality(values) : null;

  return (
    <>
      <div className={`rounded-2xl border p-6 ${colors.bg}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[var(--muted-foreground)]">
            {calc.resultLabel || calc.shortName}
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
          {calc.resultUnit && (
            <span className="text-[var(--muted-foreground)] mb-1">
              {calc.resultUnit}
            </span>
          )}
        </div>

        {interpretation && (
          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            {interpretation.description}
          </p>
        )}
      </div>

      {/* Ozmolal: Hesaplanan osmolalite */}
      {calcOsm !== null && calcOsm > 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="text-xs text-[var(--muted-foreground)] mb-1">Hesaplanan Osmolalite</div>
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {calcOsm} <span className="text-sm font-normal text-[var(--muted-foreground)]">mOsm/kg</span>
          </div>
          <div className="text-xs text-[var(--muted-foreground)] mt-1">2×Na + Glukoz/18 + BUN/2.8</div>
        </div>
      )}

      {/* Anyon: Delta-delta oranı */}
      {deltaDelta && (
        <div className="rounded-2xl border border-blue-900/50 bg-blue-950/20 p-5">
          <div className="text-xs text-blue-400 mb-1">Delta-Delta Oranı</div>
          <div className="text-2xl font-bold text-blue-300">
            {deltaDelta.ratio}
          </div>
          <div className="text-sm text-blue-200/80 mt-2">{deltaDelta.text}</div>
        </div>
      )}

      {/* Skor Yorumları */}
      {calc.interpretation.length > 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
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
      )}
    </>
  );
}

// ─── Parkland Sıvı Sonucu ────────────────────────────────────────
function ParklandResult({
  values,
  hasValidInput,
}: {
  values: CalculatorValues;
  hasValidInput: boolean;
}) {
  if (!hasValidInput) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center">
        <Droplets className="h-8 w-8 text-[var(--muted-foreground)] mx-auto mb-2 opacity-40" />
        <p className="text-sm text-[var(--muted-foreground)]">
          Sıvı hesaplaması için ağırlık ve VÜYA % girin
        </p>
      </div>
    );
  }

  const weight = getNum(values, "weight");
  const tbsa = getNum(values, "tbsa");
  const total = Math.round(4 * weight * tbsa);

  return (
    <>
      {/* Toplam */}
      <div className="rounded-2xl border border-blue-900/50 bg-blue-950/20 p-6">
        <div className="text-xs text-blue-400 mb-1">24 SAAT — Ringer Laktat</div>
        <div className="text-4xl font-bold text-blue-300">{total.toLocaleString()} mL</div>
        <div className="text-xs text-[var(--muted-foreground)] mt-1">
          4 mL × {weight} kg × %{tbsa} VÜYA
        </div>
      </div>

      {/* İlk 8 saat ve sonraki 16 saat */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-yellow-900/40 bg-yellow-950/20 p-5">
          <div className="text-xs text-yellow-400 mb-1">İLK 8 SAAT</div>
          <div className="text-2xl font-bold text-yellow-300">{Math.round(total / 2).toLocaleString()} mL</div>
          <div className="text-xs text-[var(--muted-foreground)] mt-1">
            {Math.round(total / 16)} mL/saat
          </div>
        </div>
        <div className="rounded-2xl border border-green-900/40 bg-green-950/20 p-5">
          <div className="text-xs text-green-400 mb-1">SONRA 16 SAAT</div>
          <div className="text-2xl font-bold text-green-300">{Math.round(total / 2).toLocaleString()} mL</div>
          <div className="text-xs text-[var(--muted-foreground)] mt-1">
            {Math.round(total / 32)} mL/saat
          </div>
        </div>
      </div>

      <div className="flex gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
        <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
          Süre yanık anından itibaren hesaplanır. Pediatrik hastalarda idame sıvısı eklenmelidir.
          İdrar çıkışı ile titre edilmeli (erişkin: 0.5–1 mL/kg/saat).
        </p>
      </div>
    </>
  );
}

// ─── İlaç Tablosu Sonucu (PediDoz, RSI) ─────────────────────────
function DrugTableResult({
  calc,
  values,
  hasValidInput,
}: {
  calc: CalculatorDefinition;
  values: CalculatorValues;
  hasValidInput: boolean;
}) {
  const weight = getNum(values, "weight");
  const drugs = calc.drugs || [];

  if (!hasValidInput) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center">
        <Syringe className="h-8 w-8 text-[var(--muted-foreground)] mx-auto mb-2 opacity-40" />
        <p className="text-sm text-[var(--muted-foreground)]">
          Dozları görmek için hasta ağırlığını girin
        </p>
      </div>
    );
  }

  // PediDoz için ETT bilgisi
  const isPedi = calc.id === "pedi-doz";
  const ettSize = isPedi ? (weight / 4 + 4).toFixed(1) : null;
  const ettDepth = isPedi ? Math.round((weight / 4 + 4) * 3) : null;

  // Kategorilere göre grupla
  const categories = [...new Set(drugs.map((d) => d.category || "GENEL"))];
  const grouped = categories.map((cat) => ({
    category: cat,
    drugs: drugs.filter((d) => (d.category || "GENEL") === cat),
  }));

  return (
    <>
      {/* ETT Bilgisi (sadece PediDoz) */}
      {isPedi && ettSize && ettDepth && (
        <div className="rounded-2xl border border-blue-900/50 bg-blue-950/20 p-5">
          <div className="text-xs text-blue-400 mb-2">ENDOTRAKİEAL TÜP</div>
          <div className="flex gap-6">
            <div>
              <div className="text-2xl font-bold text-blue-300">{ettSize} mm</div>
              <div className="text-xs text-[var(--muted-foreground)]">ETT Boyutu</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-300">{ettDepth} cm</div>
              <div className="text-xs text-[var(--muted-foreground)]">Derinlik</div>
            </div>
          </div>
          <div className="text-xs text-[var(--muted-foreground)] mt-2">
            (Ağırlık/4) + 4 mm | Derinlik: ETT × 3 cm
          </div>
        </div>
      )}

      {/* İlaç Dozları — Kategorilere Göre */}
      {grouped.map((group) => (
        <div
          key={group.category}
          className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-[var(--border)] bg-blue-950/20">
            <h3 className="text-xs font-bold text-blue-400 tracking-wider uppercase">
              {group.category}
            </h3>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {group.drugs.map((drug, idx) => (
              <DrugDoseRow key={idx} drug={drug} weight={weight} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function DrugDoseRow({ drug, weight }: { drug: DrugDose; weight: number }) {
  let dose = weight * drug.factor;
  if (drug.minDose) dose = Math.max(dose, drug.minDose);
  const isMaxed = drug.maxDose !== undefined && dose > drug.maxDose;
  if (drug.maxDose) dose = Math.min(dose, drug.maxDose);

  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-[var(--foreground)]">{drug.name}</div>
        <div className="text-xs text-[var(--muted-foreground)]">{drug.concentration}</div>
        {drug.note && (
          <div className="text-xs text-[var(--muted-foreground)] mt-0.5 opacity-70">{drug.note}</div>
        )}
      </div>
      <div className="text-right shrink-0 ml-4">
        <div className="text-lg font-bold text-blue-400">
          {dose.toFixed(1)} {drug.unit}
        </div>
        {isMaxed && (
          <div className="text-[10px] text-yellow-400 font-medium">
            ▲ maks doz
          </div>
        )}
      </div>
    </div>
  );
}
