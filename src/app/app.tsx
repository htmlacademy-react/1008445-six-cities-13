import MainPage from '../pages/main/main-page.tsx';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const.ts';
import LoginPage from '../pages/login/login-page.tsx';
import FavoritesPage from '../pages/favorites/favorites-page.tsx';
import OfferPage from '../pages/offer/offer-page.tsx';
import NotFoundPage from '../pages/404/not-found-page.tsx';
import PrivateRoute from './components/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout.tsx';
import MainEmptyPage from '../pages/main-empty/main-empty-page.tsx';
import { checkAuthAction, getFavoriteOffersAction, getOffersAction } from '../store/api-actions.ts';
import { store } from '../store';
import FavoritesEmptyPage from '../pages/favorites-empty/favorites-empty-page.tsx';

store.dispatch(checkAuthAction());
store.dispatch(getOffersAction());
store.dispatch(getFavoriteOffersAction());

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route index element={ <MainPage/> }/>
          <Route
            path={ `${ AppRoute.Offer }/:offerId` }
            element={ <OfferPage/> }
          />
          <Route
            path={ `${ AppRoute.NoOffers }` }
            element={ <MainEmptyPage/> }
          />
          <Route
            path={ AppRoute.Favorites }
            element={
              <PrivateRoute>
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={ `${ AppRoute.NoFavorites }` }
            element={
              <PrivateRoute>
                <FavoritesEmptyPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={ AppRoute.Login }
            element={ <LoginPage/> }
          />
          <Route
            path={ AppRoute.NotFound }
            element={ <NotFoundPage/> }
          />
          <Route
            path="*"
            element={ <NotFoundPage/> }
          />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}
