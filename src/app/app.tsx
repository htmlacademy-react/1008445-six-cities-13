import Main from '../pages/main/main.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, PLACES_COUNT } from '../const.ts';
import Login from '../pages/login/login.tsx';
import Favorites from '../pages/favorites/favorites.tsx';
import Offer from '../pages/offer/offer.tsx';
import NotFoundPage from '../pages/404/not-found.tsx';
import PrivateRoute from '../common-components/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Main placesCount = { PLACES_COUNT }/> }/>
          <Route
            path={ AppRoute.Offer }
            element={ <Offer/> }
          />
          <Route
            path={ AppRoute.Favorites }
            element={
              <PrivateRoute authorizationStatus={ AuthorizationStatus.NoAuth }>
                <Favorites/>
              </PrivateRoute>
            }
          />
          <Route
            path={ AppRoute.Login }
            element={ <Login/> }
          />
          <Route
            path="*"
            element={ <NotFoundPage/> }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
