import { describe } from 'vitest';
import { City, CityMap } from '../../const.ts';
import { appProcess, setCity, setCurrentFocusedOffer } from './app-process.ts';
import { makeFakePreviewOffer } from '../../mocks/test-mocks.ts';
describe('AppProcess Slice', () => {
  it('should return initial state with empty action ', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: CityMap[ City.Paris ],
      currentFocusedOffer: undefined
    };

    const result = appProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: CityMap[ City.Paris ],
      currentFocusedOffer: undefined
    };

    const result = appProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set city with setCity action', () => {
    const initialState = {
      city: CityMap[ City.Paris ],
      currentFocusedOffer: undefined
    };
    const expectedState = {
      city: CityMap[ City.Hamburg ],
      currentFocusedOffer: undefined
    };
    const result = appProcess.reducer(initialState, setCity(CityMap[ City.Hamburg ]));
    expect(result).toEqual(expectedState);
  });

  it('should set current focused offer with setCurrentFocusedOffer action', () => {
    const initialState = {
      city: CityMap[ City.Paris ],
      currentFocusedOffer: undefined
    };
    const previewOffer = makeFakePreviewOffer();
    const expectedState = {
      city: CityMap[ City.Paris ],
      currentFocusedOffer: previewOffer
    };
    const result = appProcess.reducer(initialState, setCurrentFocusedOffer(previewOffer));
    expect(result.currentFocusedOffer).toEqual(expectedState.currentFocusedOffer);
  });
});

