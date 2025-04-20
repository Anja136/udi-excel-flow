
import { DeviceStatus } from '@/types/agency';
import { SrvStatus } from '@/types/device';

export interface DeviceDataWithAgencies {
  id: string;
  name: string;
  status: 'Submitted' | 'Processed' | 'Needs Update' | 'Created';
  agencies: string[];
  lastUpdated: string;
  srvStatus: SrvStatus;
  isDownloadable: boolean;
}

export const mockDeviceData: DeviceDataWithAgencies[] = [
  // GUDID Devices (28 total: Created=4, Processed=8, Submitted=12, Needs Update=4)
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
    id: "UDI-DI-00009",
    name: "Smart Hospital Bed H200",
    status: "Created",
    agencies: ["GUDID", "TUDID"],
    lastUpdated: "Apr 16, 2025, 04:20 PM"
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
    id: "UDI-DI-00014",
    name: "ECG Machine E200",
    status: "Created",
    agencies: ["GUDID", "AusUDID", "EUDAMED"],
    lastUpdated: "Apr 17, 2025, 12:15 PM"
  },
  {
    id: "UDI-DI-00016",
    name: "Defibrillator D2000",
    status: "Submitted",
    agencies: ["GUDID", "EUDAMED"],
    lastUpdated: "Apr 15, 2025, 09:30 AM"
  },
  {
    id: "UDI-DI-00017",
    name: "Anesthesia Machine A1000",
    status: "Submitted",
    agencies: ["GUDID"],
    lastUpdated: "Apr 14, 2025, 10:20 AM"
  },
  {
    id: "UDI-DI-00018",
    name: "Pulse Oximeter PO100",
    status: "Processed",
    agencies: ["GUDID", "IMDIS"],
    lastUpdated: "Apr 13, 2025, 11:45 AM"
  },
  {
    id: "UDI-DI-00019",
    name: "Ultrasound Scanner US500",
    status: "Processed",
    agencies: ["GUDID"],
    lastUpdated: "Apr 12, 2025, 01:15 PM"
  },
  {
    id: "UDI-DI-00020",
    name: "Prosthetic Knee K300",
    status: "Submitted",
    agencies: ["GUDID", "EUDAMED"],
    lastUpdated: "Apr 11, 2025, 02:40 PM"
  },
  {
    id: "UDI-DI-00021",
    name: "Oxygen Concentrator OC200",
    status: "Processed",
    agencies: ["GUDID"],
    lastUpdated: "Apr 10, 2025, 03:25 PM"
  },
  {
    id: "UDI-DI-00022",
    name: "CT Scanner CT1000",
    status: "Submitted",
    agencies: ["GUDID", "IMDIS"],
    lastUpdated: "Apr 9, 2025, 04:05 PM"
  },
  {
    id: "UDI-DI-00023",
    name: "Dialysis Machine DM500",
    status: "Needs Update",
    agencies: ["GUDID", "EUDAMED"],
    lastUpdated: "Apr 8, 2025, 09:15 AM"
  },
  {
    id: "UDI-DI-00024",
    name: "Hearing Aid HA100",
    status: "Processed",
    agencies: ["GUDID", "AusUDID"],
    lastUpdated: "Apr 7, 2025, 10:30 AM"
  },
  {
    id: "UDI-DI-00025",
    name: "Syringe Pump SP300",
    status: "Submitted",
    agencies: ["GUDID"],
    lastUpdated: "Apr 6, 2025, 11:45 AM"
  },
  {
    id: "UDI-DI-00026",
    name: "Endoscopy System ES2000",
    status: "Created",
    agencies: ["GUDID", "TUDID"],
    lastUpdated: "Apr 5, 2025, 01:20 PM"
  },
  {
    id: "UDI-DI-00027",
    name: "Dental Chair DC400",
    status: "Submitted",
    agencies: ["GUDID"],
    lastUpdated: "Apr 4, 2025, 02:45 PM"
  },
  {
    id: "UDI-DI-00028",
    name: "X-Ray Machine XR1000",
    status: "Processed",
    agencies: ["GUDID", "IMDIS"],
    lastUpdated: "Apr 3, 2025, 03:50 PM"
  },
  {
    id: "UDI-DI-00029",
    name: "Breast Pump BP200",
    status: "Submitted",
    agencies: ["GUDID", "EUDAMED"],
    lastUpdated: "Apr 2, 2025, 09:10 AM"
  },
  {
    id: "UDI-DI-00030",
    name: "Wheelchair WC500",
    status: "Needs Update",
    agencies: ["GUDID"],
    lastUpdated: "Apr 1, 2025, 10:35 AM"
  },
  {
    id: "UDI-DI-00031",
    name: "Infusion Pump IP200",
    status: "Submitted",
    agencies: ["GUDID", "AusUDID"],
    lastUpdated: "Mar 31, 2025, 11:55 AM"
  },
  {
    id: "UDI-DI-00032",
    name: "CPAP Machine CM300",
    status: "Submitted",
    agencies: ["GUDID"],
    lastUpdated: "Mar 30, 2025, 01:30 PM"
  },
  {
    id: "UDI-DI-00033",
    name: "Blood Analyzer BA1000",
    status: "Processed",
    agencies: ["GUDID", "TUDID"],
    lastUpdated: "Mar 29, 2025, 02:50 PM"
  },
  {
    id: "UDI-DI-00034",
    name: "Orthopedic Brace OB200",
    status: "Created",
    agencies: ["GUDID", "EUDAMED"],
    lastUpdated: "Mar 28, 2025, 04:15 PM"
  },
  {
    id: "UDI-DI-00035",
    name: "Sterilizer S1000",
    status: "Submitted",
    agencies: ["GUDID", "IMDIS"],
    lastUpdated: "Mar 27, 2025, 09:40 AM"
  },
  {
    id: "UDI-DI-00036",
    name: "Nebulizer N300",
    status: "Needs Update",
    agencies: ["GUDID", "AusUDID"],
    lastUpdated: "Mar 26, 2025, 10:55 AM"
  },
  {
    id: "UDI-DI-00037",
    name: "Hydrotherapy Tank HT500",
    status: "Submitted",
    agencies: ["GUDID"],
    lastUpdated: "Mar 25, 2025, 01:15 PM"
  },

  // EUDAMED Devices (24 total: Created=6, Processed=6, Submitted=8, Needs Update=4)
  // (Some already included with GUDID above)
  {
    id: "UDI-DI-00003",
    name: "Orthopedic Implant P300",
    status: "Created",
    agencies: ["EUDAMED"],
    lastUpdated: "Apr 10, 2025, 09:15 AM"
  },
  {
    id: "UDI-DI-00008",
    name: "Digital Stethoscope D100",
    status: "Needs Update",
    agencies: ["EUDAMED", "AusUDID"],
    lastUpdated: "Apr 16, 2025, 01:30 PM"
  },
  {
    id: "UDI-DI-00038",
    name: "Blood Pressure Monitor BPM100",
    status: "Submitted",
    agencies: ["EUDAMED"],
    lastUpdated: "Apr 15, 2025, 02:30 PM"
  },
  {
    id: "UDI-DI-00039",
    name: "Neurostimulator NS500",
    status: "Processed",
    agencies: ["EUDAMED", "IMDIS"],
    lastUpdated: "Apr 14, 2025, 03:45 PM"
  },
  {
    id: "UDI-DI-00040",
    name: "Insulin Pen IP100",
    status: "Created",
    agencies: ["EUDAMED"],
    lastUpdated: "Apr 13, 2025, 09:20 AM"
  },
  {
    id: "UDI-DI-00041",
    name: "Dental Implant DI300",
    status: "Submitted",
    agencies: ["EUDAMED", "AusUDID"],
    lastUpdated: "Apr 12, 2025, 10:40 AM"
  },
  {
    id: "UDI-DI-00042",
    name: "Laser Surgery System LSS1000",
    status: "Processed",
    agencies: ["EUDAMED"],
    lastUpdated: "Apr 11, 2025, 11:55 AM"
  },
  {
    id: "UDI-DI-00043",
    name: "Exercise Stress Test EST500",
    status: "Needs Update",
    agencies: ["EUDAMED", "IMDIS"],
    lastUpdated: "Apr 10, 2025, 01:10 PM"
  },
  {
    id: "UDI-DI-00044",
    name: "Mammography Unit MU1000",
    status: "Created",
    agencies: ["EUDAMED"],
    lastUpdated: "Apr 9, 2025, 02:25 PM"
  },
  {
    id: "UDI-DI-00045",
    name: "Spirometer S300",
    status: "Processed",
    agencies: ["EUDAMED", "AusUDID"],
    lastUpdated: "Apr 8, 2025, 03:50 PM"
  },
  {
    id: "UDI-DI-00046",
    name: "Traction Device TD500",
    status: "Submitted",
    agencies: ["EUDAMED"],
    lastUpdated: "Apr 7, 2025, 09:15 AM"
  },
  {
    id: "UDI-DI-00047",
    name: "Contrast Media Injector CMI1000",
    status: "Created",
    agencies: ["EUDAMED", "IMDIS"],
    lastUpdated: "Apr 6, 2025, 10:30 AM"
  },
  
  // IMDIS Devices (20 total: Created=3, Processed=5, Submitted=8, Needs Update=4)
  // (Some already included with GUDID and EUDAMED above)
  {
    id: "UDI-DI-00004",
    name: "Blood Glucose Monitor G400",
    status: "Needs Update",
    agencies: ["IMDIS"],
    lastUpdated: "Apr 12, 2025, 02:20 PM"
  },
  {
    id: "UDI-DI-00010",
    name: "Dental Implant System I300",
    status: "Submitted",
    agencies: ["IMDIS", "AusUDID"],
    lastUpdated: "Apr 16, 2025, 05:45 PM"
  },
  {
    id: "UDI-DI-00013",
    name: "Ultrasound System U400",
    status: "Submitted",
    agencies: ["TUDID", "IMDIS"],
    lastUpdated: "Apr 17, 2025, 11:45 AM"
  },
  {
    id: "UDI-DI-00015",
    name: "Infusion Pump IP100",
    status: "Processed",
    agencies: ["IMDIS", "TUDID"],
    lastUpdated: "Apr 17, 2025, 01:20 PM"
  },
  {
    id: "UDI-DI-00048",
    name: "Electrosurgical Unit ESU500",
    status: "Created",
    agencies: ["IMDIS"],
    lastUpdated: "Apr 5, 2025, 11:45 AM"
  },
  {
    id: "UDI-DI-00049",
    name: "Radiation Therapy System RTS1000",
    status: "Submitted",
    agencies: ["IMDIS", "GUDID"],
    lastUpdated: "Apr 4, 2025, 01:20 PM"
  },
  {
    id: "UDI-DI-00050",
    name: "Arthroscopy System AS500",
    status: "Processed",
    agencies: ["IMDIS"],
    lastUpdated: "Apr 3, 2025, 02:35 PM"
  },
  {
    id: "UDI-DI-00051",
    name: "Glucose Sensor GS100",
    status: "Needs Update",
    agencies: ["IMDIS", "EUDAMED"],
    lastUpdated: "Apr 2, 2025, 03:50 PM"
  },
  {
    id: "UDI-DI-00052",
    name: "Therapeutic Ultrasound TU300",
    status: "Created",
    agencies: ["IMDIS"],
    lastUpdated: "Apr 1, 2025, 09:10 AM"
  },
  {
    id: "UDI-DI-00053",
    name: "Medical Refrigerator MR500",
    status: "Submitted",
    agencies: ["IMDIS", "AusUDID"],
    lastUpdated: "Mar 31, 2025, 10:25 AM"
  },
  
  // TUDID Devices (15 total: Created=4, Processed=3, Submitted=5, Needs Update=3)
  // (Some already included with other agencies above)
  {
    id: "UDI-DI-00005",
    name: "Ventilator T500",
    status: "Created",
    agencies: ["TUDID"],
    lastUpdated: "Apr 14, 2025, 10:05 AM"
  },
  {
    id: "UDI-DI-00054",
    name: "Anaesthesia Workstation AW1000",
    status: "Submitted",
    agencies: ["TUDID"],
    lastUpdated: "Mar 30, 2025, 11:40 AM"
  },
  {
    id: "UDI-DI-00055",
    name: "Surgical Light SL500",
    status: "Needs Update",
    agencies: ["TUDID", "EUDAMED"],
    lastUpdated: "Mar 29, 2025, 01:05 PM"
  },
  {
    id: "UDI-DI-00056",
    name: "Thermometer T100",
    status: "Processed",
    agencies: ["TUDID"],
    lastUpdated: "Mar 28, 2025, 02:20 PM"
  },
  {
    id: "UDI-DI-00057",
    name: "Infant Incubator II500",
    status: "Submitted",
    agencies: ["TUDID", "IMDIS"],
    lastUpdated: "Mar 27, 2025, 03:35 PM"
  },
  {
    id: "UDI-DI-00058",
    name: "Patient Warming System PWS1000",
    status: "Created",
    agencies: ["TUDID"],
    lastUpdated: "Mar 26, 2025, 09:50 AM"
  },
  {
    id: "UDI-DI-00059",
    name: "Surgical Drill SD300",
    status: "Submitted",
    agencies: ["TUDID", "AusUDID"],
    lastUpdated: "Mar 25, 2025, 11:15 AM"
  },
  {
    id: "UDI-DI-00060",
    name: "Ophthalmology Microscope OM500",
    status: "Needs Update",
    agencies: ["TUDID"],
    lastUpdated: "Mar 24, 2025, 01:30 PM"
  },
  {
    id: "UDI-DI-00061",
    name: "Hospital Bed HB1000",
    status: "Created",
    agencies: ["TUDID", "GUDID"],
    lastUpdated: "Mar 23, 2025, 02:45 PM"
  },
  
  // AusUDID Devices (18 total: Created=3, Processed=4, Submitted=7, Needs Update=4)
  // (Some already included with other agencies above)
  {
    id: "UDI-DI-00062",
    name: "Spinal Fixation System SFS500",
    status: "Submitted",
    agencies: ["AusUDID"],
    lastUpdated: "Mar 22, 2025, 04:00 PM"
  },
  {
    id: "UDI-DI-00063",
    name: "Diagnostic ECG ECG300",
    status: "Processed",
    agencies: ["AusUDID", "EUDAMED"],
    lastUpdated: "Mar 21, 2025, 09:20 AM"
  },
  {
    id: "UDI-DI-00064",
    name: "Surgical Table ST1000",
    status: "Needs Update",
    agencies: ["AusUDID"],
    lastUpdated: "Mar 20, 2025, 10:35 AM"
  },
  {
    id: "UDI-DI-00065",
    name: "Rehabilitation Robot RR500",
    status: "Created",
    agencies: ["AusUDID", "GUDID"],
    lastUpdated: "Mar 19, 2025, 11:50 AM"
  },
  {
    id: "UDI-DI-00066",
    name: "Compression Therapy System CTS300",
    status: "Submitted",
    agencies: ["AusUDID"],
    lastUpdated: "Mar 18, 2025, 01:15 PM"
  },
  {
    id: "UDI-DI-00067",
    name: "Laryngoscope L100",
    status: "Processed",
    agencies: ["AusUDID", "IMDIS"],
    lastUpdated: "Mar 17, 2025, 02:30 PM"
  },
  {
    id: "UDI-DI-00068",
    name: "Medication Dispensing System MDS500",
    status: "Needs Update",
    agencies: ["AusUDID"],
    lastUpdated: "Mar 16, 2025, 03:45 PM"
  }
];
