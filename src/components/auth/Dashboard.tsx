import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import { useOrders } from '@/hooks/useOrders';
import type { Order } from '@/types/order.types';

type DashboardProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '\u20AC',
  GBP: '\u00A3',
};

const STATUS_STYLES: Record<string, string> = {
  completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  processing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

function OrderRow({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const symbol = CURRENCY_SYMBOLS[order.currency] ?? '$';
  const date = new Date(order.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className={cn(
        'rounded-xl border transition-colors',
        'border-gray-100 bg-white dark:border-brand-dark-border dark:bg-brand-dark-surface',
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded(prev => !prev)}
        aria-expanded={expanded}
        className={cn(
          'flex w-full items-center justify-between gap-4 px-4 py-3 text-left',
          'transition-colors hover:bg-gray-50 dark:hover:bg-brand-dark-border/50',
          'rounded-xl',
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green/10">
            <svg
              className="h-4 w-4 text-brand-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
              {order.orderId.slice(0, 16)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate} &middot; {order.items.length} item{order.items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
              STATUS_STYLES[order.status] ?? STATUS_STYLES.completed,
            )}
          >
            {order.status}
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {symbol}{order.total.toFixed(2)}
          </span>
          <svg
            className={cn(
              'h-4 w-4 text-gray-400 transition-transform',
              expanded && 'rotate-180',
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 py-3 dark:border-brand-dark-border">
          <ul className="space-y-3">
            {order.items.map(item => (
              <li key={item.productId} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-10 w-10 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Qty: {item.quantity} &times; {symbol}{item.price.toFixed(2)}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {symbol}{item.lineTotal.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Dashboard({ isOpen, onClose }: DashboardProps) {
  const { user } = useAuth();
  const { count } = useWishlist();
  const { orders, orderCount } = useOrders();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[80] overflow-y-auto',
        'bg-brand-cream dark:bg-brand-dark-bg',
      )}
    >
      <header
        className={cn(
          'border-b',
          'border-brand-sand bg-white',
          'dark:border-brand-dark-border dark:bg-brand-dark-surface',
        )}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="font-display text-xl font-bold text-brand-charcoal dark:text-gray-100">
            Dashboard
          </h1>
          <button
            onClick={onClose}
            className={cn(
              'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
              'border-gray-300 text-brand-charcoal hover:bg-gray-50',
              'dark:border-brand-dark-border dark:text-gray-200 dark:hover:bg-brand-dark-border',
            )}
          >
            Back to Store
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <section
          className={cn(
            'mb-8 rounded-2xl p-6 shadow-sm',
            'bg-white dark:bg-brand-dark-surface',
          )}
        >
          <h2 className="mb-1 font-display text-lg font-semibold text-brand-charcoal dark:text-gray-100">
            Welcome back, {user.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </section>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-brand-dark-surface">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Wishlist Items</p>
            <p className="font-display text-3xl font-bold text-brand-green">{count}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-brand-dark-surface">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Orders</p>
            <p className="font-display text-3xl font-bold text-brand-charcoal dark:text-gray-100">
              {orderCount}
            </p>
            {orderCount === 0 && (
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">No orders yet</p>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-brand-dark-surface">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</p>
            <p className="font-display text-lg font-bold text-brand-charcoal dark:text-gray-100">
              Today
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm dark:bg-brand-dark-surface">
          <h2 className="mb-4 font-display text-lg font-semibold text-brand-charcoal dark:text-gray-100">
            Order History
          </h2>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <svg
                className="mb-3 h-12 w-12 text-gray-300 dark:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your order history will appear here
              </p>
              <button
                onClick={onClose}
                className={cn(
                  'mt-4 rounded-lg bg-brand-green px-5 py-2 text-sm font-semibold text-white',
                  'transition-colors hover:bg-brand-green-dark',
                )}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
              {orders.map(order => (
                <OrderRow key={order.orderId} order={order} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
