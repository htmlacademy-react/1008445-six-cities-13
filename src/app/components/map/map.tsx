import { useRef } from 'react';
import useMap from '../../../hooks/use-map.tsx';
import { TLocation } from '../../../types/map.ts';
import 'leaflet/dist/leaflet.css';
import { TMapOffers, TOffer } from '../../../types/offer.ts';
import { useAppSelector } from '../../../hooks';
import { getCurrentFocusedOffer } from '../../../store/app-process/selectors.ts';
import { getMapOffers } from '../../../utils.ts';
import { getNearOffers } from '../../../store/app-data/selectors.ts';
import useMapMarkers from '../../../hooks/use-map-markers.tsx';
type MapProps = {
  center: TLocation;
  offers?: TMapOffers;
  mapClass: string;
  currentMapOffer?: TOffer;
}
export default function Map({ center, offers, currentMapOffer, mapClass }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, center);
  const currentOffer = useAppSelector(getCurrentFocusedOffer);
  const nearOffers = useAppSelector(getNearOffers);
  if (!offers && currentMapOffer) {
    offers = getMapOffers(currentMapOffer, nearOffers);
  }
  useMapMarkers(map, offers, currentOffer, center);
  return (
    <div id="map" className={ mapClass } ref={ mapRef }></div>
  );
}
