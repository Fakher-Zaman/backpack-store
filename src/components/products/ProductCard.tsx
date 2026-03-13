import type { Product } from '@/types';
import StarRating from '../ui/StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <div className="mb-3 overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-sm font-semibold">{product.name}</h3>
      {/* Color dots */}
      {product.colors && (
        <div className="mt-1 flex items-center gap-1.5">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
      <StarRating rating={product.rating} />
      <div className="mt-1 flex items-center gap-2">
        {product.originalPrice && (
          <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
        )}
        <span className="text-sm font-bold">${product.price}</span>
      </div>
    </article>
  );
}
