import { AppNameSpace, OfferLimits } from '../../const.ts';
import { AppData } from '../../types/state.ts';
import { createSlice } from '@reduxjs/toolkit';
import { addReviewAction, getOfferAction, getOffersAction } from '../api-actions.ts';
import { toast } from 'react-toastify';

const initialState: AppData = {
  offers: [],
  isOffersLoading: true,
  isOfferLoading: true,
  offer: undefined,
  reviews: [],
  nearOffers: [],
  hasError: false,
};

export const appData = createSlice({
  name: AppNameSpace.AppData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(getOffersAction.rejected, (state) => {
        state.hasError = true;
        state.isOffersLoading = false;
      })
      .addCase(getOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(getOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.offer?.reviews.unshift(action.payload);
        state.offer?.reviews.splice(OfferLimits.reviewsVisibleCount, 1);
        toast.success('Your review successfully added');
      });
  }
});

