import { Spinner } from "@/components/ui/spinner";

export const MapLoadingState = () => {
  return (
    <div className="flex h-[640px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-100">
      <div className="flex flex-col items-center gap-3">
        <Spinner />
        <p className="text-sm font-medium text-slate-600">Loading map...</p>
      </div>
    </div>
  );
};
