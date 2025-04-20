
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeviceData } from '@/types/device';
import { DeviceStatusBadge } from '@/components/devices/DeviceStatusBadge';

interface RecentUpdatesTableProps {
  devices: DeviceData[];
  limit?: number;
}

export const RecentUpdatesTable = ({ devices, limit = 5 }: RecentUpdatesTableProps) => {
  // Sort by lastUpdated date (descending) and take the first 'limit' items
  const sortedDevices = [...devices]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Device Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDevices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-mono">{device.deviceIdentifier}</TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>
                  <DeviceStatusBadge status={device.status} />
                </TableCell>
                <TableCell>{device.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
