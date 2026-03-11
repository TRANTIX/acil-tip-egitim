"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  Calculator,
  Brain,
  BookOpen,
  ClipboardList,
  Stethoscope,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Shield,
  Zap,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

// --- VERİLER ---
const modules = [
  {
    icon: Brain,
    title: "AI Vaka Simülasyonları",
    desc: "Gerçekçi hasta senaryolarıyla interaktif pratik. Claude AI ile adım adım vaka çözümü ve klinik muhakeme gelişimi.",
    gradient: "from-blue-600/20 to-cyan-400/20",
    border: "group-hover:border-blue-500/50",
    iconColor: "text-blue-400",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Calculator,
    title: "Klinik Hesaplayıcılar",
    desc: "GKS, HEART, Wells, CURB-65, qSOFA ve 10+ skor.",
    gradient: "from-emerald-600/20 to-teal-400/20",
    border: "group-hover:border-emerald-500/50",
    iconColor: "text-emerald-400",
    className: "md:col-span-1",
  },
  {
    icon: BookOpen,
    title: "Eğitim İçerikleri",
    desc: "Yazılı konu anlatımları, görsel atlas — tek platformda.",
    gradient: "from-violet-600/20 to-purple-400/20",
    border: "group-hover:border-violet-500/50",
    iconColor: "text-violet-400",
    className: "md:col-span-1",
  },
  {
    icon: ClipboardList,
    title: "Quiz Sistemi",
    desc: "Konu bazlı sorularla bilgini test et. Pratik ve zamanlı modlar.",
    gradient: "from-amber-600/20 to-orange-400/20",
    border: "group-hover:border-amber-500/50",
    iconColor: "text-amber-400",
    className: "md:col-span-2",
  },
  {
    icon: Stethoscope,
    title: "Prosedürler",
    desc: "Adım adım algoritmalar ve görsel rehberler.",
    gradient: "from-rose-600/20 to-pink-400/20",
    border: "group-hover:border-rose-500/50",
    iconColor: "text-rose-400",
    className: "md:col-span-1",
  },
  {
    icon: Activity,
    title: "Nöbet Debrief",
    desc: "AI destekli asistan ile nöbet sonu vaka analizi.",
    gradient: "from-sky-600/20 to-blue-400/20",
    border: "group-hover:border-sky-500/50",
    iconColor: "text-sky-400",
    className: "md:col-span-1",
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
  { value: "10+", label: "Hesaplayıcı" },
  { value: "50+", label: "Quiz Sorusu" },
  { value: "5", label: "AI Senaryo" },
  { value: "8", label: "Modül" },
];

export default function AcilEMApp() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-[100vh] w-full bg-[#020617] text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden block">
      {/* --- NAVBAR --- */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2"
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              AcilEM
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/hesaplayicilar" className="hover:text-white transition-colors relative group">
              Hesaplayıcılar
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link href="/prosedurler" className="hover:text-white transition-colors relative group">
              Algoritmalar
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link href="/hakkinda" className="hover:text-white transition-colors relative group">
              Hakkında
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/giris" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Giriş Yap
            </Link>
            <Link
              href="/kayit"
              className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group hover:scale-105 transition-transform duration-300"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl group-hover:bg-slate-900 transition-colors">
                Kayıt Ol
              </span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <main className="relative w-full pt-28 pb-12 block">

        {/* Profesyonel Arka Plan Efektleri */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617] pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        {/* Dekoratif Işık Küreleri */}
        <div className="absolute top-20 left-10 md:left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute top-40 right-10 md:right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] animate-pulse-glow delay-300 pointer-events-none"></div>

        {/* --- HERO BÖLÜMÜ --- */}
        <section className="relative z-10 py-24 lg:py-36 px-6 flex flex-col items-center justify-center text-center w-full shrink-0">

          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="tracking-wide">Türkiye&apos;nin ilk yapay zeka destekli acil tıp platformu</span>
          </div>

          <h1 className="animate-fade-in-up delay-100 text-5xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-8">
            Acil Tıp Asistanları için <br className="hidden md:block" />
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-pulse-glow">
                AI Destekli Eğitim
              </span>
              <svg className="absolute w-full h-3 -bottom-2 left-0 text-blue-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 15 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-light">
            Vaka simülasyonları, klinik hesaplayıcılar, quiz sistemi ve nöbet debrief — hepsi bir arada, tamamen <strong className="text-slate-200 font-medium">ücretsiz</strong> ve <strong className="text-slate-200 font-medium">Türkçe</strong>.
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link href="/kayit" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] border border-blue-400/20">
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none"></span>
              <span className="relative z-10 flex items-center gap-2 text-lg">
                Ücretsiz Kayıt Ol
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </Link>
            <Link href="/hesaplayicilar" className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900/40 border border-slate-700 text-slate-200 font-semibold backdrop-blur-md transition-all duration-300 hover:bg-slate-800 hover:border-slate-500 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <Calculator className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors duration-300" />
              <span className="text-lg">Hesaplayıcıları Dene</span>
            </Link>
          </div>

          <p className="animate-fade-in-up delay-400 mt-8 text-sm text-slate-500 bg-slate-900/50 py-2 px-6 rounded-full border border-white/5 backdrop-blur-sm">
            Kayıt ücretsiz · Admin onayıyla aktifleşir · <span className="text-slate-300">Hesaplayıcılar herkese açık</span>
          </p>

          {/* İstatistikler */}
          <div className="animate-fade-in-up delay-400 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full mt-32 border-t border-slate-800/50 pt-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2 group-hover:to-blue-400 transition-colors duration-500 drop-shadow-sm">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- MODÜLLER (BENTO GRID - REVEAL) --- */}
        <section className="relative z-10 py-32 px-6 w-full shrink-0">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 reveal">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Eksiksiz Eğitim Modülleri</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                Acil tıp asistanlığının ilk gününden uzmanlığa kadar ihtiyacın olan tüm dijital araçlar ve simülasyonlar tek bir entegre ekosistemde.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[220px]">
              {modules.map((m, i) => {
                const delayClass = ["delay-0", "delay-100", "delay-200", "delay-300"][i % 4];
                return (
                <div
                  key={i}
                  className={`reveal ${delayClass} group relative rounded-[2rem] p-8 flex flex-col overflow-hidden bg-slate-900/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:bg-slate-800/60 hover:shadow-2xl hover:-translate-y-2 ${m.border} ${m.className}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${m.gradient}`} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-[#020617]/80 flex items-center justify-center border border-white/10 mb-6 shadow-inner transition-transform duration-500 group-hover:scale-110 ${m.iconColor}`}>
                      <m.icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-100 mb-3 tracking-tight">{m.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1 font-light group-hover:text-slate-300 transition-colors duration-300">
                      {m.desc}
                    </p>

                    {m.className.includes("row-span-2") && (
                      <div className="mt-8 pt-6 border-t border-white/10 flex items-center text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors cursor-pointer w-fit">
                        Modülü Keşfet <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- KLİNİK HESAPLAYICILAR (REVEAL) --- */}
        <section className="relative z-10 py-32 px-6 w-full shrink-0">
          <div className="max-w-7xl mx-auto reveal">
            <div className="relative rounded-[3rem] bg-gradient-to-br from-slate-900 to-[#020617] border border-slate-800 p-10 md:p-20 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
              <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-[45%] text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-xs font-semibold text-emerald-400 mb-8 uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4" />
                    Herkese Açık • Ücretsiz
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                    Saniyeler İçinde <br className="hidden lg:block"/> Klinik Karar
                  </h2>
                  <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
                    Acil servisin kaosu içinde ihtiyacın olan 10+ klinik skorlama sistemi. Anında hesaplama yapın, <strong className="text-slate-200">kanıta dayalı güncel yorum</strong> ve kaynak referansları alın.
                  </p>
                  <Link href="/hesaplayicilar" className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold transition-all duration-300 group border border-slate-700 hover:border-emerald-500/30">
                    Tüm Hesaplayıcıları İncele
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>

                <div className="lg:w-[55%] grid grid-cols-2 gap-4 w-full">
                  {calculators.map((calc) => (
                    <Link
                      key={calc.id}
                      href={`/hesaplayicilar/${calc.id}`}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-[#020617]/50 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all duration-300 group shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1"
                    >
                      <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:scale-110 transition-all duration-300">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <span className="text-sm md:text-base font-medium text-slate-300 group-hover:text-white truncate transition-colors duration-300">
                        {calc.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEDEN ACİLEM? (REVEAL) --- */}
        <section className="relative z-10 py-32 px-6 w-full shrink-0">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 tracking-tight reveal">Platformun Avantajları</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Güvenilir İçerik", desc: "Sadece güncel kılavuzlara dayalı, uzman hekimler tarafından denetimli klinik veriler.", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "hover:border-cyan-500/30" },
                { icon: Brain, title: "AI Güdümlü Eğitim", desc: "Claude AI mimarisi ile her asistanın seviyesine göre şekillenen kişiselleştirilmiş vakalar.", color: "text-purple-400", bg: "bg-purple-500/10", border: "hover:border-purple-500/30" },
                { icon: Zap, title: "Hızlı, Ücretsiz, Reklamsız", desc: "Eğitimin önündeki tüm engelleri kaldırdık. Hiçbir zaman abonelik veya reklam yok.", color: "text-amber-400", bg: "bg-amber-500/10", border: "hover:border-amber-500/30" }
              ].map((feature, i) => {
                const delayClass = ["delay-0", "delay-100", "delay-200"][i];
                return (
                <div key={i} className={`reveal ${delayClass} flex flex-col items-center text-center p-10 rounded-[2rem] bg-slate-900/30 border border-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-slate-900/80 hover:-translate-y-2 hover:shadow-2xl ${feature.border} group`}>
                  <div className={`w-20 h-20 rounded-3xl ${feature.bg} flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className={`w-10 h-10 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">{feature.desc}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800/50 bg-[#020617] pt-20 pb-10 px-6 relative z-10 w-full shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
               <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">AcilEM</span>
          </div>
          <p className="text-sm text-slate-500 text-center md:text-left font-light max-w-md">
            © 2026 AcilEM. Tüm hakları saklıdır. Bu platform yalnızca eğitim amaçlıdır. Klinik kararlar hekim inisiyatifindedir.
          </p>
        </div>
      </footer>
    </div>
  );
}
