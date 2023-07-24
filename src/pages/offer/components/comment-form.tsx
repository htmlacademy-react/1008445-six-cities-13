import { useState } from 'react';
import RatingStarList from './rating-star-list.tsx';
const DEFAULT_REVIEW = {
  rating: 0,
  review: ''
};
export default function CommentForm() {
  const [ comment, setComment] = useState(DEFAULT_REVIEW);
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingStarList comment={ comment } setComment={ setComment } />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        onChange={
          ({ target}) => {
            setComment({
              ...comment,
              review: target.value
            });
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
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}
