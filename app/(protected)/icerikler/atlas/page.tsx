import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AtlasListClient } from "./list-client";

export const metadata: Metadata = { title: "Görsel Atlas" };

const CATEGORIES = [
  "kardiyoloji", "pulmoner", "noroloji", "enfeksiyon",
  "travma", "pediatri", "resüsitasyon", "toksikoloji", "genel",
];

const ATLAS_TYPES = [
  { value: "ekg", label: "EKG" },
  { value: "rontgen", label: "Röntgen" },
  { value: "bt", label: "BT" },
  { value: "usg", label: "USG" },
  { value: "klinik_foto", label: "Klinik Foto" },
];

export default async function AtlasPage() {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("atlas_images")
    .select("id, title, atlas_type, category, image_url, diagnosis, difficulty, tags, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Görsel Atlas</h1>
        <p className="mt-1 text-[var(--muted-foreground)] text-sm">
          {images?.length || 0} görsel
        </p>
      </div>
      <AtlasListClient
        images={images || []}
        categories={CATEGORIES}
        atlasTypes={ATLAS_TYPES}
      />
    </div>
  );
}
