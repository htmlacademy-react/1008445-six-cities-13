import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOfferList, changeSortOption } from './action.ts';
import { CITIES, SortType } from '../const.ts';
import { TPreviewOffer } from '../types/offer.ts';
import { offers } from '../mock/offers.ts';
const [ Paris ] = CITIES;

type State = {
  city: string;
  offerList: TPreviewOffer[];
  sortOption: SortType;
}

const initState: State = {
  city: Paris,
  offerList: offers.filter(({ city }) => city.name === Paris),
  sortOption: SortType.Popular
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOfferList, (state, action) => {
      state.offerList = action.payload;
    })
    .addCase(changeSortOption, (state, action) => {
      state.sortOption = action.payload;
    });
});

export { reducer };

