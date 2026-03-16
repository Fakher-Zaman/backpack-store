import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ReviewsProvider, useReviews } from '@/hooks/useReviews';

function wrapper({ children }: { children: React.ReactNode }) {
  return <ReviewsProvider>{children}</ReviewsProvider>;
}

describe('useReviews', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty reviews', () => {
    const { result } = renderHook(() => useReviews(), { wrapper });
    expect(result.current.reviews).toEqual([]);
  });

  it('adds a review', () => {
    const { result } = renderHook(() => useReviews(), { wrapper });
    act(() => result.current.addReview(1, 'Alice', 5, 'Great!'));
    expect(result.current.reviews).toHaveLength(1);
    expect(result.current.reviews[0].author).toBe('Alice');
    expect(result.current.reviews[0].rating).toBe(5);
    expect(result.current.reviews[0].productId).toBe(1);
  });

  it('returns product-specific reviews', () => {
    const { result } = renderHook(() => useReviews(), { wrapper });
    act(() => {
      result.current.addReview(1, 'Alice', 5, 'Great!');
      result.current.addReview(2, 'Bob', 3, 'Okay');
      result.current.addReview(1, 'Charlie', 4, 'Good');
    });
    expect(result.current.getProductReviews(1)).toHaveLength(2);
    expect(result.current.getProductReviews(2)).toHaveLength(1);
  });

  it('calculates average rating', () => {
    const { result } = renderHook(() => useReviews(), { wrapper });
    act(() => {
      result.current.addReview(1, 'Alice', 5, 'Great!');
      result.current.addReview(1, 'Bob', 3, 'Okay');
    });
    expect(result.current.getAverageRating(1)).toBe(4);
  });

  it('returns null average for product with no reviews', () => {
    const { result } = renderHook(() => useReviews(), { wrapper });
    expect(result.current.getAverageRating(999)).toBeNull();
  });

  it('persists reviews to localStorage', () => {
    const { result } = renderHook(() => useReviews(), { wrapper });
    act(() => result.current.addReview(1, 'Alice', 5, 'Great!'));
    const stored = JSON.parse(localStorage.getItem('piccollo-reviews')!);
    expect(stored).toHaveLength(1);
    expect(stored[0].author).toBe('Alice');
  });
});
