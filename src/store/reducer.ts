import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOfferList } from './action.ts';
import { CITIES } from '../const.ts';
import { Offer } from '../types/offer.ts';
import { offers } from '../mock/offers.ts';
const [ Paris ] = CITIES;

type State = {
  city: string;
  offerList: Offer[];
}

const initState: State = {
  city: Paris,
  offerList: offers.filter(({ city }) => city.name === Paris)
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOfferList, (state, action) => {
      state.offerList = action.payload;
    });
});

export { reducer };

