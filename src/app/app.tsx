import MainPage from '../pages/main/main-page.tsx';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const.ts';
import LoginPage from '../pages/login/login-page.tsx';
import FavoritesPage from '../pages/favorites/favorites-page.tsx';
import OfferPage from '../pages/offer/offer-page.tsx';
import NotFoundPage from '../pages/404/not-found-page.tsx';
import PrivateRoute from './components/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout.tsx';
import LayoutFooter from './components/layout-footer.tsx';
import MainEmptyPage from '../pages/main-empty/main-empty-page.tsx';
import { useAppSelector } from '../hooks';
import Loader from './components/loader.tsx';
import { checkAuthAction, getOffersAction } from '../store/api-actions.ts';
import { store } from '../store';
import HistoryRouter from '../history-route/history-route.tsx';
import { browserHistory } from '../browser-history.ts';

store.dispatch(checkAuthAction());
store.dispatch(getOffersAction());

function App() {
  const authorizationStatus = useAppSelector(({ authStatus }) => authStatus);
  const isOffersDataLoading = useAppSelector(({ isOffersLoading }) => isOffersLoading);
  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <Loader/>
    );
  }
  return (
    <HelmetProvider>
      <HistoryRouter history={ browserHistory }>
        <Routes>
          <Route path="/" element={ <Layout authorizationStatus={ authorizationStatus }/> }>
            <Route index element={ <MainPage/> }/>
            <Route
              path={ `${ AppRoute.Offer }/:offerId` }
              element={ <OfferPage/> }
            />
            <Route
              path={ `${ AppRoute.NoOffer }` }
              element={ <MainEmptyPage/> }
            />
            <Route path={ AppRoute.Favorites } element={<LayoutFooter/>}>
              <Route
                index
                element={
                  <PrivateRoute authorizationStatus={ authorizationStatus }>
                    <FavoritesPage/>
                  </PrivateRoute>
                }
              />
            </Route>
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
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
