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

// Fallback real food images when DB images aren't loaded yet
const fallbackImages: Record<number, string> = {
  0: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&fit=crop",
  1: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&fit=crop",
  2: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&q=80&fit=crop",
  3: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=80&fit=crop",
  4: "https://images.unsplash.com/photo-1548369937-47519962c11a?w=600&q=80&fit=crop",
  5: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&fit=crop",
};

export default async function FeaturedMenu() {
  const items = await getFeaturedItems();

  return (
    <section
      className="py-24 px-4 sm:px-6"
      style={{ background: "var(--brand-cream)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-[var(--brand-gold)] text-xs tracking-[0.35em] uppercase font-semibold block mb-4"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Handcrafted Daily
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--brand-charcoal)] mb-6"
            style={{ letterSpacing: "-0.01em" }}
          >
            Our Signature Pizzas
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-[var(--brand-gold)] text-lg">✦</span>
          </div>
          <p
            className="text-[var(--brand-stone)] max-w-lg mx-auto mt-6 text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-lato)", letterSpacing: "0.02em" }}
          >
            From classic Margherita to our Obosi-inspired creations — each pizza
            is wood-fired and made to order with the finest ingredients.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {items.map((item: any, idx: number) => (
            <div
              key={item.id}
              className="card-hover bg-white overflow-hidden border border-[var(--brand-linen)] group"
              style={{ boxShadow: "0 2px 20px rgba(26,22,20,0.06)" }}
            >
              <div className="relative h-56 bg-[var(--brand-linen)] overflow-hidden">
                <Image
                  src={
                    item.imageUrl && item.imageUrl.startsWith("http")
                      ? item.imageUrl
                      : fallbackImages[idx % 6]
                  }
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-widest uppercase font-bold"
                  style={{
                    background: "var(--brand-charcoal)",
                    color: "var(--brand-gold-light)",
                    letterSpacing: "0.2em",
                  }}
                >
                  {item.category || "Pizza"}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="font-display text-xl font-bold text-[var(--brand-charcoal)] leading-tight"
                  >
                    {item.name}
                  </h3>
                  <span
                    className="text-[var(--brand-red)] font-bold text-base ml-4 flex-shrink-0"
                    style={{ fontFamily: "var(--font-lato)" }}
                  >
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p
                  className="text-[var(--brand-stone)] text-sm mb-5 leading-relaxed line-clamp-2"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {item.description}
                </p>
                <div
                  className="h-px mb-5"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--brand-linen), transparent)",
                  }}
                />
                <AddToCartButton item={item} />
              </div>
            </div>
          ))}

          {/* Fallback cards when DB is empty */}
          {items.length === 0 &&
            [
              { name: "Margherita Suprema", price: 4500, desc: "San Marzano tomato, fresh mozzarella, basil, extra virgin olive oil", cat: "Pizza", idx: 0 },
              { name: "Pepperoni Inferno", price: 5200, desc: "Double pepperoni, jalapeños, mozzarella, spicy tomato base", cat: "Pizza", idx: 1 },
              { name: "Chicken & Mushroom", price: 5800, desc: "Grilled chicken breast, sautéed mushrooms, creamy garlic sauce", cat: "Pizza", idx: 2 },
              { name: "Garden Special", price: 4800, desc: "Mixed veggies, goat cheese, pesto base, cherry tomatoes, olives", cat: "Vegetarian", idx: 3 },
              { name: "Chapman Delight", price: 1200, desc: "Premium Nigerian Chapman with Fanta, Sprite, grenadine & lemon", cat: "Drinks", idx: 4 },
              { name: "Meat Lover's", price: 6500, desc: "Beef, sausage, pepperoni, ham, bacon on rich tomato base", cat: "Pizza", idx: 5 },
            ].map((item) => (
              <div
                key={item.name}
                className="card-hover bg-white overflow-hidden border border-[var(--brand-linen)] group"
                style={{ boxShadow: "0 2px 20px rgba(26,22,20,0.06)" }}
              >
                <div className="relative h-56 bg-[var(--brand-linen)] overflow-hidden">
                  <Image
                    src={fallbackImages[item.idx]}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-widest uppercase font-bold"
                    style={{
                      background: "var(--brand-charcoal)",
                      color: "var(--brand-gold-light)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    {item.cat}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[var(--brand-charcoal)] leading-tight">
                      {item.name}
                    </h3>
                    <span
                      className="text-[var(--brand-red)] font-bold text-base ml-4 flex-shrink-0"
                      style={{ fontFamily: "var(--font-lato)" }}
                    >
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                  <p
                    className="text-[var(--brand-stone)] text-sm mb-5 leading-relaxed line-clamp-2"
                    style={{ fontFamily: "var(--font-lato)" }}
                  >
                    {item.desc}
                  </p>
                  <div className="h-px mb-5" style={{ background: "linear-gradient(90deg, var(--brand-linen), transparent)" }} />
                  <button
                    className="w-full py-2.5 text-xs tracking-widest uppercase font-bold border border-[var(--brand-charcoal)] text-[var(--brand-charcoal)] hover:bg-[var(--brand-charcoal)] hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-lato)" }}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/menu"
            className="btn-gold px-12 py-4 inline-block"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}