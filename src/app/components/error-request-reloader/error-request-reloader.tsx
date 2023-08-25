import { useAppDispatch } from '../../../hooks';
import { ErrorCause } from '../../../const.ts';
import {
  getFavoriteOffersAction,
  getNearOffersAction,
  getOfferAction,
  getOffersAction,
  getReviewsAction
} from '../../../store/api-actions.ts';
import '../../style.css';

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
  const handleReloadButtonClick = () => {
    ErrorFunction[ cause ]();
  };
  const message = `${ cause } loading error, please try again`;
  return (
    <div className="offer__mark request__reloader">
      <button
        type="button"
        className="locations__item-link"
        onClick={ handleReloadButtonClick }
      >
        <span>{ message }</span>
      </button>
    </div>
  );
}
