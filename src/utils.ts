import {
  AppRoute,
  currentCustomIcon,
  defaultCustomIcon, FavoriteOfferUpdateType,
  LayoutClassOptions,
} from './const.ts';
import * as dayjs from 'dayjs';
import { TMapOffer, TMapOffers, TOffer, TPreviewOffer, TPreviewOffers } from './types/offer.ts';
import { TReview } from './types/comment.ts';
import { matchPath } from 'react-router-dom';
import { Icon } from 'leaflet';
const DATE_FORMAT = 'MMMM YYYY';
const TAG_DATE_FORMAT = 'YYYY-MM-DD';
const RANDOM_INIT_VALUE = 0.5;
const getHumanDate = (date: string): string => date ? dayjs(date).format(DATE_FORMAT) : '';
const getTagDate = (date: string): string => date ? dayjs(date).format(TAG_DATE_FORMAT) : '';
const getLayoutClassOptions = (pathname: string) => {
  if (matchPath(`${ AppRoute.Offer }/:offerId`, pathname)) {
    return LayoutClassOptions[ AppRoute.Offer ];
  }
  switch (pathname) {
    case AppRoute.Main:
    case AppRoute.Favorites:
    case AppRoute.Login: return LayoutClassOptions[ pathname ];
    case AppRoute.NoOffers: return LayoutClassOptions[ AppRoute.NoOffers ];
    case AppRoute.NoFavorites: return LayoutClassOptions[ AppRoute.NoFavorites ];
    default: return LayoutClassOptions[ AppRoute.NotFound ];
  }
};
const getFavoriteOfferUpdateType = (pathname: string) => {
  switch (pathname) {
    case AppRoute.Main: return FavoriteOfferUpdateType.MainList;
    case AppRoute.Favorites: return FavoriteOfferUpdateType.FavoritesList;
    default: return FavoriteOfferUpdateType.NearList;
  }
};
const sortByHighToLow = (a: TPreviewOffer, b: TPreviewOffer) => b.price - a.price;
const sortByLowToHigh = (a: TPreviewOffer, b: TPreviewOffer) => a.price - b.price;
const sortByTopRated = (a: TPreviewOffer, b: TPreviewOffer) => b.rating - a.rating;
const sortReviewsByDateDesc = (a: TReview, b: TReview) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
};
const sortByRandom = () => RANDOM_INIT_VALUE - Math.random();
const getMapOffers = ({ title, location }: TOffer, nearOffers: TPreviewOffers): TMapOffers => {
  const mapOffers = nearOffers.slice(0) as TMapOffers;
  mapOffers.push({ title, location, isCurrentOffer: true });
  return mapOffers;
};
const getIsFocused = (currentOffer: TPreviewOffer | undefined, offer: TMapOffer) => {
  const { title, location: { latitude, longitude} } = offer;
  if (!currentOffer) {
    return false;
  }
  return currentOffer.title === title &&
    currentOffer.location.latitude === latitude &&
    currentOffer.location.longitude === longitude;
};
const getCurrentIcon = (currentOffer: TPreviewOffer | undefined, offer: TMapOffer): Icon => {
  const isFocusedMarker = getIsFocused(currentOffer, offer);
  return isFocusedMarker || offer.isCurrentOffer ? currentCustomIcon : defaultCustomIcon;
};
const validateEmail = (email: string) => email
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|.(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
const validatePassword = (password: string) => password.match(/^(?=.*[a-z])(?=.*[0-9]).{2,64}$/);
const replaceOrToggleOffer = (offers: TPreviewOffers, changedOffer: TPreviewOffer, isToggle?: boolean) => {
  const oldOffer = offers.find(({ id }) => id === changedOffer.id);
  if (oldOffer) {
    const offerIndex = offers.indexOf(oldOffer);
    if (isToggle) {
      offers.splice(offerIndex, 1);
    } else {
      offers.splice(offerIndex, 1, changedOffer);
    }
  } else if (isToggle) {
    offers.push(changedOffer);
  }
};
export {
  validateEmail,
  validatePassword,
  getLayoutClassOptions,
  getHumanDate,
  getTagDate,
  sortByHighToLow,
  sortByLowToHigh,
  sortByTopRated,
  sortReviewsByDateDesc,
  sortByRandom,
  getMapOffers,
  getCurrentIcon,
  replaceOrToggleOffer,
  getFavoriteOfferUpdateType
};
