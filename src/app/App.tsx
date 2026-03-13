import { WishlistProvider } from '@/hooks/useWishlist';
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
    <WishlistProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-green-dark focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <LatestCollection />
        <FeatureSection />
        <ProductGrid />
        <StoryBanner />
        <BlogSection />
        <PromoBanner />
      </main>
      <Footer />
    </WishlistProvider>
  );
}
