// components/ui/WhatsAppButton.tsx
"use client";
import { FaWhatsapp } from "react-icons/fa";
import { RESTAURANT_INFO } from "@/lib/utils";

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hi! I'd like to place an order at Pizza Garden 🍕");
  const url = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
      <span className="absolute right-16 bg-brand-charcoal text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-body">
        Chat on WhatsApp
      </span>
    </a>
  );
}
