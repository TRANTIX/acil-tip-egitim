import type { Metadata } from "next";
import { CalculatorListClient } from "./list-client";
import { calculators, categoryLabels } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Klinik Hesaplayıcılar",
  description:
    "GKS, HEART, Wells PE, CURB-65, qSOFA ve daha fazlası. Ücretsiz, kayıtsız klinik hesaplayıcılar.",
};

export default function HesaplayicilarPage() {
  const categories = Array.from(new Set(calculators.map((c) => c.category)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Klinik Hesaplayıcılar
        </h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          {calculators.length} hesaplayıcı · Ücretsiz · Kayıt gerektirmez
        </p>
      </div>

      <CalculatorListClient
        calculators={calculators}
        categories={categories}
        categoryLabels={categoryLabels}
      />
    </div>
  );
}
