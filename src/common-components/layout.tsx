import { Outlet } from 'react-router-dom';
import Logo from './logo.tsx';
import Nav from './nav.tsx';

function Layout (){
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <Nav/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <Outlet/>
      </main>
    </div>
  );
}

export default Layout;
