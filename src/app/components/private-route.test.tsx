import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { withHistory, withStore } from '../../mocks/mock-component.tsx';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../mocks/test-mocks.ts';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={ AppRoute.Login } element={ <span>{ expectedText }</span> } />
        <Route path={ AppRoute.Favorites } element={
          <PrivateRoute>
            <span>{ notExpectedText }</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      AUTH: {
        authStatus: AuthorizationStatus.NoAuth,
        loginLoadingStatus: RequestStatus.Idle
      }
    }));
    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={ AppRoute.Login } element={ <span>{ notExpectedText }</span> } />
        <Route path={ AppRoute.Favorites } element={
          <PrivateRoute>
            <span>{ expectedText }</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      AUTH: {
        authStatus: AuthorizationStatus.Auth,
        loginLoadingStatus: RequestStatus.Success
      }
    }));
    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
