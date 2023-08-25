import { Outlet, useLocation } from 'react-router-dom';
import { MemoizedLogo } from '../logo/logo.tsx';
import { MemoizedNav } from '../nav/nav.tsx';
import { getLayoutClassOptions } from '../../../utils.ts';
import Footer from '../footer/footer.tsx';

export default function Layout () {
  const { pathname } = useLocation();
  const { pageClass, mainClass, isNavVisible, isFooterVisible } = getLayoutClassOptions(pathname);
  return (
    <div className={ `page ${ pageClass }` } data-testid="page">
      <header className="header" data-testid="header">
        <div className="container">
          <div className="header__wrapper">
            <MemoizedLogo/>
            { isNavVisible && <MemoizedNav/> }
          </div>
        </div>
      </header>
      <main className={ `page__main ${ mainClass }` } data-testid="main">
        <Outlet/>
      </main>
      { isFooterVisible && <Footer/> }
    </div>
  );
}
