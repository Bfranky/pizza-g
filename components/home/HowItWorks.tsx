const steps = [
  {
    number: "01",
    icon: "🍕",
    title: "Choose Your Pizza",
    desc: "Browse our handcrafted pizzas, drinks, and bar items. Filter by category or occasion.",
  },
  {
    number: "02",
    icon: "🛒",
    title: "Add to Cart",
    desc: "Select dine-in, takeaway, or delivery. Add items and customize to your taste.",
  },
  {
    number: "03",
    icon: "💳",
    title: "Pay Securely",
    desc: "Checkout with Paystack — card, bank transfer, or USSD. Safe and instant.",
  },
  {
    number: "04",
    icon: "🔥",
    title: "Enjoy!",
    desc: "We fire your pizza in our 450°C stone oven. Hot and fresh, every time.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "var(--brand-charcoal)" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-[var(--brand-gold)] text-xs tracking-[0.35em] uppercase font-semibold block mb-4"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Simple &amp; Effortless
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ letterSpacing: "-0.01em" }}
          >
            How to Order
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-[var(--brand-gold)] text-lg">✦</span>
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 left-full w-full h-px z-0"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--brand-gold), transparent)",
                    width: "calc(100% - 80px)",
                    left: "80px",
                  }}
                />
              )}

              <div
                className="relative p-8 border border-white/10 group-hover:border-[var(--brand-gold)]/40 transition-all duration-400"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {/* Number */}
                <div
                  className="font-display text-5xl font-bold mb-4 opacity-20 leading-none"
                  style={{ color: "var(--brand-gold)" }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-3xl mb-4">{step.icon}</div>

                {/* Title */}
                <h3
                  className="font-display text-lg font-bold text-white mb-3"
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-white/50 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {step.desc}
                </p>

                {/* Gold accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 transition-all duration-500"
                  style={{ background: "var(--brand-gold)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}