"use client";

import Link from "next/link";
import type { Algorithm } from "@/types";
import { MermaidChart } from "@/components/content/mermaid-chart";
import { ArrowLeft, GitBranch, BookOpen } from "lucide-react";

interface Props {
  algorithm: Algorithm;
}

export function AlgorithmDetail({ algorithm }: Props) {
  return (
    <div className="space-y-8">
      {/* Geri + başlık */}
      <div>
        <Link
          href="/prosedurler"
          className="mb-3 inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Prosedürler ve Algoritmalar
        </Link>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-[var(--foreground)]">
          <GitBranch className="h-6 w-6 text-amber-500" />
          {algorithm.title}
        </h1>
        <span className="mt-1 inline-block rounded bg-amber-500/10 px-2 py-0.5 text-xs font-medium capitalize text-amber-500">
          {algorithm.category}
        </span>
      </div>

      {/* Açıklama */}
      {algorithm.description && (
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
          {algorithm.description}
        </p>
      )}

      {/* Flowchart */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Karar Algoritması</h2>
        <MermaidChart chart={algorithm.flowchart_data.mermaid} />
      </section>

      {/* Kaynaklar */}
      {algorithm.references && (
        <section className="rounded-lg border border-[var(--border)] p-4">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            <BookOpen className="h-4 w-4 text-[var(--muted-foreground)]" />
            Kaynaklar
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] whitespace-pre-line">
            {algorithm.references}
          </p>
        </section>
      )}

      {/* Tıbbi disclaimer */}
      <p className="text-center text-xs text-[var(--muted-foreground)]">
        ⚠ Bu algoritma eğitim amaçlıdır. Klinik karar verme sürecinde klinik yargı ile birlikte değerlendirilmelidir.
      </p>
    </div>
  );
}
