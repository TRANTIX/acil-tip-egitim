import type { CalculatorDefinition, CalculatorValues, Interpretation } from "@/types/calculator";

// Tüm hesaplayıcıları import et
import gks from "@/data/calculators/gks.json";
import heart from "@/data/calculators/heart.json";
import wellsPe from "@/data/calculators/wells-pe.json";
import curb65 from "@/data/calculators/curb65.json";
import qsofa from "@/data/calculators/qsofa.json";
import cha2ds2vasc from "@/data/calculators/cha2ds2vasc.json";
import pecarn from "@/data/calculators/pecarn.json";
import pedGks from "@/data/calculators/ped-gks.json";
import nihss from "@/data/calculators/nihss.json";
import centor from "@/data/calculators/centor.json";

export const calculators: CalculatorDefinition[] = [
  gks,
  heart,
  wellsPe,
  curb65,
  qsofa,
  cha2ds2vasc,
  pecarn,
  pedGks,
  nihss,
  centor,
] as CalculatorDefinition[];

export const calculatorMap = Object.fromEntries(
  calculators.map((c) => [c.id, c])
);

export function getCalculator(id: string): CalculatorDefinition | undefined {
  return calculatorMap[id];
}

export function calculateScore(
  calc: CalculatorDefinition,
  values: CalculatorValues
): number {
  if (calc.calculate === "sum") {
    return calc.fields.reduce((sum, field) => {
      const val = values[field.id];
      if (field.type === "checkbox") {
        return sum + (val === true ? (field.value ?? 0) : 0);
      }
      if (field.type === "select" || field.type === "number") {
        return sum + (typeof val === "number" ? val : 0);
      }
      return sum;
    }, 0);
  }
  // custom_pecarn — basitleştirilmiş: checkbox toplamı
  return calc.fields.reduce((sum, field) => {
    const val = values[field.id];
    if (field.type === "checkbox") {
      return sum + (val === true ? (field.value ?? 0) : 0);
    }
    return sum;
  }, 0);
}

export function getInterpretation(
  calc: CalculatorDefinition,
  score: number
): Interpretation | undefined {
  return calc.interpretation.find(
    (i) => score >= i.min && score <= i.max
  );
}

export function getInitialValues(calc: CalculatorDefinition): CalculatorValues {
  return Object.fromEntries(
    calc.fields.map((f) => {
      if (f.type === "checkbox") return [f.id, false];
      if (f.type === "select") return [f.id, f.options?.[0]?.value ?? 0];
      return [f.id, 0];
    })
  );
}

export const categoryLabels: Record<string, string> = {
  noroloji: "Nöroloji",
  kardiyoloji: "Kardiyoloji",
  pulmoner: "Pulmoner",
  enfeksiyon: "Enfeksiyon",
  travma: "Travma",
  pediatri: "Pediatri",
  resüsitasyon: "Resüsitasyon",
};
