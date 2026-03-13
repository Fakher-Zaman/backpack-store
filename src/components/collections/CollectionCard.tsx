import type { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-xl bg-gray-100">
      <img
        src={collection.image}
        alt={collection.title}
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 p-4">
        <button className="rounded-md bg-brand-green-dark px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-green">
          {collection.title}
        </button>
      </div>
    </article>
  );
}
