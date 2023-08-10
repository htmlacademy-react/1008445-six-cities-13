import { useAppSelector } from '../../../hooks';
import { getNearOffersLoadingStatus } from '../../../store/app-data/selectors.ts';
import { sortByRandom } from '../../../utils.ts';
import { ErrorCause, OfferLimits, OfferListClassOptions, OfferListType, RequestStatus } from '../../../const.ts';
import Loader from '../../../app/components/loader.tsx';
import OfferList from '../../main/components/offer-list.tsx';
import { TPreviewOffers } from '../../../types/offer.ts';
import ErrorRequestReloader from '../../../app/components/error-request-reloader.tsx';

export type NearOffersProps = {
  nearOffers: TPreviewOffers;
  offerId: string;
}

export default function NearOffers({ nearOffers, offerId }: NearOffersProps) {
  const nearOffersLoadingStatus = useAppSelector(getNearOffersLoadingStatus);
  const slicedNearOffers = nearOffers.slice(0).sort(sortByRandom).slice(0, OfferLimits.nearOffersVisibleCount);
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
        <OfferList offers={ slicedNearOffers } classOption={ OfferListClassOptions[ OfferListType.Near ] }/>
      </section>
    </div>
  );
}
