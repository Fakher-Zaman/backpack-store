import { useReviews } from '@/hooks/useReviews';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

interface ProductReviewSectionProps {
  productId: number;
}

export default function ProductReviewSection({ productId }: ProductReviewSectionProps) {
  const { getProductReviews } = useReviews();
  const reviews = getProductReviews(productId);

  return (
    <div>
      <ReviewForm productId={productId} />
      <ReviewList reviews={reviews} />
    </div>
  );
}
