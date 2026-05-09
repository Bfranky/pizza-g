// app/admin/orders/AdminOrdersClient.tsx
"use client";
import { useState } from "react";
import { Order } from "@/types";
import { formatPrice, formatDate, ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/utils";
import { FiChevronDown, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";

const STATUSES = ["PENDING", "PREPARING", "READY", "DELIVERED", "CANCELLED"] as const;

export default function AdminOrdersClient({ orders: initial }: { orders: any[] }) {
  const [orders, setOrders] = useState(initial);
  const [filter, setFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const filtered = filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
      if (selectedOrder?.id === orderId) setSelectedOrder((o: any) => ({ ...o, status }));
      toast.success(`Order updated to ${ORDER_STATUS_LABELS[status]}`);
    } catch {
      toast.error("Failed to update order");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-charcoal">Orders</h1>
        <p className="text-gray-400 text-sm mt-1">{orders.length} total orders</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {["ALL", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === s
                ? "bg-brand-red text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:border-brand-red hover:text-brand-red"
            }`}
          >
            {s === "ALL" ? "All Orders" : ORDER_STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Orders list */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  {["#", "Customer", "Type", "Amount", "Status", "Date", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-400 text-sm">No orders</td></tr>
                ) : (
                  filtered.map((order) => (
                    <tr
                      key={order.id}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedOrder?.id === order.id ? "bg-red-50" : ""}`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-4 py-3 text-xs font-mono text-gray-400">#{order.id.slice(-5).toUpperCase()}</td>
                      <td className="px-4 py-3 text-sm font-medium text-brand-charcoal">
                        {order.customerName ?? order.user?.name ?? "Guest"}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 capitalize">
                        {order.orderType.replace("_", "-").toLowerCase()}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold">{formatPrice(order.totalAmount)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ORDER_STATUS_COLORS[order.status]}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("en-NG")}
                      </td>
                      <td className="px-4 py-3">
                        <FiEye size={15} className="text-gray-300" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order detail panel */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="font-display text-lg font-bold text-brand-charcoal mb-4">
                Order #{selectedOrder.id.slice(-5).toUpperCase()}
              </h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer</span>
                  <span className="font-semibold">{selectedOrder.customerName ?? selectedOrder.user?.name ?? "Guest"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone</span>
                  <span className="font-semibold">{selectedOrder.phone ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Order Type</span>
                  <span className="font-semibold capitalize">{selectedOrder.orderType.replace("_", "-").toLowerCase()}</span>
                </div>
                {selectedOrder.address && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Address</span>
                    <span className="font-semibold text-right max-w-[160px]">{selectedOrder.address}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="font-semibold">{formatDate(selectedOrder.createdAt)}</span>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Items</p>
                <div className="space-y-2">
                  {(selectedOrder.items as any[]).map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} × {item.quantity}</span>
                      <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-brand-charcoal mt-3 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-brand-red">{formatPrice(selectedOrder.totalAmount)}</span>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Update Status</p>
                <div className="grid grid-cols-1 gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedOrder.id, s)}
                      className={`w-full text-xs font-bold py-2 rounded-xl border transition-all ${
                        selectedOrder.status === s
                          ? "bg-brand-red border-brand-red text-white"
                          : "border-gray-200 text-gray-500 hover:border-brand-red hover:text-brand-red"
                      }`}
                    >
                      {ORDER_STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <FiEye size={32} className="mx-auto text-gray-200 mb-3" />
              <p className="text-gray-400 text-sm">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
