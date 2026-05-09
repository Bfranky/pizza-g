// components/home/Hero.tsx
import Link from "next/link";
import { FiMapPin, FiClock, FiPhone } from "react-icons/fi";
import { RESTAURANT_INFO } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Overlay */}
      <div className="hero-gradient absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-red/20 border border-brand-red/40 text-brand-red-light text-sm font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
          <span>🍕</span>
          <span>Obosi's Favourite Pizza Spot</span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-fade-in">
          Pizza <span className="text-brand-red-light">Garden</span>
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in">
          Handcrafted pizzas, ice-cold drinks, and warm Nigerian hospitality — all under one roof in the heart of Obosi.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
          <Link
            href="/order"
            className="bg-brand-red hover:bg-brand-red-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-brand-red/30"
          >
            Order Now 🛒
          </Link>
          <Link
            href="/menu"
            className="border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
          >
            View Menu
          </Link>
        </div>

        {/* Info pills */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 text-white text-sm px-4 py-2 rounded-full">
            <FiMapPin size={14} className="text-brand-red-light" />
            <span>Iruka Street, Obosi, Anambra</span>
          </div>
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 text-white text-sm px-4 py-2 rounded-full">
            <FiClock size={14} className="text-brand-red-light" />
            <span>Open until 8:00 PM</span>
          </div>
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 text-white text-sm px-4 py-2 rounded-full">
            <FiPhone size={14} className="text-brand-red-light" />
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-brand-red-light transition-colors">
              {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
