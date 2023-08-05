import { createReducer } from '@reduxjs/toolkit';
import { setCity, getOffers, requireAuth, setIsLoading, getReviews, getNearOffers, addReview } from './actions.ts';
import { AuthorizationStatus, City, CityMap } from '../const.ts';
import { TOffer, TPreviewOffers } from '../types/offer.ts';
import { TCity } from '../types/map.ts';
import { getOffer } from './actions.ts';
import { TReviews } from '../types/comment.ts';

type State = {
  city: TCity;
  offers: TPreviewOffers;
  authStatus: AuthorizationStatus;
  isLoading: boolean;
  offer: TOffer | undefined;
  reviews: TReviews;
  nearOffers: TPreviewOffers;
}

const initState: State = {
  city: CityMap[ City.Paris ],
  offers: [],
  authStatus: AuthorizationStatus.Unknown,
  isLoading: false,
  offer: undefined,
  reviews: [],
  nearOffers: [],
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(getNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(getOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(getReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setIsLoading, (state, action) => {
      state.isLoading = action.payload;
    });
});

//const rootReducer = combineReducers({ reducer });

export { reducer };

