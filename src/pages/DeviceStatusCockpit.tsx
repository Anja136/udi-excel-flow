import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DeviceStatusBadge } from "@/components/devices/DeviceStatusBadge";
import { mockDeviceData } from '@/data/mockDeviceData';

const allAgencies = ["All Devices", "GUDID", "EUDAMED", "CUDID", "IMDIS", "Saudi-DI", "TUDID", "AusUDID"];
const inaccessibleAgencies = ["CUDID", "Saudi-DI"];

export const DeviceStatusCockpit = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAgency = searchParams.get('agency') || "All Devices";
  const initialStatus = searchParams.get('status');
  
  const [selectedAgency, setSelectedAgency] = useState(initialAgency);

  const handleAgencyChange = (value: string) => {
    setSelectedAgency(value);
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

  // Check if the selected agency is accessible
  const isAgencyAccessible = selectedAgency === "All Devices" || !inaccessibleAgencies.includes(selectedAgency);

  // Update filtered devices based on selected agency and status
  const filteredDevices = mockDeviceData
    .filter(device => selectedAgency === "All Devices" ? true : device.agencies.includes(selectedAgency))
    .filter(device => initialStatus ? device.status === initialStatus : true);

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

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
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
                    <TableCell colSpan={5} className="text-center py-6">
                      No devices found for {selectedAgency}{initialStatus ? ` with status ${initialStatus}` : ''}
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
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
