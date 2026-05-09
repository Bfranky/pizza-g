// app/reviews/ReviewsClient.tsx
"use client";
import { useState } from "react";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

interface Props {
  reviews: any[];
  avgRating: number;
  isLoggedIn: boolean;
}

export default function ReviewsClient({ reviews, avgRating, isLoggedIn }: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) { toast.error("Please select a rating"); return; }
    if (comment.trim().length < 10) { toast.error("Please write at least 10 characters"); return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      if (!res.ok) throw new Error();
      toast.success("Review submitted! It will appear after approval.");
      setRating(0);
      setComment("");
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-charcoal pt-24 pb-16 px-4 text-center">
        <span className="text-brand-red-light text-sm font-bold tracking-[0.2em] uppercase">Customer Voices</span>
        <h1 className="font-display text-5xl font-bold text-white mt-2">Reviews</h1>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="flex gap-1">
            {[1,2,3,4,5].map((s) => (
              <span key={s} className={`text-3xl ${s <= Math.round(avgRating) ? "text-yellow-400" : "text-gray-600"}`}>★</span>
            ))}
          </div>
          <span className="text-white text-3xl font-bold">{avgRating.toFixed(1)}</span>
          <span className="text-gray-400">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Submit Review */}
        {isLoggedIn ? (
          <div className="bg-white rounded-2xl p-6 mb-10 shadow-sm border border-gray-100">
            <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-4">Leave a Review</h2>
            <div className="flex gap-2 mb-4">
              {[1,2,3,4,5].map((s) => (
                <button
                  key={s}
                  onMouseEnter={() => setHoveredStar(s)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(s)}
                  className="text-3xl transition-transform hover:scale-110"
                >
                  <span className={s <= (hoveredStar || rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red resize-none h-28"
              placeholder="Share your experience at Pizza Garden..."
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-3 bg-brand-red hover:bg-brand-red-dark disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-full transition-colors"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 mb-10 text-center border border-gray-100">
            <p className="text-gray-500 mb-3">Sign in to leave a review</p>
            <Link href="/login" className="bg-brand-red text-white font-bold px-6 py-2.5 rounded-full hover:bg-brand-red-dark transition-colors">
              Sign In
            </Link>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No reviews yet. Be the first!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-bold">
                      {review.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-charcoal">{review.user.name}</p>
                      <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className={`text-lg ${s <= review.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-4 leading-relaxed italic">"{review.comment}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
