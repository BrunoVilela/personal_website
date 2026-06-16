"use client";

import dynamic from "next/dynamic";
import { collaborations } from "@/data/lab";

const Map = dynamic(async () => {
  const L = await import("leaflet");
  const { MapContainer, Marker, Popup, TileLayer } = await import("react-leaflet");
  const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });
  return function CollaborationLeafletMap() {
    return (
      <MapContainer center={[18, -25]} zoom={2} scrollWheelZoom={false} className="min-h-[380px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {collaborations.map((place) => (
          <Marker key={place.institution} position={[place.lat, place.lng]} icon={icon}>
            <Popup>
              <strong>{place.institution}</strong>
              <br />
              {place.city}, {place.country}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  };
}, { ssr: false });

export function CollaborationMap() {
  return <Map />;
}
