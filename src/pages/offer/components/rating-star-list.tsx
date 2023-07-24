import React from 'react';
import { RatingStarValues } from '../../../const.ts';
import { Comment } from '../../../types/offer.ts';

type RatingStarListProps = {
  comment: Comment;
  setComment: React.Dispatch<React.SetStateAction<{ rating: number; review: string }>>;
}

type RatingStarProps = RatingStarListProps & {
  starValue: number;
  title: string;
}

function RatingStar({ starValue, title, comment, setComment }: RatingStarProps) {
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

export default function RatingStarList({ comment, setComment }: RatingStarListProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {
        (RatingStarValues.map(({ value, title }) =>
          (
            <RatingStar
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
