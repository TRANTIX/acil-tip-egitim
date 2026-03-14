import type { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ContentFormTabs } from "./content-form-tabs";

export const metadata: Metadata = { title: "İçerik Ekle — Admin" };

export default async function AdminIcerikPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "editor"].includes(profile.role)) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">İçerik Ekle</h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-8">
        Yeni makale, podcast, video veya atlas görseli ekleyin.
      </p>
      <Suspense fallback={<div className="text-[var(--muted-foreground)] text-sm">Yükleniyor...</div>}>
        <ContentFormTabs isAdmin={profile.role === "admin"} />
      </Suspense>
    </div>
  );
}
