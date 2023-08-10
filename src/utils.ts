import { AppRoute, currentCustomIcon, defaultCustomIcon, LayoutClassOptions, OfferLimits } from './const.ts';
import * as dayjs from 'dayjs';
import { TMapOffer, TMapOffers, TOffer, TPreviewOffer, TPreviewOffers } from './types/offer.ts';
import { TReview } from './types/comment.ts';
import { matchPath } from 'react-router-dom';
import { Icon } from 'leaflet';
import { TAppData } from './types/state.ts';
const DATE_FORMAT = 'MMM D';
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
  const temp = nearOffers.slice(0, OfferLimits.nearOffersVisibleCount) as TMapOffers;
  temp.push({ title, location, isCurrentOffer: true });
  return temp;
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
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
const validatePassword = (password: string) => password.match(/^(?=.*[a-z])(?=.*[0-9]).{2,64}$/);
const toggleFavoriteOffer = (state: TAppData, changedOffer: TPreviewOffer) => {
  const oldFavoriteOffer = state.favoriteOffers.find(({ id }) => id === changedOffer.id);
  if (oldFavoriteOffer) {
    const favoriteOffersIndex = state.favoriteOffers.indexOf(oldFavoriteOffer);
    state.favoriteOffers.splice(favoriteOffersIndex, 1);
  } else {
    state.favoriteOffers.push(changedOffer);
  }
}
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
  toggleFavoriteOffer
};
