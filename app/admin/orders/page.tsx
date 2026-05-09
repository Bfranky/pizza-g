// app/admin/orders/page.tsx
import { prisma } from "@/lib/prisma";
import AdminOrdersClient from "./AdminOrdersClient";

async function getOrders() {
  try {
    return await prisma.order.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  return <AdminOrdersClient orders={orders} />;
}
