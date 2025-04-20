
export interface DeviceData {
  id: string;
  name: string;
  deviceIdentifier: string;
  manufacturerName: string;
  deviceModel: string;
  lastUpdated: string;
  material: string;
  materialDescription: string;
  deviceGroup: string;
  deviceGroupName: string;
  srvStatus: 'started' | 'in progress' | 'completed' | 'none';
  selected: boolean;
  isDownloadable: boolean;
  status: 'Submitted' | 'Processed' | 'Created' | 'Needs Update';
}

export type SrvStatus = 'started' | 'in progress' | 'completed' | 'none';

// Add the DeviceStatus type export
export type DeviceStatus = 'Submitted' | 'Processed' | 'Created' | 'Needs Update';
