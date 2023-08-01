import { FullOffer, Offer } from '../types/offer.ts';
const offerDescription = {
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  bedrooms: 1,
  goods: [
    'Heating',
    'Kitchen',
    'Fridge',
    'Towels',
  ],
  host: {
    name: 'Oliver Conner',
    avatarUrl: '/img/avatar-angelina.jpg',
    isPro: true
  },
  images: [
    'https://loremflickr.com/320/240?lock=1',
    'https://loremflickr.com/320/240?lock=2',
    'https://loremflickr.com/320/240?lock=3',
    'https://loremflickr.com/320/240?lock=4',
    'https://loremflickr.com/320/240?lock=5',
    'https://loremflickr.com/320/240?lock=6',
  ],
  maxAdults: 4
};

const offers: Offer[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.4,
        longitude: 4.9,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10
    },
    isFavorite: false,
    isPremium: false,
    rating: 2,
    previewImage: 'https://loremflickr.com/320/240?lock=1'
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f01',
    title: 'Beautiful studio at great location',
    type: 'private room',
    price: 140,
    city: {
      name: 'Brussels',
      location: {
        latitude: 51.35514938496378,
        longitude: 4.673877537499948,
        zoom: 10
      }
    },
    location: {
      latitude: 52.35544938496378,
      longitude: 4.673877537499948,
      zoom: 10
    },
    isFavorite: true,
    isPremium: true,
    rating: 3,
    previewImage: 'https://loremflickr.com/320/240?lock=2'
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f02',
    title: 'Luxurious studio at great location',
    type: 'apartment',
    price: 100,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.4,
        longitude: 4.9,
        zoom: 10
      }
    },
    location: {
      latitude: 52.35544938496378,
      longitude: 4.673877537499948,
      zoom: 10
    },
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: 'https://loremflickr.com/320/240?lock=3'
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f12',
    title: 'Luxurious studio at great location Yo',
    type: 'apartment',
    price: 101,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.4,
        longitude: 4.9,
        zoom: 10
      }
    },
    location: {
      latitude: 52.45544038496378,
      longitude: 4.773873537499948,
      zoom: 10
    },
    isFavorite: true,
    isPremium: false,
    rating: 3,
    previewImage: 'https://loremflickr.com/320/240?lock=4'
  }
];
const fullOffers: FullOffer[] = offers.map((offer) => ({ ...offer, ...offerDescription }));
const reviews = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://loremflickr.com/320/240?lock=7',
      isPro: false
    },
    comment: 'A quiet place.',
    rating: 5
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62s',
    date: '2018-01-08T14:13:56.569Z',
    user: {
      name: 'Max Payne',
      avatarUrl: 'https://loremflickr.com/320/240?lock=8',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 3
  }
];


export {
  offers,
  fullOffers,
  reviews
};

