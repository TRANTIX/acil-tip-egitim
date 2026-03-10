"use client";

import { useState } from "react";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { QuizSession } from "./quiz-session";

interface QuizHomeProps {
  topics: string[];
}

const TOPIC_LABELS: Record<string, string> = {
  kardiyoloji: "Kardiyoloji",
  pulmoner: "Pulmoner",
  nöroloji: "Nöroloji",
  enfeksiyon: "Enfeksiyon",
  travma: "Travma",
  pediatri: "Pediatri",
  resüsitasyon: "Resüsitasyon",
  toksikoloji: "Toksikoloji",
  genel: "Genel",
};

const QUESTION_COUNTS = [5, 10, 20, 30];

type QuizMode = "pratik" | "sinav";

interface QuizConfig {
  mode: QuizMode;
  topic: string;
  count: number;
}

export function QuizHome({ topics }: QuizHomeProps) {
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [selectedMode, setSelectedMode] = useState<QuizMode>("pratik");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedCount, setSelectedCount] = useState(10);

  if (config) {
    return (
      <QuizSession
        mode={config.mode}
        topic={config.topic}
        count={config.count}
        onExit={() => setConfig(null)}
      />
    );
  }

  const handleStart = () => {
    setConfig({
      mode: selectedMode,
      topic: selectedTopic,
      count: selectedCount,
    });
  };

  return (
    <div className="space-y-8">
      {/* Mod seçimi */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Mod Seçimi
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={() => setSelectedMode("pratik")}
            className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
              selectedMode === "pratik"
                ? "border-cyan-500 bg-cyan-500/10"
                : "border-[var(--border)] hover:border-cyan-500/50"
            }`}
          >
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
            <div>
              <div className="font-semibold text-[var(--foreground)]">Pratik Modu</div>
              <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                Her soru sonrası açıklamayı görün. Zamansız, öğrenmeye odaklı.
              </p>
            </div>
          </button>
          <button
            onClick={() => setSelectedMode("sinav")}
            className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
              selectedMode === "sinav"
                ? "border-orange-500 bg-orange-500/10"
                : "border-[var(--border)] hover:border-orange-500/50"
            }`}
          >
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
            <div>
              <div className="font-semibold text-[var(--foreground)]">Sınav Modu</div>
              <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                Soru başına 90 saniye. Sonuçlar en sonda gösterilir.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Konu seçimi */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Konu (isteğe bağlı)
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTopic("")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              !selectedTopic
                ? "bg-cyan-500 text-white"
                : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]"
            }`}
          >
            Tümü
          </button>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic === selectedTopic ? "" : topic)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedTopic === topic
                  ? "bg-cyan-500 text-white"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]"
              }`}
            >
              {TOPIC_LABELS[topic] || topic}
            </button>
          ))}
        </div>
      </div>

      {/* Soru sayısı */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Soru Sayısı
        </h2>
        <div className="flex gap-2">
          {QUESTION_COUNTS.map((count) => (
            <button
              key={count}
              onClick={() => setSelectedCount(count)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCount === count
                  ? "bg-cyan-500 text-white"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]"
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Başlat */}
      <button
        onClick={handleStart}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
      >
        {selectedMode === "pratik" ? "Pratiğe Başla" : "Sınava Başla"}
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Tıbbi disclaimer */}
      <p className="text-xs text-[var(--muted-foreground)] text-center">
        ⚠ Bu sorular eğitim amaçlıdır. Klinik karar verme sürecinde tek başına kullanılmamalıdır.
      </p>
    </div>
  );
}
