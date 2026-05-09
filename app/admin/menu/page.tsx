// app/admin/menu/page.tsx
import { prisma } from "@/lib/prisma";
import AdminMenuClient from "./AdminMenuClient";

async function getMenuItems() {
  try {
    return await prisma.menuItem.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });
  } catch {
    return [];
  }
}

export default async function AdminMenuPage() {
  const items = await getMenuItems();
  return <AdminMenuClient items={items} />;
}
