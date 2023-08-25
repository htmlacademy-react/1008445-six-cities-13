import { render, screen } from '@testing-library/react';
import ReviewItemList from './review-item-list.tsx';
import { makeFakeReview } from '../../../../mocks/test-mocks.ts';
describe('Component: Review Item List', () => {
  it('should render correct', () => {
    const expectedCount = 1;
    const reviews = [ makeFakeReview() ];
    render(<ReviewItemList reviews={ reviews }/>);
    const reviewItemList = screen.getByTestId('review-item-list');
    const reviewItems = screen.getAllByTestId('review-item');
    expect(reviewItemList).toBeInTheDocument();
    expect(reviewItems.length).toBe(expectedCount);
  });
});
