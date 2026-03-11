import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  // Oturumu getir
  const { data: session } = await supabase
    .from("simulation_sessions")
    .select("*, scenarios(*)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Oturum bulunamadı." }, { status: 404 });
  }

  // Zaten değerlendirilmişse mevcut sonucu döndür
  if (session.score !== null && session.feedback) {
    return NextResponse.json({
      data: {
        score: session.score,
        feedback: JSON.parse(session.feedback),
      },
    });
  }

  const scenario = session.scenarios;
  const idealActions = scenario.ideal_actions || [];
  const actionsTaken = session.actions_taken || [];
  const messages = session.messages || [];

  // Claude ile değerlendirme
  const evalPrompt = buildEvaluationPrompt(
    scenario,
    idealActions,
    actionsTaken,
    messages
  );

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: "Sen bir acil tıp eğitim değerlendirmecisisin. Asistanın simülasyon performansını değerlendiriyorsun. SADECE JSON formatında yanıt ver, başka metin ekleme.",
      messages: [{ role: "user", content: evalPrompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "AI yanıt üretemedi." }, { status: 500 });
    }

    // JSON parse
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Değerlendirme ayrıştırılamadı." }, { status: 500 });
    }

    const evaluation = JSON.parse(jsonMatch[0]);
    const score = Math.min(100, Math.max(0, evaluation.score || 0));

    // Oturumu güncelle
    await supabase
      .from("simulation_sessions")
      .update({
        score,
        feedback: JSON.stringify(evaluation),
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq("id", id);

    // Gamification: simülasyon XP
    await fetch(new URL("/api/gamification/activity", request.url).toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify({
        activity_type: "simulation",
        content_id: scenario.id,
        metadata: { score, scenario_title: scenario.title },
      }),
    });

    return NextResponse.json({
      data: { score, feedback: evaluation },
    });
  } catch (error) {
    console.error("Değerlendirme hatası:", error);
    return NextResponse.json({ error: "Değerlendirme yapılamadı." }, { status: 500 });
  }
}

function buildEvaluationPrompt(
  scenario: Record<string, unknown>,
  idealActions: { step: number; action: string; reasoning: string; critical: boolean }[],
  actionsTaken: { action: string; timestamp: string }[],
  messages: { role: string; content: string }[]
): string {
  const conversationSummary = messages
    .filter((m) => m.role !== "system")
    .map((m) => `${m.role === "user" ? "Asistan" : "Hasta/Eğitmen"}: ${m.content.slice(0, 200)}`)
    .join("\n");

  const idealList = idealActions
    .map((a) => `${a.step}. [${a.critical ? "KRİTİK" : "Önerilen"}] ${a.action} — ${a.reasoning}`)
    .join("\n");

  const takenList = actionsTaken.length > 0
    ? actionsTaken.map((a, i) => `${i + 1}. ${a.action}`).join("\n")
    : "Aksiyon butonları kullanılmadı (serbest metin ile yönetildi)";

  return `## Senaryo: ${scenario.title}

## İdeal Aksiyonlar:
${idealList}

## Asistanın Aldığı Aksiyonlar:
${takenList}

## Konuşma Özeti:
${conversationSummary}

---

Yukarıdaki bilgilere göre asistanın performansını değerlendir. JSON formatında yanıt ver:

{
  "score": <0-100 arası puan>,
  "summary": "<1-2 cümle genel değerlendirme>",
  "strengths": ["<güçlü yön 1>", "<güçlü yön 2>"],
  "improvements": ["<gelişim alanı 1>", "<gelişim alanı 2>"],
  "missed_critical": ["<atlanmış kritik adım varsa>"],
  "tips": "<Bir sonraki simülasyon için kısa öneri>"
}

Puanlama kriterleri:
- Kritik adımların tamamlanması: %50
- Doğru sıralama ve önceliklendirme: %20
- Klinik akıl yürütme (konuşmada gösterilen): %20
- İletişim kalitesi: %10`;
}
