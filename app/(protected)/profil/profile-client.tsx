"use client";

import { useState, useEffect } from "react";
import {
  Flame, Star, Award, TrendingUp, Calendar,
  BookOpen, Brain, ClipboardList, Activity, Calculator,
  Stethoscope, Image,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getBadgeByCode, xpProgress, levelTitle, BADGES } from "@/lib/gamification";
import type { Profile, ActivityLog } from "@/types";

const activityIcons: Record<string, React.ReactNode> = {
  quiz: <ClipboardList className="h-4 w-4 text-green-500" />,
  article: <BookOpen className="h-4 w-4 text-blue-500" />,
  podcast: <Activity className="h-4 w-4 text-purple-500" />,
  video: <Activity className="h-4 w-4 text-red-500" />,
  atlas: <Image className="h-4 w-4 text-cyan-500" />,
  simulation: <Brain className="h-4 w-4 text-purple-500" />,
  debrief: <Stethoscope className="h-4 w-4 text-pink-500" />,
  calculator: <Calculator className="h-4 w-4 text-orange-500" />,
};

const activityLabels: Record<string, string> = {
  quiz: "Quiz",
  article: "Makale",
  podcast: "Podcast",
  video: "Video",
  atlas: "Atlas",
  simulation: "Simülasyon",
  debrief: "Debrief",
  calculator: "Hesaplayıcı",
};

interface GamificationData {
  xp_total: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  last_active: string | null;
  progress: { level: number; currentXP: number; nextLevelXP: number; percent: number };
  title: string;
  badges: { badge_code: string; earned_at: string }[];
  activities: ActivityLog[];
  activityCounts: Record<string, number>;
}

export function ProfileClient() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [gamification, setGamification] = useState<GamificationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData as Profile);

      try {
        const res = await fetch("/api/gamification");
        const json = await res.json();
        setGamification(json.data);
      } catch {
        // hata
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-32 rounded-xl bg-[var(--border)]" />
          <div className="h-20 rounded-xl bg-[var(--border)]" />
          <div className="h-40 rounded-xl bg-[var(--border)]" />
        </div>
      </div>
    );
  }

  if (!profile || !gamification) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 text-center text-[var(--muted-foreground)]">
        Profil yüklenemedi.
      </div>
    );
  }

  const { progress } = gamification;
  const earnedBadgeCodes = gamification.badges.map((b) => b.badge_code);

  const residencyLabels: Record<number, string> = { 1: "1. Yıl", 2: "2. Yıl", 3: "3. Yıl", 4: "4. Yıl" };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Profil Kartı */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-2xl font-bold text-blue-600">
            {profile.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[var(--foreground)]">{profile.full_name}</h1>
            <p className="text-sm text-[var(--muted-foreground)]">{profile.email}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
              {profile.institution && <span>{profile.institution}</span>}
              {profile.residency_year && (
                <span className="rounded bg-blue-500/10 px-2 py-0.5 text-blue-600">
                  {residencyLabels[profile.residency_year]}
                </span>
              )}
              <span className="rounded bg-purple-500/10 px-2 py-0.5 text-purple-600">
                {gamification.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* XP ve İstatistikler */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <Star className="mx-auto h-5 w-5 text-yellow-500 mb-1" />
          <p className="text-2xl font-bold text-[var(--foreground)]">{gamification.xp_total}</p>
          <p className="text-xs text-[var(--muted-foreground)]">Toplam XP</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <Award className="mx-auto h-5 w-5 text-blue-500 mb-1" />
          <p className="text-2xl font-bold text-[var(--foreground)]">{progress.level}</p>
          <p className="text-xs text-[var(--muted-foreground)]">Seviye</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <Flame className="mx-auto h-5 w-5 text-orange-500 mb-1" />
          <p className="text-2xl font-bold text-[var(--foreground)]">{gamification.current_streak}</p>
          <p className="text-xs text-[var(--muted-foreground)]">Streak</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <TrendingUp className="mx-auto h-5 w-5 text-green-500 mb-1" />
          <p className="text-2xl font-bold text-[var(--foreground)]">{gamification.longest_streak}</p>
          <p className="text-xs text-[var(--muted-foreground)]">En Uzun Streak</p>
        </div>
      </div>

      {/* XP İlerleme Çubuğu */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--foreground)]">
            Seviye {progress.level} &rarr; Seviye {progress.level + 1}
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">
            {progress.currentXP} / {progress.nextLevelXP} XP
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-[var(--border)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>

      {/* Rozetler */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 mb-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-500" />
          Rozetler
          <span className="text-xs text-[var(--muted-foreground)] font-normal">
            ({earnedBadgeCodes.length}/{BADGES.length})
          </span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {BADGES.map((badge) => {
            const earned = earnedBadgeCodes.includes(badge.code);
            const earnedAt = gamification.badges.find((b) => b.badge_code === badge.code)?.earned_at;
            return (
              <div
                key={badge.code}
                className={`rounded-lg border p-3 text-center transition-colors ${
                  earned
                    ? "border-yellow-500/30 bg-yellow-500/5"
                    : "border-[var(--border)] bg-[var(--background)] opacity-40"
                }`}
              >
                <span className="text-2xl">{badge.icon}</span>
                <p className="mt-1 text-xs font-medium text-[var(--foreground)]">{badge.name}</p>
                <p className="text-[10px] text-[var(--muted-foreground)]">{badge.description}</p>
                {earned && earnedAt && (
                  <p className="mt-1 text-[10px] text-yellow-600">
                    {new Date(earnedAt).toLocaleDateString("tr-TR")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Aktivite Geçmişi */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-500" />
          Son Aktiviteler
        </h2>
        {gamification.activities.length === 0 ? (
          <p className="text-sm text-[var(--muted-foreground)] text-center py-4">
            Henüz aktivite kaydınız yok.
          </p>
        ) : (
          <div className="space-y-2">
            {gamification.activities.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-lg bg-[var(--background)] px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  {activityIcons[a.activity_type] || <Activity className="h-4 w-4 text-gray-500" />}
                  <span className="text-sm text-[var(--foreground)]">
                    {activityLabels[a.activity_type] || a.activity_type}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-yellow-600">+{a.xp_earned} XP</span>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {new Date(a.created_at).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
