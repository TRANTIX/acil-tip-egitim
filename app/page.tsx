"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Calculator,
  Brain,
  BookOpen,
  ClipboardList,
  Stethoscope,
  Award,
  Bot,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Spotlight, GridBackground, DotPattern } from "@/components/ui/spotlight";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FadeIn, AnimatedCounter, GradientText, ShimmerButton } from "@/components/ui/animated-text";
import { cn } from "@/lib/utils";

const modules = [
  {
    icon: Brain,
    title: "AI Vaka Simülasyonları",
    desc: "Gerçekçi hasta senaryolarıyla interaktif pratik. Claude AI ile adım adım vaka çözümü.",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-400",
    iconBg: "bg-blue-500/10 text-blue-500",
    span: "",
  },
  {
    icon: Calculator,
    title: "Klinik Hesaplayıcılar",
    desc: "GKS, HEART, Wells, CURB-65, qSOFA ve 10+ skor. Anında hesapla, kanıta dayalı yorum al.",
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-400",
    iconBg: "bg-emerald-500/10 text-emerald-500",
    span: "",
  },
  {
    icon: BookOpen,
    title: "Eğitim İçerikleri",
    desc: "Yazılı konu anlatımları, podcastler, videolar ve görsel atlas — tek platformda.",
    gradient: "bg-gradient-to-br from-violet-500 to-purple-400",
    iconBg: "bg-violet-500/10 text-violet-500",
    span: "",
  },
  {
    icon: ClipboardList,
    title: "Quiz Sistemi",
    desc: "Konu bazlı sorularla bilgini test et. Pratik ve zamanlı sınav modları.",
    gradient: "bg-gradient-to-br from-amber-500 to-orange-400",
    iconBg: "bg-amber-500/10 text-amber-500",
    span: "",
  },
  {
    icon: Stethoscope,
    title: "Prosedür Kılavuzları",
    desc: "Adım adım prosedür rehberleri, algoritmalar ve interaktif checklist'ler.",
    gradient: "bg-gradient-to-br from-rose-500 to-pink-400",
    iconBg: "bg-rose-500/10 text-rose-500",
    span: "",
  },
  {
    icon: Activity,
    title: "Nöbet Debrief",
    desc: "Her nöbet sonrası vaka analizi yap. AI destekli öğrenme önerileri ve deneyim haritası.",
    gradient: "bg-gradient-to-br from-sky-500 to-blue-400",
    iconBg: "bg-sky-500/10 text-sky-500",
    span: "",
  },
  {
    icon: Award,
    title: "Gamification",
    desc: "XP kazan, seviye atla, rozetler topla, streak sürdür.",
    gradient: "bg-gradient-to-br from-yellow-500 to-amber-400",
    iconBg: "bg-yellow-500/10 text-yellow-500",
    span: "",
  },
  {
    icon: Bot,
    title: "Telegram Bot",
    desc: "Günlük pearl ve quiz soruları Telegram'a gelsin.",
    gradient: "bg-gradient-to-br from-indigo-500 to-blue-400",
    iconBg: "bg-indigo-500/10 text-indigo-500",
    span: "",
  },
];

const calculators = [
  { name: "Glasgow Koma Skoru", id: "gks" },
  { name: "HEART Skoru", id: "heart" },
  { name: "Wells Kriterleri (PE)", id: "wells-pe" },
  { name: "CURB-65", id: "curb-65" },
  { name: "qSOFA", id: "qsofa" },
  { name: "CHA₂DS₂-VASc", id: "cha2ds2-vasc" },
  { name: "PECARN", id: "pecarn" },
  { name: "NIHSS", id: "nihss" },
];

