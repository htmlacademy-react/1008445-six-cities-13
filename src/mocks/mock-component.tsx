import { MemoryHistory, createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { TState } from '../types/state';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch } from './test-mocks.ts';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route.tsx';
import { ReactElement } from 'react';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={ memoryHistory }>
      <HelmetProvider>
        { component }
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: ReactElement,
  initialState: Partial<TState> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [ thunk.withExtraArgument(axios) ];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={ mockStore }>{ component }</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
