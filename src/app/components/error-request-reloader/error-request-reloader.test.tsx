import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorRequestReloader from './error-request-reloader.tsx';
import { withStore } from '../../../mocks/mock-component.tsx';
import { getFavoriteOffersAction } from '../../../store/api-actions.ts';
import { extractActionsTypes } from '../../../mocks/test-mocks.ts';
import { APIRoute, ErrorCause } from '../../../const.ts';

describe('Component: ErrorRequestReloader', () => {
  it('should render correctly', () => {
    const firstExpectedText = `${ ErrorCause.Favorites } loading error, please try again`;
    const { withStoreComponent } = withStore(<ErrorRequestReloader cause={ ErrorCause.Favorites }/>, {});

    render(withStoreComponent);

    expect(screen.getByText(firstExpectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dispatch "getFavoriteOffersAction" when user clicked replay button', async () => {
    const {
      withStoreComponent,
      mockStore,
      mockAxiosAdapter
    } = withStore(<ErrorRequestReloader cause={ ErrorCause.Favorites }/>, {});
    mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      getFavoriteOffersAction.pending.type,
      getFavoriteOffersAction.fulfilled.type,
    ]);
  });
});
