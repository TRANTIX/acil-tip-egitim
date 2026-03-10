"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  FormInput, FormTextarea, FormSelect, FormTagInput, FormSubmit,
  FormSuccess, FormError, CATEGORIES, DIFFICULTIES,
} from "./form-fields";

const CONTENT_TYPES = [
  { value: "konu_anlatimi", label: "Konu Anlatımı" },
  { value: "kilavuz_ozeti", label: "Kılavuz Özeti" },
  { value: "vaka_tartismasi", label: "Vaka Tartışması" },
  { value: "pearl", label: "Pearl" },
  { value: "makale_ozeti", label: "Makale Özeti" },
];

export function ArticleForm({ isAdmin }: { isAdmin: boolean }) {
  const [form, setForm] = useState({
    title: "", slug: "", content_type: "", category: "",
    difficulty: "1", body: "", key_points: "", reading_time: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "title" && !form.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g").replace(/[ıİ]/g, "i")
        .replace(/[öÖ]/g, "o").replace(/[şŞ]/g, "s").replace(/[üÜ]/g, "u")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();
    const keyPoints = form.key_points.split("\n").filter(Boolean);
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    const { error: err } = await supabase.from("articles").insert({
      title: form.title,
      slug: form.slug,
      content_type: form.content_type,
      category: form.category,
      difficulty: parseInt(form.difficulty),
      body: form.body,
      key_points: keyPoints.length > 0 ? keyPoints : null,
      reading_time: form.reading_time ? parseInt(form.reading_time) : null,
      tags: tags.length > 0 ? tags : null,
      status: isAdmin ? "published" : "draft",
      published_at: isAdmin ? new Date().toISOString() : null,
    });

    setLoading(false);
    if (err) {
      setError(err.code === "23505" ? "Bu slug zaten kullanımda." : "Makale oluşturulamadı.");
    } else {
      setSuccess(`Makale ${isAdmin ? "yayınlandı" : "taslak olarak kaydedildi"}.`);
      setForm({ title: "", slug: "", content_type: "", category: "", difficulty: "1", body: "", key_points: "", reading_time: "", tags: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <FormSuccess message={success} />}
      {error && <FormError message={error} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Başlık" name="title" value={form.title} onChange={handleChange} required />
        <FormInput label="Slug" name="slug" value={form.slug} onChange={handleChange} required placeholder="otomatik-olusturulur" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormSelect label="İçerik Türü" name="content_type" value={form.content_type} onChange={handleChange} options={CONTENT_TYPES} required />
        <FormSelect label="Kategori" name="category" value={form.category} onChange={handleChange} options={CATEGORIES} required />
        <FormSelect label="Zorluk" name="difficulty" value={form.difficulty} onChange={handleChange} options={DIFFICULTIES} />
      </div>

      <FormTextarea label="İçerik (Markdown)" name="body" value={form.body} onChange={handleChange} required rows={12} placeholder="## Başlık&#10;&#10;İçerik buraya..." />

      <FormTextarea label="Anahtar Noktalar (her satır bir madde)" name="key_points" value={form.key_points} onChange={handleChange} rows={4} placeholder="Her satır bir anahtar nokta olacak" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Okuma Süresi (dakika)" name="reading_time" value={form.reading_time} onChange={handleChange} type="number" />
        <FormTagInput label="Etiketler" value={form.tags} onChange={handleChange} />
      </div>

      <FormSubmit loading={loading} label={isAdmin ? "Yayınla" : "Taslak Kaydet"} />
    </form>
  );
}
