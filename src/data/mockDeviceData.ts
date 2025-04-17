
import { DeviceStatus } from '@/types/agency';

export interface DeviceDataWithAgencies {
  id: string;
  name: string;
  status: 'Submitted' | 'Processed' | 'Needs Update' | 'Created';
  agencies: string[];
  lastUpdated: string;
}

export const mockDeviceData: DeviceDataWithAgencies[] = [
  {
    id: "UDI-DI-00001",
    name: "Cardiac Pacemaker X100",
    status: "Submitted",
    agencies: ["GUDID", "EUDAMED", "IMDIS"],
    lastUpdated: "Mar 15, 2025, 11:30 AM"
  },
  {
    id: "UDI-DI-00002",
    name: "Insulin Pump S200",
    status: "Processed",
    agencies: ["GUDID", "AusUDID"],
    lastUpdated: "Apr 2, 2025, 04:45 PM"
  },
  {
    id: "UDI-DI-00003",
    name: "Orthopedic Implant P300",
    status: "Created",
    agencies: ["EUDAMED"],
    lastUpdated: "Apr 10, 2025, 09:15 AM"
  },
  {
    id: "UDI-DI-00004",
    name: "Blood Glucose Monitor G400",
    status: "Needs Update",
    agencies: ["GUDID", "IMDIS"],
    lastUpdated: "Apr 12, 2025, 02:20 PM"
  }
];
