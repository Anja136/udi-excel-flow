
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeviceData } from '@/types/device';
import { DeviceStatusBadge } from '@/components/devices/DeviceStatusBadge';
import { Flag } from 'lucide-react';

interface RecentUpdatesTableProps {
  devices: DeviceData[];
  limit?: number;
}

export const RecentUpdatesTable = ({ devices, limit = 5 }: RecentUpdatesTableProps) => {
  // Sort by lastUpdated date (descending) and take the first 'limit' items
  const sortedDevices = [...devices]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, limit);

  // Extract region and authority
  const getRegionAndAuthority = (device: DeviceData) => {
    const authority = device.deviceIdentifier.split('-')[0];
    
    const regionMap: Record<string, string> = {
      'fda': 'North America',
      'health-canada': 'North America',
      'ema': 'Europe',
      'mhra': 'Europe',
      'pmda': 'Asia',
      'tga': 'Oceania',
      'anvisa': 'South America',
      'mfds': 'Asia'
    };
    
    const authorityNames: Record<string, string> = {
      'fda': 'FDA (US)',
      'ema': 'EMA (EU)',
      'pmda': 'PMDA (Japan)',
      'mhra': 'MHRA (UK)',
      'tga': 'TGA (Australia)',
      'health-canada': 'Health Canada',
      'anvisa': 'ANVISA (Brazil)',
      'mfds': 'MFDS (Korea)'
    };
    
    return {
      region: regionMap[authority] || 'Other',
      authority: authorityNames[authority] || authority
    };
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Device Updates</CardTitle>
        <p className="text-sm text-muted-foreground">Showing {sortedDevices.length} of {devices.length} devices</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Authority</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDevices.map((device) => {
              const { region, authority } = getRegionAndAuthority(device);
              return (
                <TableRow key={device.id}>
                  <TableCell className="font-mono">{device.deviceIdentifier}</TableCell>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>
                    <DeviceStatusBadge status={device.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Flag className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{authority}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(device.lastUpdated).toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
