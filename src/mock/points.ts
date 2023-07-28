import { City } from '../types/offer.ts';
import { Points } from '../types/map.ts';
const POINTS: Points = [
  {
    title: 'Саундвью',
    lat: 40.816881,
    lng: -73.872768
  },
  {
    title: 'Ферри Поинт',
    lat: 52.3909553943508,
    lng: 4.85309666406198
  },
  {
    title: 'Бронкс',
    lat: 52.3609553943508,
    lng: 4.85309666406198
  },
  {
    title: 'Инвуд-Хилл',
    lat: 52.3909553943508,
    lng: 4.929309666406198
  },
  {
    title: 'Пелхэм-Бей-Парк',
    lat: 52.3809553943508,
    lng: 4.939309666406198
  }
];

const city: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.4,
    longitude: 4.9,
    zoom: 10
  }
};

export {
  POINTS,
  city,
};

