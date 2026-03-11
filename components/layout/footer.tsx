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
    <footer className="border-t border-white/5 bg-[var(--background)] mt-auto print:hidden relative">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <svg className="w-8 h-8 transition-transform group-hover:scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="24" fill="url(#pulse-grad-footer)" />
                <path d="M15 55 H30 L40 25 L55 80 L65 50 H75" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M85 40 C85 45.5228 89.4772 50 95 50 C89.4772 50 85 54.4772 85 60 C85 54.4772 80.5228 50 75 50 C80.5228 50 85 45.5228 85 40 Z" fill="white"/>
                <defs>
                  <linearGradient id="pulse-grad-footer" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563EB" />
                    <stop offset="1" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-bold text-lg tracking-tight text-[var(--foreground)]">
                Acil<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">EM</span>
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
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
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
