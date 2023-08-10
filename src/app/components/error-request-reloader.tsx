import { useAppDispatch } from '../../hooks';
import { ErrorCause, ErrorMessageTitle } from '../../const.ts';
import {
  getFavoriteOffersAction,
  getNearOffersAction,
  getOfferAction,
  getOffersAction,
  getReviewsAction
} from '../../store/api-actions.ts';

type RequestReloadProps = {
  cause: ErrorCause;
  offerId?: string;
}

export default function ErrorRequestReloader({ cause, offerId }: RequestReloadProps) {
  const dispatch = useAppDispatch();
  const ErrorFunction = {
    [ ErrorCause.Offers ]: () => dispatch(getOffersAction()),
    [ ErrorCause.NearOffers ]: () => offerId && dispatch(getNearOffersAction({ offerId })),
    [ ErrorCause.Offer ]: () => offerId && dispatch(getOfferAction({ offerId })),
    [ ErrorCause.Reviews ]: () => offerId && dispatch(getReviewsAction({ offerId })),
    [ ErrorCause.Favorites ]: () => dispatch(getFavoriteOffersAction()),
  };
  const reloadButtonClickHandler = () => {
    ErrorFunction[ cause ]();
  };
  const message = `${ ErrorMessageTitle[ cause ] } loading error, please try again`;
  return (
    <div className="offer__mark request__reloader">
      <button
        type="button"
        className="locations__item-link"
        onClick={ reloadButtonClickHandler }
      >
        <span>{ message } &#10227;</span>
      </button>
    </div>
  );
}
