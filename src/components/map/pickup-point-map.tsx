"use client";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useTranslations } from "next-intl";
import { useMemo, useEffect } from "react";
import { useMap, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { usePickupPointStore } from "@/stores/pickup-point.store";
import type {
  PickupPoint,
  PickupPointMapProps,
} from "@/types/pickup-point.type";

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
  const tSearch = useTranslations("search");
  const mapTarget = usePickupPointStore((state) => state.mapTarget);

  if (!mapTarget) {
    return null;
  }

  return (
    <Marker position={[mapTarget.lat, mapTarget.lng]} icon={searchTargetIcon}>
      <Popup>
        <p className="font-semibold">{tSearch("result")}</p>
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
  const tCommon = useTranslations("common");
  const tPickupPoint = useTranslations("pickupPoint");
  const tTypes = useTranslations("types");

  const validPickupPoints = useMemo(
    () =>
      pickupPoints.filter(
        (point) =>
          Number.isFinite(point.location.latitude) &&
          Number.isFinite(point.location.longitude),
      ),
    [pickupPoints],
  );

  const activePickupPoint = usePickupPointStore(
    (state) => state.activePickupPoint,
  );

  const selectedPickupPoint = usePickupPointStore(
    (state) => state.selectedPickupPoint,
  );

  const setActivePickupPoint = usePickupPointStore(
    (state) => state.setActivePickupPoint,
  );

  const setSelectedPickupPoint = usePickupPointStore(
    (state) => state.setSelectedPickupPoint,
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
            const isSelected = selectedPickupPoint?.id === point.id;

            return (
              <Marker
                key={point.id}
                position={getMarkerPosition(point)}
                icon={createMarkerIcon(isActive)}
                eventHandlers={{
                  click: (event) => {
                    setActivePickupPoint(point);
                    event.target.openPopup();
                  },
                  popupclose: () => {
                    setActivePickupPoint(null);
                  },
                }}
              >
                <Popup>
                  <div className="space-y-2">
                    <p className="font-semibold">{point.name}</p>
                    <p>{formatAddress(point)}</p>
                    <p>
                      {tPickupPoint("type")}: {tTypes(point.type)}
                    </p>
                    <button
                      type="button"
                      disabled={isSelected}
                      onClick={() => setSelectedPickupPoint(point)}
                      className="mt-2 w-full rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed disabled:bg-lime-600"
                    >
                      {isSelected
                        ? tCommon("selected")
                        : tCommon("selectPickupPoint")}
                    </button>
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
