import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';

type DashboardProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Dashboard({ isOpen, onClose }: DashboardProps) {
  const { user } = useAuth();
  const { count } = useWishlist();

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
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-brand-cream">
      <header className="border-b border-brand-sand bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="font-display text-xl font-bold text-brand-charcoal">Dashboard</h1>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium
              text-brand-charcoal transition-colors hover:bg-gray-50"
          >
            Back to Store
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-1 font-display text-lg font-semibold text-brand-charcoal">
            Welcome back, {user.name}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </section>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-medium text-gray-500">Wishlist Items</p>
            <p className="font-display text-3xl font-bold text-brand-green">{count}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-medium text-gray-500">Orders</p>
            <p className="font-display text-3xl font-bold text-brand-charcoal">0</p>
            <p className="mt-2 text-xs text-gray-400">No orders yet</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm font-medium text-gray-500">Member Since</p>
            <p className="font-display text-lg font-bold text-brand-charcoal">Today</p>
          </div>
        </div>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-display text-lg font-semibold text-brand-charcoal">
            Order History
          </h2>
          <div className="flex flex-col items-center py-8 text-center">
            <svg
              className="mb-3 h-12 w-12 text-gray-300"
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
            <p className="text-sm text-gray-500">Your order history will appear here</p>
          </div>
        </section>
      </div>
    </div>
  );
}
