import { useState } from 'react';
import RatingStarList from './rating-star-list.tsx';
import { addReviewAction } from '../../../store/api-actions.ts';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, DEFAULT_REVIEW, DEFAULT_RATING } from '../../../const.ts';
import { useAppDispatch } from '../../../hooks';
import { TReviewData } from '../../../types/comment.ts';
import { TOfferRequestData } from '../../../types/offer.ts';

export default function CommentForm({ offerId }: TOfferRequestData) {
  const dispatch = useAppDispatch();
  const [ review, setReview] = useState<TReviewData>(DEFAULT_REVIEW);
  const { comment, rating } = review;
  const isEnabled = comment.length >= MIN_COMMENT_LENGTH && rating !== DEFAULT_RATING;
  return (
    <form
      className="reviews__form form"
      method="post"
      onSubmit={ (evt) => {
        evt.preventDefault();
        dispatch(addReviewAction({ offerId, ...review }));
        setReview(DEFAULT_REVIEW);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingStarList review={ review } setReview={ setReview } />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        maxLength={ MAX_COMMENT_LENGTH }
        minLength={ MIN_COMMENT_LENGTH }
        name="review"
        value={ review.comment }
        onChange={
          ({ target}) => {
            setReview({ ...review, comment: target.value });
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
          disabled={ !isEnabled }
        >
          Submit
        </button>
      </div>
    </form>
  );
}
