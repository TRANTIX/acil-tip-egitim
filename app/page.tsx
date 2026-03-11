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
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn, AnimatedCounter, GradientText } from "@/components/ui/animated-text";
import { cn } from "@/lib/utils";

/* ── VERİLER ── */

const modules = [
  {
    icon: Brain,
    title: "AI Vaka Simülasyonları",
    desc: "Gerçekçi hasta senaryolarıyla interaktif pratik. Claude AI ile adım adım vaka çözümü ve klinik muhakeme gelişimi.",
    gradient: "from-blue-600/20 to-cyan-400/20",
    border: "group-hover:border-blue-500/50",
    iconColor: "text-blue-500 dark:text-blue-400",
    span: "md:col-span-2 md:row-span-2",
    featured: true,
  },
  {
    icon: Calculator,
    title: "Klinik Hesaplayıcılar",
    desc: "GKS, HEART, Wells, CURB-65, qSOFA ve 10+ skor.",
    gradient: "from-emerald-600/20 to-teal-400/20",
    border: "group-hover:border-emerald-500/50",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    span: "",
  },
  {
    icon: BookOpen,
    title: "Eğitim İçerikleri",
    desc: "Yazılı konu anlatımları, podcastler, videolar ve görsel atlas — tek platformda.",
    gradient: "from-violet-600/20 to-purple-400/20",
    border: "group-hover:border-violet-500/50",
    iconColor: "text-violet-500 dark:text-violet-400",
    span: "",
  },
  {
    icon: ClipboardList,
    title: "Quiz Sistemi",
    desc: "Konu bazlı sorularla bilgini test et. Pratik ve zamanlı sınav modları.",
    gradient: "from-amber-600/20 to-orange-400/20",
    border: "group-hover:border-amber-500/50",
    iconColor: "text-amber-500 dark:text-amber-400",
    span: "md:col-span-2",
  },
  {
    icon: Stethoscope,
    title: "Prosedür Kılavuzları",
    desc: "Adım adım prosedür rehberleri, algoritmalar ve interaktif checklist'ler.",
    gradient: "from-rose-600/20 to-pink-400/20",
    border: "group-hover:border-rose-500/50",
    iconColor: "text-rose-500 dark:text-rose-400",
    span: "",
  },
  {
    icon: Activity,
    title: "Nöbet Debrief",
    desc: "AI destekli asistan ile nöbet sonu vaka analizi ve deneyim haritası.",
    gradient: "from-sky-600/20 to-blue-400/20",
    border: "group-hover:border-sky-500/50",
    iconColor: "text-sky-500 dark:text-sky-400",
    span: "",
  },
  {
    icon: Award,
    title: "Gamification",
    desc: "XP kazan, seviye atla, rozetler topla, streak sürdür.",
    gradient: "from-yellow-600/20 to-amber-400/20",
    border: "group-hover:border-yellow-500/50",
    iconColor: "text-yellow-500 dark:text-yellow-400",
    span: "",
  },
  {
    icon: Bot,
    title: "Telegram Bot",
    desc: "Günlük pearl ve quiz soruları Telegram'a gelsin.",
    gradient: "from-indigo-600/20 to-blue-400/20",
    border: "group-hover:border-indigo-500/50",
    iconColor: "text-indigo-500 dark:text-indigo-400",
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

const features = [
  {
    icon: Shield,
    title: "Güvenilir İçerik",
    desc: "Sadece güncel kılavuzlara dayalı, uzman hekimler tarafından denetimli klinik veriler.",
    iconColor: "text-cyan-500 dark:text-cyan-400",
    iconBg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/30",
  },
  {
    icon: Brain,
    title: "AI Güdümlü Eğitim",
    desc: "Claude AI mimarisi ile her asistanın seviyesine göre şekillenen kişiselleştirilmiş vakalar.",
    iconColor: "text-violet-500 dark:text-purple-400",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/30",
  },
  {
    icon: Zap,
    title: "Hızlı, Ücretsiz, Reklamsız",
    desc: "Eğitimin önündeki tüm engelleri kaldırdık. Hiçbir zaman abonelik veya reklam yok.",
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/30",
  },
];

/* ── ANA BİLEŞEN ── */

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] overflow-x-hidden">
      <Navbar user={null} />

      <main className="flex min-h-0 flex-1 flex-col w-full relative">
        {/* Arka plan efektleri */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent dark:from-blue-900/20 dark:via-[var(--background)] dark:to-[var(--background)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 dark:opacity-100" />

        {/* Dekoratif ışık küreleri */}
        <div className="pointer-events-none absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="pointer-events-none absolute top-40 right-1/4 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-600/10 rounded-full blur-[120px] animate-pulse-glow-delayed" />

        {/* ===== HERO ===== */}
        <section className="relative z-10 pt-28 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span className="tracking-wide">Yapay zeka destekli acil tıp eğitim platformu</span>
              </div>
            </FadeIn>

            {/* Heading */}
            <FadeIn delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight text-[var(--foreground)] leading-[1.1] mb-8">
                Acil Tıp Asistanları
                <br className="hidden md:block" />
                {" "}için <GradientText>AI Destekli</GradientText> Eğitim
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={0.15}>
              <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-12 leading-relaxed">
                Vaka simülasyonları, klinik hesaplayıcılar, quiz sistemi ve nöbet debrief
                — hepsi bir arada, tamamen{" "}
                <strong className="text-[var(--foreground)] font-medium">ücretsiz</strong> ve{" "}
                <strong className="text-[var(--foreground)] font-medium">Türkçe</strong>.
              </p>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/kayit"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] border border-blue-400/20 text-lg"
                >
                  Ücretsiz Kayıt Ol
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
                <Link
                  href="/hesaplayicilar"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-semibold backdrop-blur-md transition-all duration-300 hover:bg-[var(--background)] hover:border-blue-500/30 text-lg"
                >
                  <Calculator className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-emerald-500 transition-colors duration-300" />
                  Hesaplayıcıları Dene
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="mt-8 text-sm text-[var(--muted-foreground)] bg-[var(--card)]/50 py-2 px-6 rounded-full border border-[var(--border)] backdrop-blur-sm inline-block">
                Kayıt ücretsiz · Admin onayıyla aktifleşir ·{" "}
                <span className="text-[var(--foreground)]">Hesaplayıcılar herkese açık</span>
              </p>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-24 border-t border-[var(--border)] pt-12">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col items-center group">
                    <span className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-2 drop-shadow-sm">
                      <AnimatedCounter target={s.value} suffix={s.suffix} />
                    </span>
                    <span className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== MODÜLLER — BENTO GRID ===== */}
        <section className="relative z-10 py-24 md:py-32 px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6 tracking-tight">
                  Eksiksiz Eğitim Modülleri
                </h2>
                <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
                  Acil tıp asistanlığının ilk gününden uzmanlığa kadar ihtiyacın olan tüm dijital araçlar
                  tek bir entegre ekosistemde.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[220px]">
              {modules.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "group relative rounded-[2rem] p-8 flex flex-col overflow-hidden",
                    "bg-[var(--card)] border border-[var(--border)] backdrop-blur-md",
                    "transition-all duration-500 hover:shadow-2xl hover:-translate-y-2",
                    m.border,
                    m.span,
                  )}
                >
                  {/* Glow arka plan */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                      m.gradient,
                    )}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl bg-[var(--background)] flex items-center justify-center border border-[var(--border)] mb-6 shadow-inner transition-transform duration-500 group-hover:scale-110",
                        m.iconColor,
                      )}
                    >
                      <m.icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 tracking-tight lg:text-2xl">
                      {m.title}
                    </h3>
                    <p className="text-[var(--muted-foreground)] text-sm leading-relaxed flex-1 group-hover:text-[var(--foreground)]/80 transition-colors duration-300">
                      {m.desc}
                    </p>

                    {m.featured && (
                      <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center text-sm font-semibold text-blue-500 dark:text-blue-400 group-hover:text-blue-400 dark:group-hover:text-blue-300 transition-colors cursor-pointer w-fit">
                        Modülü Keşfet
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== KLİNİK HESAPLAYICILAR ===== */}
        <section className="relative z-10 py-24 md:py-32 px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <div className="relative rounded-[2rem] md:rounded-[3rem] bg-[var(--card)] border border-[var(--border)] p-8 md:p-16 overflow-hidden shadow-xl">
                {/* Dekoratif çizgiler */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                  {/* Sol taraf — açıklama */}
                  <div className="lg:w-[45%] text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-8 uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4" />
                      Herkese Açık · Ücretsiz
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-6 tracking-tight">
                      Saniyeler İçinde
                      <br className="hidden lg:block" /> Klinik Karar
                    </h2>
                    <p className="text-[var(--muted-foreground)] text-lg mb-10 leading-relaxed">
                      Acil servisin kaosu içinde ihtiyacın olan 10+ klinik skorlama sistemi.
                      Anında hesaplama yapın,{" "}
                      <strong className="text-[var(--foreground)]">kanıta dayalı güncel yorum</strong>{" "}
                      ve kaynak referansları alın.
                    </p>
                    <Link
                      href="/hesaplayicilar"
                      className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--background)] hover:bg-[var(--card)] text-emerald-600 dark:text-emerald-400 font-semibold transition-all duration-300 border border-[var(--border)] hover:border-emerald-500/30"
                    >
                      Tüm Hesaplayıcıları İncele
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>

                  {/* Sağ taraf — grid */}
                  <div className="lg:w-[55%] grid grid-cols-2 gap-4 w-full">
                    {calculators.map((calc, i) => (
                      <motion.div
                        key={calc.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <Link
                          href={`/hesaplayicilar/${calc.id}`}
                          className="group flex items-center gap-4 p-5 rounded-2xl bg-[var(--background)] border border-[var(--border)] hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-all duration-300">
                            <Calculator className="w-5 h-5" />
                          </div>
                          <span className="text-sm md:text-base font-medium text-[var(--foreground)] truncate transition-colors duration-300">
                            {calc.name}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== NEDEN ACİLEM? ===== */}
        <section className="relative z-10 py-24 md:py-32 px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-20 tracking-tight">
                Platformun Avantajları
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.1}>
                  <div
                    className={cn(
                      "group flex flex-col items-center text-center p-10 rounded-[2rem]",
                      "bg-[var(--card)] border border-[var(--border)] backdrop-blur-sm",
                      "transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
                      f.border,
                    )}
                  >
                    <div
                      className={cn(
                        "w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                        f.iconBg,
                      )}
                    >
                      <f.icon className={cn("w-10 h-10", f.iconColor)} />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4 tracking-tight">
                      {f.title}
                    </h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed">{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="relative z-10 py-24 md:py-32 px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                  Eğitimine bugün başla
                </h2>
                <p className="text-[var(--muted-foreground)] max-w-md mx-auto mb-10">
                  Ücretsiz kayıt ol, admin onayından sonra tüm modüllere eriş. Klinik hesaplayıcılar
                  şimdiden kullanıma açık.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/kayit"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                  >
                    Ücretsiz Kayıt Ol
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/hesaplayicilar"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] px-8 py-4 text-lg font-semibold text-[var(--foreground)] transition-colors"
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
