import { LayoutClassOptions, ListClassOptions } from './types/layout.ts';
import { Icon } from 'leaflet';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/page-not-found'
}
enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
enum OfferListType {
  Main = 'main',
  Near = 'near',
  Favorites = 'favorites',
}

enum MapType {
  Main = 'main',
  Offer = 'offer',
}
const ListClassOptions: ListClassOptions = {
  [ OfferListType.Main ]: {
    placeListClass: 'cities__places-list places__list tabs__content',
    placeCardClass: 'cities__card',
    placeCardImageWrapperClass: 'cities__image-wrapper',
    imageWith: 260,
    imageHeight: 200,
    placeCardInfoClass: '',
    placeCardBookmarkButtonClass: ''
  },
  [ OfferListType.Favorites ]: {
    placeListClass: 'favorites__places',
    placeCardClass: 'favorites__card',
    placeCardImageWrapperClass: 'favorites__image-wrapper',
    imageWith: 150,
    imageHeight: 110,
    placeCardInfoClass: 'favorites__card-info',
    placeCardBookmarkButtonClass: 'place-card__bookmark-button--active'
  },
  [ OfferListType.Near ]: {
    placeListClass: 'near-places__list places__list',
    placeCardClass: 'near-places__card place-card',
    placeCardImageWrapperClass: 'near-places__image-wrapper',
    imageWith: 260,
    imageHeight: 200,
    placeCardInfoClass: '',
    placeCardBookmarkButtonClass: 'place-card__bookmark-button--active'
  },
};
const LayoutClassOptions: LayoutClassOptions = {
  [ AppRoute.Main ] : {
    pageClass: 'page--gray page--main',
    mainClass: 'page__main--index',
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

const RatingStarScores = [
  { score: 5, title: 'perfect' },
  { score: 4, title: 'good'},
  { score: 3, title: 'not bad' },
  { score: 2, title: 'badly' },
  { score: 1, title: 'terrible' }
];

const defaultCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const MapClassOptions = {
  [ MapType.Main ]: 'map-main',
  [ MapType.Offer ]: 'map-offer'
};

export {
  AppRoute,
  OfferListType,
  AuthorizationStatus,
  MapType,
  ListClassOptions,
  LayoutClassOptions,
  MapClassOptions,
  RatingStarScores,
  defaultCustomIcon,
  currentCustomIcon
};
