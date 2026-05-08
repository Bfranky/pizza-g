'use client';
export default function PhotoGallery() {
  const photos = [
    { emoji: '🍕', label: 'Margherita Suprema', bg: 'linear-gradient(135deg, #8B1A1A, #2C2C2C)' },
    { emoji: '🍹', label: 'Signature Cocktails', bg: 'linear-gradient(135deg, #1a3a4a, #2C2C2C)' },
    { emoji: '🥩', label: 'Meat Lover\'s', bg: 'linear-gradient(135deg, #4a1a0a, #2C2C2C)' },
    { emoji: '🍺', label: 'The Bar', bg: 'linear-gradient(135deg, #2C2C2C, #0a1a4a)' },
    { emoji: '👨‍🍳', label: 'Our Kitchen', bg: 'linear-gradient(135deg, #1a4a1a, #2C2C2C)' },
    { emoji: '🥗', label: 'Garden Special', bg: 'linear-gradient(135deg, #2a4a1a, #2C2C2C)' },
  ];

  return (
    <section className="section-py" style={{ background: 'var(--cream)' }}>
      <div className="container-main">
        <div className="text-center mb-12">
          <p
            className="font-script text-3xl mb-1"
            style={{ color: 'var(--red)' }}
          >
            Gallery
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--charcoal)' }}
          >
            Life at Pizza Garden
          </h2>
          <div className="divider-red mx-auto mt-3" />
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <div
              key={photo.label}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 ? 'row-span-2' : ''
              }`}
              style={{
                height: i === 0 ? '480px' : '220px',
                background: photo.bg,
              }}
            >
              {/* Emoji placeholder for real images */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="transition-transform duration-500 group-hover:scale-110"
                  style={{ fontSize: i === 0 ? '6rem' : '4rem' }}
                >
                  {photo.emoji}
                </span>
              </div>

              {/* Overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{
                  background:
                    'linear-gradient(to top, rgba(192,57,43,0.9), transparent)',
                }}
              >
                <p
                  className="font-display font-bold text-sm md:text-base"
                  style={{ color: 'var(--cream)' }}
                >
                  {photo.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-6 text-sm"
          style={{ color: 'rgba(44,44,44,0.4)' }}
        >
          Visit us or follow @PizzaGardenObosi on social media for more
        </p>
      </div>
    </section>
  );
}