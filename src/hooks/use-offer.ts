import { useEffect } from 'react';
import { getNearOffersAction, getOfferAction, getReviewsAction } from '../store/api-actions.ts';
import { useAppDispatch } from './index.ts';

export default function useOffer(offerId: string | undefined) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (offerId) {
      dispatch(getOfferAction({ offerId }));
      dispatch(getReviewsAction({ offerId }));
      dispatch(getNearOffersAction({ offerId }));
      window.scrollTo(0,0);
    }
  }, [ dispatch, offerId ]);
}
