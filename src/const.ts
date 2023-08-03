import { TLayoutClassOptions, TOfferListClassOptions } from './types/layout.ts';
import { Icon } from 'leaflet';
import { TPreviewOffer } from './types/offer.ts';
import { TCity } from './types/map.ts';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/page-not-found',
  NoOffer = '/no-offer'
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
enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout'
}
enum MapType {
  Main = 'main',
  Offer = 'offer',
}
enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}
enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

const CityMap: Record<City, TCity> = {
  [ City.Paris ]: {
    name: City.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12
    }
  },
  [ City.Cologne ]: {
    name: City.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 12
    }
  },
  [ City.Brussels ]: {
    name: City.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 12
    }
  },
  [ City.Amsterdam ]: {
    name: City.Amsterdam,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 12
    }
  },
  [ City.Hamburg ]: {
    name: City.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 12
    }
  },
  [ City.Dusseldorf ]: {
    name: City.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 12
    }
  },
};
const OfferListClassOptions: TOfferListClassOptions = {
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
const LayoutClassOptions: TLayoutClassOptions = {
  [ AppRoute.Main ] : {
    pageClass: 'page--gray page--main',
    mainClass: 'page__main--index',
    isNavVisible: true
  },
  [ AppRoute.Offer ]: {
    pageClass: '',
    mainClass: 'page__main--offer',
    isNavVisible: true
  },
  [ AppRoute.NoOffer ]: {
    pageClass: 'page--gray page--main',
    mainClass: 'page__main--index page__main--index-empty',
    isNavVisible: true
  },
  [ AppRoute.Login ]: {
    pageClass: 'page--gray page--login',
    mainClass: 'page__main--login',
    isNavVisible: false
  },
  [ AppRoute.Favorites ]: {
    pageClass: '',
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
const ICON_SIZE: [ number, number ] = [ 40, 40 ];
const defaultCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: ICON_SIZE,
  iconAnchor: ICON_SIZE
});
const currentCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: ICON_SIZE,
  iconAnchor: ICON_SIZE
});
const MapClassOptions = {
  [ MapType.Main ]: 'map__main',
  [ MapType.Offer ]: 'map__offer'
};
const sortByHighToLow = (a: TPreviewOffer, b: TPreviewOffer) => b.price - a.price;
const sortByLowToHigh = (a: TPreviewOffer, b: TPreviewOffer) => a.price - b.price;
const sortByTopRated = (a: TPreviewOffer, b: TPreviewOffer) => b.rating - a.rating;

const SortOptions = {
  [ SortType.Popular ]: (offers: TPreviewOffer[]) => offers.slice(),
  [ SortType.HighToLow ]: (offers: TPreviewOffer[]) => offers.slice().sort(sortByHighToLow),
  [ SortType.LowToHigh ]: (offers: TPreviewOffer[]) => offers.slice().sort(sortByLowToHigh),
  [ SortType.TopRatedFirst ]: (offers: TPreviewOffer[]) => offers.slice().sort(sortByTopRated),
};

export {
  AppRoute,
  OfferListType,
  AuthorizationStatus,
  MapType,
  SortType,
  City,
  APIRoute,
  CityMap,
  SortOptions,
  OfferListClassOptions,
  LayoutClassOptions,
  MapClassOptions,
  RatingStarScores,
  defaultCustomIcon,
  currentCustomIcon
};
