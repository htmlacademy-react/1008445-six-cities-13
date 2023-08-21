import { render, screen } from '@testing-library/react';
import CitiesList from './cities-list.tsx';
import { makeFakeOffer, makeFakeStore } from '../../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../../mocks/mock-component.tsx';

describe('Component: Cities List', () => {
  it('should render correct', () => {
    const expectedCount = 6;
    const citiesListTestId = 'cities-list';
    const citiesItemTestId = 'cities-list-item';
    const { city } = makeFakeOffer();
    const withHistoryComponent = withHistory(<CitiesList currentCityName={ city.name }/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    const citiesItemList = screen.getByTestId(citiesListTestId);
    const citiesItems = screen.getAllByTestId(citiesItemTestId);

    expect(citiesItemList).toBeInTheDocument();
    expect(citiesItems.length).toBe(expectedCount);
  });
});
