"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

interface CaseEntry {
  diagnosis: string;
  actions_taken: string;
  had_difficulty: boolean;
  difficulty_area: string;
  new_learning: string;
  emotion: string;
}

const emptyCaseEntry: CaseEntry = {
  diagnosis: "",
  actions_taken: "",
  had_difficulty: false,
  difficulty_area: "",
  new_learning: "",
  emotion: "normal",
};

const emotionLabels: Record<string, string> = {
  confident: "Kendinden emin",
  normal: "Normal",
  anxious: "Endişeli",
  overwhelmed: "Bunalmış",
};

const difficultyAreaLabels: Record<string, string> = {
  tani: "Tanı koyma",
  tedavi: "Tedavi planı",
  prosedur: "Prosedür uygulama",
  iletisim: "İletişim",
};

const locationOptions = [
  { value: "acil_servis", label: "Acil Servis" },
  { value: "yogun_bakim", label: "Yoğun Bakım" },
  { value: "travma", label: "Travma" },
  { value: "diger", label: "Diğer" },
];

interface DebriefFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function DebriefForm({ onSuccess, onCancel }: DebriefFormProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Shift info
  const [shiftDate, setShiftDate] = useState(new Date().toISOString().split("T")[0]);
  const [shiftLocation, setShiftLocation] = useState("acil_servis");
  const [shiftDuration, setShiftDuration] = useState("");
  const [overallLearning, setOverallLearning] = useState("");
  const [whatWouldChange, setWhatWouldChange] = useState("");
  const [mentorQuestion, setMentorQuestion] = useState("");

  // Cases
  const [cases, setCases] = useState<CaseEntry[]>([{ ...emptyCaseEntry }]);

  function addCase() {
    setCases([...cases, { ...emptyCaseEntry }]);
  }

  function removeCase(index: number) {
    if (cases.length <= 1) return;
    setCases(cases.filter((_, i) => i !== index));
  }

  function updateCase(index: number, field: keyof CaseEntry, value: string | boolean) {
    const updated = [...cases];
    updated[index] = { ...updated[index], [field]: value };
    setCases(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validasyon
    const validCases = cases.filter((c) => c.diagnosis.trim());
    if (validCases.length === 0) {
      setError("En az bir vaka için tanı girmelisiniz.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/debriefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shift_date: shiftDate,
          shift_location: shiftLocation,
          shift_duration: shiftDuration ? parseInt(shiftDuration) : null,
          overall_learning: overallLearning || null,
          what_would_change: whatWouldChange || null,
          mentor_question: mentorQuestion || null,
          cases: validCases,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "Bir hata oluştu.");
        return;
      }

      onSuccess();
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Yeni Nöbet Debrief</h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Nöbet Bilgileri */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[var(--foreground)] mb-3">Nöbet Bilgileri</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-[var(--muted-foreground)] mb-1">Tarih *</label>
            <input
              type="date"
              value={shiftDate}
              onChange={(e) => setShiftDate(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted-foreground)] mb-1">Lokasyon *</label>
            <select
              value={shiftLocation}
              onChange={(e) => setShiftLocation(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
            >
              {locationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-[var(--muted-foreground)] mb-1">Süre (saat)</label>
            <input
              type="number"
              value={shiftDuration}
              onChange={(e) => setShiftDuration(e.target.value)}
              min="1"
              max="48"
              placeholder="ör. 24"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
            />
          </div>
        </div>
      </div>

      {/* Vakalar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-[var(--foreground)]">Vakalar</h3>
          <button
            type="button"
            onClick={addCase}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Vaka Ekle
          </button>
        </div>

        <div className="space-y-4">
          {cases.map((c, index) => (
            <div
              key={index}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-[var(--muted-foreground)]">Vaka {index + 1}</span>
                {cases.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCase(index)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[var(--muted-foreground)] mb-1">Tanı / Ön Tanı *</label>
                  <input
                    type="text"
                    value={c.diagnosis}
                    onChange={(e) => updateCase(index, "diagnosis", e.target.value)}
                    placeholder="ör. STEMI, Sepsis, Kafa Travması"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[var(--muted-foreground)] mb-1">Yapılan İşlemler</label>
                  <textarea
                    value={c.actions_taken}
                    onChange={(e) => updateCase(index, "actions_taken", e.target.value)}
                    placeholder="Kısa açıklama..."
                    rows={2}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted-foreground)] mb-1">Nasıl hissettiniz?</label>
                  <select
                    value={c.emotion}
                    onChange={(e) => updateCase(index, "emotion", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)]"
                  >
                    {Object.entries(emotionLabels).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-1">
                    <input
                      type="checkbox"
                      checked={c.had_difficulty}
                      onChange={(e) => updateCase(index, "had_difficulty", e.target.checked)}
                      className="rounded"
                    />
                    Zorluk yaşadım
                  </label>
                  {c.had_difficulty && (
                    <select
                      value={c.difficulty_area}
                      onChange={(e) => updateCase(index, "difficulty_area", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)]"
                    >
                      <option value="">Zorluk alanı seçin</option>
                      {Object.entries(difficultyAreaLabels).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[var(--muted-foreground)] mb-1">Bu vakadan ne öğrendiniz?</label>
                  <textarea
                    value={c.new_learning}
                    onChange={(e) => updateCase(index, "new_learning", e.target.value)}
                    placeholder="Yeni öğrendiğiniz veya pekiştirdiğiniz bir şey..."
                    rows={2}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Genel Değerlendirme */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[var(--foreground)] mb-3">Genel Değerlendirme</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-[var(--muted-foreground)] mb-1">Bu nöbetten en önemli öğrenme</label>
            <textarea
              value={overallLearning}
              onChange={(e) => setOverallLearning(e.target.value)}
              placeholder="Nöbetin genel değerlendirmesi..."
              rows={2}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted-foreground)] mb-1">Farklı ne yapardınız?</label>
            <textarea
              value={whatWouldChange}
              onChange={(e) => setWhatWouldChange(e.target.value)}
              placeholder="Geriye dönüp baksanız neyi farklı yapardınız?"
              rows={2}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted-foreground)] mb-1">Mentörünüze sormak istediğiniz soru</label>
            <textarea
              value={mentorQuestion}
              onChange={(e) => setMentorQuestion(e.target.value)}
              placeholder="İsterseniz AI mentör bu soruyu yanıtlayabilir..."
              rows={2}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--muted-foreground)] hover:bg-[var(--border)] transition-colors"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2.5 text-sm text-white transition-colors"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Kaydet
            </>
          )}
        </button>
      </div>
    </form>
  );
}
