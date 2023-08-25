import { render, screen } from '@testing-library/react';
import OfferInfo from './offer-info.tsx';
import { makeFakeOffer, makeFakeStore } from '../../../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../../../mocks/mock-component.tsx';
describe('Component: Offer Info', () => {
  it('should render correct', () => {
    const offer = makeFakeOffer();
    const withHistoryComponent = withHistory(<OfferInfo offer={ offer }/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    const rating = screen.getByTestId('offer-rating');
    const header = screen.getByTestId('host-header');
    const description = screen.getByTestId('offer-description');
    expect(screen.getByText(/inside/i)).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
