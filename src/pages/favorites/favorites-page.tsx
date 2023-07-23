import { Helmet } from 'react-helmet-async';
import FavoriteList from './components/favorite-list.tsx';
import { Offer } from '../../types/offer.ts';

type FavoritesPageProps = {
  offers: Offer[];
}

function FavoritesPage({ offers }: FavoritesPageProps) {
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
