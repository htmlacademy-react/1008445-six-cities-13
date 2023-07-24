export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

type OfferDescription = {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}

export type FullOffer = Offer & OfferDescription

export type City = {
  name: string;
  location: Location;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type OfferItemClassOptions = {
  placeListClass: string;
  placeCardClass: string;
  placeCardImageWrapperClass: string;
  imageWith: number;
  imageHeight: number;
  placeCardInfoClass: string;
  placeCardBookmarkButtonClass: string;
};

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type Comment = {
  review: string;
  rating: number;
}
