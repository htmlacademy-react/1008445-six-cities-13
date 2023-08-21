import { useAppDispatch } from '../../../hooks';
import cn from 'classnames';
import { AppRoute, CityMap } from '../../../const.ts';
import { Link } from 'react-router-dom';
import { setCity } from '../../../store/app-process/app-process.ts';

type citiesListProps = {
  currentCityName: string;
}

export default function CitiesList({ currentCityName }: citiesListProps) {
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list" data-testid="cities-list">
      { Object.entries(CityMap).map(([ , city]) => (
        <li key={ city.name } className="locations__item" data-testid="cities-list-item">
          <Link
            className={ cn('locations__item-link tabs__item', { 'tabs__item--active': currentCityName === city.name }) }
            onClick={ () => dispatch(setCity(city)) }
            to={ AppRoute.Main }
          >
            <span>{ city.name }</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
