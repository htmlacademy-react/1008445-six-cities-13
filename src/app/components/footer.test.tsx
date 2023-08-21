import Footer from './footer.tsx';
import { withHistory } from '../../mocks/mock-component.tsx';
import { render, screen } from '@testing-library/react';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedAltText = '6 cities logo';
    const preparedComponent = withHistory(<Footer/>);

    render(preparedComponent);
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
