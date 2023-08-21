import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { browserHistory } from '../../browser-history.ts';
import { rootReducer } from '../root-reducer.ts';
import { AppNameSpace } from '../../const.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === `${ AppNameSpace.App }/redirectToRoute`) {
    browserHistory.push(action.payload);
  }
  return next(action);
};
