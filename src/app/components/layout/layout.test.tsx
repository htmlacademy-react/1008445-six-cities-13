import { withHistory, withStore } from '../../../mocks/mock-component.tsx';
import { render, screen } from '@testing-library/react';
import Layout from './layout.tsx';
import { makeFakeStore } from '../../../mocks/test-mocks.ts';

describe('Component: Layout', () => {
  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<Layout/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    const page = screen.getByTestId('page');
    const header = screen.getByTestId('header');
    const main = screen.getByTestId('main');
    expect(page).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});
