
import { DeviceData, SrvStatus } from '@/types/device';

export const generateMockDevices = (config: { authority: string }): DeviceData[] => {
  const prefixes: Record<string, string> = {
    fda: "US-",
    ema: "EU-",
    pmda: "JP-",
    anvisa: "BR-",
    nmpa: "CN-",
  };
  
  const prefix = prefixes[config.authority] || "XX-";
  const srvStatuses: Array<SrvStatus> = [
    'started', 'in progress', 'completed', 'none'
  ];
  
  return Array.from({ length: 20 }, (_, i) => {
    const srvStatus = srvStatuses[i % 4];
    const status = srvStatus === 'completed' ? 'Submitted' : 
                   srvStatus === 'in progress' ? 'Processed' : 
                   srvStatus === 'started' ? 'Created' : 'Needs Update';
                   
    return {
      id: `${i + 1}`,
      name: `Medical Device ${i + 1}`,
      deviceIdentifier: `${prefix}${100000 + i}`,
      manufacturerName: `MedTech Corp ${i % 3 ? "Inc." : "LLC"}`,
      deviceModel: `Model ${String.fromCharCode(65 + (i % 26))}-${i % 10}`,
      lastUpdated: new Date(Date.now() - i * 86400000 * (i % 10 + 1)).toISOString().split('T')[0],
      material: `MAT-${1000 + i * 2}`,
      materialDescription: `Medical grade material ${['A', 'B', 'C', 'D'][i % 4]}`,
      deviceGroup: `DG-${100 + i % 5}`,
      deviceGroupName: `${['Implantable', 'Disposable', 'Reusable', 'Electronic', 'Diagnostic'][i % 5]} Devices`,
      srvStatus,
      selected: false,
      isDownloadable: srvStatus === 'completed',
      status: status
    };
  });
};

export const isDeviceDownloadable = (device: DeviceData) => {
  return device.srvStatus === 'completed';
};
