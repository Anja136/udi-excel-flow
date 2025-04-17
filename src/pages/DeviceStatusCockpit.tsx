
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DeviceStatusBadge } from "@/components/devices/DeviceStatusBadge";
import { mockDeviceData } from '@/data/mockDeviceData';

// Ordered agencies with All Devices first, then in the specified order
const allAgencies = ["All Devices", "GUDID", "EUDAMED", "CUDID", "IMDIS", "Saudi-DI", "TUDID", "AusUDID"];

// Agencies that the user doesn't have access to
const inaccessibleAgencies = ["CUDID", "Saudi-DI"];

export const DeviceStatusCockpit = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialAgency = searchParams.get('agency') || "All Devices";
  
  const [selectedAgency, setSelectedAgency] = useState(initialAgency);

  // Check if the selected agency is accessible
  const isAgencyAccessible = selectedAgency === "All Devices" || !inaccessibleAgencies.includes(selectedAgency);

  // Update filtered devices based on selected agency
  const filteredDevices = selectedAgency === "All Devices" 
    ? mockDeviceData
    : mockDeviceData.filter(device => device.agencies.includes(selectedAgency));

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Device Overview</h1>
      
      <div className="bg-card rounded-lg p-6">
        <Tabs value={selectedAgency} onValueChange={setSelectedAgency} className="mb-6">
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
                      No devices found for {selectedAgency}
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
