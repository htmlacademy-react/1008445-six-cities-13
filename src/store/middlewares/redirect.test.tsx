import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { browserHistory } from '../../browser-history.ts';
import { TState } from '../../types/state.ts';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../actions';
import { AppRoute } from '../../const.ts';

vitest.mock('../../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Redirect test', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [ redirect ];
    const mockStoreCreator = configureMockStore<TState, AnyAction>(middleware);
    store = mockStoreCreator({});
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to login with redirectAction action', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should not redirect to main with empty action', () => {
    const action = { type: '', payload: AppRoute.Main };

    store.dispatch(action);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Main);
  });
});
