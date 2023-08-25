import { render, screen } from '@testing-library/react';
import { FavoritesPage } from '../pages.ts';
import { makeFakePreviewOffer, makeFakeStore } from '../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../mocks/mock-component.tsx';
import { AuthorizationStatus, RequestStatus } from '../../const.ts';
import { DEFAULT_REVIEW } from '../../const.ts';
describe('Component: Favorites Page', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<FavoritesPage/>);
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
        review: DEFAULT_REVIEW
      },
      AUTH: {
        authStatus: AuthorizationStatus.Auth,
        loginLoadingStatus: RequestStatus.Success,
      },
    }));
    render(withStoreComponent);
    const favoritesOffers = screen.getByTestId('favorites-offers');
    const cityName = screen.getByTestId('city-name');
    const previewImage = screen.getByTestId('offer-preview-image');
    const price = screen.getByTestId('offer-price');

    expect(favoritesOffers).toBeInTheDocument();
    expect(cityName).toBeInTheDocument();
    expect(previewImage).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
