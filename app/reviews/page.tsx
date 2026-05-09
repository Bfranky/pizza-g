// app/reviews/page.tsx
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "See what customers say about Pizza Garden in Obosi, Anambra. Read reviews and share your own experience.",
};

async function getReviews() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return reviews;
  } catch {
    return [];
  }
}

export default async function ReviewsPage() {
  const [session, reviews] = await Promise.all([getServerSession(authOptions), getReviews()]);
  const avg = reviews.length ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length : 3.8;

  return <ReviewsClient reviews={reviews} avgRating={avg} isLoggedIn={!!session} />;
}

export const dynamic = 'force-dynamic';
