
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
  },
  {
    id: "UDI-DI-00005",
    name: "Ventilator T500",
    status: "Created",
    agencies: ["TUDID"],
    lastUpdated: "Apr 14, 2025, 10:05 AM"
  },
  {
    id: "UDI-DI-00006",
    name: "Surgical Mask M600",
    status: "Submitted",
    agencies: ["TUDID", "AusUDID"],
    lastUpdated: "Apr 15, 2025, 03:40 PM"
  },
  {
    id: "UDI-DI-00007",
    name: "MRI Scanner Pro X1",
    status: "Processed",
    agencies: ["GUDID", "EUDAMED", "IMDIS"],
    lastUpdated: "Apr 16, 2025, 08:15 AM"
  },
  {
    id: "UDI-DI-00008",
    name: "Digital Stethoscope D100",
    status: "Needs Update",
    agencies: ["EUDAMED", "AusUDID"],
    lastUpdated: "Apr 16, 2025, 01:30 PM"
  },
  {
    id: "UDI-DI-00009",
    name: "Smart Hospital Bed H200",
    status: "Created",
    agencies: ["GUDID", "TUDID"],
    lastUpdated: "Apr 16, 2025, 04:20 PM"
  },
  {
    id: "UDI-DI-00010",
    name: "Dental Implant System I300",
    status: "Submitted",
    agencies: ["IMDIS", "AusUDID"],
    lastUpdated: "Apr 16, 2025, 05:45 PM"
  },
  {
    id: "UDI-DI-00011",
    name: "Patient Monitor PM500",
    status: "Processed",
    agencies: ["GUDID", "EUDAMED"],
    lastUpdated: "Apr 17, 2025, 09:10 AM"
  },
  {
    id: "UDI-DI-00012",
    name: "Surgical Robot SR1000",
    status: "Needs Update",
    agencies: ["GUDID", "EUDAMED", "IMDIS", "AusUDID"],
    lastUpdated: "Apr 17, 2025, 10:30 AM"
  },
  {
    id: "UDI-DI-00013",
    name: "Ultrasound System U400",
    status: "Submitted",
    agencies: ["TUDID", "IMDIS"],
    lastUpdated: "Apr 17, 2025, 11:45 AM"
  },
  {
    id: "UDI-DI-00014",
    name: "ECG Machine E200",
    status: "Created",
    agencies: ["GUDID", "AusUDID", "EUDAMED"],
    lastUpdated: "Apr 17, 2025, 12:15 PM"
  },
  {
    id: "UDI-DI-00015",
    name: "Infusion Pump IP100",
    status: "Processed",
    agencies: ["IMDIS", "TUDID"],
    lastUpdated: "Apr 17, 2025, 01:20 PM"
  }
];
