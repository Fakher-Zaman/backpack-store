import { useCart } from '@/hooks/useCart';

interface AddToCartButtonProps {
  productId: number;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(productId)}
      aria-label="Add to cart"
      className="mt-2 w-full rounded-lg bg-brand-green py-2 text-xs font-medium text-white transition-colors hover:bg-brand-green-dark"
    >
      Add to Cart
    </button>
  );
}
