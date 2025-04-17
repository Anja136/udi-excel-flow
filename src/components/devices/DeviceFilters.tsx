
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Info } from 'lucide-react';

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
  totalFilteredDevices,
  downloadableFilteredDevices,
}: DeviceFiltersProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === "all" ? "default" : "outline"}
            onClick={() => setSelectedFilter("all")}
          >
            All Devices
          </Button>
          <Button
            variant={selectedFilter === "recent" ? "default" : "outline"}
            onClick={() => setSelectedFilter("recent")}
          >
            <Filter className="h-4 w-4 mr-2" />
            Recent Updates
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div>
          <Label htmlFor="device-identifier" className="text-sm">Device Identifier</Label>
          <Input
            id="device-identifier"
            placeholder="Filter by identifier..."
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="material" className="text-sm">Material/Description</Label>
          <Input
            id="material"
            placeholder="Filter by material..."
            value={materialFilter}
            onChange={(e) => setMaterialFilter(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="device-group" className="text-sm">Device Group</Label>
          <Input
            id="device-group"
            placeholder="Filter by device group..."
            value={deviceGroupFilter}
            onChange={(e) => setDeviceGroupFilter(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <Label htmlFor="srv-filter" className="text-sm whitespace-nowrap">SRV Status:</Label>
        <Select value={srvFilter} onValueChange={setSrvFilter}>
          <SelectTrigger id="srv-filter" className="w-[180px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="started">Started</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center mt-2">
        <div className="flex items-center gap-1 text-xs bg-amber-50 border border-amber-200 rounded p-1">
          <Info className="h-3 w-3 text-amber-500" />
          <span>Devices with incomplete SRV calculations cannot be selected for download</span>
        </div>
        <div className="ml-2 text-xs">
          Downloadable devices: {downloadableFilteredDevices} of {totalFilteredDevices}
        </div>
      </div>
    </div>
  );
};
