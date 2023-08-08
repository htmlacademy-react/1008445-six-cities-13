import { TPreviewOffer, TOfferItemClassOptions } from '../../../types/offer.ts';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, OfferType } from '../../../const.ts';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthCheckedStatus } from '../../../store/auth-process/selectors.ts';
import { setCurrentFocusedOffer } from '../../../store/app-process/app-process.ts';

type OfferItemProps = {
  offer: TPreviewOffer;
  classOptions: TOfferItemClassOptions;
}

export default function OfferItem({ offer, classOptions }: OfferItemProps) {
  const dispatch = useAppDispatch();
  const {
    placeCardClass,
    placeCardImageWrapperClass,
    imageWith,
    imageHeight,
    placeCardInfoClass,
  } = classOptions;
  const {
    id,
    previewImage,
    isPremium,
    price,
    title,
    type,
    rating,
    isFavorite,
  } = offer;
  const navigate = useNavigate();
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  return (
    <article
      className={ `${ placeCardClass } place-card` }
      onMouseOver={ () => dispatch(setCurrentFocusedOffer(offer)) }
      onMouseOut={ () => dispatch(setCurrentFocusedOffer(undefined)) }
    >
      { isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div> }
      <div className={ `${ placeCardImageWrapperClass } place-card__image-wrapper` }>
        <a>
          <img
            className="place-card__image"
            src={ previewImage }
            width={ imageWith }
            height={ imageHeight }
            alt={ type }
          />
        </a>
      </div>
      <div className={ `place-card__info ${ placeCardInfoClass }` }>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            type="button"
            className={ cn('place-card__bookmark-button button', { 'place-card__bookmark-button--active' : isFavorite }) }
            onClick={ () => {
              if (!isAuthChecked) {
                navigate(AppRoute.Login);
              }
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ Math.round(rating) * 20 }%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={ `${ AppRoute.Offer }/${ id }` }>{ title }</Link>
        </h2>
        <p className="place-card__type">{ OfferType[ type ] }</p>
      </div>
    </article>
  );
}
