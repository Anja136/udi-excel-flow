
import React from 'react';
import { Info } from 'lucide-react';

interface FilterInfoBannerProps {
  totalFilteredDevices: number;
  downloadableFilteredDevices: number;
}

export const FilterInfoBanner: React.FC<FilterInfoBannerProps> = ({
  totalFilteredDevices,
  downloadableFilteredDevices
}) => {
  return (
    <div className="flex items-center mt-2">
      <div className="flex items-center gap-1 text-xs bg-amber-50 border border-amber-200 rounded p-1">
        <Info className="h-3 w-3 text-amber-500" />
        <span>Devices with incomplete SRV calculations cannot be selected for download</span>
      </div>
      <div className="ml-2 text-xs">
        Downloadable devices: {downloadableFilteredDevices} of {totalFilteredDevices}
      </div>
    </div>
  );
};
