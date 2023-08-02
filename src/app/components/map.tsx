import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map.tsx';
import { layerGroup, Marker } from 'leaflet';
import { TLocation, TMarker } from '../../types/map.ts';
import { defaultCustomIcon, currentCustomIcon } from '../../const.ts';
import 'leaflet/dist/leaflet.css';
import { TPreviewOffer } from '../../types/offer.ts';
import { getMarkersFromOffers } from '../../utils.ts';

type MapProps = {
  location: TLocation;
  offers: TPreviewOffer[];
  currentOffer?: TPreviewOffer | null;
  mapClass: string;
}

export default function Map({ location, offers, currentOffer, mapClass }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      const markers: TMarker[] = getMarkersFromOffers(offers);
      for (const { title, lat, lng } of markers) {
        const marker = new Marker({ lat, lng });
        marker
          .setIcon(title === currentOffer?.title ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      }
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [ map, offers, currentOffer ]);

  return (
    <div id="map" className={ mapClass } ref={ mapRef }></div>
  );
}
