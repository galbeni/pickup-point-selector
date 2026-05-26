"use client";
import { useTranslations } from "next-intl";
import { usePickupPointStore } from "@/stores/pickup-point.store";

export const SelectedPickupPointSummary = () => {
  const tPickupPoint = useTranslations("pickupPoint");

  const selectedPickupPoint = usePickupPointStore(
    (state) => state.selectedPickupPoint,
  );

  if (!selectedPickupPoint) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-lime-200 bg-lime-50 p-4 shadow-sm">
      <p className="text-sm font-semibold text-lime-900">
        {tPickupPoint("selectedSummary")}
      </p>
      <p className="mt-1 font-medium text-lime-950">
        {selectedPickupPoint.name}
      </p>
      <p className="mt-1 text-sm text-lime-800">
        {selectedPickupPoint.address.postalCode}{" "}
        {selectedPickupPoint.address.city},{" "}
        {selectedPickupPoint.address.addressLine1}
      </p>
      <p className="mt-2 text-xs text-lime-700">
        {tPickupPoint("id")}: {selectedPickupPoint.id}
      </p>
    </div>
  );
};
