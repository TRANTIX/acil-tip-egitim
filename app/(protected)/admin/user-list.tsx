"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, User, Building, Calendar } from "lucide-react";
import type { Profile } from "@/types";

interface AdminUserListProps {
  users: Profile[];
  filter: "pending" | "all";
}

const statusLabels: Record<string, string> = {
  pending: "Bekliyor",
  approved: "Onaylı",
  rejected: "Reddedildi",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-950/50 border-yellow-900 text-yellow-400",
  approved: "bg-green-950/50 border-green-900 text-green-400",
  rejected: "bg-red-950/50 border-red-900 text-red-400",
};

export function AdminUserList({ users, filter }: AdminUserListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [localUsers, setLocalUsers] = useState(users);
  const supabase = createClient();

  async function updateStatus(userId: string, status: "approved" | "rejected") {
    setLoadingId(userId);
    const { error } = await supabase
      .from("profiles")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (!error) {
      if (filter === "pending") {
        setLocalUsers((prev) => prev.filter((u) => u.id !== userId));
      } else {
        setLocalUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, status } : u))
        );
      }
    }
    setLoadingId(null);
  }

  if (localUsers.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-10 text-center text-[var(--muted-foreground)]">
        {filter === "pending" ? "Bekleyen kayıt yok." : "Kullanıcı yok."}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {localUsers.map((user) => (
        <Card key={user.id} padding="md" className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--border)]">
              <User className="h-5 w-5 text-[var(--muted-foreground)]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-[var(--foreground)] truncate">{user.full_name}</span>
                <span className={`rounded-full border px-2 py-0.5 text-xs ${statusColors[user.status]}`}>
                  {statusLabels[user.status]}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] truncate">{user.email}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-[var(--muted-foreground)]">
                {user.institution && (
                  <span className="flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    {user.institution}
                  </span>
                )}
                {user.residency_year && (
                  <span>{user.residency_year}. Yıl Asistanı</span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(user.created_at).toLocaleDateString("tr-TR")}
                </span>
              </div>
            </div>
          </div>

          {(user.status === "pending" || filter === "all") && (
            <div className="flex gap-2 shrink-0">
              {user.status !== "approved" && (
                <Button
                  size="sm"
                  variant="primary"
                  loading={loadingId === user.id}
                  onClick={() => updateStatus(user.id, "approved")}
                  className="gap-1.5"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Onayla
                </Button>
              )}
              {user.status !== "rejected" && (
                <Button
                  size="sm"
                  variant="danger"
                  loading={loadingId === user.id}
                  onClick={() => updateStatus(user.id, "rejected")}
                  className="gap-1.5"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Reddet
                </Button>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
