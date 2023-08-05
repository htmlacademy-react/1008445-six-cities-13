import { useEffect } from 'react';
import { getNearOffersAction, getOfferAction, getReviewsAction } from '../store/api-actions.ts';
import { useAppDispatch, useAppSelector } from './index.ts';

export default function useOffer(offerId: string | undefined) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (offerId) {
      dispatch(getOfferAction({ offerId }));
      dispatch(getReviewsAction({ offerId }));
      dispatch(getNearOffersAction({ offerId }));
    }
  }, [ offerId, dispatch ]);
  const currentOffer = useAppSelector(({ offer }) => offer);
  const offerReviews = useAppSelector(({ reviews }) => reviews);
  const currentNearOffers = useAppSelector(({ nearOffers }) => nearOffers);
  return {
    offer: currentOffer,
    offerReviews,
    nearOffers: currentNearOffers
  };
}
