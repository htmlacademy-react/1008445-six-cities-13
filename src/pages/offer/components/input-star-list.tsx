import React from 'react';
import { StarValues } from '../../../const.ts';
import { Comment } from '../../../types/offer.ts';

type commentState = {
  comment: Comment;
  setComment: React.Dispatch<React.SetStateAction<{ rating: number; review: string }>>;
}
type StarInput = {
  starValue: number;
  title: string;
}

type Star = StarInput & commentState

function InputStar({ starValue, title, comment, setComment }: Star) {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={ starValue }
        id={ `${ starValue }-stars`}
        type="radio"
        onChange={
          ({ target}) => {
            setComment({
              ...comment,
              rating: +target.value
            });
          }
        }
      />
      <label htmlFor={ `${ starValue }-stars`} className="reviews__rating-label form__rating-label" title={ title }>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default function InputStarList({ comment, setComment }: commentState) {
  return (
    <div className="reviews__rating-form form__rating">
      {
        (StarValues.map(({ value, title }) =>
          (
            <InputStar
              key={ value }
              starValue={ value }
              title={ title }
              comment={ comment }
              setComment={ setComment }
            />)))
      }
    </div>
  );
}
