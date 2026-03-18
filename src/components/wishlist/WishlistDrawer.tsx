import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/hooks/useWishlist';
import { products } from '@/data/products';

type WishlistDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function WishlistDrawer({ open, onClose }: WishlistDrawerProps) {
  const { items, toggle } = useWishlist();
  const drawerRef = useRef<HTMLDivElement>(null);

  const wishlisted = products.filter(p => items.includes(p.id));

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      drawerRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Wishlist"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          'fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col',
          'bg-white shadow-xl outline-none dark:bg-brand-dark-surface',
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'flex items-center justify-between border-b px-6 py-4',
            'border-gray-200 dark:border-brand-dark-border',
          )}
        >
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-gray-100">
            Wishlist ({wishlisted.length})
          </h2>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              'text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800',
              'dark:text-gray-400 dark:hover:bg-brand-dark-border dark:hover:text-gray-200',
            )}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {wishlisted.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <svg
                className="mb-4 h-12 w-12 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12
                    5.67l-1.06-1.06a5.5 5.5 0 00-7.78
                    7.78l1.06 1.06L12 21.23l7.78-7.78
                    1.06-1.06a5.5 5.5 0 000-7.78z"
                />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your wishlist is empty.</p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Tap the heart icon on products to save them here.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {wishlisted.map(product => (
                <li key={product.id} className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">${product.price}</p>
                  </div>
                  <button
                    onClick={() => toggle(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                      'text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500',
                      'dark:text-gray-500 dark:hover:bg-brand-dark-border dark:hover:text-red-400',
                    )}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
