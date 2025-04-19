
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusFilterProps {
  srvFilter: string;
  setSrvFilter: (value: string) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  srvFilter,
  setSrvFilter
}) => {
  return (
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
  );
};
