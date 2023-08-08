import { AppNameSpace, AuthorizationStatus } from '../../const.ts';
import { AuthProcess } from '../../types/state.ts';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.ts';
import { toast } from 'react-toastify';

const initialState : AuthProcess = {
  authStatus: AuthorizationStatus.Unknown,
};

export const authProcess = createSlice({
  name: AppNameSpace.AppData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
        toast.success('Successfully login');
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        toast.success('Successfully logout');
      });
  }
});

