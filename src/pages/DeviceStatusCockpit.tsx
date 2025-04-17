
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DeviceStatusBadge } from "@/components/devices/DeviceStatusBadge";

const mockDevices = [
  {
    id: "UDI-DI-00001",
    name: "Cardiac Pacemaker X100",
    status: "Submitted" as const,
    agencies: ["GUDID", "EUDAMED", "IMDIS"],
    lastUpdated: "Mar 15, 2025, 11:30 AM"
  },
  {
    id: "UDI-DI-00002",
    name: "Insulin Pump S200",
    status: "Processed" as const,
    agencies: ["GUDID", "AusUDID"],
    lastUpdated: "Apr 2, 2025, 04:45 PM"
  },
  // Add a few more example devices...
];

const agencies = ["All Devices", "GUDID", "EUDAMED", "IMDIS", "AusUDID"];

export const DeviceStatusCockpit = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Device Overview</h1>
      
      <div className="bg-card rounded-lg p-6">
        <Tabs defaultValue="All Devices" className="mb-6">
          <TabsList>
            {agencies.map(agency => (
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
              {mockDevices.map(device => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatusCockpit;
