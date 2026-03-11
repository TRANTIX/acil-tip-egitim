import type { Metadata } from "next";
import { ProfileClient } from "./profile-client";

export const metadata: Metadata = {
  title: "Profil | AcilEM",
  description: "Profiliniz, XP, rozetler ve aktivite geçmişiniz",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
