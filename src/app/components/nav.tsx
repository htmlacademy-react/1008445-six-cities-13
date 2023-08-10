import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { logoutAction } from '../../store/api-actions.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { memo } from 'react';
import { getAuthCheckedStatus } from '../../store/auth-process/selectors.ts';
import { getUserData } from '../../services/user-data.ts';
import { getFavoriteOffersCount } from '../../store/app-data/selectors.ts';

function Nav() {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = getUserData();
  const avatarUrl = data?.avatarUrl ?? '';
  const email = data?.email ?? '';
  return (
    <nav className="header__nav">
      { isAuthChecked ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={ AppRoute.Favorites }>
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img style={{ borderRadius: '50%' }} src={ avatarUrl } alt=""/>
              </div>
              <span className="header__user-name user__name">{ email }</span>
              <span className="header__favorite-count">{ favoriteOffersCount }</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <button
              type="button"
              className="header__nav-link"
              onClick={ (evt) => {
                evt.preventDefault();
                navigate(AppRoute.Main);
                dispatch(logoutAction());
              }}
            >
              <span className="header__signout">Sign out</span>
            </button>
          </li>
        </ul>
        :
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={ AppRoute.Login }>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>}
    </nav>
  );
}
export const MemoizedNav = memo(Nav);
