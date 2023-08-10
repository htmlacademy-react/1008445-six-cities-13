import { useAppSelector } from '../../hooks';
import CitiesList from '../main/components/cities-list.tsx';
import { Helmet } from 'react-helmet-async';
import { getCity } from '../../store/app-process/selectors.ts';

export default function MainEmptyPage() {
  const { name } = useAppSelector(getCity);
  return (
    <>
      <Helmet>
        <title>Six cities. No places available</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList currentCityName={ name }/>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property available at the moment in { name }
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </>
  );
}
