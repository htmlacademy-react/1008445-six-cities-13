import { render, screen } from '@testing-library/react';
import CommentForm from './comment-form.tsx';
import {
  makeFakeOffer,
  makeFakeStore
} from '../../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../../mocks/mock-component.tsx';
import { RequestStatus } from '../../../const.ts';

describe('Component: Comment Form', () => {
  it('should render correct', () => {
    const offer = makeFakeOffer();
    const expectedCount = 5;
    const withHistoryComponent = withHistory(
      <CommentForm
        offerId={ offer.id }
      />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('comment-text')).toBeInTheDocument();
    expect(screen.getByTestId('comment-rating')).toBeInTheDocument();
    const ratingStars = screen.getAllByTestId('comment-rating-star');
    expect(ratingStars.length).toBe(expectedCount);
  });

  it('should input correct comment value with rating 1 and comment < 50', ()=> {
    const offer = makeFakeOffer();
    const rating = 1;
    const withHistoryComponent = withHistory(
      <CommentForm
        offerId={ offer.id }
      />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [],
        favoriteOffers: [],
        offersLoadingStatus: RequestStatus.Idle,
        offerLoadingStatus: RequestStatus.Idle,
        reviewsLoadingStatus: RequestStatus.Idle,
        reviewLoadingStatus: RequestStatus.Idle,
        nearOffersLoadingStatus: RequestStatus.Idle,
        favoriteOffersLoadingStatus: RequestStatus.Idle,
        offer: undefined,
        reviews: [],
        nearOffers: [],
        review: {
          rating,
          comment: 'wordswordswordswordswordswordswords'
        }
      }
    }));

    render(withStoreComponent);
    expect(screen.getByRole('button')).toBeDisabled();
    const ratingStars = screen.getAllByTestId('comment-rating-star');
    const ratingStarElement = ratingStars[ ratingStars.length - rating ];
    expect(ratingStarElement).toBeChecked();
  });

  it('should input correct comment value with rating 5 and comment > 50', ()=> {
    const offer = makeFakeOffer();
    const rating = 5;
    const withHistoryComponent = withHistory(
      <CommentForm
        offerId={ offer.id }
      />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [],
        favoriteOffers: [],
        offersLoadingStatus: RequestStatus.Idle,
        offerLoadingStatus: RequestStatus.Idle,
        reviewsLoadingStatus: RequestStatus.Idle,
        reviewLoadingStatus: RequestStatus.Idle,
        nearOffersLoadingStatus: RequestStatus.Idle,
        favoriteOffersLoadingStatus: RequestStatus.Idle,
        offer: undefined,
        reviews: [],
        nearOffers: [],
        review: {
          rating,
          comment: 'wordswordswordswordswordswordswordswordswordswordswordswordswordswords'
        }
      }
    }));

    render(withStoreComponent);
    expect(screen.getByRole('button')).toBeEnabled();
    const ratingStars = screen.getAllByTestId('comment-rating-star');
    const ratingStarElement = ratingStars[ ratingStars.length - rating ];
    expect(ratingStarElement).toBeChecked();
  });
});
