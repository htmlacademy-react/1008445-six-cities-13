import { Outlet, useLocation } from 'react-router-dom';
import Logo from './logo.tsx';
import Nav from './nav.tsx';
import { getLayoutClassOptions } from '../../utils.ts';

export default function Layout () {
  const { pathname } = useLocation();
  const { pageClass, mainClass, isLoginOrPageNotFound } = getLayoutClassOptions(pathname);
  return (
    <div className={ `page ${ pageClass }` }>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            { !isLoginOrPageNotFound && <Nav/> }
          </div>
        </div>
      </header>

      <main className={ `page__main ${ mainClass }` }>
        <Outlet/>
      </main>
    </div>
  );
}


