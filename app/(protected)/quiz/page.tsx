import type { Metadata } from "next";
import { QuizHome } from "./quiz-home";

export const metadata: Metadata = {
  title: "Quiz — Pratik ve Sınav",
  description: "Acil tıp bilginizi test edin. Pratik modu ile çalışın veya zamanlı sınav ile kendinizi deneyin.",
};

const TOPICS = [
  "kardiyoloji", "pulmoner", "nöroloji", "enfeksiyon",
  "travma", "pediatri", "resüsitasyon", "toksikoloji", "genel",
];

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Quiz</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Acil tıp bilginizi test edin ve öğrenin.
        </p>
      </div>
      <QuizHome topics={TOPICS} />
    </div>
  );
}
