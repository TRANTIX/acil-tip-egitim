"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ContentRating } from "@/types";

interface UseContentRatingOptions {
  contentType: string;
  contentId: string;
}

interface UseContentRatingReturn {
  userRating: ContentRating | null;
  averageRating: number | null;
  totalRatings: number;
  loading: boolean;
  submitRating: (rating: number, comment?: string) => Promise<void>;
}

export function useContentRating({
  contentType,
  contentId,
}: UseContentRatingOptions): UseContentRatingReturn {
  const [userRating, setUserRating] = useState<ContentRating | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchRatings() {
      const supabase = createClient();

      // Ortalama puan ve toplam sayı
      const { data: allRatings } = await supabase
        .from("content_ratings")
        .select("rating")
        .eq("content_type", contentType)
        .eq("content_id", contentId);

      if (!cancelled && allRatings && allRatings.length > 0) {
        const sum = allRatings.reduce((acc, r) => acc + r.rating, 0);
        setAverageRating(Math.round((sum / allRatings.length) * 10) / 10);
        setTotalRatings(allRatings.length);
      }

      // Kullanıcının kendi puanı
      const { data: { user } } = await supabase.auth.getUser();
      if (user && !cancelled) {
        const { data } = await supabase
          .from("content_ratings")
          .select("*")
          .eq("user_id", user.id)
          .eq("content_type", contentType)
          .eq("content_id", contentId)
          .single();

        if (!cancelled) setUserRating(data as ContentRating | null);
      }

      if (!cancelled) setLoading(false);
    }

    fetchRatings();
    return () => { cancelled = true; };
  }, [contentType, contentId]);

  const submitRating = useCallback(
    async (rating: number, comment?: string) => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const payload = {
        user_id: user.id,
        content_type: contentType,
        content_id: contentId,
        rating: Math.min(5, Math.max(1, rating)),
        comment: comment || null,
      };

      const { data } = await supabase
        .from("content_ratings")
        .upsert(payload, { onConflict: "user_id,content_type,content_id" })
        .select()
        .single();

      if (data) {
        setUserRating(data as ContentRating);
        // Ortalamayı yeniden hesapla
        const { data: allRatings } = await supabase
          .from("content_ratings")
          .select("rating")
          .eq("content_type", contentType)
          .eq("content_id", contentId);

        if (allRatings && allRatings.length > 0) {
          const sum = allRatings.reduce((acc, r) => acc + r.rating, 0);
          setAverageRating(Math.round((sum / allRatings.length) * 10) / 10);
          setTotalRatings(allRatings.length);
        }
      }
    },
    [contentType, contentId],
  );

  return { userRating, averageRating, totalRatings, loading, submitRating };
}
