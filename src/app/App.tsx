import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/hooks/useTheme';
import { WishlistProvider } from '@/hooks/useWishlist';
import { CartProvider } from '@/hooks/useCart';
import { ReviewsProvider } from '@/hooks/useReviews';
import { AuthProvider } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import HomePage from '@/components/pages/HomePage';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import FaqPage from '@/components/pages/FaqPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
    <ThemeProvider>
    <AuthProvider>
    <WishlistProvider>
    <CartProvider>
    <ReviewsProvider>
      <ScrollToTop />
      <a
        href="#main-content"
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4',
          'focus:z-[100] focus:rounded-md focus:bg-brand-green-dark',
          'focus:px-4 focus:py-2 focus:text-white',
        )}
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <AnimatedRoutes />
      </main>
      <Footer />
    </ReviewsProvider>
    </CartProvider>
    </WishlistProvider>
    </AuthProvider>
    </ThemeProvider>
    </BrowserRouter>
  );
}
