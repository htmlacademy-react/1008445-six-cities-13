import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item.tsx';
import { makeFakeReview } from '../../../../mocks/test-mocks.ts';
describe('Component: Review Item', () => {
  it('should render correct', () => {
    render(<ReviewItem review={ makeFakeReview() }/>);
    const reviewItem = screen.getByTestId('review-item');
    const userName = screen.getByTestId('user-name');
    const comment = screen.getByTestId('comment');
    const rating = screen.getByTestId('review-rating');
    expect(reviewItem).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(comment).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  });
});
