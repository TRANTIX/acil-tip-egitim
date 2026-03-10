"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  FormInput, FormTextarea, FormSelect, FormTagInput, FormSubmit,
  FormSuccess, FormError, CATEGORIES, DIFFICULTIES,
} from "./form-fields";

const VIDEO_TYPES = [
  { value: "prosedur", label: "Prosedür" },
  { value: "ders", label: "Ders" },
  { value: "ekg_yorum", label: "EKG Yorum" },
  { value: "usg", label: "USG" },
  { value: "vaka_sunum", label: "Vaka Sunumu" },
  { value: "kisa_ipucu", label: "Kısa İpucu" },
];

export function VideoForm({ isAdmin }: { isAdmin: boolean }) {
  const [form, setForm] = useState({
    title: "", description: "", category: "", difficulty: "1",
    video_url: "", duration: "", video_type: "", tags: "",
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

    const { error: err } = await supabase.from("videos").insert({
      title: form.title,
      description: form.description || null,
      category: form.category,
      difficulty: parseInt(form.difficulty),
      video_url: form.video_url,
      duration: form.duration ? parseInt(form.duration) : null,
      video_type: form.video_type || null,
      tags: tags.length > 0 ? tags : null,
      status: isAdmin ? "published" : "draft",
      published_at: isAdmin ? new Date().toISOString() : null,
    });

    setLoading(false);
    if (err) {
      setError("Video oluşturulamadı.");
    } else {
      setSuccess(`Video ${isAdmin ? "yayınlandı" : "taslak olarak kaydedildi"}.`);
      setForm({ title: "", description: "", category: "", difficulty: "1", video_url: "", duration: "", video_type: "", tags: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <FormSuccess message={success} />}
      {error && <FormError message={error} />}

      <FormInput label="Başlık" name="title" value={form.title} onChange={handleChange} required />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormSelect label="Video Türü" name="video_type" value={form.video_type} onChange={handleChange} options={VIDEO_TYPES} />
        <FormSelect label="Kategori" name="category" value={form.category} onChange={handleChange} options={CATEGORIES} required />
        <FormSelect label="Zorluk" name="difficulty" value={form.difficulty} onChange={handleChange} options={DIFFICULTIES} />
      </div>

      <FormInput label="Video URL" name="video_url" value={form.video_url} onChange={handleChange} required placeholder="YouTube linki veya doğrudan video URL" />
      <FormInput label="Süre (saniye)" name="duration" value={form.duration} onChange={handleChange} type="number" />

      <FormTextarea label="Açıklama" name="description" value={form.description} onChange={handleChange} rows={4} />
      <FormTagInput label="Etiketler" value={form.tags} onChange={handleChange} />
      <FormSubmit loading={loading} label={isAdmin ? "Yayınla" : "Taslak Kaydet"} />
    </form>
  );
}
