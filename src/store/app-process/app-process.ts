import { AppNameSpace, City, CityMap } from '../../const.ts';
import { AppProcess } from '../../types/state.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCity } from '../../types/map.ts';
import { TPreviewOffer } from '../../types/offer.ts';

const initialState : AppProcess = {
  city: CityMap[ City.Paris ],
  currentFocusedOffer: undefined,
};

export const appProcess = createSlice({
  name: AppNameSpace.App,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<TCity>) => {
      state.city = action.payload;
    },
    setCurrentFocusedOffer: (state, action: PayloadAction<TPreviewOffer | undefined>) => {
      state.currentFocusedOffer = action.payload;
    },
  },
});

export const { setCity, setCurrentFocusedOffer } = appProcess.actions;
