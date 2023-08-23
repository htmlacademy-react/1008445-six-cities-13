import RatingStarList from './rating-star-list.tsx';
import { addReviewAction } from '../../../store/api-actions.ts';
import {
  DEFAULT_RATING, DEFAULT_REVIEW,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  RequestStatus
} from '../../../const.ts';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { TOfferRequestData } from '../../../types/offer.ts';
import { getReview, getReviewLoadingStatus } from '../../../store/app-data/selectors.ts';
import { setReview } from '../../../store/app-data/app-data.ts';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CommentForm({ offerId }: TOfferRequestData) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const review = useAppSelector(getReview);
  const { comment, rating } = review;
  const isEnabled = comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && rating !== DEFAULT_RATING;
  const reviewLoadingStatus = useAppSelector(getReviewLoadingStatus);
  const isPending = reviewLoadingStatus === RequestStatus.Pending;
  const buttonTitle = isPending ? 'Submitting...' : 'Submit';
  useEffect(() => {
    dispatch(setReview(DEFAULT_REVIEW));
  }, [ location, dispatch ]);
  return (
    <form
      className="reviews__form form"
      method="post"
      onSubmit={ (evt) => {
        evt.preventDefault();
        dispatch(addReviewAction({ offerId, ...review }))
          .then(() => toast.success('Your review successfully added'))
          .catch(() => toast.error('Something go wrong when trying to send your review'));
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingStarList isPending={ isPending }/>
      <textarea
        className="reviews__textarea form__textarea"
        data-testid="comment-text"
        id="review"
        name="review"
        value={ review.comment }
        disabled={ isPending }
        onChange={
          ({ target}) => {
            dispatch(setReview({ ...review, comment: target.value }));
          }
        }
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={ !isEnabled || isPending }
          data-testid="submit-button"
        >
          { buttonTitle }
        </button>
      </div>
    </form>
  );
}
