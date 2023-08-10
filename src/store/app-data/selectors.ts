import { AppNameSpace, RequestStatus } from '../../const.ts';
import { TState } from '../../types/state.ts';
import { TOffer, TPreviewOffers, } from '../../types/offer.ts';
import { createSelector } from '@reduxjs/toolkit';
import { TReviews } from '../../types/comment.ts';

export const getFilteredByCityOffers = createSelector(
  [
    (state: TState) => state[ AppNameSpace.App ].city.name,
    (state: TState) => state[ AppNameSpace.AppData ].offers
  ],
  (cityName, offers) => offers.filter(({ city }) => city.name === cityName)
);
export const getOffersLoadingStatus = (state: TState): RequestStatus => state[ AppNameSpace.AppData ].offersLoadingStatus;
export const getOffer = (state: TState): TOffer | undefined => state[ AppNameSpace.AppData ].offer;
export const getReviews = (state: TState): TReviews => state[ AppNameSpace.AppData ].reviews;
export const getNearOffers = (state: TState): TPreviewOffers => state[ AppNameSpace.AppData ].nearOffers;
export const getFavoriteOffers = (state: TState): TPreviewOffers => state[ AppNameSpace.AppData ].favoriteOffers;
export const getFavoriteOffersLoadingStatus = (state: TState): RequestStatus => state[ AppNameSpace.AppData ].favoriteOffersLoadingStatus;
export const getFavoriteOffersCount = (state: TState): number => state[ AppNameSpace.AppData ].favoriteOffers.length;
export const getOfferLoadingStatus = (state: TState): RequestStatus => state[ AppNameSpace.AppData ].offerLoadingStatus;
export const getReviewsLoadingStatus = (state: TState): RequestStatus => state[ AppNameSpace.AppData ].reviewsLoadingStatus;
export const getNearOffersLoadingStatus = (state: TState): RequestStatus => state[ AppNameSpace.AppData ].nearOffersLoadingStatus;

