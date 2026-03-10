import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Calculator } from "lucide-react";
import { getCalculator, calculators, categoryLabels } from "@/lib/calculators";
import { CalculatorWidget } from "@/components/calculators/calculator-widget";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return calculators.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const calc = getCalculator(id);
  if (!calc) return { title: "Hesaplayıcı Bulunamadı" };
  return {
    title: `${calc.name} (${calc.shortName})`,
    description: calc.description,
    keywords: [calc.name, calc.shortName, "klinik hesaplayıcı", "acil tıp", categoryLabels[calc.category] || calc.category],
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { id } = await params;
  const calc = getCalculator(id);
  if (!calc) notFound();

  const related = calculators
    .filter((c) => c.id !== calc.id && c.category === calc.category)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Geri butonu */}
      <Link
        href="/hesaplayicilar"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Tüm Hesaplayıcılar
      </Link>

      {/* Başlık */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/40 border border-blue-900/40">
            <Calculator className="h-5 w-5 text-blue-400" />
          </div>
          <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted-foreground)]">
            {categoryLabels[calc.category] || calc.category}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{calc.name}</h1>
        <p className="mt-1.5 text-[var(--muted-foreground)] text-sm leading-relaxed">
          {calc.description}
        </p>
      </div>

      {/* Hesaplayıcı */}
      <CalculatorWidget calc={calc} />

      {/* İlgili Hesaplayıcılar */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">
            İlgili Hesaplayıcılar
          </h2>
          <div className="flex flex-col gap-2">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/hesaplayicilar/${r.id}`}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm hover:border-blue-700/60 transition-colors"
              >
                <span className="font-medium text-[var(--foreground)]">{r.shortName}</span>
                <span className="text-xs text-[var(--muted-foreground)]">{r.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
