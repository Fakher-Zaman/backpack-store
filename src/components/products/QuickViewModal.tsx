import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getProductImage } from '@/lib/productUtils';
import { COLOR_NAMES } from '@/data/colors';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useReviews } from '@/hooks/useReviews';
import StarRating from '../ui/StarRating';
import WishlistButton from '../ui/WishlistButton';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { addItem } = useCart();
  const { getAverageRating, getProductReviews } = useReviews();
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] ?? null,
  );
  const [quantity, setQuantity] = useState(1);

  const avgRating = getAverageRating(product.id);
  const reviewCount = getProductReviews(product.id).length;

  // Get the current image based on selected color
  const currentImage = getProductImage(product, selectedColor);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedColor(product.colors?.[0] ?? null);
    setQuantity(1);
  }, [product]);

  const handleAddToCart = (): void => {
    for (let i = 0; i < quantity; i++) {
      addItem(product.id);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.2 }}
          onClick={onClose}
          role="presentation"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            tabIndex={-1}
            className={cn(
              'relative z-10 w-full max-w-2xl overflow-y-auto rounded-2xl',
              'bg-white shadow-xl dark:bg-brand-dark-surface',
              'max-h-[90vh] sm:max-h-[85vh]',
              'focus:outline-none',
            )}
            initial={shouldReduce ? false : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: shouldReduce ? 0 : 0.2, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className={cn(
                'absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center',
                'rounded-full bg-white/80 text-gray-500 backdrop-blur-sm',
                'transition-colors hover:bg-gray-100 hover:text-gray-700',
                'dark:bg-brand-dark-surface/80 dark:text-gray-400',
                'dark:hover:bg-brand-dark-border dark:hover:text-gray-200',
              )}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative sm:w-1/2">
                <img
                  src={currentImage}
                  alt={`${product.name}${selectedColor ? ` in ${COLOR_NAMES[selectedColor] ?? selectedColor}` : ''}`}
                  className="h-64 w-full rounded-t-2xl object-cover sm:h-full sm:rounded-l-2xl sm:rounded-tr-none"
                />
                <div className="absolute right-3 top-3 sm:right-auto sm:left-3">
                  <WishlistButton productId={product.id} />
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-4 p-5 sm:w-1/2 sm:p-6">
                <div>
                  <h2
                    id="quick-view-title"
                    className="text-lg font-semibold text-brand-charcoal dark:text-gray-100"
                  >
                    {product.name}
                  </h2>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={avgRating ?? product.rating} />
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through dark:text-gray-500">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xl font-bold text-brand-charcoal dark:text-gray-100">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {product.description}
                  </p>
                )}

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Color: {selectedColor ? (COLOR_NAMES[selectedColor] ?? selectedColor) : ''}
                    </span>
                    <div className="mt-1.5 flex items-center gap-2" role="radiogroup" aria-label="Select color">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          role="radio"
                          aria-checked={selectedColor === color}
                          aria-label={COLOR_NAMES[color] ?? color}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            'h-6 w-6 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2',
                            selectedColor === color
                              ? 'border-brand-green scale-110 ring-2 ring-brand-green/30'
                              : 'border-gray-200 hover:scale-105 dark:border-brand-dark-border',
                            'dark:focus:ring-offset-brand-dark-surface'
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Quantity
                  </span>
                  <div className="mt-1.5 flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg border',
                        'text-sm font-medium transition-colors',
                        'border-gray-200 text-gray-600 hover:bg-gray-50',
                        'dark:border-brand-dark-border dark:text-gray-300 dark:hover:bg-brand-dark-border',
                        'disabled:opacity-40 disabled:cursor-not-allowed',
                      )}
                    >
                      −
                    </button>
                    <span
                      className="w-8 text-center text-sm font-semibold dark:text-gray-100"
                      aria-live="polite"
                      aria-label={`Quantity: ${quantity}`}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      aria-label="Increase quantity"
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg border',
                        'text-sm font-medium transition-colors',
                        'border-gray-200 text-gray-600 hover:bg-gray-50',
                        'dark:border-brand-dark-border dark:text-gray-300 dark:hover:bg-brand-dark-border',
                      )}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={cn(
                    'mt-auto w-full rounded-lg py-3 text-sm font-medium',
                    'bg-brand-green text-white transition-colors',
                    'hover:bg-brand-green-dark',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2',
                  )}
                >
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
