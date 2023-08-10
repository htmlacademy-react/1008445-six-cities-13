import { AppNameSpace, AuthorizationStatus, RequestStatus } from '../../const.ts';
import { TState } from '../../types/state.ts';
import { getUserData } from '../../services/user-data.ts';

export const getAuthStatus = (state: TState): AuthorizationStatus => state[ AppNameSpace.Auth ].authStatus;
export const getAuthCheckedStatus = (state: TState): boolean => {
  const data = getUserData();
  return state[ AppNameSpace.Auth ].authStatus === AuthorizationStatus.Auth || !!data;
};
export const getLoginLoadingStatus = (state: TState): RequestStatus => state[ AppNameSpace.Auth ].loginLoadingStatus;
