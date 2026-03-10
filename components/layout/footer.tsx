import { Activity } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Activity className="h-5 w-5 text-blue-600" />
            <span>Acil<span className="text-blue-600">EM</span></span>
          </Link>
          <div className="flex gap-4 text-sm text-[var(--muted-foreground)]">
            <Link href="/hakkinda" className="hover:text-[var(--foreground)] transition-colors">Hakkında</Link>
            <Link href="/hesaplayicilar" className="hover:text-[var(--foreground)] transition-colors">Hesaplayıcılar</Link>
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} AcilEM. Tüm hakları saklıdır.
          </p>
        </div>
        <div className="mt-4 text-center text-xs text-[var(--muted-foreground)]">
          Bu platform yalnızca eğitim amaçlıdır. Klinik kararlar güncel kılavuzlar ve uzman gözetiminde verilmelidir.
        </div>
      </div>
    </footer>
  );
}
