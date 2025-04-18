
import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { mockDeviceData } from '@/data/mockDeviceData';
import { DeviceColumnFilters } from '@/components/devices/DeviceColumnFilters';
import { DeviceAgencyTabs } from '@/components/devices/DeviceAgencyTabs';
import { DeviceStatusBanner } from '@/components/devices/DeviceStatusBanner';
import { DeviceTable } from '@/components/devices/DeviceTable';

const allAgencies = ["All Devices", "GUDID", "EUDAMED", "CUDID", "IMDIS", "Saudi-DI", "TUDID", "AusUDID"];
const inaccessibleAgencies = ["CUDID", "Saudi-DI"];

export const DeviceStatusCockpit = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAgency = searchParams.get('agency') || "All Devices";
  const initialStatus = searchParams.get('status');
  
  const [selectedAgency, setSelectedAgency] = useState(initialAgency);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [columnFilters, setColumnFilters] = useState({
    deviceId: '',
    name: '',
    status: '',
    agencies: '',
    lastUpdated: ''
  });

  const handleAgencyChange = (value: string) => {
    setSelectedAgency(value);
    setSelectedDevices([]);
    setSearchParams(params => {
      const newParams = new URLSearchParams();
      newParams.set('agency', value);
      if (initialStatus) {
        newParams.set('status', initialStatus);
      }
      return newParams;
    });
  };

  const isAgencyAccessible = selectedAgency === "All Devices" || !inaccessibleAgencies.includes(selectedAgency);

  const filteredDevices = mockDeviceData
    .filter(device => selectedAgency === "All Devices" ? true : device.agencies.includes(selectedAgency))
    .filter(device => initialStatus ? device.status === initialStatus : true)
    .filter(device => !columnFilters.deviceId || device.id.toLowerCase().includes(columnFilters.deviceId.toLowerCase()))
    .filter(device => !columnFilters.name || device.name.toLowerCase().includes(columnFilters.name.toLowerCase()))
    .filter(device => !columnFilters.status || device.status.toLowerCase().includes(columnFilters.status.toLowerCase()))
    .filter(device => !columnFilters.agencies || device.agencies.some(agency => 
      agency.toLowerCase().includes(columnFilters.agencies.toLowerCase())))
    .filter(device => !columnFilters.lastUpdated || device.lastUpdated.toLowerCase().includes(columnFilters.lastUpdated.toLowerCase()));

  const handleSelectAllDevices = (checked: boolean) => {
    if (checked) {
      setSelectedDevices(filteredDevices.map(device => device.id));
    } else {
      setSelectedDevices([]);
    }
  };

  const handleSelectDevice = (deviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedDevices(prev => [...prev, deviceId]);
    } else {
      setSelectedDevices(prev => prev.filter(id => id !== deviceId));
    }
  };

  const handleFilterChange = (field: keyof typeof columnFilters, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setColumnFilters({
      deviceId: '',
      name: '',
      status: '',
      agencies: '',
      lastUpdated: ''
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Device Overview</h1>
      
      <DeviceStatusBanner 
        status={initialStatus} 
        selectedAgency={selectedAgency} 
      />
      
      <div className="bg-card rounded-lg p-6">
        <DeviceAgencyTabs
          selectedAgency={selectedAgency}
          onAgencyChange={handleAgencyChange}
          allAgencies={allAgencies}
        />

        <DeviceColumnFilters
          filters={columnFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <DeviceTable
          showCheckboxes={selectedAgency !== "All Devices"}
          selectedDevices={selectedDevices}
          onSelectAllDevices={handleSelectAllDevices}
          onSelectDevice={handleSelectDevice}
          filteredDevices={filteredDevices}
          isAgencyAccessible={isAgencyAccessible}
        />
      </div>
    </div>
  );
};

export default DeviceStatusCockpit;
