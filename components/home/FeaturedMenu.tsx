// components/home/FeaturedMenu.tsx
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/ui/AddToCartButton";

async function getFeaturedItems() {
  try {
    return await prisma.menuItem.findMany({
      where: { featured: true, available: true },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function FeaturedMenu() {
  const items = await getFeaturedItems();

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-red text-sm font-bold tracking-[0.2em] uppercase">Our Specials</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-charcoal mt-2 mb-4">
            Featured Pizzas
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Handcrafted daily with the freshest ingredients — from classic Margherita to our signature Suya Chicken pizza.
          </p>
          <hr className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-brand-cream rounded-2xl overflow-hidden shadow-sm card-hover border border-orange-100"
            >
              <div className="relative h-52 bg-gray-100">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  onError={() => {}}
                />
                <div className="absolute top-3 right-3 bg-brand-red text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  ⭐ Featured
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-brand-charcoal mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-red font-bold text-lg">{formatPrice(item.price)}</span>
                  <AddToCartButton item={item} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-block bg-brand-charcoal hover:bg-brand-charcoal-light text-white font-bold px-8 py-3.5 rounded-full transition-colors"
          >
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
