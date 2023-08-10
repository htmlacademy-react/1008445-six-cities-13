import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const.ts';
const redirectToRoute = createAction<AppRoute>('process/redirectToRoute');
export {
  redirectToRoute,
};

