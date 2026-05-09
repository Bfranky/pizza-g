import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85&fit=crop",
    alt: "Elegant Italian restaurant interior with warm lighting",
    label: "Our Dining Room",
    span: "lg:col-span-2 lg:row-span-2",
    height: "h-80 lg:h-full",
  },
  {
    src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=85&fit=crop",
    alt: "Wood-fired Margherita pizza fresh out of oven",
    label: "Margherita Classica",
    span: "",
    height: "h-48",
  },
  {
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=85&fit=crop",
    alt: "Craft cocktails and drinks at the bar",
    label: "Signature Cocktails",
    span: "",
    height: "h-48",
  },
  {
    src: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=85&fit=crop",
    alt: "Pizza chef at work in open kitchen",
    label: "Our Kitchen",
    span: "",
    height: "h-48",
  },
  {
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=85&fit=crop",
    alt: "Pepperoni pizza close-up",
    label: "Pepperoni Inferno",
    span: "",
    height: "h-48",
  },
];

export default function Gallery() {
  return (
    <section
      className="py-24 px-4 sm:px-6"
      style={{ background: "var(--brand-linen)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-[var(--brand-gold)] text-xs tracking-[0.35em] uppercase font-semibold block mb-4"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            La Nostra Storia
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--brand-charcoal)]"
            style={{ letterSpacing: "-0.01em" }}
          >
            Life at Pizza Garden
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-[var(--brand-gold)] text-lg">✦</span>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 h-auto lg:h-[560px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group ${img.span} ${img.height}`}
              style={{ boxShadow: "0 4px 20px rgba(26,22,20,0.12)" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                style={{ transition: "transform 0.7s ease" }}
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-[var(--brand-charcoal)]/30 group-hover:bg-[var(--brand-charcoal)]/10 transition-colors duration-500" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <span
                  className="text-white text-xs tracking-widest uppercase font-semibold"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}