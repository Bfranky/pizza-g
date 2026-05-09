// components/home/ReviewsPreview.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

async function getReviews() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
    const avg = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 3.8;
    return { reviews, avg: Math.round(avg * 10) / 10, total: await prisma.review.count({ where: { approved: true } }) };
  } catch {
    return { reviews: [], avg: 3.8, total: 11 };
  }
}

export default async function ReviewsPreview() {
  const { reviews, avg, total } = await getReviews();

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-red text-sm font-bold tracking-[0.2em] uppercase">What Our Customers Say</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-charcoal mt-2 mb-4">
            Reviews
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-2xl ${star <= Math.round(avg) ? "text-yellow-400" : "text-gray-300"}`}>★</span>
              ))}
            </div>
            <span className="text-3xl font-bold text-brand-charcoal">{avg}</span>
            <span className="text-gray-400">({total} reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {reviews.map((review) => (
            <div key={review.id} className="bg-brand-cream rounded-2xl p-6 border border-orange-100">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-lg ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{review.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white text-xs font-bold">
                  {review.user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-sm text-brand-charcoal">{review.user.name}</p>
                  <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-400 mb-4">Be the first to leave a review!</p>
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-block border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300"
          >
            Read All Reviews →
          </Link>
        </div>
      </div>
    </section>
  );
}
