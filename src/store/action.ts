import { createAction } from '@reduxjs/toolkit';
import { offers } from '../mock/offers.ts';

const changeCity = createAction('changeCity', (city: string) => ({
  payload: city
}));
const fillOfferList = createAction('fillOfferList', (offerCity: string) => ({
  payload: offers.filter(({ city }) => city.name === offerCity)
}));

export {
  changeCity,
  fillOfferList
};

