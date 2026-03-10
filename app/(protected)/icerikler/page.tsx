import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Headphones, Video, ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Eğitim İçerikleri",
};

const sections = [
  {
    href: "/icerikler/yazilar",
    icon: BookOpen,
    label: "Yazılı İçerikler",
    desc: "Konu anlatımları, kılavuz özetleri, vaka tartışmaları ve pearls",
    color: "text-blue-400",
    bg: "bg-blue-950/30 border-blue-900/40",
  },
  {
    href: "/icerikler/podcastler",
    icon: Headphones,
    label: "Podcastler",
    desc: "Konu anlatımı, vaka tartışması ve söyleşi formatında ses içerikleri",
    color: "text-purple-400",
    bg: "bg-purple-950/30 border-purple-900/40",
  },
  {
    href: "/icerikler/videolar",
    icon: Video,
    label: "Videolar",
    desc: "Prosedür videoları, dersler, EKG yorumları ve kısa ipuçları",
    color: "text-green-400",
    bg: "bg-green-950/30 border-green-900/40",
  },
  {
    href: "/icerikler/atlas",
    icon: ImageIcon,
    label: "Görsel Atlas",
    desc: "EKG, röntgen, BT, USG ve klinik fotoğraf koleksiyonu",
    color: "text-orange-400",
    bg: "bg-orange-950/30 border-orange-900/40",
  },
];

export default function IceriklerPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Eğitim İçerikleri</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Yazılı içerikler, podcastler, videolar ve görsel atlas
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            <Card padding="md" className={`h-full hover:shadow-md transition-all cursor-pointer border ${s.bg}`}>
              <s.icon className={`h-8 w-8 ${s.color} mb-4`} />
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1.5">{s.label}</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{s.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-xs text-[var(--muted-foreground)] text-center">
        Bu platform yalnızca eğitim amaçlıdır. Klinik kararlar güncel kılavuzlar ve uzman gözetiminde verilmelidir.
      </div>
    </div>
  );
}
