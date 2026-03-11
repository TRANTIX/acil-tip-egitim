import type { ActivityType } from "@/types";

// ==========================================
// XP Tablosu
// ==========================================
export const XP_TABLE: Record<ActivityType, number> = {
  quiz: 15,
  article: 10,
  podcast: 10,
  video: 10,
  atlas: 10,
  simulation: 25,
  debrief: 20,
  calculator: 5,
};

// ==========================================
// Seviye Sistemi
// ==========================================
// Her seviye için gereken toplam XP (kümülatif)
export function xpForLevel(level: number): number {
  // level 1 = 0, level 2 = 100, level 3 = 250, ...
  if (level <= 1) return 0;
  return Math.floor(50 * level * (level - 1));
}

export function levelFromXP(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

export function xpProgress(xp: number): { level: number; currentXP: number; nextLevelXP: number; percent: number } {
  const level = levelFromXP(xp);
  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);
  const range = nextLevelXP - currentLevelXP;
  const progress = xp - currentLevelXP;
  return {
    level,
    currentXP: progress,
    nextLevelXP: range,
    percent: range > 0 ? Math.round((progress / range) * 100) : 0,
  };
}

// ==========================================
// Seviye İsimleri
// ==========================================
export function levelTitle(level: number): string {
  if (level <= 2) return "Stajyer";
  if (level <= 5) return "Asistan";
  if (level <= 8) return "Kıdemli Asistan";
  if (level <= 12) return "Uzman Adayı";
  if (level <= 16) return "Uzman";
  return "Eğitim Görevlisi";
}

// ==========================================
// Rozet Tanımları
// ==========================================
export interface BadgeDefinition {
  code: string;
  name: string;
  description: string;
  icon: string; // emoji
  category: "streak" | "quiz" | "content" | "simulation" | "general";
}

export const BADGES: BadgeDefinition[] = [
  // Streak rozetleri
  { code: "streak_3", name: "Üç Gün Üst Üste", description: "3 gün arka arkaya aktif ol", icon: "🔥", category: "streak" },
  { code: "streak_7", name: "Haftalık Disiplin", description: "7 gün arka arkaya aktif ol", icon: "🔥", category: "streak" },
  { code: "streak_30", name: "Ay Boyu Kararlılık", description: "30 gün arka arkaya aktif ol", icon: "🔥", category: "streak" },

  // Quiz rozetleri
  { code: "quiz_first", name: "İlk Quiz", description: "İlk quiz'ini tamamla", icon: "📝", category: "quiz" },
  { code: "quiz_10", name: "Quiz Uzmanı", description: "10 quiz tamamla", icon: "🏆", category: "quiz" },
  { code: "quiz_perfect", name: "Kusursuz Sınav", description: "Bir quiz'de %100 başarı", icon: "💯", category: "quiz" },

  // İçerik rozetleri
  { code: "article_5", name: "Okuyucu", description: "5 makale oku", icon: "📖", category: "content" },
  { code: "article_20", name: "Kitap Kurdu", description: "20 makale oku", icon: "📚", category: "content" },

  // Simülasyon rozetleri
  { code: "sim_first", name: "İlk Simülasyon", description: "İlk simülasyonunu tamamla", icon: "🧪", category: "simulation" },
  { code: "sim_5", name: "Simülasyon Ustası", description: "5 simülasyon tamamla", icon: "🎯", category: "simulation" },

  // Genel rozetler
  { code: "debrief_first", name: "İlk Debrief", description: "İlk nöbet debrief'ini kaydet", icon: "📋", category: "general" },
  { code: "level_5", name: "Seviye 5", description: "Seviye 5'e ulaş", icon: "⭐", category: "general" },
  { code: "level_10", name: "Seviye 10", description: "Seviye 10'a ulaş", icon: "🌟", category: "general" },
  { code: "xp_500", name: "500 XP", description: "Toplam 500 XP kazan", icon: "💎", category: "general" },
  { code: "xp_1000", name: "1000 XP", description: "Toplam 1000 XP kazan", icon: "💎", category: "general" },
];

export function getBadgeByCode(code: string): BadgeDefinition | undefined {
  return BADGES.find((b) => b.code === code);
}

// ==========================================
// Streak Hesaplama
// ==========================================
export function calculateStreak(lastActive: string | null, currentStreak: number): { newStreak: number; streakBroken: boolean } {
  if (!lastActive) {
    return { newStreak: 1, streakBroken: false };
  }

  const last = new Date(lastActive);
  const today = new Date();
  // Gün farkı
  const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());
  const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.floor((todayDay.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Bugün zaten aktif
    return { newStreak: currentStreak, streakBroken: false };
  } else if (diffDays === 1) {
    // Ardışık gün
    return { newStreak: currentStreak + 1, streakBroken: false };
  } else {
    // Streak kırıldı
    return { newStreak: 1, streakBroken: true };
  }
}

// ==========================================
// Rozet Kontrol
// ==========================================
export interface BadgeCheckContext {
  xpTotal: number;
  level: number;
  currentStreak: number;
  activityCounts: Partial<Record<ActivityType, number>>;
  quizPerfect: boolean; // son quiz %100 mü
}

export function checkNewBadges(context: BadgeCheckContext, existingBadges: string[]): string[] {
  const newBadges: string[] = [];

  function check(code: string, condition: boolean) {
    if (condition && !existingBadges.includes(code)) {
      newBadges.push(code);
    }
  }

  // Streak rozetleri
  check("streak_3", context.currentStreak >= 3);
  check("streak_7", context.currentStreak >= 7);
  check("streak_30", context.currentStreak >= 30);

  // Quiz rozetleri
  const quizCount = context.activityCounts.quiz || 0;
  check("quiz_first", quizCount >= 1);
  check("quiz_10", quizCount >= 10);
  check("quiz_perfect", context.quizPerfect);

  // İçerik rozetleri
  const articleCount = context.activityCounts.article || 0;
  check("article_5", articleCount >= 5);
  check("article_20", articleCount >= 20);

  // Simülasyon rozetleri
  const simCount = context.activityCounts.simulation || 0;
  check("sim_first", simCount >= 1);
  check("sim_5", simCount >= 5);

  // Genel rozetler
  const debriefCount = context.activityCounts.debrief || 0;
  check("debrief_first", debriefCount >= 1);
  check("level_5", context.level >= 5);
  check("level_10", context.level >= 10);
  check("xp_500", context.xpTotal >= 500);
  check("xp_1000", context.xpTotal >= 1000);

  return newBadges;
}
