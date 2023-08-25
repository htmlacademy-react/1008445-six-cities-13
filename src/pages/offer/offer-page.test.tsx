import { render, screen } from '@testing-library/react';
import { OfferPage } from '../pages.ts';
import { makeFakeOffer, makeFakePreviewOffer, makeFakeStore } from '../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../mocks/mock-component.tsx';
import {
  AuthorizationStatus, City, CityMap,
  RequestStatus
} from '../../const.ts';
import { DEFAULT_REVIEW } from '../../const.ts';
const OFFER_TEST_ID = '12345';
vi.mock('react-router-dom', async () => {
  const axios = await vi.importActual('react-router-dom') ;
  return {
    ...axios as NonNullable<unknown>,
    useParams: () => ({ offerId: OFFER_TEST_ID })
  };
});
describe('Component: Offer Page', () => {
  const offer = makeFakeOffer();

  it('should render correct', () => {
    const withHistoryComponent = withHistory(<OfferPage/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [],
        favoriteOffers: [],
        offersLoadingStatus: RequestStatus.Idle,
        offerLoadingStatus: RequestStatus.Success,
        reviewsLoadingStatus: RequestStatus.Success,
        reviewLoadingStatus: RequestStatus.Idle,
        nearOffersLoadingStatus: RequestStatus.Success,
        favoriteOffersLoadingStatus: RequestStatus.Idle,
        offer,
        reviews: [],
        nearOffers: [ makeFakePreviewOffer() ],
        review: DEFAULT_REVIEW
      },
      AUTH: {
        authStatus: AuthorizationStatus.NoAuth,
        loginLoadingStatus: RequestStatus.Idle,
      },
      APPLICATION: {
        city: CityMap[ City.Amsterdam ],
        currentFocusedOffer: offer,
      }
    }));
    render(withStoreComponent);
    const imageList = screen.getByTestId('image-item-list');
    const offerInfo = screen.getByTestId('offer-info');
    const nearOffers = screen.getByTestId('near-offers');
    const map = screen.getByTestId('map');

    expect(imageList).toBeInTheDocument();
    expect(offerInfo).toBeInTheDocument();
    expect(nearOffers).toBeInTheDocument();
    expect(map).toBeInTheDocument();
  });
});
