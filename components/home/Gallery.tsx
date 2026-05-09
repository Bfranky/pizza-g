// components/home/Gallery.tsx
import Image from "next/image";

const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "Margherita pizza fresh out of the oven" },
  { src: "/images/gallery-2.jpg", alt: "Pizza Garden dining area" },
  { src: "/images/gallery-3.jpg", alt: "Suya Chicken pizza" },
  { src: "/images/gallery-4.jpg", alt: "Bar and drinks section" },
  { src: "/images/gallery-5.jpg", alt: "Garlic bread and sides" },
  { src: "/images/gallery-6.jpg", alt: "Happy customers at Pizza Garden" },
];

export default function Gallery() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-red text-sm font-bold tracking-[0.2em] uppercase">A Taste of Pizza Garden</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-charcoal mt-2">
            Gallery
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden card-hover ${
                i === 0 ? "col-span-2 md:col-span-1 row-span-2 h-72 md:h-full" : "h-36 md:h-48"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-charcoal/20 hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
