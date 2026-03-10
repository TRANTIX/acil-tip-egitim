import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, FileText, Headphones, Video, ImageIcon, HelpCircle } from "lucide-react";
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

  const contentLinks = [
    { href: "/admin/icerik?tab=makale", icon: FileText, label: "Makale Ekle", color: "text-blue-400 bg-blue-950/30 border-blue-900/40" },
    { href: "/admin/icerik?tab=podcast", icon: Headphones, label: "Podcast Ekle", color: "text-purple-400 bg-purple-950/30 border-purple-900/40" },
    { href: "/admin/icerik?tab=video", icon: Video, label: "Video Ekle", color: "text-green-400 bg-green-950/30 border-green-900/40" },
    { href: "/admin/icerik?tab=atlas", icon: ImageIcon, label: "Atlas Görseli Ekle", color: "text-orange-400 bg-orange-950/30 border-orange-900/40" },
    { href: "/admin/soru", icon: HelpCircle, label: "Soru Ekle", color: "text-cyan-400 bg-cyan-950/30 border-cyan-900/40" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Admin Paneli</h1>
      <p className="text-[var(--muted-foreground)] mb-8">Kullanıcı yönetimi ve içerik yönetimi</p>

      {/* İçerik Yönetimi */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          İçerik Yönetimi
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

      {/* Kullanıcı Yönetimi */}
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
        <Users className="h-5 w-5" />
        Kullanıcı Yönetimi
      </h2>

      {pendingUsers && pendingUsers.length > 0 && (
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
        <AdminUserList users={allUsers || []} filter="all" />
      </div>
    </div>
  );
}
