import { RatingStarScores } from '../../../../const.ts';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setReview } from '../../../../store/app-data/app-data.ts';
import { getReview } from '../../../../store/app-data/selectors.ts';
import { Fragment} from 'react';

type RatingStarListProps = {
  isPending: boolean;
}
export default function RatingStarList({ isPending }: RatingStarListProps) {
  const dispatch = useAppDispatch();
  const review = useAppSelector(getReview);
  return (
    <div className="reviews__rating-form form__rating" data-testid="comment-rating">
      {
        RatingStarScores.map(({ score, title }) => (
          <Fragment key={ title }>
            <input
              data-testid="comment-rating-star"
              key={ title }
              className="form__rating-input visually-hidden"
              name="rating"
              value={ score }
              id={ `${ score }-stars` }
              type="radio"
              disabled={ isPending }
              checked={ score === review.rating }
              onChange={
                ({ target}) => {
                  dispatch(setReview({
                    ...review,
                    rating: +target.value
                  }));
                }
              }
            />
            <label htmlFor={ `${ score }-stars`} className="reviews__rating-label form__rating-label" title={ title }>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>)
        )
      }
    </div>
  );
}
