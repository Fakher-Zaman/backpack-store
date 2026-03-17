import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  productId: number;
  quantity: number;
}

export default function CartItem({ productId, quantity }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const product = products.find(p => p.id === productId);

  if (!product) return null;

  const lineTotal = product.price * quantity;

  return (
    <li className="flex items-center gap-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-16 w-16 rounded-lg object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{product.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">${product.price}</p>
        <div className="mt-1 flex items-center gap-2">
          <button
            onClick={() => updateQuantity(productId, quantity - 1)}
            disabled={quantity <= 1}
            aria-label={`Decrease quantity of ${product.name}`}
            className="flex h-6 w-6 items-center justify-center rounded
              border border-gray-200 dark:border-brand-dark-border text-xs text-gray-600 dark:text-gray-400
              transition-colors hover:bg-gray-100 dark:hover:bg-brand-dark-border disabled:opacity-40"
          >
            -
          </button>
          <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{quantity}</span>
          <button
            onClick={() => updateQuantity(productId, quantity + 1)}
            aria-label={`Increase quantity of ${product.name}`}
            className="flex h-6 w-6 items-center justify-center rounded
              border border-gray-200 dark:border-brand-dark-border text-xs text-gray-600 dark:text-gray-400
              transition-colors hover:bg-gray-100 dark:hover:bg-brand-dark-border"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">${lineTotal}</span>
        <button
          onClick={() => removeItem(productId)}
          aria-label={`Remove ${product.name} from cart`}
          className="flex h-7 w-7 shrink-0 items-center justify-center
            rounded-full text-gray-400 dark:text-gray-500 transition-colors
            hover:bg-gray-100 dark:hover:bg-brand-dark-border hover:text-red-500 dark:hover:text-red-400"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </li>
  );
}
