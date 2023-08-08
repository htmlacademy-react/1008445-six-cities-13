import { store } from '../store';
import { AuthorizationStatus } from '../const.ts';
import { TOffer, TOfferResponseData, TPreviewOffer, TPreviewOffers } from './offer.ts';
import { TReviews } from './comment.ts';
import { TCity } from './map.ts';

export type TState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export type AuthProcess = {
  authStatus: AuthorizationStatus;
}

export type AppData = {
  offers: TPreviewOffers;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  offer: TOfferResponseData | undefined;
  reviews: TReviews;
  nearOffers: TPreviewOffers;
  hasError: boolean;
}

export type AppProcess = {
  city: TCity;
  currentFocusedOffer: TPreviewOffer | TOffer | undefined;
}
