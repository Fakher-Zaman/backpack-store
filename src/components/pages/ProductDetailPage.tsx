import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useReviews } from '@/hooks/useReviews';
import { useCart } from '@/hooks/useCart';
import StarRating from '@/components/ui/StarRating';
import WishlistButton from '@/components/ui/WishlistButton';
import ProductReviewSection from '@/components/products/ProductReviewSection';
import AnimatedPage from '@/components/ui/AnimatedPage';

const COLOR_NAMES: Record<string, string> = {
  '#2C2C2C': 'Charcoal',
  '#5C4033': 'Brown',
  '#1A3A25': 'Forest Green',
  '#4A5568': 'Slate Gray',
  '#E8DFD0': 'Cream',
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const { getAverageRating, getProductReviews } = useReviews();
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 pt-24">
        <h1 className="text-2xl font-bold dark:text-gray-100">Product not found</h1>
        <Link
          to="/"
          className="text-sm text-brand-green-dark underline hover:text-brand-green dark:text-brand-green-light"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const avgRating = getAverageRating(product.id);
  const reviewCount = getProductReviews(product.id).length;

  return (
    <AnimatedPage>
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-28">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand-green-dark dark:hover:text-brand-green-light">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/#products" className="hover:text-brand-green-dark dark:hover:text-brand-green-light">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-brand-dark-surface">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute right-4 top-4">
              <WishlistButton productId={product.id} />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            {product.category && (
              <span className="w-fit rounded-full bg-brand-green-dark/10 px-3 py-1 text-xs font-medium text-brand-green-dark dark:bg-brand-green-light/10 dark:text-brand-green-light">
                {product.category}
              </span>
            )}
            <h1 className="font-display text-3xl font-bold dark:text-gray-100 md:text-4xl">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <StarRating rating={avgRating ?? product.rating} />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold dark:text-gray-100">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through dark:text-gray-500">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {product.description && (
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">{product.description}</p>
            )}

            {product.colors && (
              <div>
                <h3 className="mb-2 text-sm font-semibold dark:text-gray-200">Colors</h3>
                <div className="flex gap-3" role="list" aria-label="Available colors">
                  {product.colors.map((color, i) => (
                    <span
                      key={i}
                      role="listitem"
                      aria-label={COLOR_NAMES[color] ?? color}
                      className="h-8 w-8 rounded-full border-2 border-gray-200 dark:border-brand-dark-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => addItem(product.id)}
              className="mt-2 w-full rounded-full bg-brand-green-dark py-4 text-sm
                font-semibold uppercase tracking-wider text-white transition-colors
                hover:bg-brand-green focus:outline-none focus:ring-2
                focus:ring-brand-green focus:ring-offset-2
                dark:focus:ring-offset-brand-dark-bg"
            >
              Add to Cart
            </button>

            {/* Size guide */}
            <details className="rounded-lg border border-gray-200 p-4 dark:border-brand-dark-border">
              <summary className="cursor-pointer text-sm font-semibold dark:text-gray-200">
                Size Guide
              </summary>
              <div className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                <p className="mb-2">
                  <strong>Small (18L)</strong> — 16&quot; x 10&quot; x 6&quot; — fits 13&quot; laptops
                </p>
                <p className="mb-2">
                  <strong>Medium (28L)</strong> — 19&quot; x 12&quot; x 7&quot; — fits 15&quot; laptops
                </p>
                <p>
                  <strong>Large (35-45L)</strong> — 22&quot; x 14&quot; x 9&quot; — fits 17&quot; laptops
                </p>
              </div>
            </details>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold dark:text-gray-100">Reviews</h2>
          <ProductReviewSection productId={product.id} />
        </section>
      </div>
    </AnimatedPage>
  );
}
