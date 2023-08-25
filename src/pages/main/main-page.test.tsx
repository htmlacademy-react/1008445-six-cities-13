import { render, screen } from '@testing-library/react';
import { MainPage } from '../pages.ts';
import { makeFakePreviewOffer, makeFakeStore } from '../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../mocks/mock-component.tsx';
import {
  AuthorizationStatus,
  City,
  CityMap,
  RequestStatus
} from '../../const.ts';
import { DEFAULT_REVIEW } from '../../const.ts';
describe('Component: Main Page', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<MainPage/>);
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
        review: DEFAULT_REVIEW
      },
      AUTH: {
        authStatus: AuthorizationStatus.NoAuth,
        loginLoadingStatus: RequestStatus.Idle,
      },
      APPLICATION: {
        city: CityMap[ City.Amsterdam ],
        currentFocusedOffer: undefined,
      }
    }));
    render(withStoreComponent);
    const citiesList = screen.getByTestId('cities-list');
    const sorting = screen.getByTestId('places-sorting');
    const offerList = screen.getByTestId('offer-list');
    const map = screen.getByTestId('map');

    expect(citiesList).toBeInTheDocument();
    expect(sorting).toBeInTheDocument();
    expect(offerList).toBeInTheDocument();
    expect(map).toBeInTheDocument();
  });
});
