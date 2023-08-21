import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../mocks/mock-component.tsx';
import { LoginPage } from '../pages.ts';
import { makeFakeStore } from '../../mocks/test-mocks.ts';
import { AuthorizationStatus, RequestStatus } from '../../const.ts';

describe('Component: LoginPage', () => {
  it('should render correctly', () => {
    const loginText = 'Email';
    const passwordText = 'Password';
    const { withStoreComponent } = withStore(<LoginPage/>, makeFakeStore({
      AUTH: {
        authStatus: AuthorizationStatus.NoAuth,
        loginLoadingStatus: RequestStatus.Idle
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByPlaceholderText(loginText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordText)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'test@test.com';
    const expectedPasswordValue = '123456ee';
    const { withStoreComponent } = withStore(<LoginPage/>, makeFakeStore({
      AUTH: {
        authStatus: AuthorizationStatus.NoAuth,
        loginLoadingStatus: RequestStatus.Idle
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
