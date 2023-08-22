import OfferList from '../../main/components/offer-list.tsx';
import { AppRoute, City, CityMap, OfferListClassOptions, OfferListType } from '../../../const.ts';
import { TPreviewOffer } from '../../../types/offer.ts';
import { setCity } from '../../../store/app-process/app-process.ts';
import { useAppDispatch } from '../../../hooks';
import { useNavigate } from 'react-router-dom';

type FavoriteListProps = {
  offers: TPreviewOffer[];
}
export default function FavoriteList({ offers }: FavoriteListProps) {
  const cities = [ ...new Set(offers.map(({ city }) => city.name)) ];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <ul className="favorites__list">
      {
        cities.map((cityName) => (
          <li key={ cityName } className="favorites__locations-items" data-testid="city-name">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <button
                  className="locations__item-link"
                  onClick={ () => {
                    dispatch(setCity(CityMap[ cityName as City ]));
                    navigate(AppRoute.Main);
                  }}
                >
                  <span>{ cityName }</span>
                </button>
              </div>
            </div>
            <OfferList
              offers={ offers.filter(({ city }) => city.name === cityName) }
              classOption={ OfferListClassOptions[ OfferListType.Favorites ] }
            />
          </li>
        ))
      }
    </ul>
  );
}
