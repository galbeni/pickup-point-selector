"use client";
import { usePickupPoints } from "@/hooks/use-pickup-points.hook";

export const PickupPointSelector = () => {
  const { data, isLoading, isError, refetch } = usePickupPoints();

  if (isLoading) {
    return <p className="mt-6 text-slate-600">Loading pickup points...</p>;
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
    <p className="mt-6 text-slate-600">
      Loaded pickup points: {data?.length ?? 0}
    </p>
  );
};
