import { NotFoundPage } from '../pages.ts';
import { withHistory } from '../../mocks/mock-component.tsx';
import { render, screen } from '@testing-library/react';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedReturnText = 'Return to main page';
    const expectedLinkText = 'Sorry ;( page not found';
    const preparedComponent = withHistory(<NotFoundPage/>);

    render(preparedComponent);
    expect(screen.getByText(expectedReturnText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
