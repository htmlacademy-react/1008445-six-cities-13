import { Review } from '../../../types/offer.ts';
import ReviewItem from './review-item.tsx';
type ReviewItemListProps = {
  reviews: Review[];
}

export default function ReviewItemList({ reviews }: ReviewItemListProps) {
  return (
    <ul className="reviews__list">
      { reviews.map((review) => <ReviewItem key={ review.id } review={ review }/>) }
    </ul>
  );
}

