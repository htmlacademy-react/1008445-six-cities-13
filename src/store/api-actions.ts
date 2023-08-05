import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAppDispatch, TState } from '../types/state.js';
import { removeToken, setToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { TAuthData } from '../types/auth-data';
import { TUserData } from '../types/user-data';
import { TOffer, TOfferRequestData, TPreviewOffers } from '../types/offer.ts';
import {
  getOffers,
  redirectToRoute,
  requireAuth,
  setIsLoading,
  getOffer,
  getReviews,
  getNearOffers,
  addReview
} from './actions.ts';
import { toast } from 'react-toastify';
import { TReview, TReviewRequestData, TReviews } from '../types/comment.ts';

const getOffersAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'data/getOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setIsLoading(true));
    const { data} = await api.get<TPreviewOffers>(APIRoute.Offers);
    dispatch(setIsLoading(false));
    dispatch(getOffers(data));
  },
);

const getOfferAction = createAsyncThunk<void, TOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'data/getOffer',
  async ({ offerId }, { dispatch, extra: api }) => {
    const { data } = await api.get<TOffer>(`${ APIRoute.Offers }/${ offerId }`);
    dispatch(getOffer(data));
  },
);

const getReviewsAction = createAsyncThunk<void, TOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'data/getReviews',
  async ({ offerId }, { dispatch, extra: api }) => {
    const { data} = await api.get<TReviews>(`${ APIRoute.Reviews }/${ offerId }`);
    dispatch(getReviews(data));
  },
);

const getNearOffersAction = createAsyncThunk<void, TOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'data/getNearOffers',
  async ({ offerId }, { dispatch, extra: api }) => {
    const { data} = await api.get<TPreviewOffers>(`${ APIRoute.Offers }/${ offerId }/nearby`);
    dispatch(getNearOffers(data));
  },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuth(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuth(AuthorizationStatus.NoAuth));
    }
  },
);

const addReviewAction = createAsyncThunk<void, TReviewRequestData & TOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ offerId, rating, comment }, { dispatch, extra: api}) => {
    const { data} = await api.post<TReview>(`${ APIRoute.Reviews }/${ offerId }`, { rating, comment });
    dispatch(addReview(data));
    toast.success('Your review successfully added');
  },
);

const loginAction = createAsyncThunk<void, TAuthData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api}) => {
    const { data: { token } } = await api.post<TUserData>(APIRoute.Login, { email, password });
    setToken(token);
    dispatch(requireAuth(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    toast.success('Successfully login');
  },
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(requireAuth(AuthorizationStatus.NoAuth));
    toast.success('Successfully logout');
  },
);

export {
  getOffersAction,
  getOfferAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  getReviewsAction,
  getNearOffersAction,
  addReviewAction,
};


