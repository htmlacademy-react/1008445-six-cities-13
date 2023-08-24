import ReviewItemList from './review-item-list.tsx';
import CommentForm from './comment-form.tsx';
import { useAppSelector } from '../../../hooks';
import { getReviews, getReviewsLoadingStatus } from '../../../store/app-data/selectors.ts';
import { sortReviewsByDateDesc } from '../../../utils.ts';
import { ErrorCause, OfferLimits, RequestStatus } from '../../../const.ts';
import { getAuthCheckedStatus } from '../../../store/auth-process/selectors.ts';
import Loader from '../../../app/components/loader.tsx';
import ErrorRequestReloader from '../../../app/components/error-request-reloader.tsx';

export type ReviewsProps = {
  offerId: string;
}
export default function Reviews({ offerId }: ReviewsProps) {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const reviewsLoadingStatus = useAppSelector(getReviewsLoadingStatus);
  const reviews = useAppSelector(getReviews);
  const slicedReviews = reviews.slice(0).sort(sortReviewsByDateDesc).slice(0, OfferLimits.reviewsVisibleCount);
  if ([ RequestStatus.Idle, RequestStatus.Pending ].includes(reviewsLoadingStatus)) {
    return <Loader/>;
  }
  if (reviewsLoadingStatus === RequestStatus.Error) {
    return <ErrorRequestReloader offerId={ offerId } cause={ ErrorCause.Reviews }/>;
  }
  return (
    <div className="offer__wrapper">
      <section className="offer__reviews reviews" data-testid="reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{ reviews.length }</span></h2>
        <ReviewItemList reviews={ slicedReviews }/>
        { isAuthChecked && <CommentForm offerId={ offerId }/> }
      </section>
    </div>
  );
}
