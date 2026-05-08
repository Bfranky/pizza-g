import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a0a0a 0%, var(--charcoal) 50%, #2a0f0f 100%)',
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C0392B' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow effects */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(192,57,43,0.15)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(212,168,83,0.08)' }}
      />

      {/* Content */}
      <div className="relative z-10 container-main text-center py-32">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 animate-fade-in"
          style={{
            background: 'rgba(192,57,43,0.2)',
            border: '1px solid rgba(192,57,43,0.5)',
            color: 'var(--gold)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#27AE60' }}
          />
          Now Open · Closes 8PM
        </div>

        {/* Script accent */}
        <p
          className="font-script text-4xl md:text-5xl mb-2 animate-fade-in delay-100"
          style={{ color: 'var(--gold)' }}
        >
          Welcome to
        </p>

        {/* Main heading */}
        <h1
          className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-none mb-4 animate-fade-in delay-200"
          style={{ color: 'var(--cream)' }}
        >
          Pizza
          <br />
          <span style={{ color: 'var(--red)' }}>Garden</span>
        </h1>

        {/* Divider */}
        <div
          className="w-20 h-1 mx-auto mb-6 animate-fade-in delay-300"
          style={{ background: 'var(--gold)' }}
        />

        {/* Tagline */}
        <p
          className="text-lg md:text-xl max-w-xl mx-auto mb-4 animate-fade-in delay-300"
          style={{ color: 'rgba(255,248,240,0.75)' }}
        >
          Authentic wood-fired pizza, craft cocktails & great vibes —
          right in the heart of Obosi, Anambra.
        </p>

        {/* Location */}
        <p
          className="text-sm mb-10 animate-fade-in delay-400"
          style={{ color: 'rgba(255,248,240,0.4)' }}
        >
          📍 1 Iruka Street, Obosi, Anambra State, Nigeria
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
          <Link href="/order" className="btn-primary text-base py-4 px-8 animate-pulse-glow">
            🍕 Order Now
          </Link>
          <Link href="/menu" className="btn-secondary text-base py-4 px-8">
            View Menu →
          </Link>
        </div>

        {/* Quick info pills */}
        <div
          className="flex flex-wrap justify-center gap-4 mt-12 animate-fade-in delay-500"
        >
          {[
            { icon: '🍕', label: 'Dine-in' },
            { icon: '📦', label: 'Takeaway' },
            { icon: '🛵', label: 'Delivery' },
            { icon: '🍺', label: 'Full Bar' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{
                background: 'rgba(255,248,240,0.08)',
                border: '1px solid rgba(255,248,240,0.15)',
                color: 'rgba(255,248,240,0.7)',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--cream)' }}>
          Scroll
        </p>
        <div
          className="w-0.5 h-8 animate-float"
          style={{ background: 'var(--cream)' }}
        />
      </div>
    </section>
  );
}