import { render, screen } from '@testing-library/react';
import Reviews from './reviews.tsx';
import { makeFakeOffer, makeFakeStore } from '../../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../../mocks/mock-component.tsx';
import { AppRoute, DEFAULT_REVIEW, RequestStatus } from '../../../const.ts';
import { createMemoryHistory } from 'history';

describe('Component: Review Item', () => {
  const mockHistory = createMemoryHistory();
  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });
  it('should render correct', () => {
    const offer = makeFakeOffer();
    const withHistoryComponent = withHistory(
      <Reviews
        offerId={ offer.id }
      />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [],
        favoriteOffers: [],
        offersLoadingStatus: RequestStatus.Idle,
        offerLoadingStatus: RequestStatus.Idle,
        reviewsLoadingStatus: RequestStatus.Success,
        reviewLoadingStatus: RequestStatus.Idle,
        nearOffersLoadingStatus: RequestStatus.Idle,
        favoriteOffersLoadingStatus: RequestStatus.Idle,
        offer: undefined,
        reviews: [],
        nearOffers: [],
        review: DEFAULT_REVIEW
      }
    }));

    render(withStoreComponent);
    const reviews = screen.getByTestId('reviews');
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(reviews).toBeInTheDocument();
  });
});
