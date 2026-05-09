// app/menu/loading.tsx
import { SkeletonGrid } from "@/components/ui/SkeletonCard";

export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-charcoal pt-24 pb-16 px-4 text-center">
        <div className="skeleton h-8 w-40 mx-auto rounded mb-4" />
        <div className="skeleton h-12 w-64 mx-auto rounded" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex gap-3 justify-center mb-10">
          {[1,2,3,4,5].map(i => <div key={i} className="skeleton h-9 w-24 rounded-full" />)}
        </div>
        <SkeletonGrid count={8} />
      </div>
    </div>
  );
}
