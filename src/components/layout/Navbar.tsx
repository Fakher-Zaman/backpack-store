import { useState } from 'react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useQuickSearch } from '@/hooks/useQuickSearch';
import { products } from '@/data/products';
import WishlistDrawer from '@/components/wishlist/WishlistDrawer';
import CartDrawer from '@/components/cart/CartDrawer';
import QuickSearch from '@/components/ui/QuickSearch';

const navLinks = [
  { label: 'STORE', href: '#collections' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PRODUCTS', href: '#products' },
  { label: 'CAMPAIGNS', href: '#campaigns' },
  { label: 'BLOG', href: '#blog' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useWishlist();
  const { itemCount } = useCart();
  const {
    query, setQuery, results,
    isOpen: searchOpen, open: openSearch, close: closeSearch,
  } = useQuickSearch(products);

  return (
    <>
      <nav className="absolute top-0 z-50 w-full" aria-label="Main navigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="font-display text-xl font-bold tracking-wider text-white">
            PICCOLLO
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-medium tracking-wider text-white/90
                    transition-colors hover:text-white focus:outline-none
                    focus:ring-2 focus:ring-brand-cream focus:ring-offset-2
                    focus:ring-offset-brand-green-dark rounded"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Search */}
            <QuickSearch
              isOpen={searchOpen}
              onOpen={openSearch}
              onClose={closeSearch}
              query={query}
              onQueryChange={setQuery}
              results={results}
            />

            {/* Cart icon */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Cart (${itemCount} items)`}
              className="relative text-white transition-colors hover:text-brand-cream"
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-4 w-4
                    items-center justify-center rounded-full bg-red-500
                    text-[10px] font-bold text-white"
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Wishlist icon */}
            <button
              onClick={() => setWishlistOpen(true)}
              aria-label={`Wishlist (${count} items)`}
              className="relative text-white transition-colors hover:text-brand-cream"
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
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12
                    5.67l-1.06-1.06a5.5 5.5 0 00-7.78
                    7.78l1.06 1.06L12 21.23l7.78-7.78
                    1.06-1.06a5.5 5.5 0 000-7.78z"
                />
              </svg>
              {count > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-4 w-4
                    items-center justify-center rounded-full bg-red-500
                    text-[10px] font-bold text-white"
                >
                  {count}
                </span>
              )}
            </button>

            <button
              className="hidden rounded-full border border-white/30 px-5 py-2
                text-xs font-medium text-white transition-colors
                hover:bg-white hover:text-brand-green-dark focus:outline-none
                focus:ring-2 focus:ring-brand-cream md:block"
            >
              LOG IN
            </button>

            <button
              className="text-white md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="bg-brand-green-dark/95 px-6 py-4 backdrop-blur-sm md:hidden">
            <ul className="space-y-4">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block text-sm font-medium text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
