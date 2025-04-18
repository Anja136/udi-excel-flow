import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DeviceStatusBadge } from "@/components/devices/DeviceStatusBadge";
import { mockDeviceData } from '@/data/mockDeviceData';
import { Checkbox } from "@/components/ui/checkbox";
import { DeviceColumnFilters } from '@/components/devices/DeviceColumnFilters';

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
    setSelectedDevices([]); // Clear selection when changing agency
    setSearchParams(params => {
      // Keep the status if it exists
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

  const showCheckboxes = selectedAgency !== "All Devices";
  const allSelected = filteredDevices.length > 0 && 
    filteredDevices.every(device => selectedDevices.includes(device.id));

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
      
      {initialStatus && (
        <div className="mb-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700">
            Showing devices with status: <strong>{initialStatus}</strong>
            {selectedAgency !== "All Devices" && (
              <span> for agency: <strong>{selectedAgency}</strong></span>
            )}
          </p>
        </div>
      )}
      
      <div className="bg-card rounded-lg p-6">
        <Tabs value={selectedAgency} onValueChange={handleAgencyChange} className="mb-6">
          <TabsList className="flex flex-wrap">
            {allAgencies.map(agency => (
              <TabsTrigger key={agency} value={agency}>
                {agency}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <DeviceColumnFilters
          filters={columnFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {showCheckboxes && (
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={allSelected}
                      onCheckedChange={handleSelectAllDevices}
                    />
                  </TableHead>
                )}
                <TableHead>Device ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agencies</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isAgencyAccessible ? (
                filteredDevices.length > 0 ? (
                  filteredDevices.map(device => (
                    <TableRow key={device.id}>
                      {showCheckboxes && (
                        <TableCell>
                          <Checkbox 
                            checked={selectedDevices.includes(device.id)}
                            onCheckedChange={(checked) => handleSelectDevice(device.id, !!checked)}
                          />
                        </TableCell>
                      )}
                      <TableCell className="font-mono">{device.id}</TableCell>
                      <TableCell>{device.name}</TableCell>
                      <TableCell>
                        <DeviceStatusBadge status={device.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1.5 flex-wrap">
                          {device.agencies.map(agency => (
                            <span
                              key={agency}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                            >
                              {agency}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {device.lastUpdated}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={showCheckboxes ? 6 : 5} className="text-center py-6">
                      No devices found for {selectedAgency}{initialStatus ? ` with status ${initialStatus}` : ''}
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={showCheckboxes ? 6 : 5} className="text-center py-6">
                    No access to this data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatusCockpit;
