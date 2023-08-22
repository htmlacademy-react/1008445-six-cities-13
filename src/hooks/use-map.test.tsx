import { screen, render } from '@testing-library/react';
import useMap from './use-map';
import { makeFakePreviewOffer } from '../mocks/test-mocks.ts';
import { MutableRefObject } from 'react';

describe('useMap hook', () => {
  it('return map instance when called', () => {
    const mapRef = {
      current: document.createElement('div'),
    } as MutableRefObject<HTMLElement | null>;

    const Map = () => {
      const { location } = makeFakePreviewOffer();
      const map = useMap(mapRef, location);
      return <div data-testid="map">{ map ? 'map instance' : 'empty' }</div>;
    };

    render(<Map/>);
    const mapElement = screen.getByTestId('map');

    expect(mapElement.textContent).toBe('map instance');
  });
});
