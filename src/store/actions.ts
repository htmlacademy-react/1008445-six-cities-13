import { createAction } from '@reduxjs/toolkit';
import { AppNameSpace, AppRoute } from '../const.ts';
export const redirectToRoute = createAction<AppRoute>(`${ AppNameSpace.App }/redirectToRoute`);
