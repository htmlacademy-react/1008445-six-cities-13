import { AppNameSpace, RequestStatus } from '../../const.ts';
import { TAppData } from '../../types/state.ts';
import { createSlice } from '@reduxjs/toolkit';
import {
  addReviewAction,
  getOfferAction,
  getOffersAction,
  getReviewsAction,
  getNearOffersAction,
  setOfferFavoriteAction,
  getFavoriteOffersAction,
  setPreviewOfferFavoriteAction
} from '../api-actions.ts';
import { toast } from 'react-toastify';
import { toggleFavoriteOffer } from '../../utils.ts';

const initialState: TAppData = {
  offers: [],
  favoriteOffers: [],
  offersLoadingStatus: RequestStatus.Idle,
  offerLoadingStatus: RequestStatus.Idle,
  reviewsLoadingStatus: RequestStatus.Idle,
  nearOffersLoadingStatus: RequestStatus.Idle,
  favoriteOffersLoadingStatus: RequestStatus.Idle,
  offer: undefined,
  reviews: [],
  nearOffers: [],
};

export const appData = createSlice({
  name: AppNameSpace.AppData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOffersAction.pending, (state) => {
        state.offersLoadingStatus = RequestStatus.Pending;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoadingStatus = RequestStatus.Success;
      })
      .addCase(getOffersAction.rejected, (state) => {
        state.offersLoadingStatus = RequestStatus.Error;
      })
      .addCase(getOfferAction.pending, (state) => {
        state.offerLoadingStatus = RequestStatus.Pending;
      })
      .addCase(getOfferAction.rejected, (state) => {
        state.offerLoadingStatus = RequestStatus.Error;
      })
      .addCase(getOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.offerLoadingStatus = RequestStatus.Success;
      })
      .addCase(getReviewsAction.rejected, (state) => {
        state.reviewsLoadingStatus = RequestStatus.Error;
      })
      .addCase(getReviewsAction.pending, (state) => {
        state.reviewsLoadingStatus = RequestStatus.Pending;
      })
      .addCase(getReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsLoadingStatus = RequestStatus.Success;
      })
      .addCase(getNearOffersAction.rejected, (state) => {
        state.nearOffersLoadingStatus = RequestStatus.Error;
      })
      .addCase(getNearOffersAction.pending, (state) => {
        state.nearOffersLoadingStatus = RequestStatus.Pending;
      })
      .addCase(getNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
        state.nearOffersLoadingStatus = RequestStatus.Success;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        toast.success('Your review successfully added');
      })
      .addCase(setOfferFavoriteAction.fulfilled, (state, action) => {
        const offer = action.payload;
        state.offer = offer;
        toggleFavoriteOffer(state, offer);
        toast.success(`Successfully ${ offer?.isFavorite ? 'added to ' : 'removed from' } favorites`);
      })
      .addCase(setPreviewOfferFavoriteAction.fulfilled, (state, action) => {
        const offer = action.payload;
        const oldOffer = state.offers.find(({ id }) => id === offer.id);
        if (oldOffer) {
          const offersIndex = state.offers.indexOf(oldOffer);
          state.offers.splice(offersIndex, 1, offer);
          toggleFavoriteOffer(state, offer);
          toast.success(`Successfully ${ offer?.isFavorite ? 'added to ' : 'removed from' } favorites`);
        }
      })
      .addCase(getFavoriteOffersAction.pending, (state) => {
        state.favoriteOffersLoadingStatus = RequestStatus.Pending;
      })
      .addCase(getFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.favoriteOffersLoadingStatus = RequestStatus.Success;
      })
      .addCase(getFavoriteOffersAction.rejected, (state) => {
        state.favoriteOffersLoadingStatus = RequestStatus.Error;
      });
  }
});

