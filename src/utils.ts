import { AppRoute, LayoutClassOptions } from './const.ts';
import * as dayjs from 'dayjs';
import { TPreviewOffer } from './types/offer.ts';
import { TReview } from './types/comment.ts';
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

const sortByHighToLow = (a: TPreviewOffer, b: TPreviewOffer) => b.price - a.price;
const sortByLowToHigh = (a: TPreviewOffer, b: TPreviewOffer) => a.price - b.price;
const sortByTopRated = (a: TPreviewOffer, b: TPreviewOffer) => b.rating - a.rating;
const sortReviewsByDateDesc = (a: TReview, b: TReview) => {
  const dateA = dayjs(a.date);
  const dateB = dayjs(b.date);
  if (dateA.isSame(dateB, 'D')) {
    return 0;
  }
  return dateA.isAfter(dateB, 'D') ? -1 : 1;
};
const sortByRandom = () => 0.5 - Math.random();

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
