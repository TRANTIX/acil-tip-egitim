export type FieldType = "select" | "checkbox" | "number";

export type CalculateType =
  | "sum"
  | "custom_pecarn"
  | "custom_rts"
  | "custom_cockroft"
  | "custom_anyon"
  | "custom_ozmolal"
  | "custom_parkland"
  | "drug_table";

export interface SelectOption {
  value: number;
  label: string;
}

export interface CalculatorField {
  id: string;
  label: string;
  type: FieldType;
  options?: SelectOption[]; // select için
  value?: number;           // checkbox için sabit puan
  min?: number;             // number için
  max?: number;             // number için
  unit?: string;            // number için
}

export interface Interpretation {
  min: number;
  max: number;
  label: string;
  color: "green" | "yellow" | "orange" | "red" | "blue";
  description: string;
}

export interface DrugDose {
  name: string;
  factor: number;
  unit: string;
  concentration: string;
  maxDose?: number;
  minDose?: number;
  category?: string;
  note?: string;
}

export interface CalculatorDefinition {
  id: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  fields: CalculatorField[];
  calculate: CalculateType;
  minScore: number;
  maxScore: number;
  interpretation: Interpretation[];
  clinicalNote?: string;
  source: string;
  disclaimer: string;
  drugs?: DrugDose[];
  resultUnit?: string;
  resultLabel?: string;
}

export type CalculatorValues = Record<string, number | boolean | string>;
