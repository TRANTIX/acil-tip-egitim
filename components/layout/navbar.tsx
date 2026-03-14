"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, LogOut, User, Shield } from "lucide-react";
import { useState, useEffect } from "react";
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
  const { setTheme, resolvedTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const router = useRouter();
  const supabase = createClient();

  const links = user
    ? user.role === "admin"
      ? [...protectedLinks, { href: "/admin", label: "Admin" }]
      : protectedLinks
    : publicLinks;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 print:hidden ${
        scrolled
          ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12 h-16">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
          <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="24" fill="url(#pulse-grad-nav)" />
            <path d="M15 55 H30 L40 25 L55 80 L65 50 H75" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M85 40 C85 45.5228 89.4772 50 95 50 C89.4772 50 85 54.4772 85 60 C85 54.4772 80.5228 50 75 50 C80.5228 50 85 45.5228 85 40 Z" fill="white"/>
            <defs>
              <linearGradient id="pulse-grad-nav" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
            Acil<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">EM</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Ana menü">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/5 transition-colors"
            aria-label="Tema değiştir"
          >
            {mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/profil"
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <User className="h-4 w-4" />
                {user.full_name.split(" ")[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg p-2 text-[var(--muted-foreground)] hover:text-red-400 transition-colors"
                aria-label="Çıkış yap"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/giris"
                className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                href="/kayit"
                className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] group hover:scale-105 transition-transform duration-300"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3B82F6_0%,#06B6D4_50%,#3B82F6_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[var(--background)] px-5 text-sm font-medium text-[var(--foreground)] backdrop-blur-3xl group-hover:bg-[var(--card)] transition-colors">
                  Kayıt Ol
                </span>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden rounded-lg p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/5 transition-colors"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-white/5 bg-[var(--background)]/95 backdrop-blur-xl px-4 pb-4 pt-2" role="navigation" aria-label="Mobil menü">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/profil" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-white/5">
                  Profil
                </Link>
                <button onClick={handleLogout} className="rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 text-left">
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link href="/giris" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-white/5">
                  Giriş Yap
                </Link>
                <Link href="/kayit" onClick={() => setMenuOpen(false)} className="mt-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2.5 text-sm text-white text-center font-medium">
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
