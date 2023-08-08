import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map.tsx';
import { Icon, layerGroup, Marker } from 'leaflet';
import { TLocation } from '../../types/map.ts';
import { defaultCustomIcon, currentCustomIcon } from '../../const.ts';
import 'leaflet/dist/leaflet.css';
import { TMapOffer, TMapOffers, TPreviewOffer } from '../../types/offer.ts';
import { useAppSelector } from '../../hooks';
import { getCurrentFocusedOffer } from '../../store/app-process/selectors.ts';

type MapProps = {
  location: TLocation;
  offers: TMapOffers;
  mapClass: string;
}

const getCurrentIcon = (currentOffer: TPreviewOffer | undefined, offer: TMapOffer): Icon => {
  if (!currentOffer) {
    return defaultCustomIcon;
  }
  const { title, location: { latitude, longitude} } = offer;
  const isFocusedMarker = currentOffer.title === title &&
    currentOffer.location.latitude === latitude &&
      currentOffer.location.longitude === longitude;
  return isFocusedMarker ? currentCustomIcon : defaultCustomIcon;
};

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
