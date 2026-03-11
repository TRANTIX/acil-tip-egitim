import { Activity } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { href: "/hesaplayicilar", label: "Hesaplayıcılar" },
      { href: "/giris", label: "Giriş Yap" },
      { href: "/kayit", label: "Kayıt Ol" },
    ],
  },
  {
    title: "Kaynaklar",
    links: [
      { href: "/hakkinda", label: "Hakkında" },
      { href: "/hesaplayicilar", label: "Klinik Skorlar" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] mt-auto print:hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Activity className="h-5 w-5 text-blue-500" />
              <span className="text-[var(--foreground)]">
                Acil<span className="text-blue-500">EM</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed max-w-xs">
              Türkiye&apos;deki acil tıp asistanları için ücretsiz, AI destekli dijital eğitim platformu.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            &copy; {new Date().getFullYear()} AcilEM. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-[var(--muted-foreground)] text-center sm:text-right max-w-md">
            Bu platform yalnızca eğitim amaçlıdır. Klinik kararlar güncel kılavuzlar ve uzman gözetiminde verilmelidir.
          </p>
        </div>
      </div>
    </footer>
  );
}
