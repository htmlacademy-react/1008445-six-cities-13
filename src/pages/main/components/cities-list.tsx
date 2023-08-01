import { useAppDispatch } from '../../../hooks';
import { changeCity, fillOfferList } from '../../../store/action.ts';
import * as classNames from 'classnames';

type citiesListProps = {
  cities: string[];
  selectedCity: string;
}

export default function CitiesList({ cities, selectedCity }: citiesListProps) {
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list">
      { cities.map((city) => (
        <li key={ city } className="locations__item">
          <a
            className={ classNames('locations__item-link tabs__item', { 'tabs__item--active': selectedCity === city }) }
            href="#"
            onClick={ () => {
              dispatch(changeCity(city));
              dispatch(fillOfferList(city));
            }}
          >
            <span>{ city }</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
