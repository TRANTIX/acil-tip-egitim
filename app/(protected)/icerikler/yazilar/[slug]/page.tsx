import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";

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

const CONTENT_TYPE_LABELS: Record<string, string> = {
  konu_anlatimi: "Konu Anlatımı",
  kilavuz_ozeti: "Kılavuz Özeti",
  vaka_tartismasi: "Vaka Tartışması",
  pearl: "Pearl",
  makale_ozeti: "Makale Özeti",
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("title, key_points, category")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!article) return { title: "İçerik Bulunamadı" };

  return {
    title: article.title,
    description: article.key_points?.[0] || `${CATEGORY_LABELS[article.category] || article.category} - Acil Tıp Eğitim İçeriği`,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!article) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Geri butonu */}
      <Link
        href="/icerikler/yazilar"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Yazılı İçerikler
      </Link>

      {/* Başlık alanı */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--muted-foreground)]">
            {CONTENT_TYPE_LABELS[article.content_type] || article.content_type}
          </span>
          <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--muted-foreground)]">
            {CATEGORY_LABELS[article.category] || article.category}
          </span>
          {article.difficulty && (
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_COLORS[article.difficulty] || ""}`}>
              {DIFFICULTY_LABELS[article.difficulty]}
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[var(--muted-foreground)]">
          {article.reading_time && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.reading_time} dk okuma
            </span>
          )}
          {article.published_at && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(article.published_at).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Etiketler */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-[var(--muted)]/50 px-2 py-0.5 text-xs text-[var(--muted-foreground)]"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Anahtar noktalar */}
      {article.key_points && article.key_points.length > 0 && (
        <div className="rounded-xl border border-blue-800/40 bg-blue-950/20 p-5 mb-8">
          <h2 className="text-sm font-semibold text-blue-400 mb-3">Anahtar Noktalar</h2>
          <ul className="space-y-2">
            {article.key_points.map((kp: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                {kp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tıbbi uyarı */}
      <div className="rounded-xl border border-yellow-800/40 bg-yellow-950/20 p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
        <p className="text-xs text-yellow-200/80">
          Bu içerik yalnızca eğitim amaçlıdır. Klinik kararlar güncel kılavuzlar ve
          uzman gözetiminde verilmelidir. Hasta yönetiminde bu içerik tek başına
          referans olarak kullanılmamalıdır.
        </p>
      </div>

      {/* İçerik */}
      <article>
        <MarkdownRenderer content={article.body} />
      </article>

      {/* Alt navigasyon */}
      <div className="mt-12 pt-6 border-t border-[var(--border)]">
        <Link
          href="/icerikler/yazilar"
          className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Tüm İçeriklere Dön
        </Link>
      </div>
    </div>
  );
}
