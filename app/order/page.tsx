// app/order/page.tsx
import type { Metadata } from "next";
import OrderClient from "./OrderClient";

export const metadata: Metadata = {
  title: "Order Online",
  description: "Order your favourite pizza from Pizza Garden online. Dine-in, takeaway, or delivery in Obosi, Anambra.",
};

export default function OrderPage() {
  return <OrderClient />;
}
