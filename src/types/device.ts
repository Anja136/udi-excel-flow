
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
}

export type SrvStatus = 'started' | 'in progress' | 'completed' | 'none';
