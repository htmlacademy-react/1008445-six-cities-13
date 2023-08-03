import { Helmet } from 'react-helmet-async';
import FavoriteList from './components/favorite-list.tsx';
import { offers } from '../../mock/offers.ts';

function FavoritesPage() {
  return (
    <>
      <Helmet>
        <title>Six cities. Favorites places</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoriteList offers={ offers }/>
        </section>
      </div>
    </>
  );
}

export default FavoritesPage;
