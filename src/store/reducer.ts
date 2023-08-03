import { createReducer } from '@reduxjs/toolkit';
import { selectCity, getOffers, requireAuth, setOffersLoadingStatus } from './action.ts';
import { AuthorizationStatus, City, CityMap } from '../const.ts';
import { TPreviewOffers } from '../types/offer.ts';
import { TCity } from '../types/map.ts';

type State = {
  city: TCity;
  offers: TPreviewOffers;
  authStatus: AuthorizationStatus;
  isOffersLoading: boolean;
}

const initState: State = {
  city: CityMap[ City.Paris ],
  offers: [],
  authStatus: AuthorizationStatus.Unknown,
  isOffersLoading: false
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});

export { reducer };

