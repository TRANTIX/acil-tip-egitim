"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  FormInput, FormTextarea, FormSelect, FormSubmit,
  FormSuccess, FormError, CATEGORIES, DIFFICULTIES,
} from "../icerik/form-fields";

interface Option {
  text: string;
  is_correct: boolean;
}

export function QuestionForm({ isAdmin }: { isAdmin: boolean }) {
  const [form, setForm] = useState({
    topic: "", difficulty: "1", question_text: "",
    question_image: "", explanation: "", source: "",
  });
  const [options, setOptions] = useState<Option[]>([
    { text: "", is_correct: true },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionText = (index: number, text: string) => {
    setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, text } : o)));
  };

  const handleCorrectOption = (index: number) => {
    setOptions((prev) => prev.map((o, i) => ({ ...o, is_correct: i === index })));
  };

  const addOption = () => {
    if (options.length >= 6) return;
    setOptions((prev) => [...prev, { text: "", is_correct: false }]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    const newOptions = options.filter((_, i) => i !== index);
    // Doğru cevap silinmişse ilkini doğru yap
    if (!newOptions.some((o) => o.is_correct)) {
      newOptions[0].is_correct = true;
    }
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const filledOptions = options.filter((o) => o.text.trim());
    if (filledOptions.length < 2) {
      setError("En az 2 seçenek doldurulmalıdır.");
      setLoading(false);
      return;
    }

    if (!filledOptions.some((o) => o.is_correct)) {
      setError("Doğru cevap seçilmelidir.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error: err } = await supabase.from("questions").insert({
      topic: form.topic,
      difficulty: parseInt(form.difficulty),
      question_text: form.question_text,
      question_image: form.question_image || null,
      options: filledOptions,
      explanation: form.explanation,
      source: form.source || null,
      status: isAdmin ? "published" : "draft",
    });

    setLoading(false);
    if (err) {
      setError("Soru oluşturulamadı.");
    } else {
      setSuccess(`Soru ${isAdmin ? "yayınlandı" : "taslak olarak kaydedildi"}.`);
      setForm({ topic: "", difficulty: "1", question_text: "", question_image: "", explanation: "", source: "" });
      setOptions([
        { text: "", is_correct: true },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
      ]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <FormSuccess message={success} />}
      {error && <FormError message={error} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormSelect label="Konu" name="topic" value={form.topic} onChange={handleChange} options={CATEGORIES} required />
        <FormSelect label="Zorluk" name="difficulty" value={form.difficulty} onChange={handleChange} options={DIFFICULTIES} />
      </div>

      <FormTextarea label="Soru Metni" name="question_text" value={form.question_text} onChange={handleChange} required rows={4} placeholder="Soru metnini buraya yazın..." />

      <FormInput label="Soru Görseli URL (opsiyonel)" name="question_image" value={form.question_image} onChange={handleChange} placeholder="https://..." />

      {/* Seçenekler */}
      <div>
        <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-2">
          Seçenekler <span className="text-red-400">*</span>
          <span className="ml-2 text-[10px] opacity-60">(yeşil = doğru cevap)</span>
        </label>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCorrectOption(i)}
                className={`shrink-0 p-1 rounded-lg transition-colors ${
                  opt.is_correct
                    ? "text-green-400"
                    : "text-[var(--muted-foreground)]/30 hover:text-[var(--muted-foreground)]"
                }`}
                title={opt.is_correct ? "Doğru cevap" : "Doğru olarak işaretle"}
              >
                <CheckCircle className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={opt.text}
                onChange={(e) => handleOptionText(i, e.target.value)}
                placeholder={`Seçenek ${String.fromCharCode(65 + i)}`}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-sm
                  text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    opt.is_correct
                      ? "border-green-800/40 bg-green-950/20"
                      : "border-[var(--border)] bg-[var(--card)]"
                  }`}
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(i)}
                  className="shrink-0 p-1 text-[var(--muted-foreground)] hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        {options.length < 6 && (
          <button
            type="button"
            onClick={addOption}
            className="mt-2 flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Seçenek ekle
          </button>
        )}
      </div>

      <FormTextarea label="Açıklama (Doğru cevabın neden doğru olduğu)" name="explanation" value={form.explanation} onChange={handleChange} required rows={4} />

      <FormInput label="Kaynak (opsiyonel)" name="source" value={form.source} onChange={handleChange} placeholder="Kitap, kılavuz veya makale referansı" />

      <FormSubmit loading={loading} label={isAdmin ? "Yayınla" : "Taslak Kaydet"} />
    </form>
  );
}
