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
    const items = await prisma.menuItem.findMany({
      where: { available: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
    if (items.length > 0) return items;
    throw new Error("No items in DB");
  } catch {
    return [
      { id: "1", name: "Margherita Suprema", description: "San Marzano tomato, fresh mozzarella, basil", price: 4500, category: "Pizzas", available: true, featured: true, imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&fit=crop" },
      { id: "2", name: "Pepperoni Inferno", description: "Double pepperoni, jalapeños, mozzarella", price: 5200, category: "Pizzas", available: true, featured: true, imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&fit=crop" },
      { id: "3", name: "Chapman Delight", description: "Classic Nigerian mocktail", price: 1500, category: "Drinks", available: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&fit=crop" },
      { id: "4", name: "Garlic Bread", description: "Oven baked with cheese", price: 2000, category: "Sides", available: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600&q=80&fit=crop" },
    ];
  }
}

export default async function MenuPage() {
  const items = await getMenuItems();
  return <MenuClient items={items as any} />;
}

export const dynamic = 'force-dynamic';
