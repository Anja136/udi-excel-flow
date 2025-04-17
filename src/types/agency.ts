
export type DeviceStatus = {
  created: number;
  processed: number;
  submitted: number;
  needsUpdate: number;
};

export type Agency = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  totalDevices: number;
  status: DeviceStatus;
  color: string;
  isAccessible?: boolean;
};
