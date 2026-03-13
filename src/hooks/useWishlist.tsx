import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'piccollo-wishlist';

interface WishlistContextValue {
  items: number[];
  toggle: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function readStorage(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(v => typeof v === 'number')) {
      return parsed as number[];
    }
    return [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<number[]>(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggle = useCallback((id: number) => {
    setItems(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  }, []);

  const isInWishlist = useCallback(
    (id: number) => items.includes(id),
    [items],
  );

  const value = useMemo<WishlistContextValue>(
    () => ({ items, toggle, isInWishlist, count: items.length }),
    [items, toggle, isInWishlist],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return ctx;
}
