import type { Metadata } from "next";
import { DebriefDetailClient } from "./debrief-detail-client";

export const metadata: Metadata = {
  title: "Debrief Detay | AcilEM",
  description: "Nöbet debrief detayları ve AI analiz",
};

export default async function DebriefDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DebriefDetailClient debriefId={id} />;
}
