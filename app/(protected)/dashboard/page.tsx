import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Brain,
  Calculator,
  BookOpen,
  ClipboardList,
  Stethoscope,
  Activity,
  Award,
  Flame,
  Star,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { xpProgress, levelTitle, getBadgeByCode } from "@/lib/gamification";
import { AIMentorWidget } from "./ai-mentor-widget";
import type { Profile } from "@/types";

const modules = [
  { href: "/simulasyon", icon: Brain, label: "AI Simülasyon", desc: "Vaka çöz", color: "text-purple-500" },
  { href: "/icerikler", icon: BookOpen, label: "İçerikler", desc: "Oku, izle, dinle", color: "text-blue-500" },
  { href: "/quiz", icon: ClipboardList, label: "Quiz", desc: "Bilgini test et", color: "text-green-500" },
  { href: "/prosedurler", icon: Stethoscope, label: "Prosedürler", desc: "Kılavuzlar", color: "text-orange-500" },
  { href: "/hesaplayicilar", icon: Calculator, label: "Hesaplayıcılar", desc: "Klinik hesapla", color: "text-cyan-500" },
  { href: "/debrief", icon: Activity, label: "Debrief", desc: "Nöbet analizi", color: "text-pink-500" },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: gamification } = await supabase
    .from("user_gamification")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Son kazanılan rozetler
  const { data: recentBadges } = await supabase
    .from("user_badges")
    .select("badge_code, earned_at")
    .eq("user_id", user.id)
    .order("earned_at", { ascending: false })
    .limit(4);

  // Son aktiviteler
  const { data: recentActivities } = await supabase
    .from("activity_log")
    .select("activity_type, xp_earned, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const p = profile as Profile;
  const progress = gamification ? xpProgress(gamification.xp_total) : null;
  const title = gamification ? levelTitle(progress!.level) : "";

  const activityLabels: Record<string, string> = {
    quiz: "Quiz", article: "Makale", podcast: "Podcast", video: "Video",
    atlas: "Atlas", simulation: "Simülasyon", debrief: "Debrief", calculator: "Hesaplayıcı",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Karşılama */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Merhaba, {p?.full_name?.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-[var(--muted-foreground)]">
          {title && <span className="text-purple-500 font-medium">{title}</span>}
          {title && " — "}Bugün ne öğrenmek istiyorsun?
        </p>
      </div>

      {/* Stats */}
      {gamification && progress && (
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Card padding="sm" className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-2xl font-bold text-[var(--foreground)]">{gamification.current_streak}</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">Gün Streak</p>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-2xl font-bold text-[var(--foreground)]">{gamification.xp_total}</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">XP</p>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Award className="h-4 w-4 text-blue-500" />
                <span className="text-2xl font-bold text-[var(--foreground)]">{gamification.level}</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">Seviye</p>
            </Card>
          </div>
          {/* XP ilerleme çubuğu */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[var(--muted-foreground)]">Seviye {progress.level} &rarr; {progress.level + 1}</span>
              <span className="text-xs text-[var(--muted-foreground)]">{progress.currentXP}/{progress.nextLevelXP} XP</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--border)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Rozetler + Son Aktiviteler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Son Rozetler */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-1.5">
              <Award className="h-4 w-4 text-yellow-500" />
              Rozetler
            </h3>
            <Link href="/profil" className="text-xs text-blue-600 hover:underline flex items-center gap-0.5">
              Tümü <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          {recentBadges && recentBadges.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {recentBadges.map((b) => {
                const badge = getBadgeByCode(b.badge_code);
                return badge ? (
                  <span
                    key={b.badge_code}
                    className="inline-flex items-center gap-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1.5 text-xs"
                    title={badge.description}
                  >
                    <span>{badge.icon}</span>
                    <span className="text-[var(--foreground)]">{badge.name}</span>
                  </span>
                ) : null;
              })}
            </div>
          ) : (
            <p className="text-xs text-[var(--muted-foreground)]">Henüz rozet kazanılmadı.</p>
          )}
        </div>

        {/* Son Aktiviteler */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-green-500" />
              Son Aktiviteler
            </h3>
            <Link href="/profil" className="text-xs text-blue-600 hover:underline flex items-center gap-0.5">
              Tümü <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          {recentActivities && recentActivities.length > 0 ? (
            <div className="space-y-1.5">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-[var(--foreground)]">{activityLabels[a.activity_type] || a.activity_type}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600 font-medium">+{a.xp_earned} XP</span>
                    <span className="text-[var(--muted-foreground)]">
                      {new Date(a.created_at).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[var(--muted-foreground)]">Henüz aktivite kaydı yok.</p>
          )}
        </div>
      </div>

      {/* AI Eğitmen */}
      <AIMentorWidget />

      {/* Modüller */}
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Modüller</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {modules.map((m) => (
          <Link key={m.href} href={m.href}>
            <Card padding="md" className="hover:border-blue-800/50 transition-all hover:shadow-md cursor-pointer h-full">
              <m.icon className={`h-7 w-7 ${m.color} mb-3`} />
              <h3 className="font-semibold text-[var(--foreground)] text-sm">{m.label}</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{m.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-xs text-[var(--muted-foreground)] text-center">
        Bu platform yalnızca eğitim amaçlıdır. Klinik kararlar güncel kılavuzlar ve uzman gözetiminde verilmelidir.
      </div>
    </div>
  );
}
