import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, City, CityMap, RequestStatus } from '../const.ts';
import App from './app.tsx';
import { withHistory, withStore } from '../mocks/mock-component.tsx';
import { makeFakePreviewOffer, makeFakeStore } from '../mocks/test-mocks.ts';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main Page" when user navigate to "/" and set city Amsterdam', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [ makeFakePreviewOffer() ],
        favoriteOffers: [],
        offersLoadingStatus: RequestStatus.Success,
        offerLoadingStatus: RequestStatus.Idle,
        reviewsLoadingStatus: RequestStatus.Idle,
        reviewLoadingStatus: RequestStatus.Idle,
        nearOffersLoadingStatus: RequestStatus.Idle,
        favoriteOffersLoadingStatus: RequestStatus.Idle,
        offer: undefined,
        reviews: [],
        nearOffers: [],
      },
      APPLICATION: {
        city: CityMap[ City.Amsterdam ],
        currentFocusedOffer: undefined
      },
    }));
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/places to stay in /i)).toBeInTheDocument();
  });

  it('should render "Main Empty Page" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/We could not find any property available at the moment in /i)).toBeInTheDocument();
  });

  it('should render "Login Page" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      AUTH: {
        authStatus: AuthorizationStatus.NoAuth,
        loginLoadingStatus: RequestStatus.Idle
      }
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "Favorites Page" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [],
        favoriteOffers: [ makeFakePreviewOffer() ],
        offersLoadingStatus: RequestStatus.Idle,
        offerLoadingStatus: RequestStatus.Idle,
        reviewsLoadingStatus: RequestStatus.Idle,
        reviewLoadingStatus: RequestStatus.Idle,
        nearOffersLoadingStatus: RequestStatus.Idle,
        favoriteOffersLoadingStatus: RequestStatus.Success,
        offer: undefined,
        reviews: [],
        nearOffers: [],
      }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "Favorites Empty Page" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [],
        favoriteOffers: [],
        offersLoadingStatus: RequestStatus.Idle,
        offerLoadingStatus: RequestStatus.Idle,
        reviewsLoadingStatus: RequestStatus.Idle,
        reviewLoadingStatus: RequestStatus.Idle,
        nearOffersLoadingStatus: RequestStatus.Idle,
        favoriteOffersLoadingStatus: RequestStatus.Success,
        offer: undefined,
        reviews: [],
        nearOffers: [],
      }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);
    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render "Not Found Page" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('Return to main page')).toBeInTheDocument();
    expect(screen.getByText('Sorry ;( page not found')).toBeInTheDocument();
  });
});
