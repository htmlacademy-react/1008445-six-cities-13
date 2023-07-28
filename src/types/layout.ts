import { AppRoute, OfferListType } from '../const.ts';

export type LayoutClassOptions = Record<AppRoute, {
  pageClass:string;
  mainClass:string;
  isNavVisible: boolean;
}>

export type ListClassOptions = Record<OfferListType,{
  placeListClass: string;
  placeCardClass: string;
  placeCardImageWrapperClass: string;
  imageWith: number;
  imageHeight: number;
  placeCardInfoClass: string;
  placeCardBookmarkButtonClass: string;
}>
