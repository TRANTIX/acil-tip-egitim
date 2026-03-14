"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import {
  Sun, Moon, LogOut, User,
  Calculator, Brain, BookOpen, HelpCircle,
  Stethoscope, ClipboardList, LayoutDashboard,
  Shield, MoreHorizontal, Info, GitBranch,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types";
import type { LucideIcon } from "lucide-react";

interface NavbarProps {
  user?: Profile | null;
}

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

const publicLinks: NavLink[] = [
  { href: "/hesaplayicilar", label: "Hesaplayıcılar", icon: Calculator },
  { href: "/algoritmalar", label: "Algoritmalar", icon: GitBranch },
  { href: "/hakkinda", label: "Hakkında", icon: Info },
];

const protectedLinks: NavLink[] = [
  { href: "/dashboard", label: "Panel", icon: LayoutDashboard },
  { href: "/simulasyon", label: "Simülasyon", icon: Brain },
  { href: "/icerikler", label: "İçerikler", icon: BookOpen },
  { href: "/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/prosedurler", label: "Prosedürler", icon: Stethoscope },
  { href: "/debrief", label: "Debrief", icon: ClipboardList },
];

// Mobil bottom bar icin en onemli 4 link + "Daha Fazla"
const publicBottomTabs: NavLink[] = [
  { href: "/hesaplayicilar", label: "Hesapla", icon: Calculator },
  { href: "/algoritmalar", label: "Algoritma", icon: GitBranch },
  { href: "/giris", label: "Giriş", icon: User },
];

const protectedBottomTabs: NavLink[] = [
  { href: "/dashboard", label: "Panel", icon: LayoutDashboard },
  { href: "/simulasyon", label: "Simülasyon", icon: Brain },
  { href: "/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/icerikler", label: "İçerik", icon: BookOpen },
];

export function Navbar({ user }: NavbarProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer acikken body scroll'u kilitle
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const router = useRouter();
  const supabase = createClient();

  const allLinks = user
    ? user.role === "admin"
      ? [...protectedLinks, { href: "/admin", label: "Admin", icon: Shield }]
      : protectedLinks
    : publicLinks;

  const bottomTabs = user ? protectedBottomTabs : publicBottomTabs;

  const isActive = useCallback((href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }, [pathname]);

  async function handleLogout() {
    setDrawerOpen(false);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      {/* ── Top Header ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 print:hidden ${
          scrolled
            ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12 h-14 md:h-16">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
            <svg className="w-9 h-9 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <span className="text-lg md:text-xl font-bold tracking-tight text-[var(--foreground)]">
              Acil<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">EM</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Ana menü">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors group ${
                  isActive(link.href)
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-blue-500 rounded-full transition-transform duration-300 origin-left ${
                  isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center gap-2">
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
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isActive("/profil") ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
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
          </div>
        </div>
      </header>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--background)]/90 backdrop-blur-xl border-t border-white/10 print:hidden safe-bottom"
        aria-label="Mobil navigasyon"
      >
        <div className="flex items-center justify-around h-16 px-1">
          {bottomTabs.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-xl transition-colors ${
                  active
                    ? "text-blue-400"
                    : "text-[var(--muted-foreground)] active:text-[var(--foreground)]"
                }`}
              >
                <tab.icon className={`h-5 w-5 ${active ? "drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]" : ""}`} />
                <span className="text-[10px] font-medium leading-tight">{tab.label}</span>
              </Link>
            );
          })}

          {/* "Daha Fazla" butonu → drawer acar */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-xl transition-colors ${
              drawerOpen
                ? "text-blue-400"
                : "text-[var(--muted-foreground)] active:text-[var(--foreground)]"
            }`}
            aria-label="Daha fazla menü"
            aria-expanded={drawerOpen}
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-[10px] font-medium leading-tight">Menü</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile Bottom Sheet Drawer ── */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden print:hidden transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        className={`fixed bottom-0 left-0 right-0 z-[70] md:hidden print:hidden transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-[var(--card)] rounded-t-3xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] max-h-[80vh] overflow-y-auto">
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Drawer icerik */}
          <nav className="px-4 pb-6 pt-2" aria-label="Tüm menü">
            {/* Kullanici bilgisi */}
            {user && (
              <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-2xl bg-white/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--foreground)] truncate">{user.full_name}</p>
                  <p className="text-xs text-[var(--muted-foreground)] truncate">{user.email}</p>
                </div>
              </div>
            )}

            {/* Tum linkler */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {allLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3.5 transition-colors ${
                      active
                        ? "bg-blue-500/15 text-blue-400"
                        : "bg-white/5 text-[var(--muted-foreground)] hover:bg-white/10 hover:text-[var(--foreground)] active:bg-white/15"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="text-xs font-medium text-center leading-tight">{link.label}</span>
                  </Link>
                );
              })}

              {/* Hesaplayicilar (giris yapmis kullanicilar icin de kolay erisim) */}
              {user && (
                <Link
                  href="/hesaplayicilar"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3.5 transition-colors ${
                    isActive("/hesaplayicilar")
                      ? "bg-blue-500/15 text-blue-400"
                      : "bg-white/5 text-[var(--muted-foreground)] hover:bg-white/10 active:bg-white/15"
                  }`}
                >
                  <Calculator className="h-5 w-5" />
                  <span className="text-xs font-medium text-center leading-tight">Hesapla</span>
                </Link>
              )}
            </div>

            {/* Alt aksiyonlar */}
            <div className="flex flex-col gap-1 border-t border-white/10 pt-3">
              {user && (
                <>
                  <Link
                    href="/profil"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-white/5 active:bg-white/10 transition-colors"
                  >
                    <User className="h-4.5 w-4.5" />
                    Profil
                  </Link>
                  <button
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-white/5 active:bg-white/10 transition-colors text-left w-full"
                  >
                    {mounted && resolvedTheme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
                    {mounted && resolvedTheme === "dark" ? "Açık Tema" : "Koyu Tema"}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 active:bg-red-500/15 transition-colors text-left w-full"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                    Çıkış Yap
                  </button>
                </>
              )}

              {!user && (
                <>
                  <button
                    onClick={() => { setDrawerOpen(false); setTheme(resolvedTheme === "dark" ? "light" : "dark"); }}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-white/5 active:bg-white/10 transition-colors text-left w-full"
                  >
                    {mounted && resolvedTheme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
                    {mounted && resolvedTheme === "dark" ? "Açık Tema" : "Koyu Tema"}
                  </button>
                  <Link
                    href="/giris"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-white/5 active:bg-white/10 transition-colors"
                  >
                    <User className="h-4.5 w-4.5" />
                    Giriş Yap
                  </Link>
                  <Link
                    href="/kayit"
                    onClick={() => setDrawerOpen(false)}
                    className="mt-1 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-3 text-sm text-white font-semibold transition-opacity hover:opacity-90 active:opacity-80"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom bar icin sayfa altinda bosluk — mobilde icerik bottom bar'in altinda kalmasin */}
      <div className="h-16 md:hidden print:hidden" />
    </>
  );
}
