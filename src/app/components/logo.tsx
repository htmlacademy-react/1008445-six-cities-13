import { Link } from 'react-router-dom';
import { memo } from 'react';

export default function Logo() {
  return (
    <div className="header__left">
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </Link>
    </div>
  );
}
export const MemoizedLogo = memo(Logo);
