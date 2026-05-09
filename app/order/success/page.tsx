// app/order/success/page.tsx
import Link from "next/link";
import { FiCheckCircle, FiHome } from "react-icons/fi";

export default function OrderSuccessPage({ searchParams }: { searchParams: { orderId?: string } }) {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-brand-charcoal mb-3">Order Placed!</h1>
          <p className="text-gray-500 mb-2">Thank you! Your order has been received and we are getting started right away.</p>
          {searchParams.orderId && (
            <p className="text-xs text-gray-400 font-mono bg-gray-50 rounded-lg px-3 py-2 inline-block mb-6">
              Order: #{searchParams.orderId.slice(-8).toUpperCase()}
            </p>
          )}
          <div className="bg-brand-cream rounded-2xl p-4 mb-6 text-sm text-gray-600">
            <p className="font-semibold text-brand-charcoal mb-1">What happens next?</p>
            <p>We will prepare your order. For questions call <a href="tel:08063645052" className="text-brand-red font-semibold">0806 364 5052</a>.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-brand-charcoal font-bold py-3 rounded-full hover:border-brand-charcoal transition-colors">
              <FiHome size={16} /> Home
            </Link>
            <Link href="/menu" className="flex-1 flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3 rounded-full transition-colors">
              Order More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
