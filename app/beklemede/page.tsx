import { Clock } from "lucide-react";
import Link from "next/link";

export default function BeklemePage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Clock className="h-8 w-8 text-amber-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Onay Bekleniyor</h2>
        <p className="mt-3 text-[var(--muted-foreground)]">
          Hesabınız admin incelemesindedir. Onaylandığında platformun tüm özelliklerine erişebileceksiniz.
        </p>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Bu süreç genellikle 1-2 iş günü sürmektedir.
        </p>
        <Link
          href="/hesaplayicilar"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-2.5 text-sm text-white transition-all duration-300 shadow-lg shadow-blue-500/20"
        >
          Hesaplayıcıları Kullan (Ücretsiz)
        </Link>
      </div>
    </div>
  );
}
