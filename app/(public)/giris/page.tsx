import { Suspense } from "react";
import { GirisForm } from "./giris-form";

export default function GirisPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-140px)] items-center justify-center">
          <span className="text-[var(--muted-foreground)]">Yükleniyor...</span>
        </div>
      }
    >
      <GirisForm />
    </Suspense>
  );
}
