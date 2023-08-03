import { TCity, TLocation } from './map.ts';
import { TUser } from './comment.ts';

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

export type TOfferItemClassOptions = {
  placeListClass: string;
  placeCardClass: string;
  placeCardImageWrapperClass: string;
  imageWith: number;
  imageHeight: number;
  placeCardInfoClass: string;
  placeCardBookmarkButtonClass: string;
};

