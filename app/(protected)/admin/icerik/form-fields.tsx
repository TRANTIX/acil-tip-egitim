"use client";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export function FormInput({ label, name, value, onChange, type = "text", placeholder, required }: InputProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm
          text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)]
          focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export function FormTextarea({ label, name, value, onChange, placeholder, required, rows = 4 }: TextareaProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm
          text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)]
          focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

export function FormSelect({ label, name, value, onChange, options, required }: SelectProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm
          text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seçiniz...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export function FormTagInput({ label, value, onChange }: { label: string; value: string; onChange: (name: string, value: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange("tags", e.target.value)}
        placeholder="virgülle ayırarak yazın: ekg, kardiyoloji, acil"
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm
          text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)]
          focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

interface SubmitProps {
  loading: boolean;
  label?: string;
}

export function FormSubmit({ loading, label = "Kaydet" }: SubmitProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? "Kaydediliyor..." : label}
    </button>
  );
}

export function FormSuccess({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-green-800/40 bg-green-950/20 px-4 py-3 text-sm text-green-400">
      {message}
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-800/40 bg-red-950/20 px-4 py-3 text-sm text-red-400">
      {message}
    </div>
  );
}

export const CATEGORIES = [
  { value: "kardiyoloji", label: "Kardiyoloji" },
  { value: "pulmoner", label: "Pulmoner" },
  { value: "noroloji", label: "Noroloji" },
  { value: "enfeksiyon", label: "Enfeksiyon" },
  { value: "travma", label: "Travma" },
  { value: "pediatri", label: "Pediatri" },
  { value: "resüsitasyon", label: "Resüsitasyon" },
  { value: "toksikoloji", label: "Toksikoloji" },
  { value: "genel", label: "Genel" },
];

export const DIFFICULTIES = [
  { value: "1", label: "Temel" },
  { value: "2", label: "Orta" },
  { value: "3", label: "İleri" },
  { value: "4", label: "Uzman" },
];
