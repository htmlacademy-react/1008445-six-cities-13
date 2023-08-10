import { Helmet } from 'react-helmet-async';

export default function FavoritesEmptyPage() {
  return (
    <>
      <Helmet>
        <title>Six cities. No favorites places</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">
              Save properties to narrow down search or plan your future trips.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
