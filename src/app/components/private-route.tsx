import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { ReactElement } from 'react';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: ReactElement;
}

export default function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps) {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={ AppRoute.Login } />
  );
}
