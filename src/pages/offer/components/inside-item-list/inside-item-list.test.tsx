import { render, screen } from '@testing-library/react';
import InsideItemList from './inside-item-list.tsx';
import { makeFakeOffer } from '../../../../mocks/test-mocks.ts';

describe('Component: Inside Item List', () => {
  it('should render correct', () => {
    const expectedText = /Heating/i;
    const { goods } = makeFakeOffer();
    render(<InsideItemList goods={ goods }/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correct', () => {
    const expectedCount = 2;
    const insideItemListTestId = 'inside-item-list';
    const insideItemTestId = 'inside-list-item';
    const { goods } = makeFakeOffer();
    render(<InsideItemList goods={ goods } />);
    const insideItemList = screen.getByTestId(insideItemListTestId);
    const insideItems = screen.getAllByTestId(insideItemTestId);

    expect(insideItemList).toBeInTheDocument();
    expect(insideItems.length).toBe(expectedCount);
  });
});
