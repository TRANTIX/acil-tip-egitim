"use client";

import { useState } from "react";
import type { Question } from "@/types";
import { Trophy, Clock, Target, RotateCcw, ChevronDown, ChevronUp, Check, X, Zap, Flame, Award } from "lucide-react";

interface UserAnswer {
  question_id: string;
  selected_option: number;
  is_correct: boolean;
  time_spent: number;
}

interface GamificationResult {
  xp_earned: number;
  xp_total: number;
  level: number;
  streak: number;
  new_badges: string[];
}

interface QuizResultsProps {
  mode: "pratik" | "sinav";
  questions: Question[];
  answers: UserAnswer[];
  totalTime: number;
  onRestart: () => void;
  gamification?: GamificationResult | null;
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

export function QuizResults({ questions, answers, totalTime, onRestart, gamification }: QuizResultsProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const correctCount = answers.filter((a) => a.is_correct).length;
  const unanswered = answers.filter((a) => a.selected_option === -1).length;
  const percentage = Math.round((correctCount / questions.length) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}dk ${secs}sn`;
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return "Mükemmel! Harika bir performans.";
    if (percentage >= 80) return "Çok iyi! Başarılı bir sonuç.";
    if (percentage >= 60) return "İyi! Biraz daha pratik faydalı olabilir.";
    if (percentage >= 40) return "Orta. Konuları tekrar gözden geçirmenizi öneririz.";
    return "Daha fazla çalışma gerekiyor. Pes etmeyin!";
  };

  return (
    <div className="space-y-8">
      {/* Sonuç özeti */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className={`flex h-20 w-20 items-center justify-center rounded-full ${
            percentage >= 60 ? "bg-green-500/10" : "bg-red-500/10"
          }`}>
            <Trophy className={`h-10 w-10 ${getScoreColor()}`} />
          </div>
        </div>

        <div className={`text-5xl font-bold ${getScoreColor()}`}>
          %{percentage}
        </div>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">{getScoreMessage()}</p>

        <div className="mt-6 flex justify-center gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-lg font-bold text-[var(--foreground)]">{correctCount}</span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">Doğru</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <X className="h-4 w-4 text-red-500" />
              <span className="text-lg font-bold text-[var(--foreground)]">
                {questions.length - correctCount - unanswered}
              </span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">Yanlış</p>
          </div>
          {unanswered > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-lg font-bold text-[var(--foreground)]">{unanswered}</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">Boş</p>
            </div>
          )}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Clock className="h-4 w-4 text-[var(--muted-foreground)]" />
              <span className="text-lg font-bold text-[var(--foreground)]">{formatTime(totalTime)}</span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">Süre</p>
          </div>
        </div>
      </div>

      {/* XP ve rozet bilgisi */}
      {gamification && (
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-[var(--foreground)]">
                <span className="font-bold text-yellow-500">+{gamification.xp_earned} XP</span> kazandın
              </span>
            </div>
            {gamification.streak > 0 && (
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-sm text-[var(--foreground)]">
                  <span className="font-bold text-orange-500">{gamification.streak} gün</span> streak
                </span>
              </div>
            )}
            <div className="text-sm text-[var(--muted-foreground)]">
              Seviye {gamification.level} · Toplam {gamification.xp_total} XP
            </div>
          </div>
          {gamification.new_badges.length > 0 && (
            <div className="mt-3 flex items-center gap-2 border-t border-cyan-500/20 pt-3">
              <Award className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-purple-400">
                Yeni rozet: {gamification.new_badges.join(", ")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Soru detayları — sınav modunda her sorunun açıklamasını göster */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Soru Detayları</h2>
        <div className="space-y-2">
          {questions.map((question, qIndex) => {
            const answer = answers.find((a) => a.question_id === question.id);
            const isCorrect = answer?.is_correct ?? false;
            const wasUnanswered = answer?.selected_option === -1;
            const isExpanded = expandedQuestion === question.id;
            const correctIndex = question.options.findIndex((o) => o.is_correct);

            return (
              <div
                key={question.id}
                className="overflow-hidden rounded-lg border border-[var(--border)]"
              >
                <button
                  onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
                  className="flex w-full items-center gap-3 p-3 text-left hover:bg-[var(--muted)]/50 transition-colors"
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      wasUnanswered
                        ? "bg-yellow-500"
                        : isCorrect
                          ? "bg-green-500"
                          : "bg-red-500"
                    }`}
                  >
                    {wasUnanswered ? "–" : isCorrect ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  </span>
                  <span className="flex-1 text-sm text-[var(--foreground)] line-clamp-1">
                    <span className="font-medium text-[var(--muted-foreground)]">S{qIndex + 1}.</span>{" "}
                    {question.question_text}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-[var(--muted-foreground)]" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-[var(--muted-foreground)]" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-[var(--border)] p-4 space-y-3">
                    {/* Soru metni */}
                    <p className="text-sm text-[var(--foreground)]">{question.question_text}</p>

                    {/* Seçenekler */}
                    <div className="space-y-1.5">
                      {question.options.map((option, oIndex) => {
                        const isUserChoice = answer?.selected_option === oIndex;
                        const isCorrectOption = oIndex === correctIndex;

                        let style = "text-[var(--muted-foreground)]";
                        if (isCorrectOption) style = "text-green-500 font-medium";
                        if (isUserChoice && !isCorrectOption) style = "text-red-500 line-through";

                        return (
                          <div key={oIndex} className={`flex items-start gap-2 text-sm ${style}`}>
                            <span className="font-bold">{OPTION_LETTERS[oIndex]}.</span>
                            <span>{option.text}</span>
                            {isCorrectOption && <Check className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />}
                            {isUserChoice && !isCorrectOption && <X className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Açıklama */}
                    <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
                      <h4 className="mb-1 text-xs font-semibold text-cyan-400">Açıklama</h4>
                      <p className="text-sm leading-relaxed text-[var(--foreground)]">
                        {question.explanation}
                      </p>
                      {question.source && (
                        <p className="mt-1.5 text-xs text-[var(--muted-foreground)]">
                          Kaynak: {question.source}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Yeniden başla */}
      <button
        onClick={onRestart}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
      >
        <RotateCcw className="h-4 w-4" />
        Yeni Quiz Başlat
      </button>
    </div>
  );
}
