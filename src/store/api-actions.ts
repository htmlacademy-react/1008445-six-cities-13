import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAppDispatch, TState } from '../types/state.js';
import { setToken, removeToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { TPreviewOffers } from '../types/offer.ts';
import { getOffers, requireAuth, setOffersLoadingStatus } from './action.ts';

const getOffersAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'data/getOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const { data} = await api.get<TPreviewOffers>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(getOffers(data));
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

const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, {dispatch, extra: api}) => {
    const { data: { token } } = await api.post<UserData>(
      APIRoute.Login,
      {
        email,
        password
      });
    setToken(token);
    dispatch(requireAuth(AuthorizationStatus.Auth));
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
  },
);

export {
  getOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
};


