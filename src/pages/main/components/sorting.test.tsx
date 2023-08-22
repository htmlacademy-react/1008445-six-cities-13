import { render, screen } from '@testing-library/react';
import Sorting from './sorting.tsx';
import { makeFakeStore } from '../../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../../mocks/mock-component.tsx';
import { SortType } from '../../../const.ts';
import userEvent from '@testing-library/user-event';
describe('Component: Sorting', () => {
  it('should render correct', async() => {
    const expectedCount = 4;
    const setCurrentSorting = vi.fn();
    const withHistoryComponent = withHistory(
      <Sorting
        currentSorting={ SortType.TopRatedFirst }
        setCurrentSorting={ setCurrentSorting }
      />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    const sortOptions = screen.getAllByTestId('sort-option');
    const [ sortOption ] = sortOptions;
    await userEvent.click(sortOption);
    expect(setCurrentSorting).toBeCalled();
    expect(sortOptions.length).toBe(expectedCount);
  });
});
