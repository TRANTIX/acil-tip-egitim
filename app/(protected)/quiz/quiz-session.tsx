"use client";

import { useState, useEffect, useCallback } from "react";
import type { Question } from "@/types";
import { QuestionCard } from "./question-card";
import { QuizResults } from "./quiz-results";
import { Loader2, ArrowLeft } from "lucide-react";

interface QuizSessionProps {
  mode: "pratik" | "sinav";
  topic: string;
  count: number;
  onExit: () => void;
}

interface UserAnswer {
  question_id: string;
  selected_option: number;
  is_correct: boolean;
  time_spent: number;
}

export function QuizSession({ mode, topic, count, onExit }: QuizSessionProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [finished, setFinished] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const params = new URLSearchParams({
          limit: count.toString(),
          random: "1",
        });
        if (topic) params.set("topic", topic);

        const res = await fetch(`/api/questions?${params}`);
        const json = await res.json();

        if (!res.ok) {
          setError(json.error || "Sorular yüklenemedi.");
          return;
        }

        if (!json.data || json.data.length === 0) {
          setError("Bu kriterlere uygun soru bulunamadı.");
          return;
        }

        setQuestions(json.data);
      } catch {
        setError("Bağlantı hatası. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [count, topic]);

  const handleAnswer = useCallback(
    (selectedOption: number) => {
      const question = questions[currentIndex];
      const isCorrect = question.options[selectedOption]?.is_correct ?? false;

      const answer: UserAnswer = {
        question_id: question.id,
        selected_option: selectedOption,
        is_correct: isCorrect,
        time_spent: 0,
      };

      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);

      if (mode === "sinav") {
        // Sınav modunda direkt sonraki soruya geç
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          finishQuiz(newAnswers);
        }
      }
      // Pratik modunda açıklama gösterilecek, kullanıcı "Sonraki" diyecek
    },
    [questions, currentIndex, answers, mode],
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz(answers);
    }
  }, [currentIndex, questions.length, answers]);

  const handleTimeUp = useCallback(() => {
    // Süre dolduğunda boş cevap kaydet
    const question = questions[currentIndex];
    const answer: UserAnswer = {
      question_id: question.id,
      selected_option: -1,
      is_correct: false,
      time_spent: 90,
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz(newAnswers);
    }
  }, [questions, currentIndex, answers]);

  const finishQuiz = async (finalAnswers: UserAnswer[]) => {
    setFinished(true);

    const totalTime = Math.round((Date.now() - startTime) / 1000);
    const correctCount = finalAnswers.filter((a) => a.is_correct).length;

    try {
      await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic || null,
          total_questions: questions.length,
          correct_answers: correctCount,
          time_spent: totalTime,
          question_ids: finalAnswers.map((a) => a.question_id),
          answers: finalAnswers,
        }),
      });
    } catch {
      // Sonuç kaydedilemese bile kullanıcıya göster
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
        <p className="mt-3 text-sm text-[var(--muted-foreground)]">Sorular yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-red-500">{error}</p>
        <button
          onClick={onExit}
          className="mt-4 flex items-center gap-2 text-sm text-cyan-500 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <QuizResults
        mode={mode}
        questions={questions}
        answers={answers}
        totalTime={Math.round((Date.now() - startTime) / 1000)}
        onRestart={onExit}
      />
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find((a) => a.question_id === currentQuestion.id);

  return (
    <div>
      {/* Üst bar: ilerleme + çıkış */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Çık
        </button>
        <div className="text-sm text-[var(--muted-foreground)]">
          <span className="font-semibold text-[var(--foreground)]">{currentIndex + 1}</span>
          {" / "}
          {questions.length}
        </div>
      </div>

      {/* İlerleme çubuğu */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[var(--muted)]">
        <div
          className="h-full rounded-full bg-cyan-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <QuestionCard
        question={currentQuestion}
        mode={mode}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onTimeUp={handleTimeUp}
        answered={!!currentAnswer}
        selectedOption={currentAnswer?.selected_option ?? null}
      />
    </div>
  );
}
