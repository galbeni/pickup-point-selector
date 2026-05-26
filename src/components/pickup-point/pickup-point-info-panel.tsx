"use client";
import { useTranslations } from "next-intl";
import { usePickupPointStore } from "@/stores/pickup-point.store";
import type { PickupPoint } from "@/types/pickup-point.type";

const formatAddress = (point: PickupPoint) => {
  return [
    point.address.postalCode,
    point.address.city,
    point.address.addressLine1,
  ]
    .filter(Boolean)
    .join(", ");
};

const formatTime = (hour: number, minute: number) => {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

export const PickupPointInfoPanel = () => {
  const tCommon = useTranslations("common");
  const tPickupPoint = useTranslations("pickupPoint");
  const tTypes = useTranslations("types");
  const tDays = useTranslations("days");

  const activePickupPoint = usePickupPointStore(
    (state) => state.activePickupPoint,
  );
  const selectedPickupPoint = usePickupPointStore(
    (state) => state.selectedPickupPoint,
  );
  const setSelectedPickupPoint = usePickupPointStore(
    (state) => state.setSelectedPickupPoint,
  );

  if (!activePickupPoint) {
    return (
      <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="font-semibold text-slate-900">
          {tPickupPoint("details")}
        </p>
        <p className="mt-2 text-sm text-slate-500">{tPickupPoint("empty")}</p>
      </aside>
    );
  }

  const isSelected = selectedPickupPoint?.id === activePickupPoint.id;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-950">
            {activePickupPoint.name}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {formatAddress(activePickupPoint)}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {tTypes(activePickupPoint.type)}
        </span>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">{tPickupPoint("status")}</dt>
          <dd className="font-medium text-slate-900">
            {activePickupPoint.isOpen
              ? tPickupPoint("open")
              : tPickupPoint("closed")}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">{tPickupPoint("available")}</dt>
          <dd className="font-medium text-slate-900">
            {activePickupPoint.isAvailable
              ? tPickupPoint("yes")
              : tPickupPoint("no")}
          </dd>
        </div>
      </dl>
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-900">
          {tPickupPoint("openingHours")}
        </p>
        <ul className="mt-2 max-h-44 space-y-1 overflow-auto text-sm text-slate-600">
          {activePickupPoint.openingHours.map((item, index) => (
            <li
              key={`${item.day}-${index}`}
              className="flex justify-between gap-4"
            >
              <span>{tDays(item.day)}</span>
              <span>
                {formatTime(item.start.hour, item.start.minute)} -{" "}
                {formatTime(item.end.hour, item.end.minute)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setSelectedPickupPoint(activePickupPoint)}
        className="mt-6 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed disabled:bg-lime-600"
        disabled={isSelected}
      >
        {isSelected ? tCommon("selected") : tCommon("selectPickupPoint")}
      </button>
    </aside>
  );
};
