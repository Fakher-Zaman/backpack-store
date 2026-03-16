import type { ProductFilters } from '@/hooks/useProductFilter';

const COLOR_NAMES: Record<string, string> = {
  '#2C2C2C': 'Charcoal',
  '#5C4033': 'Brown',
  '#1A3A25': 'Forest Green',
  '#4A5568': 'Slate Gray',
  '#E8DFD0': 'Cream',
};

interface ProductFilterProps {
  filters: ProductFilters;
  categories: string[];
  colors: string[];
  priceRange: { min: number; max: number };
  resultCount: number;
  hasActiveFilters: boolean;
  onFilterChange: <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K],
  ) => void;
  onReset: () => void;
}

export default function ProductFilter({
  filters,
  categories,
  colors,
  priceRange,
  resultCount,
  hasActiveFilters,
  onFilterChange,
  onReset,
}: ProductFilterProps) {
  return (
    <div
      className="mb-8 rounded-xl border border-gray-100 bg-gray-50 p-4"
      role="search"
      aria-label="Filter products"
    >
      <div className="flex flex-wrap items-end gap-4">
        {/* Category */}
        <div className="min-w-[140px]">
          <label
            htmlFor="filter-category"
            className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500"
          >
            Category
          </label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={e => onFilterChange('category', e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          >
            <option value="">All</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div>
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
            Color
          </span>
          <div className="flex items-center gap-2" role="radiogroup" aria-label="Filter by color">
            <button
              onClick={() => onFilterChange('color', '')}
              aria-label="All colors"
              aria-checked={filters.color === ''}
              role="radio"
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                filters.color === ''
                  ? 'border-brand-green bg-brand-green text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              All
            </button>
            {colors.map(color => (
              <button
                key={color}
                onClick={() => onFilterChange('color', filters.color === color ? '' : color)}
                aria-label={COLOR_NAMES[color] ?? color}
                aria-checked={filters.color === color}
                role="radio"
                className={`h-7 w-7 rounded-full border-2 transition-shadow ${
                  filters.color === color
                    ? 'ring-2 ring-brand-green ring-offset-2'
                    : 'border-gray-200 hover:ring-1 hover:ring-gray-300 hover:ring-offset-1'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="min-w-[200px] flex-1">
          <label
            htmlFor="filter-price"
            className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500"
          >
            Max Price: ${filters.maxPrice === Infinity ? priceRange.max : filters.maxPrice}
          </label>
          <input
            id="filter-price"
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={filters.maxPrice === Infinity ? priceRange.max : filters.maxPrice}
            onChange={e => {
              const val = Number(e.target.value);
              onFilterChange('maxPrice', val >= priceRange.max ? Infinity : val);
            }}
            className="w-full accent-brand-green"
            aria-label={`Maximum price: $${filters.maxPrice === Infinity ? priceRange.max : filters.maxPrice}`}
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>${priceRange.min}</span>
            <span>${priceRange.max}</span>
          </div>
        </div>

        {/* Reset & Count */}
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Clear filters
            </button>
          )}
          <span className="text-xs text-gray-400" aria-live="polite">
            {resultCount} {resultCount === 1 ? 'product' : 'products'}
          </span>
        </div>
      </div>
    </div>
  );
}
