import { useCallback, useEffect, useRef, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import CartItemRow from './CartItem';
import CheckoutForm from './CheckoutForm';
import type { PaymentResult } from '@/types/payment.types';

type DrawerView = 'cart' | 'checkout' | 'success';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, total, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<DrawerView>('cart');
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

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

  useEffect(() => {
    if (!open) {
      setView('cart');
      setPaymentResult(null);
    }
  }, [open]);

  const handlePaymentSuccess = useCallback((result: PaymentResult) => {
    setPaymentResult(result);
    setView('success');
    clearCart();
  }, [clearCart]);

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
        {view === 'checkout' && (
          <CheckoutForm
            onBack={() => setView('cart')}
            onSuccess={handlePaymentSuccess}
          />
        )}

        {view === 'success' && paymentResult && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="font-display text-lg font-bold">Order Confirmed</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500
                  transition-colors hover:bg-gray-100 hover:text-gray-800"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
                <svg
                  className="h-8 w-8 text-brand-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-brand-charcoal">
                Payment Successful
              </h3>
              <p className="mb-6 text-sm text-gray-500">
                Your order has been placed successfully.
              </p>

              <div className="w-full rounded-lg border border-gray-100 bg-gray-50 p-4 text-left text-sm">
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-500">Order ID</span>
                  <span className="font-mono text-xs font-medium">{paymentResult.id}</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-semibold">
                    {paymentResult.currency === 'USD' ? '$' : paymentResult.currency === 'EUR' ? '\u20AC' : '\u00A3'}
                    {paymentResult.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="font-semibold text-brand-green">Confirmed</span>
                </div>
              </div>
            </div>

            <div className="border-t px-6 py-4">
              <button
                onClick={onClose}
                className="w-full rounded-lg bg-brand-green py-3 text-sm font-semibold text-white
                  transition-colors hover:bg-brand-green-dark"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {view === 'cart' && (
          <>
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="font-display text-lg font-bold">
                Cart ({items.length})
              </h2>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="flex h-8 w-8 items-center justify-center rounded-full
                  text-gray-500 transition-colors hover:bg-gray-100
                  hover:text-gray-800"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
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
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setView('checkout')}
                  className="mb-2 w-full rounded-lg bg-brand-green py-3
                    text-sm font-semibold text-white transition-colors
                    hover:bg-brand-green-dark"
                >
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full rounded-lg border border-gray-200 py-2
                    text-sm font-medium text-gray-600 transition-colors
                    hover:bg-gray-50"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
