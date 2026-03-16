import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/types';

export function useQuickSearch(products: Product[]) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  // Ctrl+K / Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return products.filter(p => {
      const name = p.name.toLowerCase();
      const category = (p.category ?? '').toLowerCase();
      return name.includes(trimmed) || category.includes(trimmed);
    });
  }, [products, query]);

  return {
    query,
    setQuery,
    results,
    isOpen,
    open,
    close,
  };
}
