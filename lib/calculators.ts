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
// Yeni hesaplayıcılar
import wellsDvt from "@/data/calculators/wells-dvt.json";
import perc from "@/data/calculators/perc.json";
import wallace from "@/data/calculators/wallace.json";
import hasbled from "@/data/calculators/hasbled.json";
import kanadaSenkop from "@/data/calculators/kanada-senkop.json";
import sofa from "@/data/calculators/sofa.json";
import psiPort from "@/data/calculators/psi-port.json";
import rts from "@/data/calculators/rts.json";
import anyonAcigi from "@/data/calculators/anyon-acigi.json";
import ozmolalBosluk from "@/data/calculators/ozmolal-bosluk.json";
import cockroft from "@/data/calculators/cockroft.json";
import parkland from "@/data/calculators/parkland.json";
import pediDoz from "@/data/calculators/pedi-doz.json";
import rsiDoz from "@/data/calculators/rsi-doz.json";

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
  wellsDvt,
  perc,
  wallace,
  hasbled,
  kanadaSenkop,
  sofa,
  psiPort,
  rts,
  anyonAcigi,
  ozmolalBosluk,
  cockroft,
  parkland,
  pediDoz,
  rsiDoz,
] as CalculatorDefinition[];

export const calculatorMap = Object.fromEntries(
  calculators.map((c) => [c.id, c])
);

export function getCalculator(id: string): CalculatorDefinition | undefined {
  return calculatorMap[id];
}

function getNumVal(values: CalculatorValues, id: string): number {
  const v = values[id];
  return typeof v === "number" ? v : 0;
}

export function calculateScore(
  calc: CalculatorDefinition,
  values: CalculatorValues
): number {
  switch (calc.calculate) {
    case "sum": {
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

    case "custom_pecarn": {
      return calc.fields.reduce((sum, field) => {
        const val = values[field.id];
        if (field.type === "checkbox") {
          return sum + (val === true ? (field.value ?? 0) : 0);
        }
        return sum;
      }, 0);
    }

    case "custom_rts": {
      const gcs = getNumVal(values, "gcs");
      const sbp = getNumVal(values, "sbp");
      const rr = getNumVal(values, "rr");
      return parseFloat((0.9368 * gcs + 0.7326 * sbp + 0.2908 * rr).toFixed(4));
    }

    case "custom_cockroft": {
      const age = getNumVal(values, "age");
      const weight = getNumVal(values, "weight");
      const cr = getNumVal(values, "creatinine");
      const sexFactor = getNumVal(values, "sex") || 1;
      if (cr <= 0 || age <= 0 || weight <= 0) return 0;
      return parseFloat((((140 - age) * weight) / (72 * cr) * sexFactor).toFixed(1));
    }

    case "custom_anyon": {
      const na = getNumVal(values, "na");
      const cl = getNumVal(values, "cl");
      const hco3 = getNumVal(values, "hco3");
      if (na === 0 && cl === 0 && hco3 === 0) return 0;
      return parseFloat((na - cl - hco3).toFixed(1));
    }

    case "custom_ozmolal": {
      const na = getNumVal(values, "na");
      const glc = getNumVal(values, "glucose");
      const bun = getNumVal(values, "bun");
      const measuredOsm = getNumVal(values, "measuredOsm");
      if (na === 0) return 0;
      const calcOsm = 2 * na + glc / 18 + bun / 2.8;
      return parseFloat((measuredOsm - calcOsm).toFixed(1));
    }

    case "custom_parkland": {
      const weight = getNumVal(values, "weight");
      const tbsa = getNumVal(values, "tbsa");
      return Math.round(4 * weight * tbsa);
    }

    case "drug_table": {
      // İlaç tablosu hesaplayıcıları skor döndürmez
      return 0;
    }

    default:
      return 0;
  }
}

// Ozmolal boşluk için hesaplanan osmolaliteyi ayrı döndüren yardımcı
export function getCalculatedOsmolality(values: CalculatorValues): number {
  const na = getNumVal(values, "na");
  const glc = getNumVal(values, "glucose");
  const bun = getNumVal(values, "bun");
  if (na === 0) return 0;
  return parseFloat((2 * na + glc / 18 + bun / 2.8).toFixed(1));
}

// Anyon açığı delta-delta hesaplama
export function getDeltaDelta(values: CalculatorValues): { ratio: number; text: string } | null {
  const na = getNumVal(values, "na");
  const cl = getNumVal(values, "cl");
  const hco3 = getNumVal(values, "hco3");
  if (na === 0 || cl === 0 || hco3 === 0) return null;
  const ag = na - cl - hco3;
  if (ag <= 12) return null;
  const denominator = 24 - hco3;
  if (denominator === 0) return null;
  const ratio = parseFloat(((ag - 12) / denominator).toFixed(2));
  let text: string;
  if (ratio < 0.4) text = "Saf normal AG metabolik asidoz";
  else if (ratio < 1) text = "Karışık: AG asidoz + normal AG asidoz";
  else if (ratio <= 2) text = "Saf yüksek AG metabolik asidoz";
  else text = "AG asidoz + eşzamanlı metabolik alkaloz";
  return { ratio, text };
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
  vaskuler: "Vasküler",
  havayolu: "Havayolu",
  metabolik: "Metabolik",
  bobrek: "Böbrek",
};

// Formül/ilaç tablosu hesaplayıcılarını ayırt etmek için yardımcı
export function isFormulaCalculator(calc: CalculatorDefinition): boolean {
  return ["custom_rts", "custom_cockroft", "custom_anyon", "custom_ozmolal", "custom_parkland", "drug_table"].includes(calc.calculate);
}
