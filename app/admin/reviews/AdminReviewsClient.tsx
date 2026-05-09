// app/admin/reviews/AdminReviewsClient.tsx
"use client";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { FiCheck, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminReviewsClient({ reviews: initial }: { reviews: any[] }) {
  const [reviews, setReviews] = useState(initial);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const filtered = reviews.filter((r) => {
    if (filter === "pending") return !r.approved;
    if (filter === "approved") return r.approved;
    return true;
  });

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch("/api/reviews/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true }),
      });
      if (!res.ok) throw new Error();
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: true } : r)));
      toast.success("Review approved!");
    } catch {
      toast.error("Failed to approve review");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await fetch("/api/reviews/" + id, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success("Review deleted");
    } catch {
      toast.error("Failed to delete review");
    }
  };

  const pendingCount = reviews.filter((r) => !r.approved).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-charcoal">Reviews</h1>
        <p className="text-gray-400 text-sm mt-1">
          {reviews.length} total · {pendingCount} pending approval
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "pending", "approved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              "px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all " +
              (filter === f
                ? "bg-brand-red text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:border-brand-red hover:text-brand-red")
            }
          >
            {f === "all" ? "All Reviews" : f === "pending" ? "Pending (" + pendingCount + ")" : "Approved"}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
          <p className="text-gray-400">No reviews in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((review) => (
            <div
              key={review.id}
              className={
                "bg-white rounded-2xl p-5 shadow-sm border transition-all " +
                (review.approved ? "border-gray-100" : "border-yellow-200 bg-yellow-50/30")
              }
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-brand-charcoal">{review.user.name}</p>
                    <p className="text-xs text-gray-400">{review.user.email}</p>
                  </div>
                </div>
                <span
                  className={
                    "text-xs px-2 py-0.5 rounded-full font-semibold " +
                    (review.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")
                  }
                >
                  {review.approved ? "Approved" : "Pending"}
                </span>
              </div>

              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className={"text-base " + (s <= review.rating ? "text-yellow-400" : "text-gray-200")}>
                    ★
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed italic mb-3">"{review.comment}"</p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
                <div className="flex gap-2">
                  {!review.approved && (
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="flex items-center gap-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <FiCheck size={13} /> Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-500 font-semibold px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <FiTrash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
