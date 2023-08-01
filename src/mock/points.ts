import { TCity } from '../types/map.ts';
import { Markers } from '../types/map.ts';
const POINTS: Markers = [
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

const city: TCity = {
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

