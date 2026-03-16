import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Review } from '@/types';

const STORAGE_KEY = 'piccollo-reviews';

interface ReviewsContextValue {
  reviews: Review[];
  addReview: (productId: number, author: string, rating: number, comment: string) => void;
  getProductReviews: (productId: number) => Review[];
  getAverageRating: (productId: number) => number | null;
}

const ReviewsContext = createContext<ReviewsContextValue | null>(null);

function readStorage(): Review[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as Review[];
    }
    return [];
  } catch {
    return [];
  }
}

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const addReview = useCallback(
    (productId: number, author: string, rating: number, comment: string) => {
      const review: Review = {
        id: crypto.randomUUID(),
        productId,
        author,
        rating,
        comment,
        date: new Date().toISOString(),
      };
      setReviews(prev => [review, ...prev]);
    },
    [],
  );

  const getProductReviews = useCallback(
    (productId: number) => reviews.filter(r => r.productId === productId),
    [reviews],
  );

  const getAverageRating = useCallback(
    (productId: number) => {
      const productReviews = reviews.filter(r => r.productId === productId);
      if (productReviews.length === 0) return null;
      const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
      return sum / productReviews.length;
    },
    [reviews],
  );

  const value = useMemo<ReviewsContextValue>(
    () => ({ reviews, addReview, getProductReviews, getAverageRating }),
    [reviews, addReview, getProductReviews, getAverageRating],
  );

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews(): ReviewsContextValue {
  const ctx = useContext(ReviewsContext);
  if (!ctx) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return ctx;
}
