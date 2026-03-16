import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useQuickSearch } from '@/hooks/useQuickSearch';
import type { Product } from '@/types';

const mockProducts: Product[] = [
  { id: 1, name: 'Classic Canvas Backpack', price: 79, image: '', rating: 4, category: 'Casual' },
  { id: 2, name: 'Urban Explorer Pack', price: 89, image: '', rating: 4, category: 'Travel' },
  { id: 3, name: 'Mountain Trail Backpack', price: 120, image: '', rating: 5, category: 'Hiking' },
];

describe('useQuickSearch', () => {
  it('starts with empty query and closed state', () => {
    const { result } = renderHook(() => useQuickSearch(mockProducts));
    expect(result.current.query).toBe('');
    expect(result.current.isOpen).toBe(false);
    expect(result.current.results).toEqual([]);
  });

  it('filters products by name', () => {
    const { result } = renderHook(() => useQuickSearch(mockProducts));
    act(() => result.current.setQuery('canvas'));
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Classic Canvas Backpack');
  });

  it('filters products by category', () => {
    const { result } = renderHook(() => useQuickSearch(mockProducts));
    act(() => result.current.setQuery('travel'));
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].id).toBe(2);
  });

  it('is case-insensitive', () => {
    const { result } = renderHook(() => useQuickSearch(mockProducts));
    act(() => result.current.setQuery('MOUNTAIN'));
    expect(result.current.results).toHaveLength(1);
  });

  it('returns empty results for whitespace-only query', () => {
    const { result } = renderHook(() => useQuickSearch(mockProducts));
    act(() => result.current.setQuery('   '));
    expect(result.current.results).toEqual([]);
  });

  it('returns multiple matches', () => {
    const { result } = renderHook(() => useQuickSearch(mockProducts));
    act(() => result.current.setQuery('backpack'));
    expect(result.current.results).toHaveLength(2);
  });

  it('opens and closes', () => {
    const { result } = renderHook(() => useQuickSearch(mockProducts));
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.query).toBe('');
  });
});
