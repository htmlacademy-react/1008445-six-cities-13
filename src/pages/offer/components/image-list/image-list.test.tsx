import { render, screen } from '@testing-library/react';
import ImageList from './image-list.tsx';
import { makeFakeOffer } from '../../../../mocks/test-mocks.ts';

describe('Component: Inside Item List', () => {
  it('should render correct', () => {
    const expectedText = /Photo studio/i;
    const { images } = makeFakeOffer();
    render(<ImageList images={ images }/>);

    expect(screen.getByAltText(expectedText)).toBeInTheDocument();
  });

  it('should render correct', () => {
    const expectedCount = 1;
    const imageItemListTestId = 'image-item-list';
    const imageItemTestId = 'image-item';
    const { images } = makeFakeOffer();
    render(<ImageList images={ images } />);
    const imageItemList = screen.getByTestId(imageItemListTestId);
    const imageItems = screen.getAllByTestId(imageItemTestId);

    expect(imageItemList).toBeInTheDocument();
    expect(imageItems.length).toBe(expectedCount);
  });
});
