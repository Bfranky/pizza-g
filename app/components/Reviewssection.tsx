'use client';

const REVIEWS = [
  {
    id: 1,
    name: 'Chukwuemeka O.',
    rating: 5,
    comment:
      'Best pizza in Anambra! The Pepperoni Inferno is absolutely fire 🔥. The crust is perfect — crispy outside, soft inside. Will definitely be back.',
    date: '2 weeks ago',
    avatar: 'C',
  },
  {
    id: 2,
    name: 'Adaeze N.',
    rating: 4,
    comment:
// NEW - double quotes
"The ambiance is great and the food comes out hot. I love the Chapman here, it's the best in Obosi. Staff are very friendly and welcoming.",    date: '1 month ago',
    avatar: 'A',
  },
  {
    id: 3,
    name: 'Ikenna M.',
    rating: 4,
    comment:
      "Solid pizza place. The Meat Lover's pizza is filling and delicious. Delivery was a bit slow but the food quality made up for it.",
    date: '3 weeks ago',
    avatar: 'I',
  },
  {
    id: 4,
    name: 'Ngozi U.',
    rating: 5,
    comment:
      'Celebrated my birthday here last month. The staff surprised us with a complimentary dessert! Amazing experience, highly recommend.',
    date: '6 weeks ago',
    avatar: 'N',
  },
];

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-3xl' : 'text-xl';
  return (
    <div className={`flex gap-0.5 ${sz}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>{star <= rating ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const avgRating = 3.8;
  const totalReviews = 11;

  return (
    <section
      className="section-py"
      style={{ background: 'var(--charcoal)' }}
    >
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="font-script text-3xl mb-1"
            style={{ color: 'var(--gold)' }}
          >
            What People Say
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--cream)' }}
          >
            Customer Reviews
          </h2>
          <div className="divider-gold mx-auto mt-3" />

          {/* Rating summary */}
          <div className="mt-8 inline-block">
            <div
              className="px-10 py-6 rounded-2xl"
              style={{ background: 'rgba(255,248,240,0.05)', border: '1px solid rgba(255,248,240,0.1)' }}
            >
              <p
                className="font-display font-bold text-6xl"
                style={{ color: 'var(--gold)' }}
              >
                {avgRating}
              </p>
              <div className="flex justify-center mt-1" style={{ color: 'var(--gold)' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-2xl">
                    {s <= Math.round(avgRating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <p
                className="text-sm mt-1"
                style={{ color: 'rgba(255,248,240,0.5)' }}
              >
                Based on {totalReviews} reviews
              </p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-xl"
              style={{
                background: 'rgba(255,248,240,0.05)',
                border: '1px solid rgba(255,248,240,0.1)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: 'var(--red)', color: 'var(--cream)' }}
                >
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--cream)' }}>
                    {review.name}
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(255,248,240,0.4)' }}>
                    {review.date}
                  </p>
                </div>
              </div>
              <div style={{ color: 'var(--gold)' }} className="text-base mb-2">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,248,240,0.65)' }}
              >
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p
            className="text-sm mb-4"
            style={{ color: 'rgba(255,248,240,0.5)' }}
          >
            Had a great experience? Share your review!
          </p>
          <button
            className="btn-primary"
            onClick={() => alert('Please log in to submit a review')}
          >
            Write a Review ✏️
          </button>
        </div>
      </div>
    </section>
  );
}