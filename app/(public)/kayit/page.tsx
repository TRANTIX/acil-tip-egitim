"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function KayitPage() {
  const supabase = createClient();

  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    institution: "",
    residencyYear: "1",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password.length < 8) {
      setError("Şifre en az 8 karakter olmalıdır.");
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          institution: form.institution,
          residency_year: parseInt(form.residencyYear),
        },
      },
    });

    if (signUpError) {
      setError("Kayıt sırasında bir hata oluştu: " + signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Profil kaydı (trigger ile otomatik oluşur, ama manuel de ekleyebiliriz)
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: form.fullName,
        email: form.email,
        institution: form.institution,
        residency_year: parseInt(form.residencyYear),
        role: "resident",
        status: "pending",
      });

      setStep("success");
    }

    setLoading(false);
  }

  if (step === "success") {
    return (
      <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Kayıt Alındı!</h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Başvurunuz alındı. Hesabınız admin onayından geçtikten sonra aktifleştirilecektir.
          </p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Bu süreç genellikle 1-2 iş günü sürmektedir.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-sm text-white transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">Acil<span className="text-blue-600">EM</span></span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Kayıt Ol</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Ücretsiz hesap oluşturun — admin onayıyla aktifleşir
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="fullName"
              name="fullName"
              type="text"
              label="Ad Soyad"
              placeholder="Dr. Ahmet Yılmaz"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="E-posta"
              placeholder="doktor@hastane.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              id="password"
              name="password"
              type="password"
              label="Şifre"
              placeholder="En az 8 karakter"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
            />
            <Input
              id="institution"
              name="institution"
              type="text"
              label="Kurum / Hastane"
              placeholder="Ankara Şehir Hastanesi"
              value={form.institution}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="residencyYear" className="text-sm font-medium text-[var(--foreground)]">
                Asistanlık Yılı
              </label>
              <select
                id="residencyYear"
                name="residencyYear"
                value={form.residencyYear}
                onChange={handleChange}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm
                  text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1. Yıl</option>
                <option value="2">2. Yıl</option>
                <option value="3">3. Yıl</option>
                <option value="4">4. Yıl</option>
              </select>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full mt-2">
              Kayıt Ol
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
            Zaten hesabınız var mı?{" "}
            <Link href="/giris" className="text-blue-600 hover:underline font-medium">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
