import { AppNameSpace, AuthorizationStatus } from '../../const.ts';
import { TState } from '../../types/state.ts';

export const getAuthStatus = (state: TState): AuthorizationStatus => state[ AppNameSpace.Auth ].authStatus;
export const getAuthCheckedStatus = (state: TState): boolean =>
  state[ AppNameSpace.Auth ].authStatus === AuthorizationStatus.Auth;

