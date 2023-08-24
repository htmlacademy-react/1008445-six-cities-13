import cn from 'classnames';
import { AppRoute, FavoriteOfferUpdateType, OfferType } from '../../../const.ts';
import InsideItemList from './inside-item-list.tsx';
import { TOffer } from '../../../types/offer.ts';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthCheckedStatus } from '../../../store/auth-process/selectors.ts';
import { useNavigate } from 'react-router-dom';
import Reviews from './reviews.tsx';
import { setOfferFavoriteAction } from '../../../store/api-actions.ts';
import { toast } from 'react-toastify';

type TOfferInfo = {
  offer: TOffer;
}

export default function OfferInfo({ offer }: TOfferInfo) {
  const dispatch = useAppDispatch();
  const { id, title, rating, isPremium, price, goods, description, bedrooms, maxAdults, type, isFavorite, host } = offer;
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const navigate = useNavigate();
  const { name, avatarUrl, isPro } = host;
  const bedroomsTitle = `${ bedrooms } Bedroom${ bedrooms > 1 ? 's' : ''}`;
  const maxAdultsTitle = `Max ${ maxAdults } adult${ maxAdults > 1 ? 's' : ''}`;
  const handleFavoriteButtonClick = () => {
    if (isAuthChecked) {
      dispatch(setOfferFavoriteAction({
        offerId: id,
        favoriteStatus: isFavorite ? 0 : 1,
        favoriteOfferType: FavoriteOfferUpdateType.Offer
      }))
        .unwrap()
        .then(() =>
          toast.success(`Successfully ${ !isFavorite ? 'added to ' : 'removed from' } favorites`))
        .catch(() => toast.error(
          `Something wrong when trying to ${ !isFavorite ? 'add to ' : 'remove from' } favorites, try again later`)
        );
    } else {
      navigate(AppRoute.Login);
    }
  };
  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        { isPremium &&
          <div className="offer__mark">
            <span>Premium</span>
          </div> }
        <div className="offer__name-wrapper">
          <h1 className="offer__name">
            { title }
          </h1>
          <button
            className={ cn('offer__bookmark-button button', { 'offer__bookmark-button--active' : isFavorite }) }
            type="button"
            onClick={ handleFavoriteButtonClick }
            data-testid="favorite-button"
          >
            <svg className="offer__bookmark-icon" width="31" height="33">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="offer__rating rating" data-testid="offer-rating">
          <div className="offer__stars rating__stars">
            <span style={{ width: `${ Math.round(rating) * 20 }%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="offer__rating-value rating__value">{ rating }</span>
        </div>
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">{ OfferType[ type ] }</li>
          <li className="offer__feature offer__feature--bedrooms">{ bedroomsTitle }</li>
          <li className="offer__feature offer__feature--adults">{ maxAdultsTitle }</li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">&euro;{ price }</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <InsideItemList goods={ goods }/>
        </div>
        <div className="offer__host">
          <h2 className="offer__host-title" data-testid="host-header">Meet the host</h2>
          <div className="offer__host-user user">
            <div className={ cn('offer__avatar-wrapper user__avatar-wrapper', { 'offer__avatar-wrapper--pro' : isPro }) }>
              <img className="offer__avatar user__avatar" src={ avatarUrl } width="74" height="74" alt="Host avatar"/>
            </div>
            <span className="offer__user-name">{ name }</span>
            { isPro && <span className="offer__user-status">Pro</span> }
          </div>
          <div className="offer__description" data-testid="offer-description">
            <p className="offer__text">
              { description }
            </p>
          </div>
        </div>
        <Reviews offerId={ id }/>
      </div>
    </div>
  );
}
