import { AppNameSpace, AuthorizationStatus, RequestStatus } from '../../const.ts';
import { AuthProcess } from '../../types/state.ts';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.ts';
import { toast } from 'react-toastify';

const initialState : AuthProcess = {
  authStatus: AuthorizationStatus.Unknown,
  loginLoadingStatus: RequestStatus.Idle,
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
      .addCase(loginAction.pending, (state) => {
        state.loginLoadingStatus = RequestStatus.Pending;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.loginLoadingStatus = RequestStatus.Success;
        toast.success('Successfully login');
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.loginLoadingStatus = RequestStatus.Error;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        toast.success('Successfully logout');
      });
  }
});

