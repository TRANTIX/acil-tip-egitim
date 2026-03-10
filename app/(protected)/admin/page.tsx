import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminUserList } from "./user-list";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  const { data: pendingUsers } = await supabase
    .from("profiles")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  const { data: allUsers } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Admin Paneli</h1>
      <p className="text-[var(--muted-foreground)] mb-8">Kullanıcı yönetimi ve platform istatistikleri</p>

      {pendingUsers && pendingUsers.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Bekleyen Kayıtlar
            </h2>
            <span className="rounded-full bg-yellow-950/50 border border-yellow-900 px-2 py-0.5 text-xs text-yellow-400">
              {pendingUsers.length}
            </span>
          </div>
          <AdminUserList users={pendingUsers} filter="pending" />
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Tüm Kullanıcılar</h2>
        <AdminUserList users={allUsers || []} filter="all" />
      </div>
    </div>
  );
}
