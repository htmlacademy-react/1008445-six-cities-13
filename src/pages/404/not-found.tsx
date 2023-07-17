import { Link } from 'react-router-dom';
import Logo from '../../common-components/logo.tsx';
import {Helmet} from 'react-helmet-async';
function NotFoundPage() {
  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Six cities. Favorites places</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sorry ;( <br/> page not found</h1>
            <Link to="/" className="locations__item-link" style={{ cursor: 'pointer' }}>Return to main page</Link>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
