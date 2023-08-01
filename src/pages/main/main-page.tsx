import { useState} from 'react';
import { ListClassOptions, MapClassOptions, MapType, OfferListType, SortOptions } from '../../const.ts';
import OfferList from './components/offer-list.tsx';
import Map from '../../app/components/map.tsx';
import CitiesList from './components/cities-list.tsx';
import { CITIES } from '../../const.ts';
import { useAppSelector } from '../../hooks';
import { TMarker } from '../../types/map.ts';
import { getMarkersFromOffers } from '../../utils.ts';
import Sorting from './components/sorting.tsx';
import { TPreviewOffer } from '../../types/offer.ts';

function MainPage() {
  const [ activeOffer, setActiveOffer ] = useState<TPreviewOffer | null>(null);
  const selectedCityName = useAppSelector(({ city }) => city);
  const selectedSortOption = useAppSelector(({ sortOption }) => sortOption);
  const selectedCityOffers =
    useAppSelector(({ offerList }) => offerList).slice(0).sort(SortOptions[ selectedSortOption ]);
  const offersMarkers: TMarker[] = getMarkersFromOffers(selectedCityOffers);
  const selectedCityOffersCount = selectedCityOffers.length;
  const [ offer ] = selectedCityOffers;
  const selectedCity = offer?.city;

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList cities={ CITIES } selectedCity={ selectedCityName } />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              { selectedCityOffersCount ? selectedCityOffersCount : 'No' } places to stay in { selectedCityName }
            </b>
            <Sorting selectedSortOption={ selectedSortOption }/>
            { !!selectedCityOffersCount &&
              <OfferList
                offers={ selectedCityOffers }
                onOfferHoverHandler={ setActiveOffer }
                classOption={ ListClassOptions[ OfferListType.Main ] }
              /> }
          </section>
          <div className="cities__right-section">
            <section className="cities__map map map--clear">
              <Map
                markers= { offersMarkers }
                city={ selectedCity }
                selectedOffer={ activeOffer }
                mapClass={ MapClassOptions[ MapType.Main ] }
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
