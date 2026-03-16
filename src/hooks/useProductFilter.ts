import { useMemo, useState } from 'react';
import type { Product } from '@/types';

export interface ProductFilters {
  category: string;
  color: string;
  minPrice: number;
  maxPrice: number;
}

const DEFAULT_FILTERS: ProductFilters = {
  category: '',
  color: '',
  minPrice: 0,
  maxPrice: Infinity,
};

export function useProductFilter(products: Product[]) {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);

  const categories = useMemo(
    () => [...new Set(products.map(p => p.category).filter(Boolean))] as string[],
    [products],
  );

  const colors = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.colors?.forEach(c => set.add(c)));
    return [...set];
  }, [products]);

  const priceRange = useMemo(() => {
    const prices = products.map(p => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.color && !p.colors?.includes(filters.color)) return false;
      if (p.price < filters.minPrice) return false;
      if (filters.maxPrice !== Infinity && p.price > filters.maxPrice) return false;
      return true;
    });
  }, [products, filters]);

  const updateFilter = <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K],
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const hasActiveFilters =
    filters.category !== '' ||
    filters.color !== '' ||
    filters.minPrice > priceRange.min ||
    (filters.maxPrice !== Infinity && filters.maxPrice < priceRange.max);

  return {
    filters,
    filtered,
    categories,
    colors,
    priceRange,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
}
