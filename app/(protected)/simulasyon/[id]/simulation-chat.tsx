"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Scenario } from "@/types";
import {
  ArrowLeft, Send, Loader2, Heart, Thermometer,
  Activity, Brain, Wind, Gauge, Stethoscope,
  Syringe, Pill, TestTube, ImageIcon, Clipboard,
  BarChart3, CheckCircle2, AlertTriangle, Lightbulb, Trophy,
} from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

interface Vitals {
  hr: number;
  bp: string;
  rr: number;
  spo2: number;
  temp: number;
  gcs: number;
}

const QUICK_ACTIONS = [
  { label: "Fizik Muayene", action: "Tam fizik muayene yapıyorum", icon: Stethoscope },
  { label: "IV Erişim", action: "Periferik IV erişim açıyorum", icon: Syringe },
  { label: "Monitör Bağla", action: "Kardiyak monitör ve pulse oksimetre bağlıyorum", icon: Activity },
  { label: "EKG", action: "12 derivasyonlu EKG çekiyorum", icon: Activity },
  { label: "Kan Tetkikleri", action: "Acil kan tetkikleri istiyorum: CBC, BMP, troponin, laktat, kan gazı", icon: TestTube },
  { label: "Görüntüleme", action: "PA akciğer grafisi ve FAST USG istiyorum", icon: ImageIcon },
  { label: "Oksijen", action: "Yüksek akım oksijen veriyorum (15 L/dk maske ile)", icon: Wind },
  { label: "SF Bolus", action: "1000 mL SF IV bolus başlıyorum", icon: Pill },
];

