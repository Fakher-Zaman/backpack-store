import type { Product } from '@/types';
import StarRating from '../ui/StarRating';

const COLOR_NAMES: Record<string, string> = {
  '#2C2C2C': 'Charcoal',
  '#5C4033': 'Brown',
  '#1A3A25': 'Forest Green',
  '#4A5568': 'Slate Gray',
  '#E8DFD0': 'Cream',
};

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
          loading="lazy"
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>
      <h3 className="text-sm font-semibold">{product.name}</h3>
      {/* Color dots */}
      {product.colors && (
        <div className="mt-1 flex items-center gap-1.5" role="list" aria-label="Available colors">
          {product.colors.map((color, i) => (
            <span
              key={i}
              role="listitem"
              aria-label={COLOR_NAMES[color] ?? color}
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
