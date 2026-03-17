import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '@/components/hero/HeroSection';
import LatestCollection from '@/components/collections/LatestCollection';
import FeatureSection from '@/components/features/FeatureSection';
import ProductGrid from '@/components/products/ProductGrid';
import StoryBanner from '@/components/banners/StoryBanner';
import BlogSection from '@/components/blog/BlogSection';
import PromoBanner from '@/components/banners/PromoBanner';

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      <HeroSection />
      <LatestCollection />
      <FeatureSection />
      <ProductGrid />
      <StoryBanner />
      <BlogSection />
      <PromoBanner />
    </>
  );
}
