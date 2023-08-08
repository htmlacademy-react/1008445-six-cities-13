import { useEffect } from 'react';
import { getOfferAction } from '../store/api-actions.ts';
import { useAppDispatch, useAppSelector } from './index.ts';
import { getOffer } from '../store/app-data/selectors.ts';

export default function useOffer(offerId: string | undefined) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (offerId) {
      dispatch(getOfferAction({ offerId }));
    }
  }, [ offerId, dispatch ]);
  return useAppSelector(getOffer);
}
