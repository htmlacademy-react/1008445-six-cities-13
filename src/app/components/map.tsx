import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map.tsx';
import { layerGroup, Marker } from 'leaflet';
import { City } from '../../types/offer.ts';
import { Points ,Point } from '../../types/map.ts';
import { defaultCustomIcon, currentCustomIcon } from '../../const.ts';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Points;
  selectedPoint: Point | undefined;
  mapClass: string;
}

export default function Map({ city, points, selectedPoint, mapClass }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      for (const { title, lat, lng } of points) {
        const marker = new Marker({ lat, lng });

        marker.setIcon(
          selectedPoint !== undefined && title === selectedPoint.title
            ? currentCustomIcon
            : defaultCustomIcon
        ).addTo(map);
      }
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [ map, points, selectedPoint ]);

  return (
    <div id="map" className={ mapClass } ref={ mapRef }></div>
  );
}
