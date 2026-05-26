"use client";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { usePickupPointStore } from "@/stores/pickup-point.store";
import type { PickupPoint } from "@/types/pickup-point.type";

type PickupPointMapProps = {
  pickupPoints: PickupPoint[];
};

const defaultCenter: [number, number] = [47.4979, 19.0402];

const markerIcon = L.divIcon({
  className: "custom-pickup-marker",
  html: `
    <div class="custom-pickup-marker__pin">
      <img src="/bflogo.png" alt="" />
    </div>
  `,
  iconSize: [44, 52],
  iconAnchor: [22, 52],
  popupAnchor: [0, -52],
});

const getMarkerPosition = (point: PickupPoint): [number, number] => {
  return [point.location.longitude, point.location.latitude];
};

const formatAddress = (point: PickupPoint) => {
  return [
    point.address.postalCode,
    point.address.city,
    point.address.addressLine1,
  ]
    .filter(Boolean)
    .join(", ");
};

export const PickupPointMap = ({ pickupPoints }: PickupPointMapProps) => {
  const validPickupPoints = useMemo(
    () =>
      pickupPoints.filter(
        (point) =>
          Number.isFinite(point.location.latitude) &&
          Number.isFinite(point.location.longitude),
      ),
    [pickupPoints],
  );

  const setActivePickupPoint = usePickupPointStore(
    (state) => state.setActivePickupPoint,
  );

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        scrollWheelZoom
        className="h-160 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {validPickupPoints.map((point) => (
            <Marker
              key={point.id}
              position={getMarkerPosition(point)}
              icon={markerIcon}
              eventHandlers={{
                click: () => setActivePickupPoint(point),
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold">{point.name}</p>
                  <p>{formatAddress(point)}</p>
                  <p>Type: {point.type}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
