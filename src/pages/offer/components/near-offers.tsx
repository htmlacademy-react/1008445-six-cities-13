import { useAppSelector } from '../../../hooks';
import { getNearOffers, getNearOffersLoadingStatus } from '../../../store/app-data/selectors.ts';
import { ErrorCause, OfferListClassOptions, OfferListType, RequestStatus } from '../../../const.ts';
import Loader from '../../../app/components/loader.tsx';
import OfferList from '../../main/components/offer-list.tsx';
import ErrorRequestReloader from '../../../app/components/error-request-reloader.tsx';

export type NearOffersProps = {
  offerId: string;
}

export default function NearOffers({ offerId }: NearOffersProps) {
  const nearOffersLoadingStatus = useAppSelector(getNearOffersLoadingStatus);
  const nearOffers = useAppSelector(getNearOffers);
  if ([ RequestStatus.Idle, RequestStatus.Pending ].includes(nearOffersLoadingStatus)) {
    return <Loader/>;
  }
  if (nearOffersLoadingStatus === RequestStatus.Error) {
    return <ErrorRequestReloader offerId={ offerId } cause={ ErrorCause.NearOffers }/>;
  }
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <OfferList offers={ nearOffers } classOption={ OfferListClassOptions[ OfferListType.Near ] }/>
      </section>
    </div>
  );
}
