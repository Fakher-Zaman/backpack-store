import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from '@/hooks/useCart';

function wrapper({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it('adds an item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(1));
    expect(result.current.items).toEqual([{ productId: 1, quantity: 1 }]);
    expect(result.current.itemCount).toBe(1);
  });

  it('increments quantity when adding existing item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(1));
    act(() => result.current.addItem(1));
    expect(result.current.items).toEqual([{ productId: 1, quantity: 2 }]);
    expect(result.current.itemCount).toBe(2);
  });

  it('removes an item from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(1));
    act(() => result.current.removeItem(1));
    expect(result.current.items).toEqual([]);
  });

  it('updates quantity of an item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(1));
    act(() => result.current.updateQuantity(1, 5));
    expect(result.current.items[0].quantity).toBe(5);
  });

  it('ignores updateQuantity with quantity less than 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(1));
    act(() => result.current.updateQuantity(1, 0));
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(1));
    act(() => result.current.addItem(2));
    act(() => result.current.clearCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
  });

  it('calculates total from product prices', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    // Product 1 has price 79 in the data
    act(() => result.current.addItem(1));
    expect(result.current.total).toBe(79);
    act(() => result.current.addItem(1));
    expect(result.current.total).toBe(158);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(1));
    const stored = JSON.parse(localStorage.getItem('piccollo-cart')!);
    expect(stored).toEqual([{ productId: 1, quantity: 1 }]);
  });

  it('restores from localStorage', () => {
    localStorage.setItem('piccollo-cart', JSON.stringify([{ productId: 2, quantity: 3 }]));
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([{ productId: 2, quantity: 3 }]);
  });

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('piccollo-cart', 'bad-json');
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
  });
});
