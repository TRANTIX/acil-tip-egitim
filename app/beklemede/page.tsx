import { Clock } from "lucide-react";
import Link from "next/link";

export default function BeklemePage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-950">
            <Clock className="h-8 w-8 text-yellow-600" />
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
          className="mt-6 inline-block rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-sm text-white transition-colors"
        >
          Hesaplayıcıları Kullan (Ücretsiz)
        </Link>
      </div>
    </div>
  );
}
