import { AppRoute, LayoutClassOptions } from './const.ts';
import * as dayjs from 'dayjs';
import { TPreviewOffer } from './types/offer.ts';
const DATE_FORMAT = 'MMM D';
const TAG_DATE_FORMAT = 'YYYY-MM-DD';
const getHumanDate = (date: string): string => date ? dayjs(date).format(DATE_FORMAT) : '';
const getTagDate = (date: string): string => date ? dayjs(date).format(TAG_DATE_FORMAT) : '';
const getLayoutClassOptions = (pathname: string) => {
  if (pathname.includes(AppRoute.Offer)) {
    return LayoutClassOptions[ AppRoute.Offer ];
  }
  switch (pathname) {
    case AppRoute.Main:
    case AppRoute.Favorites:
    case AppRoute.Login: return LayoutClassOptions[ pathname ];
    case AppRoute.NoOffer: return LayoutClassOptions[ AppRoute.NoOffer ];
    default: return LayoutClassOptions[ AppRoute.NotFound ];
  }
};
const getMarkersFromOffers = (offers: TPreviewOffer[]) =>
  offers.map(({ title, location }) => ({
    title,
    lat: location.latitude,
    lng: location.longitude
  }));

export {
  getLayoutClassOptions,
  getHumanDate,
  getTagDate,
  getMarkersFromOffers
};
