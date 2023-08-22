import { render, screen } from '@testing-library/react';
import OfferItem from '../../main/components/offer-item.tsx';
import { makeFakePreviewOffer, makeFakeStore } from '../../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../../mocks/mock-component.tsx';
import { AppRoute, AuthorizationStatus, OfferListClassOptions, OfferListType, RequestStatus } from '../../../const.ts';
import { createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import FavoriteList from './favorite-list.tsx';
describe('Component: Favorites List', () => {
  const mockHistory = createMemoryHistory();
  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });
  it('should render correct', () => {
    const offers = [ makeFakePreviewOffer() ];
    const withHistoryComponent = withHistory(<FavoriteList offers={ offers }/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    const cityName = screen.getByTestId('city-name');
    const previewImage = screen.getByTestId('offer-preview-image');
    const price = screen.getByTestId('offer-price');

    expect(cityName).toBeInTheDocument();
    expect(previewImage).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it('should redirect to offer route when user click "header"', async () => {
    const expectedText = 'Great location';
    const offer = makeFakePreviewOffer();
    const mockOfferComponent = <span>{ expectedText }</span>;
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={ AppRoute.Main } element={
          <OfferItem
            offer={ offer }
            classOptions={ OfferListClassOptions[ OfferListType.Main ] }
          />
        }
        />
        <Route path={ `${ AppRoute.Offer }/${ offer.id }` } element={ mockOfferComponent }/>
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      AUTH: {
        authStatus: AuthorizationStatus.NoAuth,
        loginLoadingStatus: RequestStatus.Idle
      }
    }));

    render(withStoreComponent);
    const button = screen.getByTestId('offer-link');
    await userEvent.click(button);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
