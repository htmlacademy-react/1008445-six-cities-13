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
import Sorting from './components/sorting.tsx';
import { TPreviewOffer } from '../../types/offer.ts';
import { Navigate } from 'react-router-dom';

export default function MainPage() {
  const [ currentOffer, setCurrentOffer ] = useState<TPreviewOffer | undefined>(undefined);
  const [ currentSorting, setCurrentSorting ] = useState<SortType>(SortType.Popular);
  const { name, location } = useAppSelector(({ city }) => city);
  const allOffers = useAppSelector(({ offers }) => offers);
  const cityOffers = allOffers.filter(({ city }) => city.name === name);
  const cityOffersCount = cityOffers.length;
  const placesFoundTitle = `${ cityOffersCount } places to stay in ${ name }`;
  if (!cityOffersCount) {
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
            <Sorting currentSorting={ currentSorting } setCurrentSorting={ setCurrentSorting }/>
            <OfferList
              offers={ SortOptions[ currentSorting ](cityOffers) }
              setCurrentOffer={ setCurrentOffer }
              classOption={ OfferListClassOptions[ OfferListType.Main ] }
            />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map map--clear">
              <Map
                offers={ cityOffers }
                location={ location }
                currentOffer={ currentOffer }
                mapClass={ MapClassOptions[ MapType.Main ] }
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
