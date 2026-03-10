"use client";

import { useState, useEffect, useRef } from "react";
import type { Question } from "@/types";
import { Check, X, ChevronRight, Clock } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  mode: "pratik" | "sinav";
  onAnswer: (selectedOption: number) => void;
  onNext: () => void;
  onTimeUp: () => void;
  answered: boolean;
  selectedOption: number | null;
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];
const TIME_LIMIT = 90; // saniye

export function QuestionCard({
  question,
  mode,
  onAnswer,
  onNext,
  onTimeUp,
  answered,
  selectedOption,
}: QuestionCardProps) {
  const [localSelected, setLocalSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isAnswered = answered || localSelected !== null;
  const selected = selectedOption ?? localSelected;

  // Reset state on question change
  useEffect(() => {
    setLocalSelected(null);
    setShowExplanation(false);
    setTimeLeft(TIME_LIMIT);
  }, [question.id]);

  // Timer for sınav mode
  useEffect(() => {
    if (mode !== "sinav" || isAnswered) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode, question.id, isAnswered, onTimeUp]);

  const handleSelect = (index: number) => {
    if (isAnswered) return;

    setLocalSelected(index);
    onAnswer(index);

    if (mode === "pratik") {
      setShowExplanation(true);
    }
  };

  const correctIndex = question.options.findIndex((o) => o.is_correct);

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      return "border-[var(--border)] hover:border-cyan-500/50 hover:bg-cyan-500/5 cursor-pointer";
    }

    // Pratik modunda seçim sonrası renkler göster
    if (mode === "pratik" || showExplanation) {
      if (index === correctIndex) {
        return "border-green-500 bg-green-500/10";
      }
      if (index === selected && index !== correctIndex) {
        return "border-red-500 bg-red-500/10";
      }
    }

    // Sınav modunda sadece seçimi göster
    if (mode === "sinav" && index === selected) {
      return "border-cyan-500 bg-cyan-500/10";
    }

    return "border-[var(--border)] opacity-60";
  };

  return (
    <div className="space-y-5">
      {/* Sınav zamanlayıcı */}
      {mode === "sinav" && !isAnswered && (
        <div className="flex items-center justify-end gap-2">
          <Clock className={`h-4 w-4 ${timeLeft <= 15 ? "text-red-500" : "text-[var(--muted-foreground)]"}`} />
          <span
            className={`text-sm font-mono font-semibold ${
              timeLeft <= 15 ? "text-red-500" : "text-[var(--muted-foreground)]"
            }`}
          >
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* Zorluk + konu */}
      <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
        <span className="rounded bg-[var(--muted)] px-2 py-0.5 capitalize">{question.topic}</span>
        {question.difficulty && (
          <span className="rounded bg-[var(--muted)] px-2 py-0.5">
            Zorluk: {question.difficulty}/5
          </span>
        )}
      </div>

      {/* Soru metni */}
      <div className="text-[var(--foreground)] leading-relaxed">
        <p className="text-base">{question.question_text}</p>
        {question.question_image && (
          <div className="mt-3 overflow-hidden rounded-lg border border-[var(--border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={question.question_image}
              alt="Soru görseli"
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Seçenekler */}
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={isAnswered}
            className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors ${getOptionStyle(index)}`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                isAnswered && (mode === "pratik" || showExplanation)
                  ? index === correctIndex
                    ? "bg-green-500 text-white"
                    : index === selected && index !== correctIndex
                      ? "bg-red-500 text-white"
                      : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                  : isAnswered && mode === "sinav" && index === selected
                    ? "bg-cyan-500 text-white"
                    : "bg-[var(--muted)] text-[var(--muted-foreground)]"
              }`}
            >
              {isAnswered && (mode === "pratik" || showExplanation) ? (
                index === correctIndex ? (
                  <Check className="h-3.5 w-3.5" />
                ) : index === selected && index !== correctIndex ? (
                  <X className="h-3.5 w-3.5" />
                ) : (
                  OPTION_LETTERS[index]
                )
              ) : (
                OPTION_LETTERS[index]
              )}
            </span>
            <span className="pt-0.5 text-sm text-[var(--foreground)]">{option.text}</span>
          </button>
        ))}
      </div>

      {/* Pratik modu: Açıklama */}
      {mode === "pratik" && showExplanation && (
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <h3 className="mb-2 text-sm font-semibold text-cyan-400">Açıklama</h3>
          <p className="text-sm leading-relaxed text-[var(--foreground)]">
            {question.explanation}
          </p>
          {question.source && (
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              Kaynak: {question.source}
            </p>
          )}
        </div>
      )}

      {/* Sonraki buton (pratik mod) */}
      {mode === "pratik" && showExplanation && (
        <button
          onClick={onNext}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
        >
          Sonraki Soru
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
