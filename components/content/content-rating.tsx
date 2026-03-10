"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useContentRating } from "@/hooks/use-content-rating";

interface ContentRatingProps {
  contentType: string;
  contentId: string;
}

export function ContentRatingWidget({ contentType, contentId }: ContentRatingProps) {
  const { userRating, averageRating, totalRatings, loading, submitRating } =
    useContentRating({ contentType, contentId });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-4 w-4 opacity-20" />
          ))}
        </div>
        <span>Yükleniyor...</span>
      </div>
    );
  }

  const currentRating = userRating?.rating || 0;
  const displayRating = hoveredStar || currentRating;

  const handleClick = async (star: number) => {
    if (submitting) return;
    setSubmitting(true);
    await submitRating(star);
    setSubmitting(false);
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--muted-foreground)] mb-1.5">
            {userRating ? "Puanınız" : "Bu içeriği puanlayın"}
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleClick(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                disabled={submitting}
                className="p-0.5 transition-transform hover:scale-110 disabled:opacity-50"
                aria-label={`${star} yıldız`}
              >
                <Star
                  className={`h-5 w-5 transition-colors ${
                    star <= displayRating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-[var(--muted-foreground)]/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {averageRating !== null && totalRatings > 0 && (
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {averageRating}
              </span>
            </div>
            <p className="text-[10px] text-[var(--muted-foreground)]">
              {totalRatings} değerlendirme
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
