import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getProductImage } from '@/lib/productUtils';
import { COLOR_NAMES } from '@/data/colors';
import type { Product } from '@/types';
import { useReviews } from '@/hooks/useReviews';
import StarRating from '../ui/StarRating';
import WishlistButton from '../ui/WishlistButton';
import AddToCartButton from '../cart/AddToCartButton';
import ReviewModal from '../ui/ReviewModal';
import ProductReviewSection from './ProductReviewSection';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showReviews, setShowReviews] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] ?? null,
  );
  const { getAverageRating, getProductReviews } = useReviews();
  const avgRating = getAverageRating(product.id);
  const reviewCount = getProductReviews(product.id).length;
  const shouldReduce = useReducedMotion();
  const currentImage = getProductImage(product, selectedColor);

  return (
    <>
      <motion.article
        className="group"
        initial={shouldReduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Link to={`/products/${product.id}`} className="block">
          <div className="relative mb-3 overflow-hidden rounded-xl bg-gray-100 dark:bg-brand-dark-surface">
            <img
              src={currentImage}
              alt={`${product.name}${selectedColor ? ` in ${COLOR_NAMES[selectedColor] ?? selectedColor}` : ''}`}
              loading="lazy"
              className={cn(
                'h-56 w-full object-cover transition-transform duration-500',
                'group-hover:scale-105 motion-reduce:transition-none',
              )}
            />
            <div
              className={cn(
                'absolute right-2 top-2 opacity-0 transition-opacity',
                'group-hover:opacity-100 focus-within:opacity-100',
              )}
              onClick={e => e.preventDefault()}
            >
              <WishlistButton productId={product.id} />
            </div>
            <button
              onClick={e => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              aria-label={`Quick view ${product.name}`}
              className={cn(
                'absolute bottom-2 left-1/2 -translate-x-1/2',
                'flex items-center gap-1.5 rounded-full px-3 py-1.5',
                'bg-white/90 text-xs font-medium text-brand-charcoal shadow-sm backdrop-blur-sm',
                'opacity-0 transition-all duration-200',
                'group-hover:opacity-100 group-hover:translate-y-0',
                'translate-y-2 hover:bg-white',
                'dark:bg-brand-dark-surface/90 dark:text-gray-200 dark:hover:bg-brand-dark-surface',
                'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
              )}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Quick View
            </button>
          </div>
          <h3 className="text-sm font-semibold dark:text-gray-100">{product.name}</h3>
        </Link>
        {product.colors && (
          <div className="mt-1 flex items-center gap-1.5" role="radiogroup" aria-label="Select color">
            {product.colors.map(color => (
              <button
                key={color}
                role="radio"
                aria-checked={selectedColor === color}
                aria-label={COLOR_NAMES[color] ?? color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  'h-3 w-3 rounded-full border-2 transition-all',
                  selectedColor === color
                    ? 'border-brand-green scale-125 ring-1 ring-brand-green/30'
                    : 'border-gray-200 hover:scale-110 dark:border-brand-dark-border',
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
        <div className="mt-1 flex items-center gap-2">
          <StarRating rating={avgRating ?? product.rating} />
          <button
            onClick={() => setShowReviews(true)}
            aria-label={`Reviews for ${product.name}`}
            className="text-xs text-gray-400 transition-colors hover:text-brand-green dark:text-gray-500 dark:hover:text-brand-green-light"
          >
            ({reviewCount})
          </button>
        </div>
        <div className="mt-1 flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through dark:text-gray-500">${product.originalPrice}</span>
          )}
          <span className="text-sm font-bold dark:text-gray-100">${product.price}</span>
        </div>
        <AddToCartButton productId={product.id} />
      </motion.article>
      <ReviewModal
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
        title={`Reviews — ${product.name}`}
      >
        <ProductReviewSection productId={product.id} />
      </ReviewModal>
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}
