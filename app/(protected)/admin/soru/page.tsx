import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { QuestionForm } from "./question-form";

export const metadata: Metadata = { title: "Soru Ekle — Admin" };

export default async function AdminSoruPage() {
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
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Soru Ekle</h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-8">
        Quiz ve sınav sistemi için yeni soru ekleyin.
      </p>
      <QuestionForm isAdmin={profile.role === "admin"} />
    </div>
  );
}
