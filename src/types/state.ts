import { store } from '../store';
import { AuthorizationStatus, RequestStatus } from '../const.ts';
import { TOffer, TPreviewOffer, TPreviewOffers } from './offer.ts';
import { TReviewData, TReviews } from './comment.ts';
import { TCity } from './map.ts';

export type TState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export type TAuthProcess = {
  authStatus: AuthorizationStatus;
  loginLoadingStatus: RequestStatus;
}

export type TAppData = {
  offers: TPreviewOffers;
  favoriteOffers: TPreviewOffers;
  offersLoadingStatus: RequestStatus;
  offerLoadingStatus: RequestStatus;
  reviewsLoadingStatus: RequestStatus;
  reviewLoadingStatus: RequestStatus;
  nearOffersLoadingStatus: RequestStatus;
  favoriteOffersLoadingStatus: RequestStatus;
  offer: TOffer | undefined;
  reviews: TReviews;
  nearOffers: TPreviewOffers;
  review: TReviewData;
}

export type TAppProcess = {
  city: TCity;
  currentFocusedOffer: TPreviewOffer | TOffer | undefined;
}
