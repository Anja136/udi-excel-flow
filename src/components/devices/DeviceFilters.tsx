
import React from 'react';
import { SearchBar } from './SearchBar';
import { FilterToggleButtons } from './FilterToggleButtons';
import { FilterInputGroup } from './FilterInputGroup';
import { StatusFilter } from './StatusFilter';
import { FilterInfoBanner } from './FilterInfoBanner';

interface DeviceFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  deviceFilter: string;
  setDeviceFilter: (value: string) => void;
  materialFilter: string;
  setMaterialFilter: (value: string) => void;
  deviceGroupFilter: string;
  setDeviceGroupFilter: (value: string) => void;
  srvFilter: string;
  setSrvFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  totalFilteredDevices: number;
  downloadableFilteredDevices: number;
}

export const DeviceFilters = ({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
  deviceFilter,
  setDeviceFilter,
  materialFilter,
  setMaterialFilter,
  deviceGroupFilter,
  setDeviceGroupFilter,
  srvFilter,
  setSrvFilter,
  statusFilter,
  setStatusFilter,
  totalFilteredDevices,
  downloadableFilteredDevices,
}: DeviceFiltersProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        <FilterToggleButtons
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </div>
      
      <FilterInputGroup
        deviceFilter={deviceFilter}
        setDeviceFilter={setDeviceFilter}
        materialFilter={materialFilter}
        setMaterialFilter={setMaterialFilter}
        deviceGroupFilter={deviceGroupFilter}
        setDeviceGroupFilter={setDeviceGroupFilter}
      />
      
      <StatusFilter
        srvFilter={srvFilter}
        setSrvFilter={setSrvFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <FilterInfoBanner
        totalFilteredDevices={totalFilteredDevices}
        downloadableFilteredDevices={downloadableFilteredDevices}
      />
    </div>
  );
};
