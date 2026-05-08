'use client';
export default function OpeningHoursBanner() {
  return (
    <div
      style={{ background: 'var(--red)', color: 'var(--cream)' }}
      className="py-4"
    >
      <div className="container-main">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: '#7FFF7F' }}
            />
            <span>Open Daily</span>
          </div>
          <span className="hidden md:block opacity-40">|</span>
          <div className="flex items-center gap-2">
            🕐 <span>Mon–Sat: 10AM – 8PM</span>
          </div>
          <span className="hidden md:block opacity-40">|</span>
          <div className="flex items-center gap-2">
            🕐 <span>Sunday: 11AM – 8PM</span>
          </div>
          <span className="hidden md:block opacity-40">|</span>
          <div className="flex items-center gap-2">
            📍 <span>1 Iruka Street, Obosi, Anambra</span>
          </div>
          <span className="hidden md:block opacity-40">|</span>
          <div className="flex items-center gap-2">
            📞{' '}
            <a href="tel:+2348063645052" className="hover:underline">
              0806 364 5052
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}