import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { AdminDashboard } from "./admin-dashboard";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  // Tüm istatistikleri paralel çek
  const [
    usersRes,
    pendingRes,
    articlesRes,
    questionsRes,
    scenariosRes,
    proceduresRes,
    algorithmsRes,
    podcastsRes,
    videosRes,
    atlasRes,
    quizResultsRes,
    simulationsRes,
    botSubsRes,
    gamificationRes,
    recentActivityRes,
  ] = await Promise.all([
    admin.from("profiles").select("id, full_name, email, role, status, institution, residency_year, created_at, updated_at", { count: "exact" }).order("created_at", { ascending: false }),
    admin.from("profiles").select("*").eq("status", "pending").order("created_at", { ascending: true }),
    admin.from("articles").select("id, title, slug, category, content_type, difficulty, status, reading_time, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    admin.from("questions").select("id, topic, difficulty, question_text, status, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    admin.from("scenarios").select("id, title, category, difficulty, status, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    admin.from("procedures").select("id, title, category, status, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    admin.from("algorithms").select("id, title, category, status, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    admin.from("podcasts").select("id, title, category, status, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    admin.from("videos").select("id, title, category, status, is_premium, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    admin.from("atlas_images").select("id, title, atlas_type, category, status, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    admin.from("quiz_results").select("id", { count: "exact", head: true }),
    admin.from("simulation_sessions").select("id", { count: "exact", head: true }),
    admin.from("bot_subscribers").select("id, is_active", { count: "exact" }),
    admin.from("user_gamification").select("user_id, xp, level, current_streak", { count: "exact" }),
    admin.from("activity_log").select("id, user_id, activity_type, xp_earned, created_at").order("created_at", { ascending: false }).limit(20),
  ]);

  const stats = {
    users: {
      total: usersRes.count || 0,
      pending: pendingRes.data?.length || 0,
      approved: usersRes.data?.filter(u => u.status === "approved").length || 0,
      rejected: usersRes.data?.filter(u => u.status === "rejected").length || 0,
    },
    content: {
      articles: articlesRes.count || 0,
      questions: questionsRes.count || 0,
      scenarios: scenariosRes.count || 0,
      procedures: proceduresRes.count || 0,
      algorithms: algorithmsRes.count || 0,
      podcasts: podcastsRes.count || 0,
      videos: videosRes.count || 0,
      atlas: atlasRes.count || 0,
    },
    activity: {
      quizResults: quizResultsRes.count || 0,
      simulations: simulationsRes.count || 0,
      botSubscribers: botSubsRes.data?.filter(b => b.is_active).length || 0,
      totalXp: gamificationRes.data?.reduce((sum, g) => sum + (g.xp || 0), 0) || 0,
    },
  };

  return (
    <AdminDashboard
      stats={stats}
      pendingUsers={pendingRes.data || []}
      allUsers={usersRes.data || []}
      articles={articlesRes.data || []}
      questions={questionsRes.data || []}
      scenarios={scenariosRes.data || []}
      procedures={proceduresRes.data || []}
      algorithms={algorithmsRes.data || []}
      podcasts={podcastsRes.data || []}
      videos={videosRes.data || []}
      atlas={atlasRes.data || []}
      recentActivity={recentActivityRes.data || []}
    />
  );
}
