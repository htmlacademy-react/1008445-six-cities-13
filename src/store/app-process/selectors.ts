import { TCity } from '../../types/map.ts';
import { AppNameSpace } from '../../const.ts';
import { TState } from '../../types/state.ts';
import { TPreviewOffer } from '../../types/offer.ts';

export const getCity = (state: TState): TCity => state[ AppNameSpace.App ].city;
export const getCurrentFocusedOffer = (state: TState): TPreviewOffer | undefined => state[ AppNameSpace.App ].currentFocusedOffer;
