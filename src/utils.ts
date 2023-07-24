import {AppRoute, LayoutClassOptions} from './const.ts';
import * as dayjs from 'dayjs';
const DATE_FORMAT = 'MMM D';
const TAG_DATE_FORMAT = 'YYYY-MM-DD';
const getHumanDate = (date: string): string => date ? dayjs(date).format(DATE_FORMAT) : '';
const getTagDate = (date: string): string => date ? dayjs(date).format(TAG_DATE_FORMAT) : '';
const getLayoutClassOptions = (pathname: string) => {
  if (pathname.includes(AppRoute.AnyOffer)) {
    return LayoutClassOptions[ AppRoute.AnyOffer ];
  }
  switch (pathname) {
    case AppRoute.Main:
    case AppRoute.Favorites:
    case AppRoute.Login: return LayoutClassOptions[ pathname ];
    default: return LayoutClassOptions[ AppRoute.NotFound ];
  }
};
/*const getLayoutClassOptions = (pathname: string) => {
  let pageClass = '';
  let mainClass = '';
  let isNavVisible = false;
  switch (pathname) {
    case AppRoute.Main:
      pageClass = 'page--gray page--main';
      mainClass = 'page__main--index';
      isNavVisible = true;
      break;
    case AppRoute.Favorites:
      pageClass = '';
      mainClass = 'page__main--favorites';
      isNavVisible = true;
      break;
    case AppRoute.Login:
      pageClass = 'page--gray page--login';
      mainClass = 'page__main--login';
      break;
    default:
      pageClass = 'page--gray page--login';
      mainClass = 'page__main--login';
  }
  if (pathname.includes(AppRoute.AnyOffer)) {
    pageClass = '';
    mainClass = 'page__main--offer';
    isNavVisible = true;
  }
  return { pageClass, mainClass, isNavVisible };
};*/
export {
  getLayoutClassOptions,
  getHumanDate,
  getTagDate
};
