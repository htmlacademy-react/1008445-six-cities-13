import { Helmet } from 'react-helmet-async';
import ImageList from './components/image-list/image-list.tsx';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, ErrorCause, MapClassOptions, MapType, RequestStatus } from '../../const.ts';
import Map from '../../app/components/map/map.tsx';
import { TOfferRequestData } from '../../types/offer.ts';
import useOffer from '../../hooks/use-offer.ts';
import { useAppSelector } from '../../hooks';
import Loader from '../../app/components/loader/loader.tsx';
import { getOffer, getOfferLoadingStatus } from '../../store/app-data/selectors.ts';
import OfferInfo from './components/offer-info/offer-info.tsx';
import NearOffers from './components/near-offers/near-offers.tsx';
import ErrorRequestReloader from '../../app/components/error-request-reloader/error-request-reloader.tsx';
import './style.css';

export default function OfferPage() {
  const { offerId } = useParams<TOfferRequestData>();
  const offerLoadingStatus = useAppSelector(getOfferLoadingStatus);
  useOffer(offerId);
  const offer = useAppSelector(getOffer);
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
        <section className="offer__map map map--clear" data-testid="map">
          <Map
            center={ location }
            currentMapOffer={ offer }
            mapClass={ MapClassOptions[ MapType.Offer ] }
          />
        </section>
      </section>
      <NearOffers
        offerId={ offerId }
      />
    </>
  );
}
