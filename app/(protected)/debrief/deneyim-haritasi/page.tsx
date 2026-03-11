import type { Metadata } from "next";
import { ExperienceMapClient } from "./experience-map-client";

export const metadata: Metadata = {
  title: "Deneyim Haritası | AcilEM",
  description: "Klinik deneyim alanlarınızı görselleştirin ve takip edin",
};

export default function ExperienceMapPage() {
  return <ExperienceMapClient />;
}
