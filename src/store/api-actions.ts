import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAppDispatch, TState } from '../types/state.js';
import { APIRoute, AppNameSpace, AppRoute } from '../const';
import { TAuthData } from '../types/auth-data';
import { TUserData } from '../types/user-data';
import { TFavoriteOfferRequestData, TOffer, TOfferRequestData, TPreviewOffers } from '../types/offer.ts';
import { TReview, TReviewRequestData, TReviews } from '../types/comment.ts';
import { redirectToRoute } from './actions.ts';
import { removeUserData, setUserData } from '../services/user-data.ts';
import { toast } from 'react-toastify';

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
    return data;
  },
);
const getFavoriteOffersAction = createAsyncThunk<TPreviewOffers, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.AppData }/getFavoritesOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TPreviewOffers>(`${ APIRoute.Favorites }`);
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
const setOfferFavoriteAction = createAsyncThunk<TOffer, TFavoriteOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.AppData }/setOfferFavorite`,
  async ({ offerId, favoriteStatus }, { extra: api}) => {
    try {
      const { data} = await api.post<TOffer>(`${ APIRoute.Favorites }/${ offerId }/${ favoriteStatus }`);
      return data;
    } catch (e) {
      toast.error(
        `Something wrong when trying to ${ favoriteStatus ? 'add to ' : 'remove from' } favorites, try again later`);
      throw e;
    }
  },
);
const setPreviewOfferFavoriteAction = createAsyncThunk<TOffer, TFavoriteOfferRequestData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.AppData }/setPreviewOfferFavorite`,
  async ({ offerId, favoriteStatus }, { extra: api}) => {
    try {
      const { data} = await api.post<TOffer>(`${ APIRoute.Favorites }/${ offerId }/${ favoriteStatus }`);
      return data;
    } catch (e) {
      toast.error(
        `Something wrong when trying to ${ favoriteStatus ? 'add to ' : 'remove from' } favorites, try again later`);
      throw e;
    }
  },
);
const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.Auth }/checkAuth`,
  async (_arg, { extra: api }) => {
    await api.get(APIRoute.Login);
  },
);
const loginAction = createAsyncThunk<void, TAuthData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.Auth }/login`,
  async ({ email, password }, { dispatch, extra: api}) => {
    try {
      const { data } = await api.post<TUserData>(APIRoute.Login, { email, password });
      setUserData(data);
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (e) {
      toast.error('Error while login, please try again later');
      throw e;
    }
  },
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  `${ AppNameSpace.Auth }/logout`,
  async (_arg, { extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      removeUserData();
    } catch (e) {
      toast.error('Error while logout, please try again later');
      throw e;
    }
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
  setPreviewOfferFavoriteAction
};


