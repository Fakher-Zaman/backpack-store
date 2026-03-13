import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import LatestCollection from '@/components/collections/LatestCollection';
import FeatureSection from '@/components/features/FeatureSection';
import ProductGrid from '@/components/products/ProductGrid';
import StoryBanner from '@/components/banners/StoryBanner';
import BlogSection from '@/components/blog/BlogSection';
import PromoBanner from '@/components/banners/PromoBanner';
import Footer from '@/components/layout/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <LatestCollection />
        <FeatureSection />
        <ProductGrid />
        <StoryBanner />
        <BlogSection />
        <PromoBanner />
      </main>
      <Footer />
    </>
  );
}
