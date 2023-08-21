import { MainEmptyPage } from '../pages.ts';
import { withHistory, withStore } from '../../mocks/mock-component.tsx';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../mocks/test-mocks.ts';

describe('Component: Main Empty Page', () => {
  it('should render correctly', () => {
    const expectedStatusText = 'No places to stay available';
    const withHistoryComponent = withHistory(<MainEmptyPage/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    expect(screen.getByText(expectedStatusText)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
  });
});