export function SimulationChat({ scenario }: { scenario: Scenario }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const [vitals, setVitals] = useState<Vitals>(scenario.initial_vitals);
  const [completed, setCompleted] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    score: number;
    feedback: {
      score: number;
      summary: string;
      strengths: string[];
      improvements: string[];
      missed_critical: string[];
      tips: string;
    };
  } | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Oturum başlat
  useEffect(() => {
    async function startSession() {
      try {
        const res = await fetch("/api/simulations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scenario_id: scenario.id }),
        });
        const json = await res.json();

        if (!res.ok) {
          setError(json.error || "Oturum başlatılamadı.");
          return;
        }

        setSessionId(json.data.id);

        // İlk mesaj: hasta prezentasyonu
        const intro: Message = {
          role: "system",
          content: `📋 **Senaryo: ${scenario.title}**\n\n` +
            `Hasta: ${scenario.patient_info.age} yaş ${scenario.patient_info.gender}\n` +
            `Başvuru şikayeti: ${scenario.patient_info.chief_complaint}\n` +
            (scenario.patient_info.history ? `Öykü: ${scenario.patient_info.history}\n` : "") +
            `\n---\n_Hastanız acil servise getirildi. Ne yapmak istersiniz?_`,
          timestamp: new Date().toISOString(),
        };
        setMessages([intro]);
      } catch {
        setError("Bağlantı hatası. Lütfen sayfayı yenileyin.");
      }
    }
    startSession();
  }, [scenario]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const parseVitals = (text: string) => {
    const match = text.match(/\[VITALS:\s*HR=(\d+),\s*BP=([^,]+),\s*RR=(\d+),\s*SpO2=(\d+),\s*T=([\d.]+),\s*GKS=(\d+)\]/);
    if (match) {
      setVitals({
        hr: parseInt(match[1]),
        bp: match[2],
        rr: parseInt(match[3]),
        spo2: parseInt(match[4]),
        temp: parseFloat(match[5]),
        gcs: parseInt(match[6]),
      });
    }
    if (text.includes("[SİMÜLASYON TAMAMLANDI]")) {
      setCompleted(true);
    }
  };

  const sendMessage = useCallback(async (content: string, isAction = false) => {
    if (!sessionId || loading || streaming || completed) return;

    const userMsg: Message = {
      role: "user",
      content: isAction ? `🔧 ${content}` : content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch(`/api/simulations/${sessionId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isAction ? { action: content } : { message: content }),
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "AI yanıt üretemedi.");
        setStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setStreaming(false);
        return;
      }

      const decoder = new TextDecoder();
      let assistantContent = "";

      // Önce boş assistant mesajı ekle
      const assistantMsg: Message = {
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n").filter(Boolean);

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6);

          try {
            const data = JSON.parse(jsonStr);

            if (data.error) {
              setError(data.error);
              break;
            }

            if (data.done) {
              parseVitals(assistantContent);
              break;
            }

            if (data.text) {
              assistantContent += data.text;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: assistantContent,
                };
                return updated;
              });
            }
          } catch {
            // JSON parse hatası — atla
          }
        }
      }
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  }, [sessionId, loading, streaming, completed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
  };

  const handleAction = (action: string) => {
    sendMessage(action, true);
  };

  const handleEvaluate = async () => {
    if (!sessionId || evaluating) return;
    setEvaluating(true);
    try {
      const res = await fetch(`/api/simulations/${sessionId}/evaluate`, {
        method: "POST",
      });
      if (res.ok) {
        const json = await res.json();
        setEvaluation(json.data);
      }
    } catch {
      // Hata durumunda sessizce devam et
    } finally {
      setEvaluating(false);
    }
  };

  const cleanContent = (text: string) => {
    return text
      .replace(/\[VITALS:[^\]]+\]/g, "")
      .replace(/\[SİMÜLASYON TAMAMLANDI\]/g, "")
      .trim();
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Üst bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/simulasyon"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-sm font-semibold text-[var(--foreground)]">{scenario.title}</h1>
            <p className="text-xs text-[var(--muted-foreground)]">
              {scenario.patient_info.age}y {scenario.patient_info.gender} — {scenario.patient_info.chief_complaint}
            </p>
          </div>
        </div>
        {completed && (
          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
            Tamamlandı
          </span>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat alanı */}
        <div className="flex flex-1 flex-col">
          {/* Mesajlar */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white"
                      : msg.role === "system"
                        ? "bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)]"
                        : "bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)]"
                  }`}
                >
                  <span className="whitespace-pre-wrap">{cleanContent(msg.content)}</span>
                </div>
              </div>
            ))}
            {streaming && messages[messages.length - 1]?.content === "" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg bg-[var(--card)] border border-[var(--border)] px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-violet-500" />
                  <span className="text-sm text-[var(--muted-foreground)]">Düşünüyor...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Hızlı aksiyonlar */}
          {!completed && (
            <div className="border-t border-[var(--border)] px-4 py-2">
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {QUICK_ACTIONS.map((qa) => (
                  <button
                    key={qa.label}
                    onClick={() => handleAction(qa.action)}
                    disabled={streaming}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted-foreground)] transition-colors hover:border-violet-500/50 hover:text-violet-400 disabled:opacity-50"
                  >
                    <qa.icon className="h-3 w-3" />
                    {qa.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mesaj giriş */}
          {error ? (
            <div className="border-t border-[var(--border)] p-4">
              <p className="text-sm text-red-500 text-center">{error}</p>
            </div>
          ) : !completed ? (
            <form onSubmit={handleSubmit} className="border-t border-[var(--border)] p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Mesajınızı yazın veya aksiyon butonlarını kullanın..."
                  disabled={streaming}
                  className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-violet-500 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  className="flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2.5 text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="border-t border-[var(--border)] p-4">
              {/* Değerlendirme sonucu */}
              {evaluation ? (
                <EvaluationPanel evaluation={evaluation} />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={handleEvaluate}
                    disabled={evaluating}
                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
                  >
                    {evaluating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Değerlendiriliyor...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="h-4 w-4" />
                        Performansımı Değerlendir
                      </>
                    )}
                  </button>
                  <Link
                    href="/simulasyon"
                    className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  >
                    ← Senaryo listesine dön
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Vital bulgular paneli (sidebar) */}
        <div className="hidden w-56 shrink-0 border-l border-[var(--border)] bg-[var(--card)] p-4 lg:block">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Vital Bulgular
          </h3>
          <div className="space-y-3">
            <VitalItem
              icon={Heart}
              label="Nabız"
              value={`${vitals.hr}/dk`}
              alert={vitals.hr > 120 || vitals.hr < 50}
            />
            <VitalItem
              icon={Gauge}
              label="Kan Basıncı"
              value={`${vitals.bp}`}
              alert={parseInt(vitals.bp.split("/")[0]) < 90 || parseInt(vitals.bp.split("/")[0]) > 180}
            />
            <VitalItem
              icon={Wind}
              label="Solunum"
              value={`${vitals.rr}/dk`}
              alert={vitals.rr > 24 || vitals.rr < 10}
            />
            <VitalItem
              icon={Activity}
              label="SpO₂"
              value={`${vitals.spo2}%`}
              alert={vitals.spo2 < 92}
            />
            <VitalItem
              icon={Thermometer}
              label="Ateş"
              value={`${vitals.temp}°C`}
              alert={vitals.temp > 38.5 || vitals.temp < 35}
            />
            <VitalItem
              icon={Brain}
              label="GKS"
              value={`${vitals.gcs}`}
              alert={vitals.gcs < 12}
            />
          </div>

          {/* Monitör */}
          <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--muted)] p-3">
            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <Clipboard className="h-3.5 w-3.5" />
              <span>Kategorisi</span>
            </div>
            <p className="mt-1 text-sm font-medium capitalize text-[var(--foreground)]">
              {scenario.category}
            </p>
            <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
              Zorluk: {scenario.difficulty}/3
            </p>
          </div>
        </div>
      </div>

      {/* Mobil vital göstergesi */}
      <div className="flex items-center justify-around border-t border-[var(--border)] bg-[var(--card)] px-2 py-2 lg:hidden">
        <MobileVital label="HR" value={vitals.hr} unit="/dk" alert={vitals.hr > 120 || vitals.hr < 50} />
        <MobileVital label="KB" value={vitals.bp} alert={parseInt(vitals.bp.split("/")[0]) < 90} />
        <MobileVital label="RR" value={vitals.rr} unit="/dk" alert={vitals.rr > 24} />
        <MobileVital label="SpO₂" value={`${vitals.spo2}%`} alert={vitals.spo2 < 92} />
        <MobileVital label="GKS" value={vitals.gcs} alert={vitals.gcs < 12} />
      </div>
    </div>
  );
}

function VitalItem({
  icon: Icon,
  label,
  value,
  alert,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  alert: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 rounded-md p-2 ${alert ? "bg-red-500/10" : ""}`}>
      <Icon className={`h-4 w-4 ${alert ? "text-red-500" : "text-[var(--muted-foreground)]"}`} />
      <div>
        <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
        <p className={`text-sm font-mono font-semibold ${alert ? "text-red-500" : "text-[var(--foreground)]"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

function MobileVital({
  label,
  value,
  unit,
  alert,
}: {
  label: string;
  value: string | number;
  unit?: string;
  alert: boolean;
}) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-[var(--muted-foreground)]">{label}</p>
      <p className={`text-xs font-mono font-bold ${alert ? "text-red-500" : "text-[var(--foreground)]"}`}>
        {value}{unit || ""}
      </p>
    </div>
  );
}

function EvaluationPanel({ evaluation }: {
  evaluation: {
    score: number;
    feedback: {
      summary: string;
      strengths: string[];
      improvements: string[];
      missed_critical: string[];
      tips: string;
    };
  };
}) {
  const { score, feedback } = evaluation;

  const scoreColor = score >= 80 ? "text-green-500" : score >= 60 ? "text-yellow-500" : "text-red-500";
  const scoreBg = score >= 80 ? "bg-green-500/10" : score >= 60 ? "bg-yellow-500/10" : "bg-red-500/10";

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      {/* Puan */}
      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${scoreBg}`}>
          <span className={`text-2xl font-bold ${scoreColor}`}>{score}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Trophy className={`h-4 w-4 ${scoreColor}`} />
            <span className="text-sm font-semibold text-[var(--foreground)]">Performans Değerlendirmesi</span>
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">{feedback.summary}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Güçlü yönler */}
        {feedback.strengths.length > 0 && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-green-500">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Güçlü Yönler
            </div>
            <ul className="space-y-1">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="text-xs text-[var(--foreground)]">• {s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Gelişim alanları */}
        {feedback.improvements.length > 0 && (
          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-yellow-500">
              <Lightbulb className="h-3.5 w-3.5" />
              Gelişim Alanları
            </div>
            <ul className="space-y-1">
              {feedback.improvements.map((s, i) => (
                <li key={i} className="text-xs text-[var(--foreground)]">• {s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Atlanmış kritik adımlar */}
      {feedback.missed_critical.length > 0 && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-red-500">
            <AlertTriangle className="h-3.5 w-3.5" />
            Atlanmış Kritik Adımlar
          </div>
          <ul className="space-y-1">
            {feedback.missed_critical.map((s, i) => (
              <li key={i} className="text-xs text-[var(--foreground)]">• {s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* İpucu */}
      {feedback.tips && (
        <p className="text-xs text-[var(--muted-foreground)]">
          💡 <span className="font-medium">İpucu:</span> {feedback.tips}
        </p>
      )}
    </div>
  );
}
