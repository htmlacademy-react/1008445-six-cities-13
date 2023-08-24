import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../../mocks/mock-component.tsx';
import RatingStarList from './rating-star-list.tsx';

describe('Component: Rating Star List', () => {
  it('should render correct', () => {
    const expectedCount = 5;
    const withHistoryComponent = withHistory(
      <RatingStarList isPending={ false }/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    const ratingStars = screen.getAllByTestId('comment-rating-star');
    expect(ratingStars.length).toBe(expectedCount);
  });
});
