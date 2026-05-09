// app/admin/reviews/page.tsx
import { prisma } from "@/lib/prisma";
import AdminReviewsClient from "./AdminReviewsClient";

async function getReviews() {
  try {
    return await prisma.review.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminReviewsPage() {
  const reviews = await getReviews();
  return <AdminReviewsClient reviews={reviews} />;
}
