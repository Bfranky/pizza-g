// app/order/OrderClient.tsx
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

type OrderType = "DINE_IN" | "TAKEAWAY" | "DELIVERY";

const ORDER_TYPES: { value: OrderType; label: string; icon: string; desc: string }[] = [
  { value: "DINE_IN", label: "Dine-In", icon: "🍽️", desc: "Enjoy at our restaurant" },
  { value: "TAKEAWAY", label: "Takeaway", icon: "🥡", desc: "Pick up at the counter" },
  { value: "DELIVERY", label: "Delivery", icon: "🚗", desc: "Delivered to your door" },
];

export default function OrderClient() {
  const { data: session } = useSession();
  const { items, updateQuantity, removeItem, clearCart, orderType, setOrderType, total } = useCartStore();
  const [form, setForm] = useState({ name: session?.user?.name ?? "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

  const subtotal = total();
  const deliveryFee = orderType === "DELIVERY" ? 500 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (!form.name || !form.phone) {
      toast.error("Please fill in your name and phone number");
      return;
    }
    if (orderType === "DELIVERY" && !form.address) {
      toast.error("Please enter your delivery address");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      // Create order in DB first
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          totalAmount: grandTotal,
          orderType,
          customerName: form.name,
          phone: form.phone,
          address: form.address,
        }),
      });

      const order = await orderRes.json();

      if (!orderRes.ok) throw new Error(order.error ?? "Failed to create order");

      // Initialize Paystack
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      document.body.appendChild(script);

      script.onload = () => {
        const handler = window.PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email: session?.user?.email ?? `${form.phone}@guest.pizzagarden.ng`,
          amount: grandTotal * 100, // kobo
          ref: order.reference,
          metadata: { orderId: order.id, customerName: form.name, phone: form.phone },
          callback: async (response: any) => {
            // Verify payment
            const verifyRes = await fetch(`/api/orders/${order.id}/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ reference: response.reference }),
            });

            if (verifyRes.ok) {
              clearCart();
              toast.success("🎉 Order placed successfully! We're preparing your pizza.");
              window.location.href = `/order/success?orderId=${order.id}`;
            } else {
              toast.error("Payment verification failed. Please contact us.");
            }
          },
          onClose: () => {
            toast("Payment cancelled.");
            setLoading(false);
          },
        });
        handler.openIframe();
      };
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-20">
      {/* Header */}
      <div className="bg-brand-charcoal py-16 px-4 text-center">
        <h1 className="font-display text-5xl font-bold text-white">Place Your Order</h1>
        <p className="text-gray-400 mt-2">Fresh, fast, and absolutely delicious</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Order Type */}
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-4">Order Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ORDER_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => setOrderType(type.value)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  orderType === type.value
                    ? "border-brand-red bg-brand-red/5"
                    : "border-gray-200 bg-white hover:border-brand-red/50"
                }`}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className="font-bold text-brand-charcoal">{type.label}</div>
                <div className="text-xs text-gray-400">{type.desc}</div>
                {type.value === "DELIVERY" && (
                  <div className="text-xs text-brand-red font-semibold mt-1">+{formatPrice(500)} delivery fee</div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Cart */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-4">Your Cart</h2>
            {items.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <FiShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-400 mb-4">Your cart is empty</p>
                <Link
                  href="/menu"
                  className="bg-brand-red text-white font-bold px-6 py-3 rounded-full hover:bg-brand-red-dark transition-colors"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                {items.map((item, idx) => (
                  <div key={item.menuItemId} className={`flex items-center gap-4 p-4 ${idx < items.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <div className="flex-1">
                      <p className="font-semibold text-brand-charcoal">{item.name}</p>
                      <p className="text-brand-red text-sm font-bold">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-brand-red hover:text-brand-red transition-colors"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-brand-red hover:text-brand-red transition-colors"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                    <div className="w-20 text-right font-bold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    <button
                      onClick={() => removeItem(item.menuItemId)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-4">Your Details</h2>
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors"
                    placeholder="0801 234 5678"
                  />
                </div>
                {orderType === "DELIVERY" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address *</label>
                    <textarea
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors h-20 resize-none"
                      placeholder="Street, area, landmark..."
                    />
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Fee</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-2">
                  <span>Total</span>
                  <span className="text-brand-red">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || items.length === 0}
                className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>💳 Pay {formatPrice(grandTotal)}</>
                )}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                Secured by Paystack · Card, Bank Transfer, USSD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
