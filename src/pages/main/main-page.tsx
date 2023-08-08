import { useState } from 'react';
import {
  OfferListType,
  SortType,
  AppRoute,
  MapType,
  MapClassOptions,
  SortOptions,
  OfferListClassOptions
} from '../../const.ts';
import OfferList from './components/offer-list.tsx';
import Map from '../../app/components/map.tsx';
import CitiesList from './components/cities-list.tsx';
import { useAppSelector } from '../../hooks';
import { MemoizedSorting } from './components/sorting.tsx';
import { Navigate } from 'react-router-dom';
import { getFilteredByCityOffers } from '../../store/app-data/selectors.ts';
import { getCity } from '../../store/app-process/selectors.ts';

export default function MainPage() {
  const [ currentSorting, setCurrentSorting ] = useState<SortType>(SortType.Popular);
  const { name, location } = useAppSelector(getCity);
  const previewOffers = useAppSelector(getFilteredByCityOffers);
  const placesFoundTitle = `${ previewOffers.length } places to stay in ${ name }`;
  if (!previewOffers.length) {
    return <Navigate to={ AppRoute.NoOffer }/>;
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
                location={ location }
                mapClass={ MapClassOptions[ MapType.Main ] }
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
