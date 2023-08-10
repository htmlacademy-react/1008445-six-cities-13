import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map.tsx';
import { layerGroup, Marker } from 'leaflet';
import { TLocation } from '../../types/map.ts';
import 'leaflet/dist/leaflet.css';
import { TMapOffers } from '../../types/offer.ts';
import { useAppSelector } from '../../hooks';
import { getCurrentFocusedOffer } from '../../store/app-process/selectors.ts';
import { getCurrentIcon } from '../../utils.ts';

type MapProps = {
  location: TLocation;
  offers: TMapOffers;
  mapClass: string;
}

export default function Map({ location, offers, mapClass }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);
  const currentOffer = useAppSelector(getCurrentFocusedOffer);
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      for (const offer of offers) {
        const { location: { latitude, longitude} } = offer;
        const marker = new Marker({ lat: latitude, lng: longitude });
        marker.setIcon(getCurrentIcon(currentOffer, offer)).addTo(markerLayer);
      }
      const { latitude , longitude , zoom} = location;
      map.setView({ lat: latitude, lng: longitude }, zoom);
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [ map, offers, currentOffer, location ]);

  return (
    <div id="map" className={ mapClass } ref={ mapRef }></div>
  );
}
