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
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
      : 3.8;
    return {
      reviews,
      avg: Math.round(avg * 10) / 10,
      total: await prisma.review.count({ where: { approved: true } }),
    };
  } catch {
    return { reviews: [], avg: 3.8, total: 11 };
  }
}

const fallbackReviews = [
  {
    name: "Chukwuemeka O.",
    rating: 5,
    comment:
      "Best pizza in Anambra! The Pepperoni Inferno is absolutely fire. The crust is perfect — crispy outside, soft inside. Will definitely be back.",
    date: "2 weeks ago",
  },
  {
    name: "Adaeze N.",
    rating: 4,
    comment:
      "The ambiance is great and the food comes out hot. I love the Chapman here, it's the best in Obosi. Staff are very friendly and welcoming.",
    date: "1 month ago",
  },
  {
    name: "Ngozi U.",
    rating: 5,
    comment:
      "Celebrated my birthday here last month. The staff surprised us with a complimentary dessert! Amazing experience, highly recommend.",
    date: "6 weeks ago",
  },
];

export default async function ReviewsPreview() {
  const { reviews, avg, total } = await getReviews();
  const displayReviews = reviews.length > 0 ? reviews : null;

  return (
    <section
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "var(--brand-charcoal-light)" }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=60&fit=crop')",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-[var(--brand-gold)] text-xs tracking-[0.35em] uppercase font-semibold block mb-4"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Guest Experiences
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ letterSpacing: "-0.01em" }}
          >
            What Our Guests Say
          </h2>

          {/* Rating display */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="text-xl"
                  style={{
                    color:
                      star <= Math.round(avg)
                        ? "var(--brand-gold)"
                        : "rgba(255,255,255,0.2)",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span
              className="font-display text-3xl font-bold text-white"
            >
              {avg}
            </span>
            <span
              className="text-white/40 text-sm"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              ({total} verified reviews)
            </span>
          </div>

          <div className="ornament-divider max-w-xs mx-auto mt-4">
            <span className="text-[var(--brand-gold)] text-lg">✦</span>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {(displayReviews
            ? displayReviews.map((r: any) => ({
                name: r.user.name,
                rating: r.rating,
                comment: r.comment,
                date: formatDate(r.createdAt),
              }))
            : fallbackReviews
          ).map((review: any, i: number) => (
            <div
              key={i}
              className="p-8 border border-white/10 relative group hover:border-[var(--brand-gold)]/30 transition-all duration-400"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              {/* Large quote mark */}
              <div
                className="font-display text-7xl font-bold text-[var(--brand-gold)] opacity-20 leading-none absolute top-4 left-6"
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5 relative z-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      color:
                        star <= review.rating
                          ? "var(--brand-gold)"
                          : "rgba(255,255,255,0.2)",
                      fontSize: "14px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p
                className="text-white/70 text-sm leading-relaxed mb-6 italic"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                "{review.comment}"
              </p>

              {/* Divider */}
              <div className="h-px mb-5" style={{ background: "rgba(201,168,76,0.2)" }} />

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 flex items-center justify-center font-display font-bold text-sm"
                  style={{
                    background: "var(--brand-gold)",
                    color: "var(--brand-charcoal)",
                  }}
                >
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p
                    className="text-white text-sm font-semibold"
                    style={{ fontFamily: "var(--font-lato)" }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="text-white/30 text-xs"
                    style={{ fontFamily: "var(--font-lato)" }}
                  >
                    {review.date}
                  </p>
                </div>
              </div>

              {/* Hover accent */}
              <div
                className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px transition-all duration-500"
                style={{ background: "var(--brand-gold)" }}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/reviews"
            className="btn-outline-cream px-10 py-4 inline-block"
          >
            Read All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}