import { store } from '../store';
import { AuthorizationStatus, RequestStatus } from '../const.ts';
import { TOffer, TPreviewOffer, TPreviewOffers } from './offer.ts';
import { TReviews } from './comment.ts';
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
  nearOffersLoadingStatus: RequestStatus;
  favoriteOffersLoadingStatus: RequestStatus;
  offer: TOffer | undefined;
  reviews: TReviews;
  nearOffers: TPreviewOffers;
}

export type TAppProcess = {
  city: TCity;
  currentFocusedOffer: TPreviewOffer | TOffer | undefined;
}
