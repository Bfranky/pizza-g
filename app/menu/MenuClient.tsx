// app/menu/MenuClient.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/types";
import { formatPrice, CATEGORY_LABELS } from "@/lib/utils";
import AddToCartButton from "@/components/ui/AddToCartButton";

const CATEGORIES = ["all", "pizza", "drinks", "bar", "sides"] as const;

export default function MenuClient({ items }: { items: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all" ? items : items.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-charcoal pt-24 pb-16 px-4 text-center">
        <span className="text-brand-red-light text-sm font-bold tracking-[0.2em] uppercase">What We Serve</span>
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mt-2">Our Menu</h1>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Every item crafted with quality ingredients and a whole lot of love from Obosi.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-brand-red text-white shadow-lg scale-105"
                  : "bg-white text-brand-charcoal border border-gray-200 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {cat === "all" ? "All Items" : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-gray-100"
              >
                <div className="relative h-48 bg-gray-100">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  <span className="absolute top-3 left-3 text-xs bg-brand-charcoal/80 text-white px-2.5 py-1 rounded-full font-semibold capitalize">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-bold text-brand-charcoal mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-red font-bold">{formatPrice(item.price)}</span>
                    <AddToCartButton item={item} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
