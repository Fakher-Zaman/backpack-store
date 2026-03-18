import type { Review } from '@/types';
import StarRating from '../ui/StarRating';
import { cn } from '@/lib/utils';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-gray-400 dark:text-gray-500">
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map(review => (
        <li key={review.id} className={cn(
          'border-b pb-4 last:border-0',
          'border-gray-50 dark:border-brand-dark-border'
        )}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-brand-charcoal dark:text-gray-100">{review.author}</span>
            <time className="text-xs text-gray-400 dark:text-gray-500" dateTime={review.date}>
              {new Date(review.date).toLocaleDateString()}
            </time>
          </div>
          <StarRating rating={review.rating} />
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
