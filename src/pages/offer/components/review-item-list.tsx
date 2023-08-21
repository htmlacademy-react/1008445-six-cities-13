import ReviewItem from './review-item.tsx';
import { TReview } from '../../../types/comment.ts';
type ReviewItemListProps = {
  reviews: TReview[];
}

export default function ReviewItemList({ reviews }: ReviewItemListProps) {
  return (
    <ul className="reviews__list" data-testid="review-item-list">
      { reviews.map((review) => <ReviewItem key={ review.id } review={ review }/>) }
    </ul>
  );
}

