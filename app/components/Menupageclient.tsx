'use client';

import { useState } from 'react';

const CATEGORIES = ['All', 'Pizzas', 'Sides', 'Drinks', 'Bar Items', 'Desserts'];

const MENU_ITEMS = [
  // Pizzas
  { id: 1, name: 'Margherita Suprema', desc: 'San Marzano tomato, fresh mozzarella, basil, EVOO', price: 4500, category: 'Pizzas', emoji: '🍕', available: true },
  { id: 2, name: 'Pepperoni Inferno', desc: 'Double pepperoni, jalapeños, mozzarella, spicy tomato', price: 5200, category: 'Pizzas', emoji: '🔥', available: true },
  { id: 3, name: 'Chicken & Mushroom', desc: 'Grilled chicken, mushrooms, garlic cream sauce', price: 5800, category: 'Pizzas', emoji: '🍗', available: true },
  { id: 4, name: 'Garden Veggie', desc: 'Mixed veggies, goat cheese, pesto base, cherry tomatoes', price: 4800, category: 'Pizzas', emoji: '🥗', available: true },
  { id: 5, name: 'Meat Lover\'s', desc: 'Beef, sausage, pepperoni, ham, bacon', price: 6500, category: 'Pizzas', emoji: '🥩', available: true },
  { id: 6, name: 'BBQ Chicken', desc: 'BBQ base, chicken, red onion, coriander', price: 5500, category: 'Pizzas', emoji: '🍗', available: false },
  // Sides
  { id: 7, name: 'Garlic Bread', desc: 'Toasted baguette with herb butter and garlic', price: 1500, category: 'Sides', emoji: '🍞', available: true },
  { id: 8, name: 'Cheesy Fries', desc: 'Crispy fries loaded with cheddar and jalapeños', price: 2000, category: 'Sides', emoji: '🍟', available: true },
  { id: 9, name: 'Caesar Salad', desc: 'Romaine, croutons, parmesan, classic caesar dressing', price: 2500, category: 'Sides', emoji: '🥬', available: true },
  // Drinks
  { id: 10, name: 'Chapman Delight', desc: 'Premium Nigerian Chapman with Fanta, Sprite & grenadine', price: 1200, category: 'Drinks', emoji: '🍹', available: true },
  { id: 11, name: 'Fresh Fruit Juice', desc: 'Watermelon, orange or pineapple — freshly squeezed', price: 1000, category: 'Drinks', emoji: '🧃', available: true },
  { id: 12, name: 'Chilled Water 1.5L', desc: 'Still mineral water', price: 400, category: 'Drinks', emoji: '💧', available: true },
  { id: 13, name: 'Soft Drinks', desc: 'Coke, Sprite, Fanta, Pepsi', price: 500, category: 'Drinks', emoji: '🥤', available: true },
  // Bar
  { id: 14, name: 'Cold Beer', desc: 'Star, Heineken, Guinness, Trophy', price: 1000, category: 'Bar Items', emoji: '🍺', available: true },
  { id: 15, name: 'Red Wine (Glass)', desc: 'House red wine, smooth finish', price: 2000, category: 'Bar Items', emoji: '🍷', available: true },
  { id: 16, name: 'Cocktail of the Day', desc: 'Ask your bartender', price: 2500, category: 'Bar Items', emoji: '🍸', available: true },
  // Desserts
  { id: 17, name: 'Nutella Pizza', desc: 'Dessert pizza with Nutella, banana, powdered sugar', price: 3500, category: 'Desserts', emoji: '🍫', available: true },
  { id: 18, name: 'Vanilla Ice Cream', desc: '2 scoops of premium vanilla with chocolate drizzle', price: 1500, category: 'Desserts', emoji: '🍦', available: true },
];

export default function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="section-py" style={{ background: 'var(--cream)' }}>
      <div className="container-main">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field md:w-72"
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background:
                    activeCategory === cat
                      ? 'var(--red)'
                      : 'white',
                  color:
                    activeCategory === cat
                      ? 'var(--cream)'
                      : 'var(--charcoal)',
                  border:
                    activeCategory === cat
                      ? '2px solid var(--red)'
                      : '2px solid #e8ddd4',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Item count */}
        <p className="text-sm mb-6" style={{ color: 'rgba(44,44,44,0.4)' }}>
          {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍕</p>
            <p className="font-display text-xl" style={{ color: 'var(--charcoal-light)' }}>
              No items found
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
              className="mt-4 btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`card-hover rounded-xl overflow-hidden ${
                  !item.available ? 'opacity-50' : ''
                }`}
                style={{ background: 'white', boxShadow: '0 2px 12px rgba(44,44,44,0.07)' }}
              >
                {/* Image */}
                <div
                  className="h-44 flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, var(--charcoal), #4a1a1a)',
                  }}
                >
                  <span className="text-6xl">{item.emoji}</span>
                  {!item.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                      >
                        Currently Unavailable
                      </span>
                    </div>
                  )}
                  <span
                    className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full uppercase"
                    style={{
                      background: 'rgba(255,248,240,0.15)',
                      color: 'rgba(255,248,240,0.8)',
                      border: '1px solid rgba(255,248,240,0.2)',
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3
                      className="font-display font-bold text-lg leading-tight"
                      style={{ color: 'var(--charcoal)' }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="font-bold text-lg shrink-0"
                      style={{ color: 'var(--red)' }}
                    >
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--charcoal-light)' }}>
                    {item.desc}
                  </p>
                  <button
                    disabled={!item.available}
                    className="mt-4 w-full py-2.5 rounded-md text-sm font-bold uppercase tracking-wide transition-all"
                    style={{
                      background: item.available ? 'var(--red)' : '#ccc',
                      color: 'white',
                      cursor: item.available ? 'pointer' : 'not-allowed',
                    }}
                    onClick={() => (window.location.href = '/order')}
                  >
                    {item.available ? 'Add to Order' : 'Unavailable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}