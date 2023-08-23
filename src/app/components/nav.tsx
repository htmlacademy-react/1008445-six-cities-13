import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { logoutAction } from '../../store/api-actions.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { memo, MouseEvent } from 'react';
import { getAuthCheckedStatus } from '../../store/auth-process/selectors.ts';
import { getFavoriteOffersCount } from '../../store/app-data/selectors.ts';
import '../style.css';
import { getUserData } from '../../services/user-data.ts';
import { toast } from 'react-toastify';
export default function Nav() {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = getUserData();
  const singOutButtonClickHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    navigate(AppRoute.Main);
    dispatch(logoutAction())
      .then(() => toast.success('Successfully logout'))
      .catch(() => toast.error('Error while logout, please try again later'));
  };
  return (
    <nav className="header__nav">
      { isAuthChecked && data ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={ AppRoute.Favorites }>
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img style={{ borderRadius: '50%' }} src={ data.avatarUrl } alt="" data-testid="avatar"/>
              </div>
              <span className="header__user-name user__name" data-testid="email">{ data.email }</span>
              <span className="header__favorite-count">{ favoriteOffersCount }</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <button
              type="button"
              className="header__nav-link"
              onClick={ singOutButtonClickHandler }
            >
              <span className="header__signout" data-testid="logout-button">Log Out</span>
            </button>
          </li>
        </ul>
        :
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={ AppRoute.Login } data-testid="sign-in-link">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login" data-testid="sign-in-button">Sign in</span>
            </Link>
          </li>
        </ul>}
    </nav>
  );
}
export const MemoizedNav = memo(Nav);
