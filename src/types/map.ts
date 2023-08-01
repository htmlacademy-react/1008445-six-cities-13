export type TCity = {
  name: string;
  location: TLocation;
}

export type TMarker = {
  title: string;
  lat: number;
  lng: number;
};

export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Markers = TMarker[];
