import {
  AppNameSpace,
  RequestStatus,
  FavoriteOfferUpdateType, DEFAULT_REVIEW
} from '../../const.ts';
import { TAppData } from '../../types/state.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addReviewAction,
  getFavoriteOffersAction,
  getNearOffersAction,
  getOfferAction,
  getOffersAction,
  getReviewsAction,
  setOfferFavoriteAction,
} from '../api-actions.ts';
import { toast } from 'react-toastify';
import { replaceOrToggleOffer, sortByRandom } from '../../utils.ts';
import { TReviewData } from '../../types/comment.ts';

const initialState: TAppData = {
  offers: [],
  favoriteOffers: [],
  offersLoadingStatus: RequestStatus.Idle,
  offerLoadingStatus: RequestStatus.Idle,
  reviewsLoadingStatus: RequestStatus.Idle,
  reviewLoadingStatus: RequestStatus.Idle,
  nearOffersLoadingStatus: RequestStatus.Idle,
  favoriteOffersLoadingStatus: RequestStatus.Idle,
  offer: undefined,
  reviews: [],
  nearOffers: [],
  review: DEFAULT_REVIEW,
};

export const appData = createSlice({
  name: AppNameSpace.AppData,
  initialState,
  reducers: {
    setReview: (state, action: PayloadAction<TReviewData>) => {
      state.review = action.payload;
    },
  },
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
        state.nearOffers = action.payload.sort(sortByRandom);
        state.nearOffersLoadingStatus = RequestStatus.Success;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.reviewLoadingStatus = RequestStatus.Error;
        toast.error('Something go wrong when trying to send your review');
      })
      .addCase(addReviewAction.pending, (state) => {
        state.reviewLoadingStatus = RequestStatus.Pending;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.review = DEFAULT_REVIEW;
        state.reviewLoadingStatus = RequestStatus.Success;
        toast.success('Your review successfully added');
      })
      .addCase(setOfferFavoriteAction.fulfilled, (state, action) => {
        const { offer, favoriteOfferType } = action.payload;
        if (favoriteOfferType === FavoriteOfferUpdateType.Offer) {
          state.offer = offer;
        }
        if (favoriteOfferType === FavoriteOfferUpdateType.NearList) {
          replaceOrToggleOffer(state.nearOffers, offer);
        }
        replaceOrToggleOffer(state.offers, offer);
        replaceOrToggleOffer(state.favoriteOffers, offer, true);
        toast.success(`Successfully ${ offer?.isFavorite ? 'added to ' : 'removed from' } favorites`);
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

export const { setReview } = appData.actions;
