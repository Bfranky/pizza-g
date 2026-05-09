// components/ui/LoadingSpinner.tsx
export default function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-2 border-brand-red border-t-transparent rounded-full animate-spin mx-auto"
    />
  );
}
