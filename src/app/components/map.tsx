import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map.tsx';
import { layerGroup, Marker } from 'leaflet';
import { TCity } from '../../types/map.ts';
import { Markers } from '../../types/map.ts';
import { defaultCustomIcon, currentCustomIcon } from '../../const.ts';
import 'leaflet/dist/leaflet.css';
import { TPreviewOffer } from '../../types/offer.ts';

type MapProps = {
  city: TCity;
  markers: Markers;
  selectedOffer?: TPreviewOffer | null;
  mapClass: string;
}

export default function Map({ city, markers, selectedOffer, mapClass }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      for (const { title, lat, lng } of markers) {
        const marker = new Marker({ lat, lng });
        marker
          .setIcon(title === selectedOffer?.title ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      }
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [ map, markers, selectedOffer ]);

  return (
    <div id="map" className={ mapClass } ref={ mapRef }></div>
  );
}
