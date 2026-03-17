import { XCircle } from "lucide-react";
import Link from "next/link";

export default function ReddedildiPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Başvuru Reddedildi</h2>
        <p className="mt-3 text-[var(--muted-foreground)]">
          Üzgünüz, platform başvurunuz onaylanmadı. Yanlışlık olduğunu düşünüyorsanız lütfen bizimle iletişime geçin.
        </p>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Hesaplayıcılar ve algoritmalar herkese açıktır, kayıt gerektirmez.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/hesaplayicilar"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-2.5 text-sm text-white transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            Hesaplayıcıları Kullan
          </Link>
          <Link
            href="/algoritmalar"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-6 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
          >
            Algoritmalara Göz At
          </Link>
        </div>
      </div>
    </div>
  );
}
