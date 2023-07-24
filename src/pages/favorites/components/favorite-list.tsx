import OfferList from '../../main/components/offer-list.tsx';
import { favoritesOfferItemClassOptions } from '../../../const.ts';
import { Offer } from '../../../types/offer.ts';

type FavoriteListProps = {
  offers: Offer[];
}
export default function FavoriteList({ offers }: FavoriteListProps) {
  const locations = [ ...new Set(offers.map(({ city }) => city.name)) ];
  return (
    <ul className="favorites__list">
      {
        locations.map((location) => (
          <li key={ location } className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{ location }</span>
                </a>
              </div>
            </div>
            <OfferList
              offers={ offers.filter(({ city }) => city.name === location) }
              classOption={ favoritesOfferItemClassOptions }
            />
          </li>
        ))
      }
    </ul>
  );
}
