
import { DeviceData } from '@/types/device';
import { DeviceDataWithAgencies } from '@/data/mockDeviceData';

export const convertDeviceForTable = (device: DeviceData): DeviceDataWithAgencies => {
  const status: 'Submitted' | 'Processed' | 'Created' | 'Needs Update' = 
    device.srvStatus === 'completed' ? 'Submitted' : 
    device.srvStatus === 'in progress' ? 'Processed' : 
    device.srvStatus === 'started' ? 'Created' : 'Needs Update';
    
  return {
    id: device.id,
    name: device.name,
    status: status,
    agencies: [device.manufacturerName],
    lastUpdated: device.lastUpdated
  };
};

