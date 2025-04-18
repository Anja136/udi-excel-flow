
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, FilterX } from "lucide-react";

interface DeviceColumnFiltersProps {
  filters: {
    deviceId: string;
    name: string;
    status: string;
    agencies: string;
    lastUpdated: string;
  };
  onFilterChange: (field: keyof DeviceColumnFiltersProps['filters'], value: string) => void;
  onClearFilters: () => void;
}

export const DeviceColumnFilters = ({ 
  filters, 
  onFilterChange,
  onClearFilters
}: DeviceColumnFiltersProps) => {
  return (
    <div className="space-y-4 mb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Column Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-8"
        >
          <FilterX className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(filters).map(([key, value]) => (
          <div key={key} className="relative">
            <Input
              placeholder={`Filter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              value={value}
              onChange={(e) => onFilterChange(key as keyof typeof filters, e.target.value)}
              className="pr-8"
            />
            {value && (
              <button
                onClick={() => onFilterChange(key as keyof typeof filters, '')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
