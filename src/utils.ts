import { AppRoute, LayoutClassOptions } from './const.ts';
import * as dayjs from 'dayjs';
import { TPreviewOffer } from './types/offer.ts';
import { TReview } from './types/comment.ts';
import { matchPath } from 'react-router-dom';
const DATE_FORMAT = 'MMM D';
const TAG_DATE_FORMAT = 'YYYY-MM-DD';
const RANDOM_INIT_VALUE = 0.5;
const getHumanDate = (date: string): string => date ? dayjs(date).format(DATE_FORMAT) : '';
const getTagDate = (date: string): string => date ? dayjs(date).format(TAG_DATE_FORMAT) : '';
const getLayoutClassOptions = (pathname: string) => {
  if (matchPath(`${ AppRoute.Offer }/:offerId`,pathname)) {
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

const sortByHighToLow = (a: TPreviewOffer, b: TPreviewOffer) => b.price - a.price;
const sortByLowToHigh = (a: TPreviewOffer, b: TPreviewOffer) => a.price - b.price;
const sortByTopRated = (a: TPreviewOffer, b: TPreviewOffer) => b.rating - a.rating;
const sortReviewsByDateDesc = (a: TReview, b: TReview) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
};
const sortByRandom = () => RANDOM_INIT_VALUE - Math.random();

export {
  getLayoutClassOptions,
  getHumanDate,
  getTagDate,
  sortByHighToLow,
  sortByLowToHigh,
  sortByTopRated,
  sortReviewsByDateDesc,
  sortByRandom,
};
