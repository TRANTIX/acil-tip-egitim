"use client";

import { useState } from "react";
import { FileText, Headphones, Video, ImageIcon } from "lucide-react";
import { ArticleForm } from "./article-form";
import { PodcastForm } from "./podcast-form";
import { VideoForm } from "./video-form";
import { AtlasForm } from "./atlas-form";

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

export function ContentFormTabs({ isAdmin }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("makale");

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

      {/* Form içeriği */}
      {activeTab === "makale" && <ArticleForm isAdmin={isAdmin} />}
      {activeTab === "podcast" && <PodcastForm isAdmin={isAdmin} />}
      {activeTab === "video" && <VideoForm isAdmin={isAdmin} />}
      {activeTab === "atlas" && <AtlasForm isAdmin={isAdmin} />}
    </div>
  );
}
