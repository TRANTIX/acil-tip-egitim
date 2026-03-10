"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  FormInput, FormTextarea, FormSelect, FormTagInput, FormSubmit,
  FormSuccess, FormError, CATEGORIES, DIFFICULTIES,
} from "./form-fields";

const FORMATS = [
  { value: "konu_anlatimi", label: "Konu Anlatımı" },
  { value: "vaka_tartismasi", label: "Vaka Tartışması" },
  { value: "soylesi", label: "Söyleşi" },
  { value: "kilavuz", label: "Kılavuz" },
  { value: "gunun_sorusu", label: "Günün Sorusu" },
];

export function PodcastForm({ isAdmin }: { isAdmin: boolean }) {
  const [form, setForm] = useState({
    title: "", description: "", category: "", difficulty: "1",
    audio_url: "", duration: "", episode_number: "", format: "", tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    const { error: err } = await supabase.from("podcasts").insert({
      title: form.title,
      description: form.description || null,
      category: form.category,
      difficulty: parseInt(form.difficulty),
      audio_url: form.audio_url,
      duration: parseInt(form.duration),
      episode_number: form.episode_number ? parseInt(form.episode_number) : null,
      format: form.format || null,
      tags: tags.length > 0 ? tags : null,
      status: isAdmin ? "published" : "draft",
      published_at: isAdmin ? new Date().toISOString() : null,
    });

    setLoading(false);
    if (err) {
      setError("Podcast oluşturulamadı.");
    } else {
      setSuccess(`Podcast ${isAdmin ? "yayınlandı" : "taslak olarak kaydedildi"}.`);
      setForm({ title: "", description: "", category: "", difficulty: "1", audio_url: "", duration: "", episode_number: "", format: "", tags: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <FormSuccess message={success} />}
      {error && <FormError message={error} />}

      <FormInput label="Başlık" name="title" value={form.title} onChange={handleChange} required />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormSelect label="Format" name="format" value={form.format} onChange={handleChange} options={FORMATS} />
        <FormSelect label="Kategori" name="category" value={form.category} onChange={handleChange} options={CATEGORIES} required />
        <FormSelect label="Zorluk" name="difficulty" value={form.difficulty} onChange={handleChange} options={DIFFICULTIES} />
      </div>

      <FormInput label="Ses Dosyası URL" name="audio_url" value={form.audio_url} onChange={handleChange} required placeholder="https://..." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Süre (saniye)" name="duration" value={form.duration} onChange={handleChange} type="number" required />
        <FormInput label="Bölüm No" name="episode_number" value={form.episode_number} onChange={handleChange} type="number" />
      </div>

      <FormTextarea label="Açıklama" name="description" value={form.description} onChange={handleChange} rows={4} />
      <FormTagInput label="Etiketler" value={form.tags} onChange={handleChange} />
      <FormSubmit loading={loading} label={isAdmin ? "Yayınla" : "Taslak Kaydet"} />
    </form>
  );
}
