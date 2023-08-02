import MainPage from '../pages/main/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const.ts';
import LoginPage from '../pages/login/login-page.tsx';
import FavoritesPage from '../pages/favorites/favorites-page.tsx';
import OfferPage from '../pages/offer/offer-page.tsx';
import NotFoundPage from '../pages/404/not-found-page.tsx';
import PrivateRoute from './components/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { TOffer, TPreviewOffer } from '../types/offer.ts';
import Layout from './components/layout.tsx';
import LayoutFooter from './components/layout-footer.tsx';
import { TReview } from '../types/comment.ts';
import MainEmptyPage from '../pages/main-empty/main-empty-page.tsx';
import { useAppSelector } from '../hooks';
import Loader from './components/loader.tsx';

type AppProps = {
  offers: TPreviewOffer[];
  fullOffers: TOffer[];
  reviews: TReview[];
}
function App({ offers, fullOffers, reviews } : AppProps) {
  const authorizationStatus = useAppSelector(({ authStatus }) => authStatus);
  const isOffersDataLoading = useAppSelector(({ isOffersLoading }) => isOffersLoading);
  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <Loader isLoading/>
    );
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Layout/> }>
            <Route index element={ <MainPage/> }/>
            <Route
              path={ `${ AppRoute.Offer }/:offerId` }
              element={ <OfferPage offers={ fullOffers } reviews={ reviews }/> }
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
                    <FavoritesPage offers={ offers }/>
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
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
