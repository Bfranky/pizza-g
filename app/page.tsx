// app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import HowItWorks from "@/components/home/HowItWorks";
import ReviewsPreview from "@/components/home/ReviewsPreview";
import Gallery from "@/components/home/Gallery";
import OpenStatus from "@/components/home/OpenStatus";

export const metadata: Metadata = {
  title: "Pizza Garden | Best Pizza in Obosi, Anambra Nigeria",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <OpenStatus />
      <FeaturedMenu />
      <HowItWorks />
      <Gallery />
      <ReviewsPreview />
    </>
  );
}
