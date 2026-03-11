"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Activity } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function GirisForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-[var(--foreground)]">Acil<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">EM</span></span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Giriş Yap</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Hesabınıza giriş yapın
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-8 shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="email"
              type="email"
              label="E-posta"
              placeholder="doktor@hastane.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              id="password"
              type="password"
              label="Şifre"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full mt-2">
              Giriş Yap
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
            Hesabınız yok mu?{" "}
            <Link href="/kayit" className="text-blue-600 hover:underline font-medium">
              Kayıt Ol
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--muted-foreground)]">
          Bu platform yalnızca eğitim amaçlıdır.{" "}
          <br />
          Klinik kararlar uzman gözetiminde verilmelidir.
        </p>
      </div>
    </div>
  );
}
