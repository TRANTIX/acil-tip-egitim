"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Activity, LogOut, User } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types";

interface NavbarProps {
  user?: Profile | null;
}

const publicLinks = [
  { href: "/hesaplayicilar", label: "Hesaplayıcılar" },
  { href: "/algoritmalar", label: "Algoritmalar" },
  { href: "/hakkinda", label: "Hakkında" },
];

const protectedLinks = [
  { href: "/dashboard", label: "Panel" },
  { href: "/simulasyon", label: "Simülasyon" },
  { href: "/icerikler", label: "İçerikler" },
  { href: "/quiz", label: "Quiz" },
  { href: "/prosedurler", label: "Prosedürler" },
  { href: "/debrief", label: "Debrief" },
];

export function Navbar({ user }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const links = user ? protectedLinks : publicLinks;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 font-bold text-xl">
          <Activity className="h-6 w-6 text-blue-600" />
          <span className="text-[var(--foreground)]">
            Acil<span className="text-blue-600">EM</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
            aria-label="Tema değiştir"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/profil"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
              >
                <User className="h-4 w-4" />
                {user.full_name.split(" ")[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg p-2 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-[var(--border)] transition-colors"
                aria-label="Çıkış yap"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/giris"
                className="rounded-xl px-4 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                href="/kayit"
                className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm text-white transition-colors"
              >
                Kayıt Ol
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--border)] transition-colors"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--card)] px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/profil" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-[var(--muted-foreground)] hover:bg-[var(--border)]">
                  Profil
                </Link>
                <button onClick={handleLogout} className="rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-[var(--border)] text-left">
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link href="/giris" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-[var(--muted-foreground)] hover:bg-[var(--border)]">
                  Giriş Yap
                </Link>
                <Link href="/kayit" onClick={() => setMenuOpen(false)} className="mt-1 rounded-xl bg-blue-600 px-3 py-2.5 text-sm text-white text-center">
                  Kayıt Ol
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
