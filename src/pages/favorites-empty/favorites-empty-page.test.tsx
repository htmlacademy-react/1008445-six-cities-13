import { FavoritesEmptyPage } from '../pages.ts';
import { withHistory } from '../../mocks/mock-component.tsx';
import { render, screen } from '@testing-library/react';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'Favorites (empty)';
    const expectedStatusText = 'Nothing yet saved.';
    const expectedDescriptionText = 'Save properties to narrow down search or plan your future trips.';
    const preparedComponent = withHistory(<FavoritesEmptyPage/>);

    render(preparedComponent);
    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedStatusText)).toBeInTheDocument();
    expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
  });
});
