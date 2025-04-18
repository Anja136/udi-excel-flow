
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { DeviceStatusBadge } from "@/components/devices/DeviceStatusBadge";
import { mockDeviceData } from '@/data/mockDeviceData';

interface DeviceTableProps {
  showCheckboxes: boolean;
  selectedDevices: string[];
  onSelectAllDevices: (checked: boolean) => void;
  onSelectDevice: (deviceId: string, checked: boolean) => void;
  filteredDevices: typeof mockDeviceData;
  isAgencyAccessible: boolean;
}

export const DeviceTable = ({
  showCheckboxes,
  selectedDevices,
  onSelectAllDevices,
  onSelectDevice,
  filteredDevices,
  isAgencyAccessible
}: DeviceTableProps) => {
  const allSelected = filteredDevices.length > 0 && 
    filteredDevices.every(device => selectedDevices.includes(device.id));

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {showCheckboxes && (
              <TableHead className="w-12">
                <Checkbox 
                  checked={allSelected}
                  onCheckedChange={onSelectAllDevices}
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
                        onCheckedChange={(checked) => onSelectDevice(device.id, !!checked)}
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
                  No devices found
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
  );
};
