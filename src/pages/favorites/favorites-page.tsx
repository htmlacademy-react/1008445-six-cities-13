import { Helmet } from 'react-helmet-async';
import FavoriteList from './components/favorite-list.tsx';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers, getFavoriteOffersLoadingStatus } from '../../store/app-data/selectors.ts';
import { AppRoute, ErrorCause, RequestStatus } from '../../const.ts';
import Loader from '../../app/components/loader/loader.tsx';
import ErrorRequestReloader from '../../app/components/error-request-reloader/error-request-reloader.tsx';
import { Navigate } from 'react-router-dom';

function FavoritesPage() {
  const favoriteOffersLoadingStatus = useAppSelector(getFavoriteOffersLoadingStatus);
  const offers = useAppSelector(getFavoriteOffers);
  if ([ RequestStatus.Idle, RequestStatus.Pending ].includes(favoriteOffersLoadingStatus)) {
    return <Loader/>;
  }
  if (favoriteOffersLoadingStatus === RequestStatus.Error) {
    return <ErrorRequestReloader cause={ ErrorCause.Favorites }/>;
  }
  if (!offers.length) {
    return <Navigate to={ AppRoute.NoFavorites }/>;
  }
  return (
    <>
      <Helmet>
        <title>Six cities. Favorites places</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites" data-testid="favorites-offers">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoriteList offers={ offers }/>
        </section>
      </div>
    </>
  );
}

export default FavoritesPage;
