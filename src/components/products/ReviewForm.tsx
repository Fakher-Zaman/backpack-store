import { useState } from 'react';
import { useReviews } from '@/hooks/useReviews';

interface ReviewFormProps {
  productId: number;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const { addReview } = useReviews();
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || rating === 0 || !comment.trim()) return;
    addReview(productId, author.trim(), rating, comment.trim());
    setAuthor('');
    setRating(0);
    setComment('');
  };

  const displayRating = hoveredRating || rating;

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3 border-b border-gray-100 pb-6">
      <h3 className="text-sm font-semibold text-brand-charcoal">Write a Review</h3>
      <div>
        <label htmlFor={`review-author-${productId}`} className="mb-1 block text-xs text-gray-500">
          Name
        </label>
        <input
          id={`review-author-${productId}`}
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
        />
      </div>
      <div>
        <span className="mb-1 block text-xs text-gray-500">Rating</span>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {Array.from({ length: 5 }, (_, i) => {
            const starValue = i + 1;
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={rating === starValue}
                aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoveredRating(starValue)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-0.5"
              >
                <svg
                  className={`h-5 w-5 transition-colors ${starValue <= displayRating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <label htmlFor={`review-comment-${productId}`} className="mb-1 block text-xs text-gray-500">
          Review
        </label>
        <textarea
          id={`review-comment-${productId}`}
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
        />
      </div>
      <button
        type="submit"
        disabled={!author.trim() || rating === 0 || !comment.trim()}
        className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        Submit Review
      </button>
    </form>
  );
}
