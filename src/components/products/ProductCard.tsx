import { useState } from 'react';
import type { Product } from '@/types';
import { useReviews } from '@/hooks/useReviews';
import StarRating from '../ui/StarRating';
import WishlistButton from '../ui/WishlistButton';
import AddToCartButton from '../cart/AddToCartButton';
import ReviewModal from '../ui/ReviewModal';
import ProductReviewSection from './ProductReviewSection';

const COLOR_NAMES: Record<string, string> = {
  '#2C2C2C': 'Charcoal',
  '#5C4033': 'Brown',
  '#1A3A25': 'Forest Green',
  '#4A5568': 'Slate Gray',
  '#E8DFD0': 'Cream',
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showReviews, setShowReviews] = useState(false);
  const { getAverageRating, getProductReviews } = useReviews();
  const avgRating = getAverageRating(product.id);
  const reviewCount = getProductReviews(product.id).length;

  return (
    <>
      <article className="group">
        <div className="relative mb-3 overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
          <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            <WishlistButton productId={product.id} />
          </div>
        </div>
        <h3 className="text-sm font-semibold">{product.name}</h3>
        {product.colors && (
          <div className="mt-1 flex items-center gap-1.5" role="list" aria-label="Available colors">
            {product.colors.map((color, i) => (
              <span
                key={i}
                role="listitem"
                aria-label={COLOR_NAMES[color] ?? color}
                className="h-2.5 w-2.5 rounded-full border border-gray-200"
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
            className="text-xs text-gray-400 transition-colors hover:text-brand-green"
          >
            ({reviewCount})
          </button>
        </div>
        <div className="mt-1 flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
          )}
          <span className="text-sm font-bold">${product.price}</span>
        </div>
        <AddToCartButton productId={product.id} />
      </article>
      <ReviewModal
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
        title={`Reviews — ${product.name}`}
      >
        <ProductReviewSection productId={product.id} />
      </ReviewModal>
    </>
  );
}
