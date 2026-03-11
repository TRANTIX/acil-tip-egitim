"use client";

import { useState } from "react";
import Link from "next/link";
import type { Procedure } from "@/types";
import {
  ArrowLeft, Check, Circle, AlertTriangle, Package,
  ShieldAlert, Lightbulb, Video, BookOpen,
} from "lucide-react";

interface Props {
  procedure: Procedure;
}

export function ProcedureDetail({ procedure }: Props) {
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (order: number) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(order)) {
        next.delete(order);
      } else {
        next.add(order);
      }
      return next;
    });
  };

  const allChecked = procedure.steps.length > 0 && checkedSteps.size === procedure.steps.length;

  return (
    <div className="space-y-8">
      {/* Geri + başlık */}
      <div>
        <Link
          href="/prosedurler"
          className="mb-3 inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Prosedürler
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{procedure.title}</h1>
        <span className="mt-1 inline-block rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-medium capitalize text-emerald-500">
          {procedure.category}
        </span>
      </div>

      {/* Endikasyonlar */}
      {procedure.indications && (
        <section className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-400">
            <Check className="h-4 w-4" />
            Endikasyonlar
          </h2>
          <p className="text-sm leading-relaxed text-[var(--foreground)] whitespace-pre-line">
            {procedure.indications}
          </p>
        </section>
      )}

      {/* Kontrendikasyonlar */}
      {procedure.contraindications && (
        <section className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-400">
            <ShieldAlert className="h-4 w-4" />
            Kontrendikasyonlar
          </h2>
          <p className="text-sm leading-relaxed text-[var(--foreground)] whitespace-pre-line">
            {procedure.contraindications}
          </p>
        </section>
      )}

      {/* Ekipman */}
      {procedure.equipment && procedure.equipment.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            <Package className="h-4 w-4 text-[var(--muted-foreground)]" />
            Gerekli Ekipman
          </h2>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {procedure.equipment.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-md bg-[var(--muted)] px-3 py-2 text-sm"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${item.optional ? "bg-yellow-500" : "bg-emerald-500"}`} />
                <span className="text-[var(--foreground)]">{item.name}</span>
                {item.optional && (
                  <span className="text-xs text-[var(--muted-foreground)]">(isteğe bağlı)</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Adımlar (checklist) */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            Adımlar
          </h2>
          <span className="text-xs text-[var(--muted-foreground)]">
            {checkedSteps.size} / {procedure.steps.length} tamamlandı
          </span>
        </div>

        {/* İlerleme çubuğu */}
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--muted)]">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{
              width: `${procedure.steps.length > 0 ? (checkedSteps.size / procedure.steps.length) * 100 : 0}%`,
            }}
          />
        </div>

        <div className="space-y-2">
          {procedure.steps
            .sort((a, b) => a.order - b.order)
            .map((step) => {
              const isChecked = checkedSteps.has(step.order);
              return (
                <div
                  key={step.order}
                  className={`rounded-lg border p-4 transition-colors ${
                    isChecked
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-[var(--border)]"
                  }`}
                >
                  <button
                    onClick={() => toggleStep(step.order)}
                    className="flex w-full items-start gap-3 text-left"
                  >
                    <span className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <Check className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-[var(--muted-foreground)]" />
                      )}
                    </span>
                    <div className="flex-1">
                      <div className={`font-semibold ${isChecked ? "text-emerald-500" : "text-[var(--foreground)]"}`}>
                        {step.order}. {step.title}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {step.description}
                      </p>
                    </div>
                  </button>
                  {step.warning && (
                    <div className="mt-2 ml-8 flex items-start gap-2 rounded-md bg-yellow-500/10 px-3 py-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-500 mt-0.5" />
                      <span className="text-xs text-yellow-300">{step.warning}</span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {allChecked && (
          <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
            <Check className="mx-auto mb-2 h-8 w-8 text-emerald-500" />
            <p className="text-sm font-semibold text-emerald-400">Tüm adımlar tamamlandı!</p>
          </div>
        )}
      </section>

      {/* İpuçları */}
      {procedure.tips && (
        <section className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-400">
            <Lightbulb className="h-4 w-4" />
            İpuçları ve Püf Noktaları
          </h2>
          <p className="text-sm leading-relaxed text-[var(--foreground)] whitespace-pre-line">
            {procedure.tips}
          </p>
        </section>
      )}

      {/* Komplikasyonlar */}
      {procedure.complications && (
        <section className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-400">
            <AlertTriangle className="h-4 w-4" />
            Olası Komplikasyonlar
          </h2>
          <p className="text-sm leading-relaxed text-[var(--foreground)] whitespace-pre-line">
            {procedure.complications}
          </p>
        </section>
      )}

      {/* Video */}
      {procedure.video_url && (
        <section>
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            <Video className="h-4 w-4 text-[var(--muted-foreground)]" />
            İlgili Video
          </h2>
          <a
            href={procedure.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:underline"
          >
            Videoyu izle
          </a>
        </section>
      )}

      {/* Kaynaklar */}
      {procedure.source_references && (
        <section className="rounded-lg border border-[var(--border)] p-4">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            <BookOpen className="h-4 w-4 text-[var(--muted-foreground)]" />
            Kaynaklar
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] whitespace-pre-line">
            {procedure.source_references}
          </p>
        </section>
      )}

      {/* Tıbbi disclaimer */}
      <p className="text-center text-xs text-[var(--muted-foreground)]">
        ⚠ Bu prosedür kılavuzu eğitim amaçlıdır. Klinik uygulamada deneyimli bir eğitmen eşliğinde yapılmalıdır.
      </p>
    </div>
  );
}
