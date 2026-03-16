import { useEffect, useRef } from 'react';
import { products } from '@/data/products';
import type { Product } from '@/types';

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-brand-green/20 text-brand-green-dark">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function SearchResult({ product, query, onSelect }: {
  product: Product;
  query: string;
  onSelect: () => void;
}) {
  return (
    <a
      href="#products"
      onClick={onSelect}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5
        transition-colors hover:bg-gray-50 focus:bg-gray-50
        focus:outline-none"
    >
      <img
        src={product.image}
        alt=""
        className="h-10 w-10 rounded-lg object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-brand-charcoal">
          {highlightMatch(product.name, query)}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {product.category && <span>{product.category}</span>}
          <span>${product.price}</span>
        </div>
      </div>
    </a>
  );
}

interface QuickSearchProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  results: Product[];
}

export default function QuickSearch({
  isOpen,
  onOpen,
  onClose,
  query,
  onQueryChange,
  results,
}: QuickSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small delay so the modal renders before focusing
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={onOpen}
        aria-label="Search products (Ctrl+K)"
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[15vh]"
          onClick={onClose}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Quick search"
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
              <svg
                className="h-5 w-5 shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => onQueryChange(e.target.value)}
                placeholder="Search backpacks..."
                aria-label="Search products"
                className="flex-1 bg-transparent text-sm text-brand-charcoal
                  placeholder:text-gray-400 focus:outline-none"
              />
              <kbd
                className="hidden rounded border border-gray-200 px-1.5
                  py-0.5 text-[10px] font-medium text-gray-400 sm:inline"
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto">
              {query.trim() === '' ? (
                <p className="px-4 py-6 text-center text-xs text-gray-400">
                  Type to search products...
                </p>
              ) : results.length > 0 ? (
                <div className="p-2" role="listbox" aria-label="Search results">
                  {results.map(p => (
                    <SearchResult key={p.id} product={p} query={query} onSelect={onClose} />
                  ))}
                </div>
              ) : (
                <p className="px-4 py-6 text-center text-xs text-gray-400">
                  No products found for "{query}"
                </p>
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2">
              <span className="text-[10px] text-gray-400">{products.length} products</span>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <kbd className="rounded border border-gray-200 px-1 py-0.5 font-medium">Ctrl</kbd>
                <span>+</span>
                <kbd className="rounded border border-gray-200 px-1 py-0.5 font-medium">K</kbd>
                <span className="ml-1">to toggle</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
