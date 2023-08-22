import { Route, Routes } from 'react-router-dom';
import { FavoritesPage, LoginPage, MainPage, NotFoundPage, OfferPage, FavoritesEmptyPage, MainEmptyPage } from '../pages/pages.ts';
import { AppRoute } from '../const.ts';
import PrivateRoute from './components/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout.tsx';
import { checkAuthAction, getOffersAction } from '../store/api-actions.ts';
import { store } from '../store';
store.dispatch(checkAuthAction());
store.dispatch(getOffersAction());

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
