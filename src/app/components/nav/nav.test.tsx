import { render, screen } from '@testing-library/react';
import Nav from './nav.tsx';
import { makeFakeStore } from '../../../mocks/test-mocks.ts';
import { withHistory, withStore } from '../../../mocks/mock-component.tsx';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../../const.ts';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { name, internet } from 'faker';
import { setUserData } from '../../../services/user-data.ts';
describe('Component: Nav', () => {
  const mockHistory = createMemoryHistory();
  it('should render correct with auth false', async() => {
    const expectedText = 'Login text';
    const mockComponent = <span>{ expectedText }</span>;
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={ AppRoute.Main } element={
          <Nav/>
        }
        />
        <Route path={ AppRoute.Login } element={ mockComponent }/>
      </Routes>,
      mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      AUTH: {
        authStatus: AuthorizationStatus.NoAuth,
        loginLoadingStatus: RequestStatus.Idle,
      }
    }));

    render(withStoreComponent);
    expect(screen.getByText('Sign in'));
    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
    const button = screen.getByTestId('sign-in-link');
    await userEvent.click(button);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correct with auth', () => {
    const withHistoryComponent = withHistory(<Nav/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      AUTH: {
        authStatus: AuthorizationStatus.Auth,
        loginLoadingStatus: RequestStatus.Success,
      }
    }));
    setUserData({
      name: name.title(),
      email: internet.email(),
      token: 'xxx',
      isPro: false,
      avatarUrl: internet.url(),
    });

    render(withStoreComponent);
    expect(screen.getByText('Log Out'));
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });
});
