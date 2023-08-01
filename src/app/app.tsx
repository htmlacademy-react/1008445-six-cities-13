import MainPage from '../pages/main/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const.ts';
import LoginPage from '../pages/login/login-page.tsx';
import FavoritesPage from '../pages/favorites/favorites-page.tsx';
import OfferPage from '../pages/offer/offer-page.tsx';
import NotFoundPage from '../pages/404/not-found-page.tsx';
import PrivateRoute from './components/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { TPreviewOffer, TOffer } from '../types/offer.ts';
import Layout from './components/layout.tsx';
import LayoutFooter from './components/layout-footer.tsx';
import { TReview } from '../types/comment.ts';
type AppProps = {
  offers: TPreviewOffer[];
  fullOffers: TOffer[];
  reviews: TReview[];
}
function App({ offers, fullOffers, reviews } : AppProps) {
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
            <Route path={ AppRoute.Favorites } element={<LayoutFooter/>}>
              <Route
                index
                element={
                  <PrivateRoute authorizationStatus={ AuthorizationStatus.Auth }>
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
