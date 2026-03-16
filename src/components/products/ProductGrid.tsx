import { products } from '@/data/products';
import { useProductFilter } from '@/hooks/useProductFilter';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import SizeGuide from './SizeGuide';

export default function ProductGrid() {
  const {
    filters,
    filtered,
    categories,
    colors,
    priceRange,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  } = useProductFilter(products);

  return (
    <section id="products" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
            All Products
            <br />
            Available
          </h2>
          <div className="flex flex-col items-start gap-2">
            <p className="max-w-xs text-xs text-gray-400">
              We produce provided only 3000 units worldwide
            </p>
            <SizeGuide />
          </div>
        </div>
        <ProductFilter
          filters={filters}
          categories={categories}
          colors={colors}
          priceRange={priceRange}
          resultCount={filtered.length}
          hasActiveFilters={hasActiveFilters}
          onFilterChange={updateFilter}
          onReset={resetFilters}
        />
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <p className="col-span-full py-12 text-center text-gray-400">
              No products match your filters.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
