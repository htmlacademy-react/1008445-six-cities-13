import { Helmet } from 'react-helmet-async';
import { FullOffer, Review } from '../../types/offer.ts';
import ImageList from './components/image-list.tsx';
import InsideItemList from './components/inside-item-list.tsx';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, nearOfferItemClassOptions } from '../../const.ts';
import OfferList from '../main/components/offer-list.tsx';
import ReviewItemList from './components/review-item-list.tsx';
import CommentForm from './components/comment-form.tsx';

type OfferPageProps = {
  offers: FullOffer[];
  reviews: Review[];
}

function OfferPage({ offers, reviews }: OfferPageProps) {
  const params = useParams();
  const fullOffer = offers.find(({ id }) => id === params.id);
  if (!fullOffer) {
    return (
      <Navigate to={ AppRoute.NotFound } />
    );
  }
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
  } = fullOffer;
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
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{ rating }</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire capitalize">
                { type }
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
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
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
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{ reviews.length }</span></h2>
              <ReviewItemList reviews={ reviews }/>
              <CommentForm/>
            </section>
          </div>
        </div>
        <section className="offer__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList offers={ offers } classOption={ nearOfferItemClassOptions }/>
        </section>
      </div>
    </>
  );
}

export default OfferPage;
