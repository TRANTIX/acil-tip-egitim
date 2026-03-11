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

  // Debrief ve vakalarını getir
  const { data: debrief, error: debriefError } = await supabase
    .from("debriefs")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (debriefError || !debrief) {
    return NextResponse.json({ error: "Debrief bulunamadı." }, { status: 404 });
  }

  const { data: cases } = await supabase
    .from("debrief_cases")
    .select("*")
    .eq("debrief_id", id);

  // Claude ile analiz
  const caseSummary = (cases || []).map((c, i) => {
    const parts = [`Vaka ${i + 1}: ${c.diagnosis}`];
    if (c.actions_taken) parts.push(`Yapılanlar: ${c.actions_taken}`);
    if (c.had_difficulty) parts.push(`Zorluk alanı: ${c.difficulty_area || "belirtilmemiş"}`);
    if (c.new_learning) parts.push(`Öğrenilen: ${c.new_learning}`);
    if (c.emotion) parts.push(`Duygu: ${c.emotion}`);
    return parts.join("\n");
  }).join("\n\n");

  const locationMap: Record<string, string> = {
    acil_servis: "Acil Servis",
    yogun_bakim: "Yoğun Bakım",
    travma: "Travma",
    diger: "Diğer",
  };

  const prompt = `Sen bir acil tıp eğitim asistanısın. Bir asistanın nöbet sonu debrief kaydını analiz edeceksin.

Nöbet bilgileri:
- Tarih: ${debrief.shift_date}
- Lokasyon: ${locationMap[debrief.shift_location] || debrief.shift_location}
- Süre: ${debrief.shift_duration ? debrief.shift_duration + " saat" : "belirtilmemiş"}
- Genel öğrenme: ${debrief.overall_learning || "belirtilmemiş"}
- Neyi değiştirirdi: ${debrief.what_would_change || "belirtilmemiş"}
- Mentöre soru: ${debrief.mentor_question || "yok"}

Vakalar:
${caseSummary}

Lütfen şu formatta JSON yanıt ver (başka hiçbir metin ekleme):
{
  "summary": "Nöbetin kısa özeti (2-3 cümle)",
  "strengths": ["Güçlü yönler (en az 2)"],
  "improvements": ["Gelişim alanları (en az 2)"],
  "study_topics": ["Çalışılması gereken konular (en az 2, spesifik kaynak önerisiyle)"],
  "mentor_answer": "Mentör sorusuna kısa yanıt (varsa, yoksa null)",
  "encouragement": "Motivasyon cümlesi (kısa, samimi)"
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // JSON parse
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "AI analizi ayrıştırılamadı." }, { status: 500 });
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Her vakaya AI önerisi kaydet
    if (cases && cases.length > 0) {
      for (const c of cases) {
        await supabase
          .from("debrief_cases")
          .update({ ai_recommendations: analysis })
          .eq("id", c.id);
      }
    }

    return NextResponse.json({ data: analysis });
  } catch (err) {
    console.error("AI analiz hatası:", err);
    return NextResponse.json({ error: "AI analizi yapılamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
