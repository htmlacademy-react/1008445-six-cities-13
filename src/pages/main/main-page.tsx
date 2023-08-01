import { useState} from 'react';
import { ListClassOptions, MapClassOptions, MapType, OfferListType } from '../../const.ts';
import OfferList from './components/offer-list.tsx';
import Map from '../../app/components/map.tsx';
import CitiesList from './components/cities-list.tsx';
import { CITIES } from '../../const.ts';
import { useAppSelector } from '../../hooks';


function MainPage() {
  const [ , setActiveOffer ] = useState('');
  const selectedCityName = useAppSelector(({ city }) => city);
  const selectedCityOffers = useAppSelector(({ offerList }) => offerList);
  const offersMarkers
    = selectedCityOffers.map(({ title, location }) => ({
      title,
      lat: location.latitude,
      lng: location.longitude
    }));

  const selectedCityOffersCount = selectedCityOffers.length;
  const [ offer ] = selectedCityOffers;
  const selectedCity = offer?.city;

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList cities={ CITIES } />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              { selectedCityOffersCount ? selectedCityOffersCount : 'No' } places to stay in { selectedCityName }
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={ 0 }>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={ 0 }>Popular</li>
                <li className="places__option" tabIndex={ 0 }>Price: low to high</li>
                <li className="places__option" tabIndex={ 0 }>Price: high to low</li>
                <li className="places__option" tabIndex={ 0 }>Top rated first</li>
              </ul>
            </form>
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
                points = { offersMarkers }
                city={ selectedCity }
                selectedPoint={ undefined }
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
