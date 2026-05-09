import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-display font-bold text-brand-red/20 mb-4">404</div>
        <div className="text-5xl mb-4">🍕</div>
        <h1 className="font-display text-3xl font-bold text-brand-charcoal mb-2">Page Not Found</h1>
        <p className="text-gray-400 mb-6">This slice has been eaten. Let us take you back home.</p>
        <Link href="/" className="bg-brand-red text-white font-bold px-8 py-3.5 rounded-full hover:bg-brand-red-dark transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
