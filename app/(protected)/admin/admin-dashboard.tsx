"use client";

import Link from "next/link";
import {
  Users,
  FileText,
  Headphones,
  Video,
  ImageIcon,
  HelpCircle,
  Activity,
  Bot,
  Gamepad2,
  Brain,
  GitBranch,
  Stethoscope,
} from "lucide-react";
import { AdminUserList } from "./user-list";
import type { Profile } from "@/types";

interface Stats {
  users: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  content: {
    articles: number;
    questions: number;
    scenarios: number;
    procedures: number;
    algorithms: number;
    podcasts: number;
    videos: number;
    atlas: number;
  };
  activity: {
    quizResults: number;
    simulations: number;
    botSubscribers: number;
    totalXp: number;
  };
}

interface AdminDashboardProps {
  stats: Stats;
  pendingUsers: Profile[];
  allUsers: Profile[];
  articles: { id: string; title: string; slug: string; category: string; content_type: string; difficulty: number; status: string; reading_time: number; created_at: string }[];
  questions: { id: string; topic: string; difficulty: number; question_text: string; status: string; created_at: string }[];
  scenarios: { id: string; title: string; category: string; difficulty: number; status: string; created_at: string }[];
  procedures: { id: string; title: string; category: string; status: string; created_at: string }[];
  algorithms: { id: string; title: string; category: string; status: string; created_at: string }[];
  podcasts: { id: string; title: string; category: string; status: string; created_at: string }[];
  videos: { id: string; title: string; category: string; status: string; is_premium: boolean; created_at: string }[];
  atlas: { id: string; title: string; atlas_type: string; category: string; status: string; created_at: string }[];
  recentActivity: { id: string; user_id: string; activity_type: string; xp_earned: number; created_at: string }[];
}

const contentLinks = [
  { href: "/admin/icerik?tab=makale", icon: FileText, label: "Makale Ekle", color: "text-blue-400 bg-blue-950/30 border-blue-900/40" },
  { href: "/admin/icerik?tab=podcast", icon: Headphones, label: "Podcast Ekle", color: "text-purple-400 bg-purple-950/30 border-purple-900/40" },
  { href: "/admin/icerik?tab=video", icon: Video, label: "Video Ekle", color: "text-green-400 bg-green-950/30 border-green-900/40" },
  { href: "/admin/icerik?tab=atlas", icon: ImageIcon, label: "Atlas Görseli Ekle", color: "text-orange-400 bg-orange-950/30 border-orange-900/40" },
  { href: "/admin/soru", icon: HelpCircle, label: "Soru Ekle", color: "text-cyan-400 bg-cyan-950/30 border-cyan-900/40" },
];

export function AdminDashboard({
  stats,
  pendingUsers,
  allUsers,
  articles,
  questions,
  scenarios,
  procedures,
  algorithms,
  podcasts,
  videos,
  atlas,
  recentActivity,
}: AdminDashboardProps) {
  const statCards = [
    { label: "Toplam Kullanıcı", value: stats.users.total, icon: Users, color: "text-blue-400" },
    { label: "Bekleyen Kayıt", value: stats.users.pending, icon: Users, color: "text-yellow-400" },
    { label: "Makale", value: stats.content.articles, icon: FileText, color: "text-emerald-400" },
    { label: "Soru", value: stats.content.questions, icon: HelpCircle, color: "text-cyan-400" },
    { label: "Senaryo", value: stats.content.scenarios, icon: Brain, color: "text-purple-400" },
    { label: "Prosedür", value: stats.content.procedures, icon: Stethoscope, color: "text-pink-400" },
    { label: "Algoritma", value: stats.content.algorithms, icon: GitBranch, color: "text-orange-400" },
    { label: "Podcast", value: stats.content.podcasts, icon: Headphones, color: "text-violet-400" },
    { label: "Video", value: stats.content.videos, icon: Video, color: "text-green-400" },
    { label: "Atlas", value: stats.content.atlas, icon: ImageIcon, color: "text-amber-400" },
    { label: "Quiz Sonucu", value: stats.activity.quizResults, icon: Activity, color: "text-teal-400" },
    { label: "Simülasyon", value: stats.activity.simulations, icon: Brain, color: "text-indigo-400" },
    { label: "Bot Abone", value: stats.activity.botSubscribers, icon: Bot, color: "text-sky-400" },
    { label: "Toplam XP", value: stats.activity.totalXp, icon: Gamepad2, color: "text-rose-400" },
  ];

  const activityLabels: Record<string, string> = {
    quiz_complete: "Quiz",
    article_read: "Makale",
    simulation_complete: "Simülasyon",
    procedure_complete: "Prosedür",
    debrief_create: "Debrief",
    daily_login: "Giriş",
    podcast_listen: "Podcast",
    video_watch: "Video",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Admin Paneli</h1>
      <p className="text-[var(--muted-foreground)] mb-8">Kullanıcı yönetimi, içerik ve istatistikler</p>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <card.icon className={`h-4 w-4 ${card.color}`} />
              <span className="text-xs text-[var(--muted-foreground)]">{card.label}</span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">
              {card.value.toLocaleString("tr-TR")}
            </p>
          </div>
        ))}
      </div>

      {/* İçerik Yönetimi */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          İçerik Yönetimi
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {contentLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer ${link.color}`}>
                <link.icon className="h-6 w-6 mx-auto mb-2" />
                <p className="text-xs font-medium">{link.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Son Aktiviteler */}
      {recentActivity.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Son Aktiviteler
          </h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--muted-foreground)]">
                    <th className="px-4 py-3">Tür</th>
                    <th className="px-4 py-3">XP</th>
                    <th className="px-4 py-3">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.slice(0, 10).map((act) => (
                    <tr key={act.id} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-2.5 text-[var(--foreground)]">
                        {activityLabels[act.activity_type] || act.activity_type}
                      </td>
                      <td className="px-4 py-2.5 text-emerald-400 font-medium">+{act.xp_earned}</td>
                      <td className="px-4 py-2.5 text-[var(--muted-foreground)]">
                        {new Date(act.created_at).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Kullanıcı Yönetimi */}
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
        <Users className="h-5 w-5" />
        Kullanıcı Yönetimi
      </h2>

      {pendingUsers.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-base font-medium text-[var(--foreground)]">
              Bekleyen Kayıtlar
            </h3>
            <span className="rounded-full bg-yellow-950/50 border border-yellow-900 px-2 py-0.5 text-xs text-yellow-400">
              {pendingUsers.length}
            </span>
          </div>
          <AdminUserList users={pendingUsers} filter="pending" />
        </div>
      )}

      <div>
        <h3 className="text-base font-medium text-[var(--foreground)] mb-4">Tüm Kullanıcılar</h3>
        <AdminUserList users={allUsers} filter="all" />
      </div>
    </div>
  );
}
