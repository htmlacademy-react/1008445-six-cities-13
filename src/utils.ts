import { AppRoute } from './const.ts';
import * as dayjs from 'dayjs';
const DATE_FORMAT = 'MMM D';
const TAG_DATE_FORMAT = 'YYYY-MM-DD';
const getHumanDate = (date: string): string => {
  if (date) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return dayjs(date).format(DATE_FORMAT);
  }
  return '';
};
const getTagDate = (date: string): string => {
  if (date) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return dayjs(date).format(TAG_DATE_FORMAT);
  }
  return '';
};
const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
const getLayoutClassOptions = (pathname: string) => {
  let pageClass = '';
  let mainClass = '';
  let isLoginOrPageNotFound = false;
  switch (pathname) {
    case AppRoute.Main:
      pageClass = 'page--gray page--main';
      mainClass = 'page__main--index';
      break;
    case AppRoute.Favorites:
      pageClass = '';
      mainClass = 'page__main--favorites';
      break;
    case AppRoute.Login:
      pageClass = 'page--gray page--login';
      mainClass = 'page__main--login';
      isLoginOrPageNotFound = true;
      break;
    default:
      pageClass = 'page--gray page--login';
      mainClass = 'page__main--login';
      isLoginOrPageNotFound = true;
  }
  if (pathname.includes(AppRoute.Offer.slice(0, -3))) {
    pageClass = '';
    mainClass = 'page__main--offer';
    isLoginOrPageNotFound = false;
  }
  return { pageClass, mainClass, isLoginOrPageNotFound };
};
export {
  capitalizeFirstLetter,
  getLayoutClassOptions,
  getHumanDate,
  getTagDate
};
