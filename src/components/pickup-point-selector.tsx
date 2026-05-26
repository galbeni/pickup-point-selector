"use client";
import dynamic from "next/dynamic";
import { usePickupPoints } from "@/hooks/use-pickup-points.hook";
import { PickupPointInfoPanel } from "@/components/pickup-point/pickup-point-info-panel";
import { LocationSearch } from "@/components/search/location-search";
import { SelectedPickupPointSummary } from "@/components/pickup-point/selected-pickup-point-summary";
import { PickupPointSelectorSkeleton } from "@/components/skeleton/pickup-point-selector-skeleton";

const PickupPointMap = dynamic(
  () =>
    import("@/components/map/pickup-point-map").then(
      (module) => module.PickupPointMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-160 animate-pulse rounded-2xl bg-slate-200" />
    ),
  },
);

export const PickupPointSelector = () => {
  const { data, isLoading, isError, refetch } = usePickupPoints();

  if (isLoading) {
    return <PickupPointSelectorSkeleton />;
  }

  if (isError) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="font-medium text-red-700">
          Failed to load pickup points.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <LocationSearch />
      <SelectedPickupPointSummary />
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <PickupPointMap pickupPoints={data ?? []} />
        <PickupPointInfoPanel />
      </div>
    </div>
  );
};
