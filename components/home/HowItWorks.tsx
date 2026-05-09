// components/home/HowItWorks.tsx
const steps = [
  { icon: "🍕", title: "Choose Your Pizza", desc: "Browse our extensive menu of handcrafted pizzas, drinks, and bar items." },
  { icon: "🛒", title: "Add to Cart", desc: "Select your order type — dine-in, takeaway, or delivery — and add to cart." },
  { icon: "💳", title: "Pay Securely", desc: "Checkout securely with Paystack — card, bank transfer, or USSD." },
  { icon: "🚀", title: "Enjoy!", desc: "We prepare your order fresh and serve it hot. Dine-in or we bring it to you." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-brand-charcoal pizza-pattern">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-red-light text-sm font-bold tracking-[0.2em] uppercase">Simple Process</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {steps.map((step, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-5xl mb-4">{step.icon}</div>
              <div className="w-7 h-7 bg-brand-red rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto mb-3">
                {i + 1}
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
