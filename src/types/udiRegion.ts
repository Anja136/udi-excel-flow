
export type UdiRegistrationStatus = 'REQUIRED' | 'IN_PROCESS' | 'UPCOMING' | 'NOT_REQUIRED';

export interface UdiRegion {
  id: string;
  name: string;
  code: string;
  database: string;
  status: UdiRegistrationStatus;
  color: string;
  coordinates: [number, number]; // [longitude, latitude]
  description?: string;
  implementationDate?: string;
  flagCode?: string;
}

export interface RegionFilter {
  status: UdiRegistrationStatus[];
  regions: string[];
}
