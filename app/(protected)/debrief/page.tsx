import type { Metadata } from "next";
import { DebriefPageClient } from "./debrief-page-client";

export const metadata: Metadata = {
  title: "Nöbet Sonu Debrief | AcilEM",
  description: "Nöbet sonrası vaka analizi ve kişisel gelişim takibi",
};

export default function DebriefPage() {
  return <DebriefPageClient />;
}
