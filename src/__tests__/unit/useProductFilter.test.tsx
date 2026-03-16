import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useProductFilter } from '@/hooks/useProductFilter';
import type { Product } from '@/types';

const mockProducts: Product[] = [
  { id: 1, name: 'A', price: 50, image: '', rating: 4, colors: ['red', 'blue'], category: 'Casual' },
  { id: 2, name: 'B', price: 100, image: '', rating: 3, colors: ['blue'], category: 'Travel' },
  { id: 3, name: 'C', price: 150, image: '', rating: 5, colors: ['red'], category: 'Casual' },
];

describe('useProductFilter', () => {
  it('returns all products with default filters', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    expect(result.current.filtered).toHaveLength(3);
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it('extracts unique categories', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    expect(result.current.categories).toEqual(expect.arrayContaining(['Casual', 'Travel']));
    expect(result.current.categories).toHaveLength(2);
  });

  it('extracts unique colors', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    expect(result.current.colors).toEqual(expect.arrayContaining(['red', 'blue']));
    expect(result.current.colors).toHaveLength(2);
  });

  it('computes price range', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    expect(result.current.priceRange).toEqual({ min: 50, max: 150 });
  });

  it('filters by category', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => result.current.updateFilter('category', 'Casual'));
    expect(result.current.filtered).toHaveLength(2);
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it('filters by color', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => result.current.updateFilter('color', 'blue'));
    expect(result.current.filtered).toHaveLength(2);
  });

  it('filters by min price', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => result.current.updateFilter('minPrice', 100));
    expect(result.current.filtered).toHaveLength(2);
  });

  it('filters by max price', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => result.current.updateFilter('maxPrice', 100));
    expect(result.current.filtered).toHaveLength(2);
  });

  it('combines multiple filters', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => {
      result.current.updateFilter('category', 'Casual');
      result.current.updateFilter('color', 'red');
    });
    expect(result.current.filtered).toHaveLength(2);
  });

  it('resets filters', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    act(() => result.current.updateFilter('category', 'Casual'));
    act(() => result.current.resetFilters());
    expect(result.current.filtered).toHaveLength(3);
    expect(result.current.hasActiveFilters).toBe(false);
  });
});
