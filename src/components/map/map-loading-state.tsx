import { useTranslations } from "next-intl";
import { Spinner } from "@/components/ui/spinner";

export const MapLoadingState = () => {
  const tCommon = useTranslations("common");

  return (
    <div className="flex h-160 w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-100">
      <div className="flex flex-col items-center gap-3">
        <Spinner />
        <p className="text-sm font-medium text-slate-600">
          {tCommon("loadingMap")}
        </p>
      </div>
    </div>
  );
};
