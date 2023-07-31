import { useAppDispatch } from '../../../hooks';
import { changeCity, fillOfferList } from '../../../store/action.ts';

type citiesListProps = {
  cities: string[];
}

export default function CitiesList({ cities }: citiesListProps) {
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list">
      { cities.map((city) => (
        <li key={ city } className="locations__item">
          <a
            className="locations__item-link tabs__item"
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
