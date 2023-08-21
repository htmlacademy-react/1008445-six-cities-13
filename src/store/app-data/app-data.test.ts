import { describe } from 'vitest';
import { FavoriteOfferUpdateType, RequestStatus } from '../../const.ts';
import { appData } from './app-data.ts';
import {
  addReviewAction,
  getFavoriteOffersAction,
  getNearOffersAction,
  getOfferAction,
  getOffersAction,
  getReviewsAction,
  setOfferFavoriteAction
} from '../api-actions.ts';
import { makeFakeOffer, makeFakePreviewOffer, makeFakeReview, makeFakeSendReview } from '../../mocks/test-mocks.ts';

describe('AppData Slice', () => {
  it('should return initial state with empty action ', () => {
    const emptyAction = { type: '' };
    const expectedState = {
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
    };

    const result = appData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
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
    };

    const result = appData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set offersLoadingStatus to "Pending", with getOffersAction.pending', () => {
    const initialState = {
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
    };
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Pending,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };
    const result = appData.reducer(initialState, getOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set offers to array with offer, offersLoadingStatus to "Success" with getOffersAction.fulfilled', () => {
    const mockOffer = makeFakePreviewOffer();
    const expectedState = {
      offers: [ mockOffer ],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Success,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(
      undefined,
      getOffersAction.fulfilled([ mockOffer ], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set offersLoadingStatus to "Error" with getOffersAction.rejected', () => {
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Error,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(undefined, getOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set offerLoadingStatus to "Pending", with getOfferAction.pending', () => {
    const initialState = {
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
    };
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Pending,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };
    const result = appData.reducer(initialState, getOfferAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set offer with offer, offerLoadingStatus to "Success" with getOfferAction.fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Success,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: mockOffer,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(
      undefined,
      getOfferAction.fulfilled(mockOffer, '', { offerId: mockOffer.id })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set offerLoadingStatus to "Error" with getOfferAction.rejected', () => {
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Error,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(undefined, getOfferAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set reviewsLoadingStatus to "Pending", with getReviewsAction.pending', () => {
    const initialState = {
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
    };
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Pending,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };
    const result = appData.reducer(initialState, getReviewsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set reviews to array with review, reviewsLoadingStatus to "Success" with getReviewsAction.fulfilled', () => {
    const mockReview = makeFakeReview();
    const mockOffer = makeFakePreviewOffer();
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Success,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [ mockReview ],
      nearOffers: [],
    };

    const result = appData.reducer(
      undefined,
      getReviewsAction.fulfilled([ mockReview ], '', { offerId: mockOffer.id })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set reviewsLoadingStatus to "Error" with getOfferAction.rejected', () => {
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Error,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(undefined, getReviewsAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set nearOffersLoadingStatus to "Pending", with getNearOffersAction.pending', () => {
    const initialState = {
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
    };
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Pending,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };
    const result = appData.reducer(initialState, getNearOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set nearOffers to array with offer, nearOffersLoadingStatus to "Success" with getNearOffersAction.fulfilled', () => {
    const mockOffer = makeFakePreviewOffer();
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Success,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [ mockOffer ],
    };

    const result = appData.reducer(
      undefined,
      getNearOffersAction.fulfilled([ mockOffer ], '', { offerId: mockOffer.id })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set nearOffersLoadingStatus to "Error" with getNearOffersAction.rejected', () => {
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Error,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(undefined, getNearOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set favoriteOffersLoadingStatus to "Pending", with getFavoriteOffersAction.pending', () => {
    const initialState = {
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
    };
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Pending,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };
    const result = appData.reducer(initialState, getFavoriteOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set favoriteOffers to array with offer, favoriteOffersLoadingStatus to "Success" with getFavoriteOffersAction.fulfilled', () => {
    const mockOffer = makeFakePreviewOffer();
    const expectedState = {
      offers: [],
      favoriteOffers: [ mockOffer ],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Success,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(
      undefined,
      getFavoriteOffersAction.fulfilled([ mockOffer ], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set favoriteOffersLoadingStatus to "Error" with getFavoriteOffersAction.rejected', () => {
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Error,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(undefined, getFavoriteOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set reviewsLoadingStatus to "Pending", with addReviewAction.pending', () => {
    const initialState = {
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
    };
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Pending,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };
    const result = appData.reducer(initialState, addReviewAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set reviews to array with review, reviewsLoadingStatus to "Success" with addReviewAction.fulfilled', () => {
    const mockReview = makeFakeReview();
    const mockSendReview = makeFakeSendReview();
    const mockOffer = makeFakePreviewOffer();
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Success,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [ mockReview ],
      nearOffers: [],
    };

    const result = appData.reducer(
      undefined,
      addReviewAction.fulfilled(mockReview, '', { ...mockSendReview, offerId: mockOffer.id })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set reviewsLoadingStatus to "Error" with addReviewAction.rejected', () => {
    const expectedState = {
      offers: [],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Error,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(undefined, addReviewAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set offer with isFavorite = true, with setOfferFavoriteAction.fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const favoriteMockOffer = { ...mockOffer, isFavorite: true };
    const expectedState = {
      offers: [],
      favoriteOffers: [ favoriteMockOffer ],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: favoriteMockOffer,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(
      undefined,
      setOfferFavoriteAction.fulfilled({
        offer: favoriteMockOffer,
        favoriteOfferType: FavoriteOfferUpdateType.Offer
      }, '', {
        offerId: mockOffer.id,
        favoriteStatus: 1,
        favoriteOfferType: FavoriteOfferUpdateType.Offer
      })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set offer with isFavorite = false to "offer" and remove from "favorites offers", with setOfferFavoriteAction.fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const favoriteMockOffer = { ...mockOffer, isFavorite: true };
    const initialState = {
      offers: [ favoriteMockOffer ],
      favoriteOffers: [ mockOffer ],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: favoriteMockOffer,
      reviews: [],
      nearOffers: [],
    };
    const expectedState = {
      offers: [ mockOffer ],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: mockOffer,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(
      initialState,
      setOfferFavoriteAction.fulfilled({
        offer: mockOffer,
        favoriteOfferType: FavoriteOfferUpdateType.Offer
      }, '', {
        offerId: mockOffer.id,
        favoriteStatus: 0,
        favoriteOfferType: FavoriteOfferUpdateType.Offer
      })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set offer with isFavorite = false to "offers offer" and remove from "favorites offers", with setOfferFavoriteAction.fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const favoriteMockOffer = { ...mockOffer, isFavorite: true };
    const initialState = {
      offers: [ favoriteMockOffer ],
      favoriteOffers: [ mockOffer ],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };
    const expectedState = {
      offers: [ mockOffer ],
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
    };

    const result = appData.reducer(
      initialState,
      setOfferFavoriteAction.fulfilled({
        offer: mockOffer,
        favoriteOfferType: undefined
      }, '', {
        offerId: mockOffer.id,
        favoriteStatus: 0,
        favoriteOfferType: undefined
      })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set offer with isFavorite = false to "near offers" and "offers", remove from "favorites offers", with setOfferFavoriteAction.fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const favoriteMockOffer = { ...mockOffer, isFavorite: true };
    const initialState = {
      offers: [ favoriteMockOffer ],
      favoriteOffers: [ favoriteMockOffer ],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [ favoriteMockOffer ],
    };
    const expectedState = {
      offers: [ mockOffer ],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [ mockOffer ],
    };

    const result = appData.reducer(
      initialState,
      setOfferFavoriteAction.fulfilled({
        offer: mockOffer,
        favoriteOfferType: FavoriteOfferUpdateType.NearList
      }, '', {
        offerId: mockOffer.id,
        favoriteStatus: 0,
        favoriteOfferType: FavoriteOfferUpdateType.NearList
      })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set offer with isFavorite = true to "offer" and add to "favorites offers", with setOfferFavoriteAction.fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const favoriteMockOffer = { ...mockOffer, isFavorite: true };
    const initialState = {
      offers: [ mockOffer ],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: mockOffer,
      reviews: [],
      nearOffers: [],
    };
    const expectedState = {
      offers: [ favoriteMockOffer ],
      favoriteOffers: [ favoriteMockOffer ],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: favoriteMockOffer,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(
      initialState,
      setOfferFavoriteAction.fulfilled({
        offer: favoriteMockOffer,
        favoriteOfferType: FavoriteOfferUpdateType.Offer
      }, '', {
        offerId: mockOffer.id,
        favoriteStatus: 0,
        favoriteOfferType: FavoriteOfferUpdateType.Offer
      })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set offer with isFavorite = true to "offers offer" and add to "favorites offers", with setOfferFavoriteAction.fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const favoriteMockOffer = { ...mockOffer, isFavorite: true };
    const initialState = {
      offers: [ mockOffer ],
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
    };
    const expectedState = {
      offers: [ favoriteMockOffer ],
      favoriteOffers: [ favoriteMockOffer ],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [],
    };

    const result = appData.reducer(
      initialState,
      setOfferFavoriteAction.fulfilled({
        offer: favoriteMockOffer,
        favoriteOfferType: undefined
      }, '', {
        offerId: mockOffer.id,
        favoriteStatus: 0,
        favoriteOfferType: undefined
      })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set offer with isFavorite = true to "near offers" and "offers", add to "favorites offers", with setOfferFavoriteAction.fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const favoriteMockOffer = { ...mockOffer, isFavorite: true };
    const initialState = {
      offers: [ mockOffer ],
      favoriteOffers: [],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [ mockOffer ],
    };
    const expectedState = {
      offers: [ favoriteMockOffer ],
      favoriteOffers: [ favoriteMockOffer ],
      offersLoadingStatus: RequestStatus.Idle,
      offerLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Idle,
      offer: undefined,
      reviews: [],
      nearOffers: [ favoriteMockOffer ],
    };

    const result = appData.reducer(
      initialState,
      setOfferFavoriteAction.fulfilled({
        offer: favoriteMockOffer,
        favoriteOfferType: FavoriteOfferUpdateType.NearList
      }, '', {
        offerId: mockOffer.id,
        favoriteStatus: 0,
        favoriteOfferType: FavoriteOfferUpdateType.NearList
      })
    );

    expect(result).toEqual(expectedState);
  });
});

