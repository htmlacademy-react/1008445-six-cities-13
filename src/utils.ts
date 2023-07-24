import {AppRoute, LayoutClassOptions} from './const.ts';
import * as dayjs from 'dayjs';
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
    default: return LayoutClassOptions[ AppRoute.NotFound ];
  }
};

export {
  getLayoutClassOptions,
  getHumanDate,
  getTagDate
};
