import { useState } from 'react';
import {
  AppRoute,
  AuthorizationStatus,
  ErrorCause,
  MapClassOptions,
  MapType,
  OfferListClassOptions,
  OfferListType,
  RequestStatus,
  SortOptions,
  SortType
} from '../../const.ts';
import OfferList from './components/offer-list.tsx';
import Map from '../../app/components/map.tsx';
import CitiesList from './components/cities-list.tsx';
import { useAppSelector } from '../../hooks';
import { MemoizedSorting } from './components/sorting.tsx';
import { Navigate } from 'react-router-dom';
import { getFilteredByCityOffers, getOffersLoadingStatus } from '../../store/app-data/selectors.ts';
import { getCity } from '../../store/app-process/selectors.ts';
import { getAuthStatus } from '../../store/auth-process/selectors.ts';
import Loader from '../../app/components/loader.tsx';
import ErrorRequestReloader from '../../app/components/error-request-reloader.tsx';
import './style.css';

export default function MainPage() {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const offersLoadingStatus = useAppSelector(getOffersLoadingStatus);
  const [ currentSorting, setCurrentSorting ] = useState<SortType>(SortType.Popular);
  const { name, location } = useAppSelector(getCity);
  const previewOffers = useAppSelector(getFilteredByCityOffers);
  const placesFoundTitle = `${ previewOffers.length } place${ previewOffers.length > 1 ? 's' : ''} to stay in ${ name }`;
  if (authorizationStatus === AuthorizationStatus.Unknown || [ RequestStatus.Idle, RequestStatus.Pending ].includes(offersLoadingStatus)) {
    return <Loader/>;
  }
  if (offersLoadingStatus === RequestStatus.Error) {
    return <ErrorRequestReloader cause={ ErrorCause.Offers }/>;
  }
  if (!previewOffers.length) {
    return <Navigate to={ AppRoute.NoOffers }/>;
  }
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList currentCityName={ name }/>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              { placesFoundTitle }
            </b>
            <MemoizedSorting currentSorting={ currentSorting } setCurrentSorting={ setCurrentSorting }/>
            <OfferList
              offers={ SortOptions[ currentSorting ](previewOffers) }
              classOption={ OfferListClassOptions[ OfferListType.Main ] }
            />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map map--clear">
              <Map
                offers={ previewOffers }
                center={ location }
                mapClass={ MapClassOptions[ MapType.Main ] }
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
