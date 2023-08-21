import { TCity, TLocation } from './map.ts';
import { TUser } from './comment.ts';
import { FavoriteOfferUpdateType, OfferListType } from '../const.ts';

export type TOfferRequestData = {
  offerId: string;
};

export type TPreviewOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: TCity;
  location: TLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type TPreviewOffers = TPreviewOffer[]

export type TOffer = TPreviewOffer & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: TUser;
  images: string[];
  maxAdults: number;
}

export type TMapOffer = Pick<TPreviewOffer, 'title' | 'location'> & {
  isCurrentOffer?: boolean;
}

export type TMapOffers = TMapOffer[]

export type TOfferItemClassOptions = {
  placeListClass: string;
  placeCardClass: string;
  placeCardImageWrapperClass: string;
  imageWith: number;
  imageHeight: number;
  placeCardInfoClass: string;
};

export type TOfferListClassOptions = Record<OfferListType, {
  placeListClass: string;
  placeCardClass: string;
  placeCardImageWrapperClass: string;
  imageWith: number;
  imageHeight: number;
  placeCardInfoClass: string;
}>

export type TFavoriteOfferRequestData = {
  offerId: string;
  favoriteStatus: number;
  favoriteOfferType?: FavoriteOfferUpdateType;
};

export type TFavoriteOfferResponseData = {
  offer: TOffer;
  favoriteOfferType?: FavoriteOfferUpdateType;
}
