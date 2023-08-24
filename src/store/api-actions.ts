import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAppDispatch, TState } from '../types/state.js';
import { APIRoute, AppNameSpace } from '../const';
import { TAuthData } from '../types/auth-data';
import { TUserData } from '../types/user-data';
import {
  TFavoriteOfferRequestData,
  TFavoriteOfferResponseData,
  TOffer,
  TOfferRequestData,
  TPreviewOffers
} from '../types/offer.ts';
import { TReview, TReviewRequestData, TReviews } from '../types/comment.ts';
import { removeUserData, setUserData } from '../services/user-data.ts';
import { sortByRandom } from '../utils.ts';

const getOffersAction = createAsyncThunk<TPreviewOffers, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.AppData }/getOffers`,
  async (_arg, { extra: api }) => {
    const { data} = await api.get<TPreviewOffers>(APIRoute.Offers);
    return data;
  },
);
const getOfferAction = createAsyncThunk<TOffer, TOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.AppData }/getOffer`,
  async ({ offerId }, { extra: api }) => {
    const { data } = await api.get<TOffer>(`${ APIRoute.Offers }/${ offerId }`);
    return data;
  },
);
const getReviewsAction = createAsyncThunk<TReviews, TOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.AppData }/getReviews`,
  async ({ offerId }, { extra: api }) => {
    const { data } = await api.get<TReviews>(`${ APIRoute.Reviews }/${ offerId }`);
    return data;
  },
);
const getNearOffersAction = createAsyncThunk<TPreviewOffers, TOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.AppData }/getNearOffers`,
  async ({ offerId }, { extra: api }) => {
    const { data } = await api.get<TPreviewOffers>(`${ APIRoute.Offers }/${ offerId }/nearby`);
    return data.sort(sortByRandom);
  },
);
const getFavoriteOffersAction = createAsyncThunk<TPreviewOffers, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.AppData }/getFavoritesOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TPreviewOffers>(APIRoute.Favorites);
    return data;
  },
);
const addReviewAction = createAsyncThunk<TReview, TReviewRequestData & TOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.AppData }/addReview`,
  async ({ offerId, rating, comment }, { extra: api}) => {
    const { data} = await api.post<TReview>(`${ APIRoute.Reviews }/${ offerId }`, { rating, comment });
    return data;
  },
);
const setOfferFavoriteAction = createAsyncThunk<TFavoriteOfferResponseData, TFavoriteOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.AppData }/setOfferFavorite`,
  async ({
    offerId,
    favoriteStatus,
    favoriteOfferType
  },
  { extra: api}) => {
    const { data} = await api.post<TOffer>(`${ APIRoute.Favorites }/${ offerId }/${ favoriteStatus }`);
    return { offer: data, favoriteOfferType };
  },
);
const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.Auth }/checkAuth`,
  async (_arg, { dispatch, extra: api }) => {
    await api.get(APIRoute.Login);
    dispatch(getFavoriteOffersAction());
  },
);
const loginAction = createAsyncThunk<TUserData, TAuthData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.Auth }/login`,
  async ({ email, password }, { dispatch, extra: api}) => {
    const { data } = await api.post<TUserData>(APIRoute.Login, { email, password });
    setUserData(data);
    dispatch(getOffersAction());
    dispatch(getFavoriteOffersAction());
    return data;
  },
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.Auth }/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    removeUserData();
    dispatch(getOffersAction());
  },
);

export {
  getOffersAction,
  getNearOffersAction,
  getReviewsAction,
  getOfferAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  addReviewAction,
  setOfferFavoriteAction,
  getFavoriteOffersAction,
};


