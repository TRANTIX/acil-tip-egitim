import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Brain, BookOpen, HelpCircle, Stethoscope, ClipboardList, Bot, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkında — AcilEM",
  description:
    "AcilEM: Türkiye acil tıp asistanları için ücretsiz, AI destekli dijital eğitim platformu.",
};

const modules = [
  { icon: Brain, title: "AI Vaka Simülasyonu", desc: "Claude AI ile gerçekçi acil hasta senaryoları" },
  { icon: Calculator, title: "Klinik Hesaplayıcılar", desc: "GKS, HEART, Wells, CURB-65 ve daha fazlası" },
  { icon: BookOpen, title: "Eğitim İçerikleri", desc: "Konu anlatımları, kılavuz özetleri, vaka tartışmaları" },
  { icon: HelpCircle, title: "Quiz / Sınav", desc: "Pratik ve zamanlı sınav modları" },
  { icon: Stethoscope, title: "Prosedür Kılavuzları", desc: "Adım adım checklist ve klinik algoritmalar" },
  { icon: ClipboardList, title: "Nöbet Debrief", desc: "Nöbet sonu vaka analizi ve deneyim haritası" },
  { icon: Trophy, title: "Gamification", desc: "XP, seviye, rozetler ile motivasyon" },
  { icon: Bot, title: "Telegram Bot", desc: "Günlük pearl ve quiz bildirimleri" },
];

export default function HakkindaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Başlık */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Acil<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">EM</span> Hakkında
        </h1>
        <p className="mt-3 text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          AcilEM, Türkiye&apos;deki acil tıp asistanları için geliştirilmiş{" "}
          <strong className="text-[var(--foreground)]">ücretsiz</strong>, AI destekli dijital eğitim platformudur.
        </p>
      </div>

      {/* Kime Yönelik */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-3">Kime Yönelik?</h2>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          Platform, TUS sonrası acil tıp asistanlık eğitimi dönemindeki hekimlere yöneliktir.
          1. yıldan uzmanlık düzeyine kadar farklı zorluk seviyelerinde içerik sunulmaktadır.
          Hesaplayıcılar ve algoritmalar herkese açıktır; diğer modüller kayıt ve admin onayı gerektirir.
        </p>
      </section>

      {/* Modüller */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Modüller</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {modules.map((m) => (
            <div
              key={m.title}
              className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-4"
            >
              <m.icon className="h-5 w-5 shrink-0 text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-[var(--foreground)]">{m.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teknoloji */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-3">Teknoloji</h2>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          Next.js (App Router) + TypeScript, Tailwind CSS, Supabase (PostgreSQL + Auth),
          Claude API (AI simülasyon ve analiz), Vercel hosting. PWA desteği ile hesaplayıcılar
          offline kullanılabilir.
        </p>
      </section>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
        <Link
          href="/hesaplayicilar"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-2.5 text-sm text-white transition-all duration-300 shadow-lg shadow-blue-500/20"
        >
          Hesaplayıcıları Keşfet
        </Link>
        <Link
          href="/kayit"
          className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-6 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
        >
          Kayıt Ol
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-center">
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
          <strong className="text-amber-400">Tıbbi Uyarı:</strong> Bu platform yalnızca eğitim amaçlıdır.
          Klinik kararlar hasta değerlendirmesi, güncel kılavuzlar ve klinik deneyim ile verilmelidir.
          AcilEM bir klinik karar destek aracı değildir.
        </p>
      </div>
    </div>
  );
}
