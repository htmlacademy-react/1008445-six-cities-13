import React from 'react';
import { RatingStarScores } from '../../../const.ts';
import { Comment } from '../../../types/offer.ts';

type RatingStarListProps = {
  comment: Comment;
  setComment: React.Dispatch<React.SetStateAction<{ rating: number; review: string }>>;
}

type RatingStarProps = RatingStarListProps & {
  score: number;
  title: string;
}

function RatingStar({ score, title, comment, setComment }: RatingStarProps) {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={ score }
        id={ `${ score }-stars`}
        type="radio"
        checked={ score === comment.rating }
        onChange={
          ({ target}) => {
            setComment({
              ...comment,
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

export default function RatingStarList({ comment, setComment }: RatingStarListProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {
        (RatingStarScores.map(({ score, title }) =>
          (
            <RatingStar
              key={ score }
              score={ score }
              title={ title }
              comment={ comment }
              setComment={ setComment }
            />)))
      }
    </div>
  );
}
