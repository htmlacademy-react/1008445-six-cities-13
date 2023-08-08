import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAppDispatch, TState } from '../types/state.js';
import { removeToken, setToken } from '../services/token';
import { APIRoute, AppRoute, OfferLimits } from '../const';
import { TAuthData } from '../types/auth-data';
import { TUserData } from '../types/user-data';
import { TOffer, TOfferRequestData, TOfferResponseData, TPreviewOffers } from '../types/offer.ts';
import { TReview, TReviewRequestData, TReviews } from '../types/comment.ts';
import { sortByRandom, sortReviewsByDateDesc } from '../utils.ts';
import { setCurrentFocusedOffer } from './app-process/app-process.ts';
import { redirectToRoute } from './actions.ts';

const getOffersAction = createAsyncThunk<TPreviewOffers, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'data/getOffers',
  async (_arg, { extra: api }) => {
    const { data} = await api.get<TPreviewOffers>(APIRoute.Offers);
    return data;
  },
);

const getOfferAction = createAsyncThunk<TOfferResponseData, TOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'data/getOffer',
  async ({ offerId }, { dispatch, extra: api }) => {
    const offer = await api.get<TOffer>(`${ APIRoute.Offers }/${ offerId }`);
    const reviews = await api.get<TReviews>(`${ APIRoute.Reviews }/${ offerId }`);
    const nearOffers = await api.get<TPreviewOffers>(`${ APIRoute.Offers }/${ offerId }/nearby`);

    const slicedReviews = reviews.data.slice(0).sort(sortReviewsByDateDesc).slice(0, OfferLimits.reviewsVisibleCount);
    const slicedNearOffers = nearOffers.data.slice(0).sort(sortByRandom).slice(0, OfferLimits.nearOffersVisibleCount);
    dispatch(setCurrentFocusedOffer(offer.data));
    return { offer: offer.data, reviews: slicedReviews, nearOffers: slicedNearOffers };
  },
);

const addReviewAction = createAsyncThunk<TReview, TReviewRequestData & TOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({ offerId, rating, comment }, { extra: api}) => {
    const { data} = await api.post<TReview>(`${ APIRoute.Reviews }/${ offerId }`, { rating, comment });
    return data;
  },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_arg, { extra: api }) => {
    await api.get(APIRoute.Login);
  },
);

const loginAction = createAsyncThunk<void, TAuthData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({ login: email, password }, { dispatch, extra: api}) => {
    const { data: { token } } = await api.post<TUserData>(APIRoute.Login, { email, password });
    setToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    removeToken();
  },
);

export {
  getOffersAction,
  getOfferAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  addReviewAction,
};