const stats = [
  { value: 10, suffix: "+", label: "Hesaplayıcı" },
  { value: 50, suffix: "+", label: "Quiz Sorusu" },
  { value: 5, suffix: "", label: "AI Senaryo" },
  { value: 8, suffix: "", label: "Modül" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Navbar user={null} />

      <main className="flex-1">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32 lg:pt-44 lg:pb-40">
          {/* Background */}
          <GridBackground />
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(59,130,246,0.6)" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
            {/* Heading */}
            <FadeIn>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--foreground)] leading-[1.08]">
                Acil Tıp Asistanları
                <br className="hidden sm:block" />
                için <GradientText>AI Destekli</GradientText> Eğitim
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
                Vaka simülasyonları, klinik hesaplayıcılar, quiz sistemi ve nöbet debrief
                — hepsi bir arada, ücretsiz, Türkçe.
              </p>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.2}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kayit">
                  <ShimmerButton>
                    Ücretsiz Kayıt Ol
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </ShimmerButton>
                </Link>
                <Link
                  href="/hesaplayicilar"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] px-8 py-3.5 text-base font-semibold text-[var(--foreground)] transition-all duration-200 hover:border-blue-500/30"
                >
                  <Calculator className="h-4 w-4 text-blue-500" />
                  Hesaplayıcıları Dene
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="mt-5 text-xs text-[var(--muted-foreground)]">
                Kayıt ücretsiz · Admin onayıyla aktifleşir · Klinik hesaplayıcılar herkese açık
              </p>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.3}>
              <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                      <AnimatedCounter target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1.5 text-sm text-[var(--muted-foreground)]">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== MODULES — BENTO GRID ===== */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <DotPattern className="opacity-50" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm text-[var(--muted-foreground)] mb-4">
                  <Zap className="h-3.5 w-3.5 text-blue-500" />
                  Entegre Platform
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                  Tüm Modüller
                </h2>
                <p className="mt-3 text-[var(--muted-foreground)] max-w-xl mx-auto">
                  Acil tıp eğitiminin her boyutunu kapsayan kapsamlı araç seti
                </p>
              </div>
            </FadeIn>

            <BentoGrid className="lg:grid-cols-4">
              {modules.map((m, i) => (
                <BentoGridItem
                  key={m.title}
                  title={m.title}
                  description={m.desc}
                  gradient={m.gradient}
                  index={i}
                  className={m.span}
                  icon={
                    <div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl", m.iconBg)}>
                      <m.icon className="h-5 w-5" />
                    </div>
                  }
                />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* ===== CALCULATORS ===== */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-12 overflow-hidden">
                {/* Subtle gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-500 mb-4">
                    <CheckCircle className="h-3 w-3" />
                    Kayıt Gerektirmez — Herkese Açık
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                    Klinik Hesaplayıcılar
                  </h2>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)] max-w-lg mx-auto">
                    10+ klinik hesaplayıcı ücretsiz kullanılabilir. Anında hesaplama, kanıta dayalı yorum ve kaynak referanslarıyla.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {calculators.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <Link
                        href={`/hesaplayicilar/${c.id}`}
                        className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] transition-all duration-200 hover:border-emerald-500/40 hover:shadow-sm hover:shadow-emerald-500/5"
                      >
                        <Calculator className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{c.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    href="/hesaplayicilar"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    Tümünü Gör
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== WHY ===== */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] text-center mb-14">
                Neden AcilEM?
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Güvenilir İçerik",
                  desc: "Güncel kılavuzlara dayalı, uzman denetimli tıbbi içerik. Kanıta dayalı tıp prensipleriyle.",
                  gradient: "from-blue-500 to-cyan-400",
                },
                {
                  icon: Sparkles,
                  title: "AI Destekli",
                  desc: "Claude AI ile kişiselleştirilmiş öğrenme deneyimi. Vaka simülasyonları ve akıllı öneriler.",
                  gradient: "from-violet-500 to-purple-400",
                },
                {
                  icon: Zap,
                  title: "Hızlı ve Ücretsiz",
                  desc: "Tamamen ücretsiz. Kayıt ol, hemen kullanmaya başla. Reklamsız, aboneliksiz.",
                  gradient: "from-amber-500 to-orange-400",
                },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center overflow-hidden transition-all duration-300 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/5">
                    {/* Top accent line */}
                    <div className={cn(
                      "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      item.gradient
                    )} />

                    <div className={cn(
                      "mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br",
                      item.gradient
                    )}>
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{item.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                  Eğitimine bugün başla
                </h2>
                <p className="text-[var(--muted-foreground)] max-w-md mx-auto mb-10">
                  Ücretsiz kayıt ol, admin onayından sonra tüm modüllere eriş.
                  Klinik hesaplayıcılar şimdiden kullanıma açık.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/kayit"
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-8 py-3.5 text-base font-semibold text-white transition-colors"
                  >
                    Ücretsiz Kayıt Ol
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/hesaplayicilar"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] px-8 py-3.5 text-base font-semibold text-[var(--foreground)] transition-colors"
                  >
                    Hesaplayıcıları Dene
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
