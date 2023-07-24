import { LayoutClassOptions } from './types/layout.ts';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  AnyOffer = '/offer/',
  NotFound = '/page-not-found'
}
enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const favoritesOfferItemClassOptions = {
  placeListClass: 'favorites__places',
  placeCardClass: 'favorites__card',
  placeCardImageWrapperClass: 'favorites__image-wrapper',
  imageWith: 150,
  imageHeight: 110,
  placeCardInfoClass: 'favorites__card-info',
  placeCardBookmarkButtonClass: 'place-card__bookmark-button--active'
};

const mainOfferItemClassOptions = {
  placeListClass: 'cities__places-list places__list tabs__content',
  placeCardClass: 'cities__card',
  placeCardImageWrapperClass: 'cities__image-wrapper',
  imageWith: 260,
  imageHeight: 200,
  placeCardInfoClass: '',
  placeCardBookmarkButtonClass: ''
};

const nearOfferItemClassOptions = {
  placeListClass: 'near-places__list places__list',
  placeCardClass: 'near-places__card place-card',
  placeCardImageWrapperClass: 'near-places__image-wrapper',
  imageWith: 260,
  imageHeight: 200,
  placeCardInfoClass: '',
  placeCardBookmarkButtonClass: 'place-card__bookmark-button--active'
};

const LayoutClassOptions: LayoutClassOptions = {
  [ AppRoute.Main ] : {
    pageClass: 'page--gray page--main',
    mainClass: 'page__main--index',
    isNavVisible: true
  },
  [ AppRoute.AnyOffer ]: {
    pageClass: 'page',
    mainClass: 'page__main--offer',
    isNavVisible: true
  },
  [ AppRoute.Offer ]: {
    pageClass: 'page',
    mainClass: 'page__main--offer',
    isNavVisible: true
  },
  [ AppRoute.Login ]: {
    pageClass: 'page--gray page--login',
    mainClass: 'page__main--login',
    isNavVisible: false
  },
  [ AppRoute.Favorites ]: {
    pageClass: 'page',
    mainClass: 'page__main--favorites',
    isNavVisible: true
  },
  [ AppRoute.NotFound ]: {
    pageClass: 'page--gray page--login',
    mainClass: 'page__main--login',
    isNavVisible: false
  }
};

const RatingStarValues = [
  {
    value: 5,
    title: 'perfect'
  },
  {
    value: 4,
    title: 'good'
  },
  {
    value: 3,
    title: 'not bad'
  },
  {
    value: 2,
    title: 'badly'
  },
  {
    value: 1,
    title: 'terrible'
  }
];

export {
  AppRoute,
  AuthorizationStatus,
  favoritesOfferItemClassOptions,
  mainOfferItemClassOptions,
  nearOfferItemClassOptions,
  LayoutClassOptions,
  RatingStarValues
};
