"use client";

import { useState } from "react";
import { Eye, EyeOff, ZoomIn, ZoomOut } from "lucide-react";

interface AtlasViewerProps {
  imageUrl: string;
  annotatedUrl?: string;
  normalUrl?: string;
  title: string;
  keyFindings?: string[];
}

type ViewMode = "original" | "annotated" | "normal";

export function AtlasViewer({
  imageUrl,
  annotatedUrl,
  normalUrl,
  title,
  keyFindings,
}: AtlasViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("original");
  const [showFindings, setShowFindings] = useState(false);
  const [zoom, setZoom] = useState(1);

  const currentUrl =
    viewMode === "annotated" && annotatedUrl
      ? annotatedUrl
      : viewMode === "normal" && normalUrl
        ? normalUrl
        : imageUrl;

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        {/* Görünüm seçimi */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode("original")}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "original"
                ? "bg-orange-600 text-white"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Orijinal
          </button>
          {annotatedUrl && (
            <button
              onClick={() => setViewMode("annotated")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                viewMode === "annotated"
                  ? "bg-orange-600 text-white"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              İşaretli
            </button>
          )}
          {normalUrl && (
            <button
              onClick={() => setViewMode("normal")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                viewMode === "normal"
                  ? "bg-orange-600 text-white"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              Normal
            </button>
          )}
        </div>

        {/* Zoom + bulgular */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Uzaklaştır"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="px-2 py-1 rounded-lg text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors min-w-[3rem] text-center"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Yakınlaştır"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          {keyFindings && keyFindings.length > 0 && (
            <button
              onClick={() => setShowFindings(!showFindings)}
              className={`ml-2 flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                showFindings
                  ? "bg-yellow-600 text-white"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {showFindings ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              Bulgular
            </button>
          )}
        </div>
      </div>

      {/* Görüntü alanı */}
      <div className="relative overflow-auto bg-black/90" style={{ maxHeight: "70vh" }}>
        <div
          className="flex items-center justify-center min-h-[300px] transition-transform duration-200"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentUrl}
            alt={title}
            className="max-w-full h-auto"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Anahtar bulgular paneli */}
      {showFindings && keyFindings && keyFindings.length > 0 && (
        <div className="border-t border-[var(--border)] px-4 py-3 bg-yellow-950/20">
          <h4 className="text-xs font-semibold text-yellow-400 mb-2">Anahtar Bulgular</h4>
          <ul className="space-y-1">
            {keyFindings.map((finding, i) => (
              <li key={i} className="text-xs text-[var(--muted-foreground)] flex items-start gap-1.5">
                <span className="text-yellow-400 mt-0.5 shrink-0">{i + 1}.</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
