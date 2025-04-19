
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';

interface FilterToggleButtonsProps {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
}

export const FilterToggleButtons: React.FC<FilterToggleButtonsProps> = ({
  selectedFilter,
  setSelectedFilter
}) => {
  return (
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
  );
};
