import { describe } from 'vitest';
import { authProcess } from './auth-process.ts';
import { AuthorizationStatus, RequestStatus } from '../../const.ts';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.ts';
describe('AuthProcess Slice', () => {
  it('should return initial state with empty action ', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };

    const result = authProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };

    const result = authProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set Auth with checkAuthAction.fulfilled action', () => {
    const initialState = {
      authStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      authStatus: AuthorizationStatus.Auth,
      loginLoadingStatus: RequestStatus.Idle,
    };

    const result = authProcess.reducer(initialState, checkAuthAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set Auth with checkAuthAction.rejected action', () => {
    const initialState = {
      authStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      authStatus: AuthorizationStatus.NoAuth,
      loginLoadingStatus: RequestStatus.Idle,
    };

    const result = authProcess.reducer(initialState, checkAuthAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loginLoadingStatus to Pending with loginAction.pending action', () => {
    const initialState = {
      authStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Pending,
    };
    const expectedState = {
      authStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Pending,
    };

    const result = authProcess.reducer(initialState, loginAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set Auth and loginLoadingStatus to Pending with loginAction.fulfilled action', () => {
    const initialState = {
      authStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      authStatus: AuthorizationStatus.Auth,
      loginLoadingStatus: RequestStatus.Success,
    };

    const result = authProcess.reducer(initialState, loginAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set NoAuth and loginLoadingStatus to Error with loginAction.rejected action', () => {
    const initialState = {
      authStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      authStatus: AuthorizationStatus.NoAuth,
      loginLoadingStatus: RequestStatus.Error,
    };

    const result = authProcess.reducer(initialState, loginAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set NoAuth with logoutAction.fulfilled action', () => {
    const initialState = {
      authStatus: AuthorizationStatus.Auth,
      loginLoadingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      authStatus: AuthorizationStatus.NoAuth,
      loginLoadingStatus: RequestStatus.Idle,
    };

    const result = authProcess.reducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
});

