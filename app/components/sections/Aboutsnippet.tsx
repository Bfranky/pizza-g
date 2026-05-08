import Link from 'next/link';

export default function AboutSnippet() {
  return (
    <section
      className="section-py"
      style={{ background: 'var(--charcoal)' }}
    >
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <p
              className="font-script text-3xl mb-2"
              style={{ color: 'var(--gold)' }}
            >
              Our Story
            </p>
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--cream)' }}
            >
              More Than a Restaurant —<br />
              <span style={{ color: 'var(--red)' }}>A Community</span>
            </h2>
            <div className="divider-gold mb-6" />
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: 'rgba(255,248,240,0.7)' }}
            >
              Pizza Garden was founded with one mission: bring authentic
              Italian pizza craftsmanship to the soul of Anambra. Our stone
              oven burns at 450°C, our dough rests for 48 hours, and our
              toppings are always fresh.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'rgba(255,248,240,0.7)' }}
            >
              Whether you're stopping in for a quick lunch, celebrating a
              special occasion, or unwinding at our bar — you belong here.
            </p>
            <Link href="/about" className="btn-secondary">
              Read Our Story →
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: '🔥',
                title: '450°C Stone Oven',
                desc: 'Authentic Neapolitan crust every time',
              },
              {
                icon: '🌿',
                title: 'Fresh Ingredients',
                desc: 'Locally sourced, daily delivered',
              },
              {
                icon: '🍺',
                title: 'Full Bar',
                desc: 'Cocktails, wines, and cold drinks',
              },
              {
                icon: '🛵',
                title: 'Fast Delivery',
                desc: 'Hot pizza at your door in Obosi',
              },
              {
                icon: '👨‍🍳',
                title: 'Expert Chefs',
                desc: 'Trained in Italian pizza tradition',
              },
              {
                icon: '⭐',
                title: '3.8/5 Rated',
                desc: 'Loved by our community',
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="p-4 rounded-lg"
                style={{
                  background: 'rgba(255,248,240,0.05)',
                  border: '1px solid rgba(255,248,240,0.1)',
                }}
              >
                <span className="text-2xl">{feat.icon}</span>
                <p
                  className="font-bold text-sm mt-2 mb-1"
                  style={{ color: 'var(--cream)' }}
                >
                  {feat.title}
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,248,240,0.5)' }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}