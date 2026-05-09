"use client";
import Link from "next/link";
import { FiMapPin, FiClock, FiPhone } from "react-icons/fi";
import { RESTAURANT_INFO } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background - real pizza/Italian restaurant photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=85&fit=crop')",
        }}
      />
      {/* Dark cinematic overlay */}
      <div className="hero-gradient absolute inset-0" />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(26,22,20,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Italian ornament top */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--brand-gold)]" />
          <span
            className="text-[var(--brand-gold)] text-xs tracking-[0.35em] uppercase font-semibold"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Ristorante &amp; Bar · Obosi, Anambra
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--brand-gold)]" />
        </div>

        {/* Main heading */}
        <h1
          className="font-display text-6xl sm:text-8xl lg:text-9xl font-bold text-white leading-none mb-2 animate-fade-in animate-delay-1"
          style={{ letterSpacing: "-0.02em" }}
        >
          Pizza
        </h1>
        <h2
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-none mb-6 animate-fade-in animate-delay-2"
          style={{
            color: "var(--brand-gold-light)",
            letterSpacing: "0.05em",
            fontStyle: "italic",
          }}
        >
          Garden
        </h2>

        {/* Tagline */}
        <p
          className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in animate-delay-2"
          style={{ fontFamily: "var(--font-lato)", fontWeight: 300, letterSpacing: "0.03em" }}
        >
          Authentic wood-fired pizza, craft cocktails &amp; warm Nigerian
          hospitality — right in the heart of Obosi, Anambra.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-in animate-delay-3">
          <Link
            href="/order"
            className="btn-gold px-10 py-4 rounded-none inline-block"
          >
            Reserve Your Table
          </Link>
          <Link
            href="/menu"
            className="btn-outline-cream px-10 py-4 rounded-none inline-block"
          >
            Explore Menu
          </Link>
        </div>

        {/* Info row */}
        <div
          className="flex flex-col sm:flex-row gap-6 justify-center text-white/60 text-xs tracking-wider uppercase animate-fade-in animate-delay-4"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          <span className="flex items-center gap-2">
            <FiMapPin size={12} className="text-[var(--brand-gold)]" />
            1 Iruka Street, Obosi
          </span>
          <span className="hidden sm:block text-white/20">|</span>
          <span className="flex items-center gap-2">
            <FiClock size={12} className="text-[var(--brand-gold)]" />
            Open · Closes 8:00 PM
          </span>
          <span className="hidden sm:block text-white/20">|</span>
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <FiPhone size={12} className="text-[var(--brand-gold)]" />
            {RESTAURANT_INFO.phone}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-lato)" }}>
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--brand-gold)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}