import { useEffect, useRef } from 'react';
import { useCart } from '@/hooks/useCart';
import CartItemRow from './CartItem';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, total, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

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
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        tabIndex={-1}
        className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col bg-white shadow-xl outline-none"
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="font-display text-lg font-bold">
            Cart ({items.length})
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <svg className="mb-4 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-sm text-gray-500">Your cart is empty.</p>
              <p className="mt-1 text-xs text-gray-400">
                Add items from the product grid to get started.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <CartItemRow
                  key={item.productId}
                  productId={item.productId}
                  quantity={item.quantity}
                />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Subtotal</span>
              <span className="text-lg font-bold">${total}</span>
            </div>
            <button
              onClick={clearCart}
              className="w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
