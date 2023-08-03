import { createAction } from '@reduxjs/toolkit';
import { TCity } from '../types/map.ts';
import { TPreviewOffers } from '../types/offer.ts';
import { AuthorizationStatus } from '../const.ts';

const selectCity = createAction('data/selectCity', (city: TCity) => ({
  payload: city
}));
const getOffers = createAction<TPreviewOffers>('data/getOffers');
const requireAuth = createAction<AuthorizationStatus>('user/requireAuth');
const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');

export {
  selectCity,
  getOffers,
  requireAuth,
  setOffersLoadingStatus
};

