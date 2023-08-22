import { render, screen } from '@testing-library/react';
import NearOffers from './near-offers.tsx';
import { makeFakePreviewOffer, makeFakeStore } from '../../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../../mocks/mock-component.tsx';
import { DEFAULT_REVIEW, RequestStatus } from '../../../const.ts';
describe('Component: Near Offers List', () => {
  it('should render correct', () => {
    const offer = makeFakePreviewOffer();
    const withHistoryComponent = withHistory(<NearOffers offerId={ offer.id }/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [],
        favoriteOffers: [],
        offersLoadingStatus: RequestStatus.Idle,
        offerLoadingStatus: RequestStatus.Idle,
        reviewsLoadingStatus: RequestStatus.Idle,
        reviewLoadingStatus: RequestStatus.Idle,
        nearOffersLoadingStatus: RequestStatus.Success,
        favoriteOffersLoadingStatus: RequestStatus.Idle,
        offer: undefined,
        reviews: [],
        nearOffers: [ offer ],
        review: DEFAULT_REVIEW
      }
    }));

    render(withStoreComponent);

    const previewImage = screen.getByTestId('offer-preview-image');
    const price = screen.getByTestId('offer-price');
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(previewImage).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
