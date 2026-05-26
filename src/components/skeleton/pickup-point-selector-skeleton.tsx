import { MapLoadingState } from "@/components/map/map-loading-state";

export const PickupPointSelectorSkeleton = () => {
  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="h-4 w-44 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 flex gap-2">
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-300" />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <MapLoadingState />
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
          </div>
          <div className="mt-6 space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="mt-6 h-11 animate-pulse rounded-xl bg-slate-300" />
        </aside>
      </div>
    </div>
  );
};
