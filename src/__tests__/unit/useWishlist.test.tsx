import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { WishlistProvider, useWishlist } from '@/hooks/useWishlist';

function wrapper({ children }: { children: React.ReactNode }) {
  return <WishlistProvider>{children}</WishlistProvider>;
}

describe('useWishlist', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it('toggles an item into the wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => result.current.toggle(1));
    expect(result.current.items).toEqual([1]);
    expect(result.current.isInWishlist(1)).toBe(true);
    expect(result.current.count).toBe(1);
  });

  it('toggles an item out of the wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => result.current.toggle(1));
    act(() => result.current.toggle(1));
    expect(result.current.items).toEqual([]);
    expect(result.current.isInWishlist(1)).toBe(false);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => result.current.toggle(5));
    expect(JSON.parse(localStorage.getItem('piccollo-wishlist')!)).toEqual([5]);
  });

  it('restores from localStorage', () => {
    localStorage.setItem('piccollo-wishlist', JSON.stringify([3, 7]));
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.items).toEqual([3, 7]);
  });

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('piccollo-wishlist', 'not-json');
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.items).toEqual([]);
  });

  it('handles non-array localStorage gracefully', () => {
    localStorage.setItem('piccollo-wishlist', JSON.stringify({ foo: 'bar' }));
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.items).toEqual([]);
  });
});
