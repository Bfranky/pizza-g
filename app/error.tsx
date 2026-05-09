"use client";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🍕</div>
        <h1 className="font-display text-3xl font-bold text-brand-charcoal mb-2">Something went wrong</h1>
        <p className="text-gray-400 mb-6">{error.message ?? "An unexpected error occurred."}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="bg-brand-red text-white font-bold px-6 py-3 rounded-full hover:bg-brand-red-dark transition-colors">
            Try Again
          </button>
          <Link href="/" className="border-2 border-gray-200 text-brand-charcoal font-bold px-6 py-3 rounded-full hover:border-brand-charcoal transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
