"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidChartProps {
  chart: string;
}

export function MermaidChart({ chart }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#10b981",
            primaryTextColor: "#f5f5f5",
            primaryBorderColor: "#34d399",
            lineColor: "#6b7280",
            secondaryColor: "#1f2937",
            tertiaryColor: "#374151",
            fontFamily: "inherit",
            fontSize: "14px",
          },
          flowchart: {
            htmlLabels: true,
            curve: "basis",
            padding: 15,
          },
        });

        if (cancelled || !containerRef.current) return;

        const id = `mermaid-${Date.now()}`;
        const { svg } = await mermaid.render(id, chart);

        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svg;
        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError("Flowchart yüklenemedi.");
          setLoading(false);
          console.error("Mermaid render error:", err);
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-center text-sm text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </div>
      )}
      <div
        ref={containerRef}
        className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 [&_svg]:mx-auto [&_svg]:max-w-full"
      />
    </div>
  );
}
