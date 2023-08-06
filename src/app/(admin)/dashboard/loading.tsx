import { CardSkeleton } from "@/components/card-skeleton";
import { ComponentHeader } from "@/components/Header";
import { ComponentShell } from "@/components/Shell";

export default function DashboardSettingsLoading() {
  return (
    <ComponentShell>
      <ComponentHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="border border-dsc shadow rounded-md p-4 w-full">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </ComponentShell>
  );
}
