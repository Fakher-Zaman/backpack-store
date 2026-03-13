import { products } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  return (
    <section id="products" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
            All Products
            <br />
            Available
          </h2>
          <p className="max-w-xs text-xs text-gray-400">
            We produce provided only 3000 units worldwide
          </p>
        </div>
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
