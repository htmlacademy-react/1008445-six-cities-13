import React from 'react';
import { RatingStarScores } from '../../../const.ts';
import { TReviewData } from '../../../types/comment.ts';

type RatingStarListProps = {
  review: TReviewData;
  setReview: React.Dispatch<React.SetStateAction<TReviewData>>;
}

type RatingStarProps = RatingStarListProps & {
  score: number;
  title: string;
}

function RatingStar({ score, title, review, setReview }: RatingStarProps) {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={ score }
        id={ `${ score }-stars` }
        type="radio"
        checked={ score === review.rating }
        onChange={
          ({ target}) => {
            setReview({
              ...review,
              rating: +target.value
            });
          }
        }
      />
      <label htmlFor={ `${ score }-stars`} className="reviews__rating-label form__rating-label" title={ title }>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default function RatingStarList({ review, setReview }: RatingStarListProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {
        RatingStarScores.map(({ score, title }) => (
          <RatingStar
            key={ score }
            score={ score }
            title={ title }
            review={ review }
            setReview={ setReview }
          />)
        )
      }
    </div>
  );
}
