
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DeviceData } from '@/types/device';
import { SrvStatusIcon } from './SrvStatusIcon';

interface DeviceTableProps {
  devices: DeviceData[];
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectDevice: (id: string, checked: boolean) => void;
}

export const DeviceTable = ({
  devices,
  selectAll,
  onSelectAll,
  onSelectDevice,
}: DeviceTableProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectAll} 
                onCheckedChange={onSelectAll}
                id="select-all"
              />
            </TableHead>
            <TableHead>Device Name</TableHead>
            <TableHead>UDI Identifier</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Device Group</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>SRV Calculation</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.length > 0 ? (
            devices.map((device) => (
              <TableRow 
                key={device.id}
                className={!device.isDownloadable ? "opacity-60" : ""}
              >
                <TableCell>
                  <Checkbox 
                    checked={device.selected} 
                    onCheckedChange={(checked) => onSelectDevice(device.id, !!checked)}
                    id={`device-${device.id}`}
                    disabled={!device.isDownloadable}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div>
                      <div>{device.name}</div>
                      <div className="text-xs text-muted-foreground">{device.deviceModel}</div>
                    </div>
                    {!device.isDownloadable && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertCircle className="h-4 w-4 ml-2 text-amber-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This device is not downloadable</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                <TableCell>{device.deviceIdentifier}</TableCell>
                <TableCell>
                  <div>{device.material}</div>
                  <div className="text-xs text-muted-foreground">{device.materialDescription}</div>
                </TableCell>
                <TableCell>
                  <div>{device.deviceGroup}</div>
                  <div className="text-xs text-muted-foreground">{device.deviceGroupName}</div>
                </TableCell>
                <TableCell>{device.manufacturerName}</TableCell>
                <TableCell>
                  <SrvStatusIcon status={device.srvStatus} isDownloadable={device.isDownloadable} />
                </TableCell>
                <TableCell>{device.lastUpdated}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No devices match your filter criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
