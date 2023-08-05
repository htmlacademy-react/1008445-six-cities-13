import { Helmet } from 'react-helmet-async';
import ImageList from './components/image-list.tsx';
import InsideItemList from './components/inside-item-list.tsx';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
  AppRoute,
  AuthorizationStatus,
  MapClassOptions,
  MapType,
  MAX_REVIEWS_COUNT,
  MAX_NEAR_OFFERS_COUNT,
  OfferListClassOptions,
  OfferListType,
  OfferType,
} from '../../const.ts';
import { sortReviewsByDateDesc, sortByRandom } from '../../utils.ts';
import OfferList from '../main/components/offer-list.tsx';
import ReviewItemList from './components/review-item-list.tsx';
import CommentForm from './components/comment-form.tsx';
import Map from '../../app/components/map.tsx';
import { TMapOffer, TOfferRequestData } from '../../types/offer.ts';
import * as cn from 'classnames';
import useOffer from '../../hooks/use-offer.ts';
import { useAppSelector } from '../../hooks';

function OfferPage() {
  const { offerId } = useParams<TOfferRequestData>();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(({ authStatus }) => authStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const { offer, offerReviews, nearOffers } = useOffer(offerId);
  if (!offerId || !offer) {
    return <Navigate to={ AppRoute.NotFound }/>;
  }
  const slicedOfferReviews = offerReviews.slice(0).sort(sortReviewsByDateDesc).slice(0, MAX_REVIEWS_COUNT);
  const slicedNearOffers = nearOffers.slice(0).sort(sortByRandom).slice(0, MAX_NEAR_OFFERS_COUNT);
  const slicedNearOffersPlusCurrentOffer: TMapOffer[] = slicedNearOffers.slice(0);
  const {
    title,
    rating,
    isPremium,
    price,
    host,
    goods,
    description,
    images,
    bedrooms,
    maxAdults,
    type,
    location,
    isFavorite
  } = offer;
  slicedNearOffersPlusCurrentOffer.push({ title, location });
  const { name, avatarUrl, isPro } = host;
  return (
    <>
      <Helmet>
        <title>Six cities. Offer</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <ImageList images={ images }/>
        </div>
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
                onClick={ () => {
                  if (!isAuth) {
                    navigate(AppRoute.Login);
                  }
                }}
              >
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${ rating * 20 }%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{ rating }</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                { OfferType[ type ] }
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                { bedrooms } Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max { maxAdults } adults
              </li>
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
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={ cn('offer__avatar-wrapper user__avatar-wrapper', { 'offer__avatar-wrapper--pro' : isPro }) }>
                  <img className="offer__avatar user__avatar" src={ avatarUrl } width="74" height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">
                  { name }
                </span>
                { isPro &&
                  <span className="offer__user-status">
                    Pro
                  </span> }
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  { description }
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{ offerReviews.length }</span></h2>
              <ReviewItemList reviews={ slicedOfferReviews }/>
              { isAuth && <CommentForm offerId={ offerId }/> }
            </section>
          </div>
        </div>
        <section className="offer__map map map--clear">
          <Map
            location={ location }
            offers={ slicedNearOffersPlusCurrentOffer }
            currentOffer={ offer }
            mapClass={ MapClassOptions[ MapType.Offer ] }
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList offers={ slicedNearOffers } classOption={ OfferListClassOptions[ OfferListType.Near ] }/>
        </section>
      </div>
    </>
  );
}

export default OfferPage;
