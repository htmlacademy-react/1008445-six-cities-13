import { AppNameSpace } from '../../const.ts';
import { TState } from '../../types/state.ts';
import { TOfferResponseData } from '../../types/offer.ts';
import { createSelector } from '@reduxjs/toolkit';

export const getFilteredByCityOffers = createSelector(
  [
    (state: TState) => state[ AppNameSpace.App ].city.name,
    (state: TState) => state[ AppNameSpace.AppData ].offers
  ],
  (cityName, offers) => offers.filter(({ city }) => city.name === cityName)
);
export const getOffersLoadingStatus = (state: TState): boolean => state[ AppNameSpace.AppData ].isOffersLoading;
export const getOffer = (state: TState): TOfferResponseData | undefined => state[ AppNameSpace.AppData ].offer;
export const getOfferLoadingStatus = (state: TState): boolean => state[ AppNameSpace.AppData ].isOfferLoading;
export const getErrorStatus = (state: TState): boolean => state[ AppNameSpace.AppData ].hasError;

