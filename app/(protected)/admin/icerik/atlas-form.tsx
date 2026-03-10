"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  FormInput, FormTextarea, FormSelect, FormTagInput, FormSubmit,
  FormSuccess, FormError, CATEGORIES, DIFFICULTIES,
} from "./form-fields";

const ATLAS_TYPES = [
  { value: "ekg", label: "EKG" },
  { value: "rontgen", label: "Röntgen" },
  { value: "bt", label: "BT" },
  { value: "usg", label: "USG" },
  { value: "klinik_foto", label: "Klinik Foto" },
];

export function AtlasForm({ isAdmin }: { isAdmin: boolean }) {
  const [form, setForm] = useState({
    title: "", atlas_type: "", category: "", difficulty: "1",
    image_url: "", annotated_url: "", normal_url: "",
    diagnosis: "", description: "", key_findings: "",
    clinical_context: "", differential: "", tags: "", source: "",
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
    const keyFindings = form.key_findings.split("\n").filter(Boolean);
    const differential = form.differential.split("\n").filter(Boolean);

    const { error: err } = await supabase.from("atlas_images").insert({
      title: form.title,
      atlas_type: form.atlas_type,
      category: form.category,
      difficulty: parseInt(form.difficulty),
      image_url: form.image_url,
      annotated_url: form.annotated_url || null,
      normal_url: form.normal_url || null,
      diagnosis: form.diagnosis,
      description: form.description,
      key_findings: keyFindings.length > 0 ? keyFindings : null,
      clinical_context: form.clinical_context || null,
      differential: differential.length > 0 ? differential : null,
      tags: tags.length > 0 ? tags : null,
      source: form.source || null,
      status: isAdmin ? "published" : "draft",
    });

    setLoading(false);
    if (err) {
      setError("Atlas görseli oluşturulamadı.");
    } else {
      setSuccess(`Atlas görseli ${isAdmin ? "yayınlandı" : "taslak olarak kaydedildi"}.`);
      setForm({ title: "", atlas_type: "", category: "", difficulty: "1", image_url: "", annotated_url: "", normal_url: "", diagnosis: "", description: "", key_findings: "", clinical_context: "", differential: "", tags: "", source: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <FormSuccess message={success} />}
      {error && <FormError message={error} />}

      <FormInput label="Başlık" name="title" value={form.title} onChange={handleChange} required />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormSelect label="Atlas Türü" name="atlas_type" value={form.atlas_type} onChange={handleChange} options={ATLAS_TYPES} required />
        <FormSelect label="Kategori" name="category" value={form.category} onChange={handleChange} options={CATEGORIES} required />
        <FormSelect label="Zorluk" name="difficulty" value={form.difficulty} onChange={handleChange} options={DIFFICULTIES} />
      </div>

      <FormInput label="Görsel URL" name="image_url" value={form.image_url} onChange={handleChange} required placeholder="https://..." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="İşaretli Görsel URL" name="annotated_url" value={form.annotated_url} onChange={handleChange} placeholder="Opsiyonel" />
        <FormInput label="Normal Karşılaştırma URL" name="normal_url" value={form.normal_url} onChange={handleChange} placeholder="Opsiyonel" />
      </div>

      <FormInput label="Tanı" name="diagnosis" value={form.diagnosis} onChange={handleChange} required />
      <FormTextarea label="Açıklama" name="description" value={form.description} onChange={handleChange} required rows={4} />
      <FormTextarea label="Anahtar Bulgular (her satır bir madde)" name="key_findings" value={form.key_findings} onChange={handleChange} rows={3} />
      <FormTextarea label="Klinik Bağlam" name="clinical_context" value={form.clinical_context} onChange={handleChange} rows={3} />
      <FormTextarea label="Ayırıcı Tanı (her satır bir madde)" name="differential" value={form.differential} onChange={handleChange} rows={3} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormTagInput label="Etiketler" value={form.tags} onChange={handleChange} />
        <FormInput label="Kaynak" name="source" value={form.source} onChange={handleChange} />
      </div>

      <FormSubmit loading={loading} label={isAdmin ? "Yayınla" : "Taslak Kaydet"} />
    </form>
  );
}
