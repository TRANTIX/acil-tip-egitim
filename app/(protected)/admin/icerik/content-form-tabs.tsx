"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FileText, Headphones, Video, ImageIcon } from "lucide-react";

const ArticleForm = lazy(() => import("./article-form").then(m => ({ default: m.ArticleForm })));
const PodcastForm = lazy(() => import("./podcast-form").then(m => ({ default: m.PodcastForm })));
const VideoForm = lazy(() => import("./video-form").then(m => ({ default: m.VideoForm })));
const AtlasForm = lazy(() => import("./atlas-form").then(m => ({ default: m.AtlasForm })));

interface Props {
  isAdmin: boolean;
}

const TABS = [
  { key: "makale", label: "Makale", icon: FileText, color: "text-blue-400" },
  { key: "podcast", label: "Podcast", icon: Headphones, color: "text-purple-400" },
  { key: "video", label: "Video", icon: Video, color: "text-green-400" },
  { key: "atlas", label: "Atlas", icon: ImageIcon, color: "text-orange-400" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const TAB_KEYS = TABS.map((t) => t.key) as unknown as readonly TabKey[];

export function ContentFormTabs({ isAdmin }: Props) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = TAB_KEYS.includes(tabParam as TabKey) ? (tabParam as TabKey) : "makale";
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  useEffect(() => {
    if (tabParam && TAB_KEYS.includes(tabParam as TabKey)) {
      setActiveTab(tabParam as TabKey);
    }
  }, [tabParam]);

  return (
    <div>
      {/* Tab butonları */}
      <div className="flex border-b border-[var(--border)] mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? `border-current ${tab.color}`
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form içeriği — lazy loaded */}
      <Suspense fallback={<div className="flex items-center justify-center py-12 text-sm text-[var(--muted-foreground)]">Form yükleniyor...</div>}>
        {activeTab === "makale" && <ArticleForm isAdmin={isAdmin} />}
        {activeTab === "podcast" && <PodcastForm isAdmin={isAdmin} />}
        {activeTab === "video" && <VideoForm isAdmin={isAdmin} />}
        {activeTab === "atlas" && <AtlasForm isAdmin={isAdmin} />}
      </Suspense>
    </div>
  );
}
