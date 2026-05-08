import Link from 'next/link';

const FEATURED_ITEMS = [
  {
    id: 1,
    name: 'Margherita Suprema',
    description: 'San Marzano tomato, fresh mozzarella, basil, extra virgin olive oil',
    price: '₦4,500',
    category: 'Pizza',
    emoji: '🍕',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Pepperoni Inferno',
    description: 'Double pepperoni, jalapeños, mozzarella, spicy tomato base',
    price: '₦5,200',
    category: 'Pizza',
    emoji: '🔥',
    badge: 'Spicy',
  },
  {
    id: 3,
    name: 'Chicken & Mushroom',
    description: 'Grilled chicken breast, sautéed mushrooms, creamy garlic sauce',
    price: '₦5,800',
    category: 'Pizza',
    emoji: '🍗',
    badge: null,
  },
  {
    id: 4,
    name: 'Garden Special',
    description: 'Mixed veggies, goat cheese, pesto base, cherry tomatoes, olives',
    price: '₦4,800',
    category: 'Vegetarian',
    emoji: '🥗',
    badge: 'Veggie',
  },
  {
    id: 5,
    name: 'Chapman Delight',
    description: 'Premium Nigerian Chapman with Fanta, Sprite, grenadine & lemon',
    price: '₦1,200',
    category: 'Drinks',
    emoji: '🍹',
    badge: null,
  },
  
{
    id: 6,
    name: "Meat Lover's",
    description: 'Beef, sausage, pepperoni, ham, bacon on rich tomato base',
    price: '₦6,500',
    category: 'Pizza',
    emoji: '🥩',
    badge: 'Fan Fave',
  },
];

export default function FeaturedMenu() {
  return (
    <section className="section-py" style={{ background: 'var(--cream)' }}>
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="font-script text-3xl mb-1"
            style={{ color: 'var(--red)' }}
          >
            Our Specialties
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--charcoal)' }}
          >
            Featured Menu
          </h2>
          <div className="divider-red mx-auto mt-3" />
          <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: 'var(--charcoal-light)' }}>
            Crafted from the finest ingredients, each dish is a celebration of flavour
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className="card-hover rounded-xl overflow-hidden"
              style={{
                background: 'white',
                boxShadow: '0 2px 15px rgba(44,44,44,0.07)',
                animationDelay: `${i * 80}ms`,
              }}
            >
              {/* Image placeholder */}
              <div
                className="relative h-48 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${
                    i % 3 === 0
                      ? '#8B1A1A, #2C2C2C'
                      : i % 3 === 1
                      ? '#2C2C2C, #4a1a1a'
                      : '#4a2a0a, #2C2C2C'
                  })`,
                }}
              >
                <span className="text-7xl">{item.emoji}</span>
                {item.badge && (
                  <span
                    className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: 'var(--red)',
                      color: 'var(--cream)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                <span
                  className="absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                  style={{
                    background: 'rgba(255,248,240,0.15)',
                    color: 'rgba(255,248,240,0.8)',
                    border: '1px solid rgba(255,248,240,0.2)',
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
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
                    {item.price}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
                  {item.description}
                </p>
                <Link
                  href={`/order?item=${item.id}`}
                  className="mt-4 w-full block text-center py-2.5 rounded-md text-sm font-bold uppercase tracking-wide transition-all"
                  style={{
                    background: 'transparent',
                    border: '2px solid var(--red)',
                    color: 'var(--red)',
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLElement).style.background = 'var(--red)';
                    (e.target as HTMLElement).style.color = 'var(--cream)';
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLElement).style.background = 'transparent';
                    (e.target as HTMLElement).style.color = 'var(--red)';
                  }}
                >
                  Add to Order
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/menu" className="btn-primary">
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}