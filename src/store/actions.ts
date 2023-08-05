import { createAction } from '@reduxjs/toolkit';
import { TCity } from '../types/map.ts';
import { TOffer, TPreviewOffers } from '../types/offer.ts';
import { AppRoute, AuthorizationStatus } from '../const.ts';
import { TReview, TReviews } from '../types/comment.ts';

const setCity = createAction('data/selectCity', (city: TCity) => ({
  payload: city
}));
const addReview = createAction('data/addReview', (review: TReview) => ({
  payload: review
}));
const getOffers = createAction<TPreviewOffers>('data/getOffers');
const getNearOffers = createAction<TPreviewOffers>('data/getNearOffers');
const getOffer = createAction<TOffer>('data/getOffer');
const getReviews = createAction<TReviews>('data/getReviews');
const requireAuth = createAction<AuthorizationStatus>('user/requireAuth');
const setIsLoading = createAction<boolean>('data/setIsLoading');
const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
export {
  setCity,
  getOffers,
  getOffer,
  requireAuth,
  setIsLoading,
  redirectToRoute,
  getReviews,
  getNearOffers,
  addReview
};

