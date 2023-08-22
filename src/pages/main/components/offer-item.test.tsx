import { render, screen } from '@testing-library/react';
import OfferItem from './offer-item.tsx';
import { makeFakeOffer, makeFakePreviewOffer, makeFakeStore } from '../../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../../mocks/mock-component.tsx';
import {
  AppRoute,
  AuthorizationStatus,
  OfferListClassOptions,
  OfferListType,
  RequestStatus
} from '../../../const.ts';
import { createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
describe('Component: Offer Item', () => {
  const mockHistory = createMemoryHistory();
  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });
  it('should render correct', () => {
    const offer = makeFakePreviewOffer();
    const withHistoryComponent = withHistory(
      <OfferItem
        offer={ offer }
        classOptions={ OfferListClassOptions[ OfferListType.Main ] }
      />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    const previewImage = screen.getByTestId('offer-preview-image');
    const name = screen.getByTestId('offer-price');
    const price = screen.getByTestId('offer-rating');
    const type = screen.getByTestId('offer-type');

    expect(previewImage).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('should redirect to offer route when user click "header"', async () => {
    const offer = makeFakeOffer();
    const expectedText = 'Offer page';
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={ AppRoute.Main } element={
          <OfferItem
            offer={ offer }
            classOptions={ OfferListClassOptions[ OfferListType.Main ] }
          />
        }
        />
        <Route path={ `${ AppRoute.Offer }/${ offer.id }` } element={ <span>{ expectedText }</span> }/>
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      AUTH: {
        authStatus: AuthorizationStatus.Auth,
        loginLoadingStatus: RequestStatus.Idle
      },
    }));

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('offer-link'));
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
