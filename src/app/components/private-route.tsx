import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { ReactElement } from 'react';
import { useAppSelector } from '../../hooks';
import { getAuthCheckedStatus } from '../../store/auth-process/selectors.ts';

type PrivateRouteProps = {
  children: ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isChecked = useAppSelector(getAuthCheckedStatus);
  return isChecked ? children : <Navigate to={ AppRoute.Login }/>;
}
