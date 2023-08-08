import { combineReducers } from '@reduxjs/toolkit';
import { AppNameSpace } from '../const.ts';
import { appData } from './app-data/app-data.ts';
import { appProcess } from './app-process/app-process.ts';
import { authProcess } from './auth-process/auth-process.ts';
export const rootReducer = combineReducers({
  [ AppNameSpace.AppData ]: appData.reducer,
  [ AppNameSpace.App ]: appProcess.reducer,
  [ AppNameSpace.Auth ]: authProcess.reducer,
});
