import { render, screen } from '@testing-library/react';
import OfferList from './offer-list.tsx';
import { makeFakePreviewOffer, makeFakeStore } from '../../../mocks/test-mocks.ts';
import { OfferListClassOptions, OfferListType } from '../../../const.ts';
import { withHistory, withStore } from '../../../mocks/mock-component.tsx';

describe('Component: Offer List', () => {
  it('should render correct', () => {
    const expectedCount = 1;
    const offers = [ makeFakePreviewOffer() ];
    const withHistoryComponent = withHistory(
      <OfferList offers={ offers } classOption={ OfferListClassOptions[ OfferListType.Main ] }/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    render(withStoreComponent);
    const offerList = screen.getByTestId('offer-list');
    const offerItems = screen.getAllByTestId('offer-item');

    expect(offerList).toBeInTheDocument();
    expect(offerItems.length).toBe(expectedCount);
  });
});
