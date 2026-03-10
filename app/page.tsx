import Link from "next/link";
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
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const features = [
  {
    icon: Brain,
    title: "AI Vaka Simülasyonları",
    desc: "Gerçekçi hasta senaryolarıyla pratik yap. Claude AI ile interaktif vaka çözümü.",
    badge: "Yeni",
    protected: true,
  },
  {
    icon: Calculator,
    title: "Klinik Hesaplayıcılar",
    desc: "GKS, HEART, Wells, CURB-65, qSOFA ve daha fazlası. Anında hesapla.",
    badge: "Ücretsiz",
    protected: false,
  },
  {
    icon: BookOpen,
    title: "Eğitim İçerikleri",
    desc: "Yazılı konu anlatımları, podcastler, videolar ve görsel atlas.",
    protected: true,
  },
  {
    icon: ClipboardList,
    title: "Quiz Sistemi",
    desc: "Konu bazlı sorularla bilgini test et. Pratik ve sınav modu.",
    protected: true,
  },
  {
    icon: Stethoscope,
    title: "Prosedür Kılavuzları",
    desc: "Adım adım prosedür rehberleri, algoritmalar ve checklist'ler.",
    protected: true,
  },
  {
    icon: Activity,
    title: "Nöbet Debrief",
    desc: "Her nöbet sonrası vaka analizi yap. AI destekli öğrenme önerileri.",
    protected: true,
  },
  {
    icon: Award,
    title: "Gamification",
    desc: "XP kazan, rozetler topla, streak sürdür. Bireysel gelişim odaklı.",
    protected: true,
  },
  {
    icon: Bot,
    title: "Telegram Bot",
    desc: "Günlük pearl ve sorular doğrudan Telegram'a gelsin.",
    protected: true,
  },
];

const calculators = [
  "Glasgow Koma Skoru",
  "HEART Skoru",
  "Wells Kriterleri (PE)",
  "CURB-65",
  "qSOFA",
  "CHA₂DS₂-VASc",
  "PECARN",
  "NIHSS",
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={null} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[var(--background)] px-4 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 to-transparent pointer-events-none" />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-800/40 bg-blue-950/30 px-4 py-1.5 text-sm text-blue-400">
              <Activity className="h-3.5 w-3.5" />
              Türkiye&apos;nin acil tıp eğitim platformu
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
              Acil Tıp Asistanları için{" "}
              <span className="text-blue-500">AI Destekli</span>{" "}
              Eğitim
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
              Vaka simülasyonları, klinik hesaplayıcılar, quiz sistemi ve nöbet debrief — hepsi bir arada,
              ücretsiz, Türkçe.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kayit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-8 py-3.5 text-base font-semibold text-white transition-colors"
              >
                Ücretsiz Kayıt Ol
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hesaplayicilar"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] px-8 py-3.5 text-base font-semibold text-[var(--foreground)] transition-colors"
              >
                <Calculator className="h-4 w-4" />
                Hesaplayıcıları Dene
              </Link>
            </div>
            <p className="mt-4 text-sm text-[var(--muted-foreground)]">
              Kayıt ücretsiz · Admin onayıyla aktifleşir · Klinik hesaplayıcılar herkese açık
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-20 bg-[var(--card)]/30">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--foreground)]">Tüm Modüller</h2>
              <p className="mt-3 text-[var(--muted-foreground)]">
                Acil tıp eğitiminin her boyutunu kapsayan entegre platform
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-blue-800/50 transition-colors"
                >
                  {f.badge && (
                    <span className={`absolute top-4 right-4 rounded-full px-2 py-0.5 text-xs font-medium
                      ${f.badge === "Ücretsiz" ? "bg-green-950/50 text-green-400 border border-green-900" : "bg-blue-950/50 text-blue-400 border border-blue-900"}`}>
                      {f.badge}
                    </span>
                  )}
                  <f.icon className="h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{f.desc}</p>
                  {f.protected && (
                    <p className="mt-3 text-xs text-[var(--muted-foreground)]">🔒 Üyelik gerektirir</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculators preview */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-green-800/40 bg-green-950/20 px-3 py-1 text-xs text-green-400 mb-4">
                  <CheckCircle className="h-3 w-3" />
                  Auth Gerektirmez
                </div>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                  Klinik Hesaplayıcılar
                </h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
                  10+ klinik hesaplayıcı ücretsiz ve kayıtsız kullanılabilir.
                  Anında hesaplama, kanıta dayalı yorum ve kaynak referanslarıyla.
                </p>
                <Link
                  href="/hesaplayicilar"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-sm text-white transition-colors"
                >
                  Hesaplayıcıları Gör
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-2">
                {calculators.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)]"
                  >
                    <Calculator className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-20 bg-blue-950/20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-[var(--foreground)]">
              Hemen Başla
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)]">
              Tamamen ücretsiz. Kayıt ol, admin onayını bekle, tüm özelliklere eriş.
            </p>
            <Link
              href="/kayit"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-8 py-3.5 text-base font-semibold text-white transition-colors"
            >
              Ücretsiz Kayıt Ol
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
