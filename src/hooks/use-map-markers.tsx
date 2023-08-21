import { useEffect } from 'react';
import { layerGroup, Marker } from 'leaflet';
import { getCurrentIcon } from '../utils.ts';
import { TMapOffers, TPreviewOffer } from '../types/offer.ts';
import { Map } from 'leaflet';
import { TLocation } from '../types/map.ts';
export default function UseMapMarkers(map: Map | null, offers: TMapOffers | undefined, currentOffer: TPreviewOffer | undefined, location: TLocation) {
  useEffect(() => {
    if (map && offers) {
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
}
