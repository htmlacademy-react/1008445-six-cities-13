import { useAppDispatch } from '../../../hooks';
import { setCity } from '../../../store/actions.ts';
import cn from 'classnames';
import { AppRoute, CityMap } from '../../../const.ts';
import { Link } from 'react-router-dom';

type citiesListProps = {
  currentCityName: string;
}

export default function CitiesList({ currentCityName }: citiesListProps) {
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list">
      { Object.entries(CityMap).map(([ , city]) => (
        <li key={ city.name } className="locations__item">
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
