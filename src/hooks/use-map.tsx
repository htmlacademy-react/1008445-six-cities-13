import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/offer.ts';

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {
  const [ map , setMap] = useState<Map | null>(null);
  const isMapRenderedRef = useRef<boolean>(false);
  useEffect(() => {
    if (mapRef.current !== null && !isMapRenderedRef.current) {
      const { location } = city;
      const { latitude , longitude } = location;
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude
        },
        zoom: 10
      });

      const layer = new TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      );
      instance.addLayer(layer);
      setMap(instance);
      isMapRenderedRef.current = true;
    }
  }, [ mapRef, city ]);
  return map;
}
