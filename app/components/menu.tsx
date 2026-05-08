'use client';
import type { Metadata } from 'next';

import MenuPageClient from '@/app/components/Menupageclient';

export const metadata: Metadata = {
  title: 'Our Menu — Pizzas, Drinks & Bar Items',
  description:
    'Browse the full Pizza Garden menu. Fresh pizzas, burgers, drinks, and bar specials. Available for dine-in, takeaway, or delivery in Obosi, Anambra.',
};

export default function MenuPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <div
        className="relative py-20 text-center"
        style={{ background: 'var(--charcoal)' }}
      >
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, #FFF8F0 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative z-10">
          <p
            className="font-script text-3xl mb-2"
            style={{ color: 'var(--gold)' }}
          >
            Freshly Made
          </p>
          <h1
            className="font-display text-5xl md:text-6xl font-bold"
            style={{ color: 'var(--cream)' }}
          >
            Our Menu
          </h1>
          <div
            className="w-16 h-1 mx-auto mt-4"
            style={{ background: 'var(--red)' }}
          />
          <p
            className="mt-4 text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(255,248,240,0.7)' }}
          >
            Every dish crafted with love, the finest ingredients, and a touch of
            Nigerian warmth
          </p>
        </div>
      </div>

      <MenuPageClient />
    </div>
  );
}