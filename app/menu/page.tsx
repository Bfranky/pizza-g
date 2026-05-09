// app/menu/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu — Pizzas, Drinks & Bar",
  description: "Explore Pizza Garden's full menu — handcrafted pizzas, refreshing drinks, and bar selections in Obosi, Anambra Nigeria.",
};

async function getMenuItems() {
  try {
    return await prisma.menuItem.findMany({
      where: { available: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
  } catch {
    return [];
  }
}

export default async function MenuPage() {
  const items = await getMenuItems();
  return <MenuClient items={items} />;
}
