import { collections } from '@/data/collections';
import CollectionCard from './CollectionCard';

export default function LatestCollection() {
  return (
    <section id="collections" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
            Latest Collection
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-500">
            Shop our stylish backpack collection, featuring trendy designs, versatile styles,
            and exceptional quality for every adventure.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
