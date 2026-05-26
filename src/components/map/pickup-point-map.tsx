"use client";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useMemo, useEffect } from "react";
import { useMap, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { usePickupPointStore } from "@/stores/pickup-point.store";
import type { PickupPoint } from "@/types/pickup-point.type";

type PickupPointMapProps = {
  pickupPoints: PickupPoint[];
};

const defaultCenter: [number, number] = [47.4979, 19.0402];

const searchTargetIcon = L.divIcon({
  className: "search-target-marker",
  html: `<div class="search-target-marker__dot"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const getMarkerPosition = (point: PickupPoint): [number, number] => {
  return [point.location.latitude, point.location.longitude];
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

const MapTargetController = () => {
  const map = useMap();
  const mapTarget = usePickupPointStore((state) => state.mapTarget);

  useEffect(() => {
    if (!mapTarget) {
      return;
    }

    map.flyTo([mapTarget.lat, mapTarget.lng], 13, {
      duration: 1,
    });
  }, [map, mapTarget]);

  return null;
};

const SearchTargetMarker = () => {
  const mapTarget = usePickupPointStore((state) => state.mapTarget);

  if (!mapTarget) {
    return null;
  }

  return (
    <Marker position={[mapTarget.lat, mapTarget.lng]} icon={searchTargetIcon}>
      <Popup>
        <p className="font-semibold">Search result</p>
        <p>{mapTarget.label}</p>
      </Popup>
    </Marker>
  );
};

const createMarkerIcon = (isActive: boolean) => {
  return L.divIcon({
    className: isActive
      ? "custom-pickup-marker custom-pickup-marker--active"
      : "custom-pickup-marker",
    html: `
      <div class="custom-pickup-marker__pin">
        <img src="/bflogo.png" alt="" />
      </div>
    `,
    iconSize: [44, 52],
    iconAnchor: [22, 52],
    popupAnchor: [0, -52],
  });
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

  const activePickupPoint = usePickupPointStore(
    (state) => state.activePickupPoint,
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
        <MapTargetController />
        <SearchTargetMarker />
        <MarkerClusterGroup chunkedLoading>
          {validPickupPoints.map((point) => {
            const isActive = activePickupPoint?.id === point.id;

            return (
              <Marker
                key={point.id}
                position={getMarkerPosition(point)}
                icon={createMarkerIcon(isActive)}
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
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
