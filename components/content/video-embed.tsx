"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoEmbedProps {
  url: string;
  title: string;
}

/**
 * YouTube ve doğrudan video URL'lerini destekler.
 * YouTube URL'si tespit edilirse iframe embed, değilse native <video> kullanır.
 */
export function VideoEmbed({ url, title }: VideoEmbedProps) {
  const [showPlayer, setShowPlayer] = useState(false);

  const youtubeId = extractYouTubeId(url);

  if (youtubeId) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        {!showPlayer ? (
          <button
            onClick={() => setShowPlayer(true)}
            className="relative w-full aspect-video bg-black/80 group cursor-pointer"
            aria-label={`Videoyu oynat: ${title}`}
          >
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600/90 text-white group-hover:bg-green-500 transition-colors">
                <Play className="h-7 w-7 ml-1" />
              </div>
            </div>
          </button>
        ) : (
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        )}
      </div>
    );
  }

  // Doğrudan video dosyası
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      <video
        src={url}
        controls
        preload="metadata"
        className="w-full aspect-video bg-black"
        controlsList="nodownload"
      >
        Tarayıcınız video oynatmayı desteklemiyor.
      </video>
    </div>
  );
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}
