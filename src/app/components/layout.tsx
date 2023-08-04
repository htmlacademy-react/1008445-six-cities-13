import { Outlet, useLocation } from 'react-router-dom';
import Logo from './logo.tsx';
import Nav from './nav.tsx';
import { getLayoutClassOptions } from '../../utils.ts';
import { AuthorizationStatus } from '../../const.ts';

type LayoutProps = {
  authorizationStatus: AuthorizationStatus;
}

export default function Layout ({ authorizationStatus }: LayoutProps) {
  const { pathname } = useLocation();
  const { pageClass, mainClass, isNavVisible } = getLayoutClassOptions(pathname);
  return (
    <div className={ `page ${ pageClass }` }>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            { isNavVisible && <Nav authorizationStatus={ authorizationStatus }/> }
          </div>
        </div>
      </header>
      <main className={ `page__main ${ mainClass }` }>
        <Outlet/>
      </main>
    </div>
  );
}


