import type { Metadata } from 'next';
import HeroSection from '@/app/components/herosection';
import FeaturedMenu from '@/app/components/Featuredmenu';
import AboutSnippet from '@/app/components/sections/Aboutsnippet';
import PhotoGallery from '@/app/components/Photogallery';
import ReviewsSection from '@/app/components/Reviewssection';
import OpeningHoursBanner from '@/app/components/Openinghoursbanner';

export const metadata: Metadata = {
  title: 'Pizza Garden — Best Pizza in Obosi, Anambra Nigeria',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OpeningHoursBanner />
      <FeaturedMenu />
      <AboutSnippet />
      <PhotoGallery />
      <ReviewsSection />
    </>
  );
}