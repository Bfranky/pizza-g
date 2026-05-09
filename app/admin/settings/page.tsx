// app/admin/settings/page.tsx
import { prisma } from "@/lib/prisma";
import AdminSettingsClient from "./AdminSettingsClient";

async function getSettings() {
  try {
    const settings = await prisma.businessSettings.findFirst();
    return settings ?? { id: "default", isOpen: true, openTime: "10:00", closeTime: "20:00" };
  } catch {
    return { id: "default", isOpen: true, openTime: "10:00", closeTime: "20:00" };
  }
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return <AdminSettingsClient settings={settings} />;
}
