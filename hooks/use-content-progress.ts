"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ContentProgress } from "@/types";

interface UseContentProgressOptions {
  contentType: string;
  contentId: string;
}

interface UseContentProgressReturn {
  progress: ContentProgress | null;
  loading: boolean;
  updateProgress: (value: number, lastPosition?: number) => Promise<void>;
  markCompleted: () => Promise<void>;
}

export function useContentProgress({
  contentType,
  contentId,
}: UseContentProgressOptions): UseContentProgressReturn {
  const [progress, setProgress] = useState<ContentProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // İlerlemeyi yükle
  useEffect(() => {
    let cancelled = false;

    async function fetchProgress() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("content_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("content_type", contentType)
        .eq("content_id", contentId)
        .single();

      if (!cancelled) {
        setProgress(data as ContentProgress | null);
        setLoading(false);
      }
    }

    fetchProgress();
    return () => { cancelled = true; };
  }, [contentType, contentId]);

  // İlerlemeyi güncelle (upsert)
  const updateProgress = useCallback(
    async (value: number, lastPosition?: number) => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const payload = {
        user_id: user.id,
        content_type: contentType,
        content_id: contentId,
        progress: Math.min(100, Math.max(0, value)),
        last_position: lastPosition ?? 0,
        updated_at: new Date().toISOString(),
        ...(value >= 100 ? { completed: true, completed_at: new Date().toISOString() } : {}),
      };

      const { data } = await supabase
        .from("content_progress")
        .upsert(payload, { onConflict: "user_id,content_type,content_id" })
        .select()
        .single();

      if (data) setProgress(data as ContentProgress);
    },
    [contentType, contentId],
  );

  // Tamamlandı olarak işaretle
  const markCompleted = useCallback(async () => {
    await updateProgress(100);
  }, [updateProgress]);

  return { progress, loading, updateProgress, markCompleted };
}
