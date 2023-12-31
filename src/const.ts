import { TLayoutClassOptions} from './types/layout.ts';
import { TOfferListClassOptions } from './types/offer.ts';
import { Icon } from 'leaflet';
import { TPreviewOffer } from './types/offer.ts';
import { TCity } from './types/map.ts';
import { TReviewData } from './types/comment.ts';
import { sortByHighToLow, sortByTopRated, sortByLowToHigh } from './utils.ts';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/page-not-found',
  NoOffers = '/no-offers',
  NoFavorites = '/no-favorites'
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
enum FavoriteOfferUpdateType {
  NearList = 'near-list',
  Offer = 'offer',
  MainList = 'main-list',
  FavoritesList = 'favorites-list',
}
enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  Favorites = '/favorite',
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

const OfferType: { [ key: string ]: string} = {
  'apartment': 'Apartment',
  'house': 'House',
  'room': 'Room',
  'hotel': 'Hotel'
};

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
  },
  [ OfferListType.Favorites ]: {
    placeListClass: 'favorites__places',
    placeCardClass: 'favorites__card',
    placeCardImageWrapperClass: 'favorites__image-wrapper',
    imageWith: 150,
    imageHeight: 110,
    placeCardInfoClass: 'favorites__card-info',
  },
  [ OfferListType.Near ]: {
    placeListClass: 'near-places__list places__list',
    placeCardClass: 'near-places__card place-card',
    placeCardImageWrapperClass: 'near-places__image-wrapper',
    imageWith: 260,
    imageHeight: 200,
    placeCardInfoClass: '',
  },
};
const LayoutClassOptions: TLayoutClassOptions = {
  [ AppRoute.Main ] : {
    pageClass: 'page--gray page--main',
    mainClass: 'page__main--index',
    isNavVisible: true,
    isFooterVisible: false,
  },
  [ AppRoute.Offer ]: {
    pageClass: '',
    mainClass: 'page__main--offer',
    isNavVisible: true,
    isFooterVisible: false,
  },
  [ AppRoute.NoOffers ]: {
    pageClass: 'page--gray page--main',
    mainClass: 'page__main--index page__main--index-empty',
    isNavVisible: true,
    isFooterVisible: false,
  },
  [ AppRoute.Login ]: {
    pageClass: 'page--gray page--login',
    mainClass: 'page__main--login',
    isNavVisible: false,
    isFooterVisible: false,
  },
  [ AppRoute.Favorites ]: {
    pageClass: '',
    mainClass: 'page__main--favorites',
    isNavVisible: true,
    isFooterVisible: true,
  },
  [ AppRoute.NoFavorites ]: {
    pageClass: 'page--favorites-empty',
    mainClass: 'page__main--favorites page__main--favorites-empty',
    isNavVisible: true,
    isFooterVisible: true,
  },
  [ AppRoute.NotFound ]: {
    pageClass: 'page--gray page--login',
    mainClass: 'page__main--login',
    isNavVisible: false,
    isFooterVisible: false,
  }
};
const RatingStarScores = [
  { score: 5, title: 'perfect' },
  { score: 4, title: 'good'},
  { score: 3, title: 'not bad' },
  { score: 2, title: 'badly' },
  { score: 1, title: 'terribly' }
];
const ICON_SIZE: [ number, number ] = [ 40, 40 ];
const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: ICON_SIZE,
  iconAnchor: ICON_SIZE
});
const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: ICON_SIZE,
  iconAnchor: ICON_SIZE
});
const MapClassOptions = {
  [ MapType.Main ]: 'map__main',
  [ MapType.Offer ]: 'map__offer'
};

const SortOptions = {
  [ SortType.Popular ]: (offers: TPreviewOffer[]) => offers.slice(),
  [ SortType.HighToLow ]: (offers: TPreviewOffer[]) => offers.slice().sort(sortByHighToLow),
  [ SortType.LowToHigh ]: (offers: TPreviewOffer[]) => offers.slice().sort(sortByLowToHigh),
  [ SortType.TopRatedFirst ]: (offers: TPreviewOffer[]) => offers.slice().sort(sortByTopRated),
};
const MAX_COMMENT_LENGTH = 300;
const MIN_COMMENT_LENGTH = 50;
const DEFAULT_RATING = 0;
const DEFAULT_REVIEW: TReviewData = {
  rating: DEFAULT_RATING,
  comment: ''
};
const OfferLimits = {
  reviewsVisibleCount: 10,
  nearOffersVisibleCount: 3,
  imageVisibleCount: 6,
};
enum RequestStatus {
  Idle = 'Idle',
  Error = 'Error',
  Success = 'Success',
  Pending = 'Pending',
}

export enum AppNameSpace {
  AppData = 'DATA',
  Auth = 'AUTH',
  App = 'APPLICATION'
}

export enum ErrorCause {
  NearOffers = 'Near Offers',
  Offers = 'Offers',
  Offer = 'Offer',
  Reviews = 'Reviews',
  Favorites = 'Favorites',
}

const USER_DATA_KEY_NAME = 'six-cities/user-data';

export {
  USER_DATA_KEY_NAME,
  DEFAULT_REVIEW,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  DEFAULT_RATING,
  OfferLimits,
  RequestStatus,
  AppRoute,
  OfferListType,
  AuthorizationStatus,
  MapType,
  SortType,
  FavoriteOfferUpdateType,
  OfferType,
  City,
  APIRoute,
  CityMap,
  SortOptions,
  OfferListClassOptions,
  LayoutClassOptions,
  MapClassOptions,
  RatingStarScores,
  defaultCustomIcon,
  currentCustomIcon,
};
