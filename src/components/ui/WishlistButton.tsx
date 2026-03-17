import { motion, useReducedMotion } from 'framer-motion';
import { useWishlist } from '@/hooks/useWishlist';

interface WishlistButtonProps {
  productId: number;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const { toggle, isInWishlist } = useWishlist();
  const active = isInWishlist(productId);
  const shouldReduce = useReducedMotion();

  return (
    <motion.button
      onClick={e => {
        e.stopPropagation();
        toggle(productId);
      }}
      whileTap={shouldReduce ? undefined : { scale: 0.9 }}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className="flex h-8 w-8 items-center justify-center rounded-full
        bg-white/80 text-brand-charcoal shadow-sm backdrop-blur-sm
        transition-colors hover:bg-white dark:bg-brand-dark-surface/80
        dark:text-gray-200 dark:hover:bg-brand-dark-surface"
    >
      <svg
        className={`h-4 w-4 transition-colors ${
          active ? 'fill-red-500 text-red-500' : 'fill-none text-brand-charcoal dark:text-gray-200'
        }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        />
      </svg>
    </motion.button>
  );
}
