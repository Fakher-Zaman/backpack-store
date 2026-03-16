import type { Review } from '@/types';
import StarRating from '../ui/StarRating';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-gray-400">
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map(review => (
        <li key={review.id} className="border-b border-gray-50 pb-4 last:border-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-brand-charcoal">{review.author}</span>
            <time className="text-xs text-gray-400" dateTime={review.date}>
              {new Date(review.date).toLocaleDateString()}
            </time>
          </div>
          <StarRating rating={review.rating} />
          <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
