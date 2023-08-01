import { createAction } from '@reduxjs/toolkit';
import { offers } from '../mock/offers.ts';
import { SortType } from '../const.ts';

const changeCity = createAction('changeCity', (city: string) => ({
  payload: city
}));
const fillOfferList = createAction('fillOfferList', (offerCity: string) => ({
  payload: offers.filter(({ city }) => city.name === offerCity)
}));

const changeSortOption = createAction('changeSortOption', (sortOption: SortType) => ({
  payload: sortOption
}));

export {
  changeCity,
  fillOfferList,
  changeSortOption
};

