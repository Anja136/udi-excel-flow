
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FilterInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const FilterInput: React.FC<FilterInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder
}) => {
  return (
    <div>
      <Label htmlFor={id} className="text-sm">{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

interface FilterInputGroupProps {
  deviceFilter: string;
  setDeviceFilter: (value: string) => void;
  materialFilter: string;
  setMaterialFilter: (value: string) => void;
  deviceGroupFilter: string;
  setDeviceGroupFilter: (value: string) => void;
}

export const FilterInputGroup: React.FC<FilterInputGroupProps> = ({
  deviceFilter,
  setDeviceFilter,
  materialFilter,
  setMaterialFilter,
  deviceGroupFilter,
  setDeviceGroupFilter
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
      <FilterInput
        id="device-identifier"
        label="Device Identifier"
        value={deviceFilter}
        onChange={setDeviceFilter}
        placeholder="Filter by identifier..."
      />
      <FilterInput
        id="material"
        label="Material/Description"
        value={materialFilter}
        onChange={setMaterialFilter}
        placeholder="Filter by material..."
      />
      <FilterInput
        id="device-group"
        label="Device Group"
        value={deviceGroupFilter}
        onChange={setDeviceGroupFilter}
        placeholder="Filter by device group..."
      />
    </div>
  );
};
