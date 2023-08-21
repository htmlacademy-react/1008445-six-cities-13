import { TOffer, TPreviewOffer } from '../types/offer.ts';
import { TReview, TReviewData } from '../types/comment.ts';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { TState } from '../types/state.ts';
import { createAPI } from '../services/api.ts';
import { Action } from 'redux';
import { TUserData } from '../types/user-data.ts';
import { AuthorizationStatus, City, CityMap, RequestStatus } from '../const.ts';

export const makeFakePreviewOffer = (): TPreviewOffer => ({
  id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }},
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  isFavorite: true,
  isPremium: false,
  rating: 4,
  previewImage: 'https://url-to-image/image.png'
});
export const makeFakeOffer = (): TOffer => ({
  id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  isFavorite: false,
  isPremium: false,
  rating: 4,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  bedrooms: 3,
  goods: [
    'Heating',
    'Hot water'
  ],
  host: {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false
  },
  images: [
    'https://url-to-image/image.png'
  ],
  maxAdults: 4,
  previewImage: 'https://url-to-image/image.png'
});
export const makeFakeReview = (): TReview => ({
  id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
  date: '2019-05-08T14:13:56.569Z',
  user: {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false
  },
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  rating: 4
});

export const makeFakeSendReview = (): TReviewData => ({
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  rating: 4
});

export type AppThunkDispatch = ThunkDispatch<TState, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
export const makeFakeServerReplay = (): TUserData => ({
  name: 'user',
  email: 'test@test.ru',
  token: 'secret',
  isPro: true,
  avatarUrl: 'avatar-url',
});

export const makeFakeStore = (initialState?: Partial<TState>): TState => ({
  AUTH: {
    authStatus: AuthorizationStatus.Auth,
    loginLoadingStatus: RequestStatus.Idle
  },
  DATA: {
    offers: [ makeFakePreviewOffer() ],
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
  },
  APPLICATION: {
    city: CityMap[ City.Paris ],
    currentFocusedOffer: undefined
  },
  ...initialState ?? {},
});
