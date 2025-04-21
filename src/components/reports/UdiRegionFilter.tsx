
import React from 'react';
import { UdiRegion, RegionFilter, UdiRegistrationStatus } from '@/types/udiRegion';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getStatusText } from '@/data/udiRegionsData';

interface UdiRegionFilterProps {
  regions: UdiRegion[];
  filter: RegionFilter;
  setFilter: (filter: RegionFilter) => void;
}

const statusOptions: { label: string; value: UdiRegistrationStatus }[] = [
  { label: 'Required', value: 'REQUIRED' },
  { label: 'Upcoming', value: 'UPCOMING' },
  { label: 'In Process', value: 'IN_PROCESS' },
  { label: 'Not Required', value: 'NOT_REQUIRED' }
];

const UdiRegionFilter = ({ regions, filter, setFilter }: UdiRegionFilterProps) => {
  const [regionsOpen, setRegionsOpen] = React.useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);

  const handleRegionChange = (regionId: string) => {
    setFilter({
      ...filter,
      regions: filter.regions.includes(regionId)
        ? filter.regions.filter(r => r !== regionId)
        : [...filter.regions, regionId]
    });
  };

  const handleStatusChange = (status: UdiRegistrationStatus) => {
    setFilter({
      ...filter,
      status: filter.status.includes(status)
        ? filter.status.filter(s => s !== status)
        : [...filter.status, status]
    });
  };

  const clearFilters = () => {
    setFilter({
      regions: [],
      status: []
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <Popover open={regionsOpen} onOpenChange={setRegionsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={regionsOpen} className="justify-between">
              Regions
              {filter.regions.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                  {filter.regions.length}
                </Badge>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search regions..." />
              <CommandEmpty>No region found.</CommandEmpty>
              <CommandGroup>
                {regions.map((region) => (
                  <CommandItem
                    key={region.id}
                    onSelect={() => handleRegionChange(region.id)}
                  >
                    <Checkbox
                      checked={filter.regions.includes(region.id)}
                      onCheckedChange={() => handleRegionChange(region.id)}
                      className="mr-2 h-4 w-4"
                      id={`region-${region.id}`}
                    />
                    <span>{region.name}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        filter.regions.includes(region.id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={statusOpen} onOpenChange={setStatusOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={statusOpen} className="justify-between">
              Status
              {filter.status.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                  {filter.status.length}
                </Badge>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search status..." />
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {statusOptions.map((status) => (
                  <CommandItem
                    key={status.value}
                    onSelect={() => handleStatusChange(status.value)}
                  >
                    <Checkbox
                      checked={filter.status.includes(status.value)}
                      onCheckedChange={() => handleStatusChange(status.value)}
                      className="mr-2 h-4 w-4"
                      id={`status-${status.value}`}
                    />
                    <span>{status.label}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        filter.status.includes(status.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {(filter.regions.length > 0 || filter.status.length > 0) && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default UdiRegionFilter;
