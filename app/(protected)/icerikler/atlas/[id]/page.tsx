import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag, AlertTriangle, Stethoscope } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AtlasViewer } from "@/components/content/atlas-viewer";

interface PageProps {
  params: Promise<{ id: string }>;
}

const CATEGORY_LABELS: Record<string, string> = {
  kardiyoloji: "Kardiyoloji",
  pulmoner: "Pulmoner",
  noroloji: "Noroloji",
  enfeksiyon: "Enfeksiyon",
  travma: "Travma",
  pediatri: "Pediatri",
  resüsitasyon: "Resüsitasyon",
  toksikoloji: "Toksikoloji",
  genel: "Genel",
};

const ATLAS_TYPE_LABELS: Record<string, string> = {
  ekg: "EKG",
  rontgen: "Röntgen",
  bt: "BT",
  usg: "USG",
  klinik_foto: "Klinik Foto",
};

const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Temel",
  2: "Orta",
  3: "İleri",
  4: "Uzman",
};

const DIFFICULTY_COLORS: Record<number, string> = {
  1: "text-green-400 border-green-800/40 bg-green-950/30",
  2: "text-blue-400 border-blue-800/40 bg-blue-950/30",
  3: "text-orange-400 border-orange-800/40 bg-orange-950/30",
  4: "text-red-400 border-red-800/40 bg-red-950/30",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("atlas_images")
    .select("title, diagnosis, atlas_type")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!data) return { title: "Görsel Bulunamadı" };

  return {
    title: `${data.title} — Görsel Atlas`,
    description: `${ATLAS_TYPE_LABELS[data.atlas_type] || data.atlas_type}: ${data.diagnosis}`,
  };
}

export default async function AtlasDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: image } = await supabase
    .from("atlas_images")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!image) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Geri butonu */}
      <Link
        href="/icerikler/atlas"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Görsel Atlas
      </Link>

      {/* Meta bilgiler */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="rounded-full border border-orange-800/40 bg-orange-950/30 px-2.5 py-1 text-xs text-orange-400 font-medium">
          {ATLAS_TYPE_LABELS[image.atlas_type] || image.atlas_type}
        </span>
        <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted-foreground)]">
          {CATEGORY_LABELS[image.category] || image.category}
        </span>
        {image.difficulty && (
          <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${DIFFICULTY_COLORS[image.difficulty] || ""}`}>
            {DIFFICULTY_LABELS[image.difficulty]}
          </span>
        )}
      </div>

      {/* Başlık */}
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
        {image.title}
      </h1>

      {/* Tanı */}
      <p className="text-lg text-orange-400 font-medium mb-6">
        {image.diagnosis}
      </p>

      {/* Atlas Viewer */}
      <div className="mb-6">
        <AtlasViewer
          imageUrl={image.image_url}
          annotatedUrl={image.annotated_url}
          normalUrl={image.normal_url}
          title={image.title}
          keyFindings={image.key_findings}
        />
      </div>

      {/* Açıklama */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 mb-6">
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-2">Açıklama</h2>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
          {image.description}
        </p>
      </div>

      {/* Klinik bağlam */}
      {image.clinical_context && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 mb-6">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-orange-400" />
            Klinik Bağlam
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
            {image.clinical_context}
          </p>
        </div>
      )}

      {/* Ayırıcı tanı */}
      {image.differential && image.differential.length > 0 && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 mb-6">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-2">Ayırıcı Tanı</h2>
          <ul className="space-y-1">
            {image.differential.map((d: string, i: number) => (
              <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-start gap-1.5">
                <span className="text-orange-400 mt-0.5 shrink-0">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Etiketler */}
      {image.tags && image.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {image.tags.map((tag: string) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted-foreground)]"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Kaynak */}
      {image.source && (
        <p className="text-xs text-[var(--muted-foreground)] mb-6">
          Kaynak: {image.source}
        </p>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-xl border border-yellow-800/40 bg-yellow-950/20 px-4 py-3 text-xs text-yellow-300/80">
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
        <span>
          Bu görsel yalnızca eğitim amaçlıdır. Klinik kararlar güncel kılavuzlar
          ve uzman gözetiminde verilmelidir.
        </span>
      </div>
    </div>
  );
}
