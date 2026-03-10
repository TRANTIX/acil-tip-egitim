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
} from "lucide-react";
import { Card } from "@/components/ui/card";
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

  const p = profile as Profile;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Karşılama */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Merhaba, {p?.full_name?.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-[var(--muted-foreground)]">Bugün ne öğrenmek istiyorsun?</p>
      </div>

      {/* Stats */}
      {gamification && (
        <div className="grid grid-cols-3 gap-4 mb-8">
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
      )}

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
