// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { FiPhone, FiMapPin, FiClock, FiExternalLink } from "react-icons/fi";
import { RESTAURANT_INFO } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Pizza Garden — Obosi's favourite pizza restaurant and bar at 1 Iruka Street, Obosi, Anambra, Nigeria.",
};

const popularTimes = [
  { time: "6am", height: 5 },
  { time: "9am", height: 20 },
  { time: "12pm", height: 60 },
  { time: "3pm", height: 80 },
  { time: "6pm", height: 100 },
  { time: "9pm", height: 30 },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-charcoal pt-24 pb-20 px-4 text-center">
        <span className="text-brand-red-light text-sm font-bold tracking-[0.2em] uppercase">Our Story</span>
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mt-2">About Us</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Story */}
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-charcoal mb-6">
              Where Great Pizza Meets Nigerian Warmth
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Pizza Garden was born from a simple love — the love of great food, great company, and the vibrant spirit of Obosi. Nestled on Iruka Street, we set out to bring world-class pizza craftsmanship to the heart of Anambra State.
              </p>
              <p>
                We believe that pizza is more than a meal — it's an experience. Every dough is hand-tossed, every sauce is house-made, and every topping is chosen with care. From our classic Margherita to our signature Suya Chicken pizza, each bite tells a story.
              </p>
              <p>
                Our bar and drinks menu complements every meal perfectly — from ice-cold Nigerian Chapman to curated cocktails. Whether you're dining in with family, grabbing takeaway after work, or ordering delivery, Pizza Garden brings the warmth of good food to wherever you are.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <Link
                href="/menu"
                className="bg-brand-red text-white font-bold px-6 py-3 rounded-full hover:bg-brand-red-dark transition-colors"
              >
                View Menu
              </Link>
              <Link
                href="/order"
                className="border-2 border-brand-charcoal text-brand-charcoal font-bold px-6 py-3 rounded-full hover:bg-brand-charcoal hover:text-white transition-colors"
              >
                Order Now
              </Link>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-6">Visit Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="text-brand-red" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-brand-charcoal">Address</p>
                  <p className="text-gray-500 text-sm">{RESTAURANT_INFO.address}</p>
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand-red text-xs font-semibold mt-1 hover:underline"
                  >
                    Open in Google Maps <FiExternalLink size={12} />
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiPhone className="text-brand-red" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-brand-charcoal">Phone</p>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-gray-500 text-sm hover:text-brand-red transition-colors">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiClock className="text-brand-red" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-brand-charcoal">Opening Hours</p>
                  <div className="text-gray-500 text-sm space-y-0.5">
                    <p>Mon–Fri: 10:00 AM – 8:00 PM</p>
                    <p>Saturday: 10:00 AM – 9:00 PM</p>
                    <p>Sunday: 12:00 PM – 7:00 PM</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Popular Times - Thursday */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-16">
          <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-2">Popular Times</h3>
          <p className="text-sm text-gray-400 mb-6">Thursday — our busiest day</p>
          <div className="flex items-end gap-3 h-28">
            {popularTimes.map((bar) => (
              <div key={bar.time} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-brand-red/80 transition-all duration-500"
                  style={{ height: `${bar.height}%` }}
                />
                <span className="text-xs text-gray-400">{bar.time}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Best time to visit: before 3pm to avoid the evening rush
          </p>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <iframe
            src={`https://maps.google.com/maps?q=${RESTAURANT_INFO.lat},${RESTAURANT_INFO.lng}&z=16&output=embed`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Pizza Garden Location"
          />
        </div>
      </div>
    </div>
  );
}
