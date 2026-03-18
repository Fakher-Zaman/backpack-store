import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Order } from '@/types/order.types';

const STORAGE_KEY = 'piccollo-orders';

type OrdersContextValue = {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
  orderCount: number;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

function readStorage(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as Order[];
    }
    return [];
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
  }, []);

  const getOrder = useCallback(
    (id: string) => orders.find(o => o.orderId === id),
    [orders],
  );

  const orderCount = orders.length;

  const value = useMemo<OrdersContextValue>(
    () => ({ orders, addOrder, getOrder, orderCount }),
    [orders, addOrder, getOrder, orderCount],
  );

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return ctx;
}
