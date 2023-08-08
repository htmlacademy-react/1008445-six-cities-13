import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Six cities. Page not found</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sorry ;( <br/> page not found</h1>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link to="/" className="locations__item-link">
              <span>Return to main page</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
