import { Helmet } from 'react-helmet-async';
import ImageList from './components/image-list.tsx';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, ErrorCause, MapClassOptions, MapType, RequestStatus } from '../../const.ts';
import Map from '../../app/components/map.tsx';
import { TOfferRequestData } from '../../types/offer.ts';
import useOffer from '../../hooks/use-offer.ts';
import { useAppSelector } from '../../hooks';
import Loader from '../../app/components/loader.tsx';
import { getNearOffers, getOffer, getOfferLoadingStatus } from '../../store/app-data/selectors.ts';
import { getMapOffers } from '../../utils.ts';
import OfferInfo from './components/offer-info.tsx';
import NearOffers from './components/near-offers.tsx';
import ErrorRequestReloader from '../../app/components/error-request-reloader.tsx';

export default function OfferPage() {
  const { offerId } = useParams<TOfferRequestData>();
  const offerLoadingStatus = useAppSelector(getOfferLoadingStatus);
  useOffer(offerId);
  const offer = useAppSelector(getOffer);
  const nearOffers = useAppSelector(getNearOffers);
  if (offerLoadingStatus === RequestStatus.Error) {
    return <ErrorRequestReloader cause={ ErrorCause.Offer } offerId={ offerId }/>;
  }
  if ([ RequestStatus.Idle, RequestStatus.Pending ].includes(offerLoadingStatus)) {
    return <Loader/>;
  }
  if (!offer || !offerId) {
    return <Navigate to={ AppRoute.NotFound }/>;
  }
  const { images, location} = offer;
  const mapOffers = getMapOffers(offer, nearOffers);
  return (
    <>
      <Helmet>
        <title>Six cities. Offer</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <ImageList images={ images }/>
        </div>
        <div className="offer__container container">
          <OfferInfo offer={ offer }/>
        </div>
        <section className="offer__map map map--clear">
          <Map
            location={ location }
            offers={ mapOffers }
            mapClass={ MapClassOptions[ MapType.Offer ] }
          />
        </section>
      </section>
      <NearOffers
        nearOffers={ nearOffers }
        offerId={ offerId }
      />
    </>
  );
}
