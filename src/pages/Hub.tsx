
import React from 'react';
import { type Agency } from '@/types/agency';
import AgencyCard from '@/components/agency/AgencyCard';
import { mockDeviceData } from '@/data/mockDeviceData';

const Hub = () => {
  // Calculate actual device counts from mockDeviceData
  const calculateAgencyStatus = (agencyName: string) => {
    // Filter devices for this agency
    const agencyDevices = mockDeviceData.filter(device => 
      device.agencies.includes(agencyName)
    );
    
    // Count devices by status
    return {
      created: agencyDevices.filter(device => device.status === 'Created').length,
      processed: agencyDevices.filter(device => device.status === 'Processed').length,
      submitted: agencyDevices.filter(device => device.status === 'Submitted').length,
      needsUpdate: agencyDevices.filter(device => device.status === 'Needs Update').length
    };
  };
  
  // Define agencies in the specified order: GUDID, EUDAMED, CUDID, IMDIS, Saudi-DI, TUDID, AusUDID
  const agencies: Agency[] = [
    {
      id: "gudid",
      name: "U.S. FDA Global Unique Device Identification Database",
      shortName: "GUDID",
      description: "U.S. FDA Global Unique Device Identification Database",
      totalDevices: mockDeviceData.filter(device => device.agencies.includes("GUDID")).length,
      color: "#0EA5E9",
      status: calculateAgencyStatus("GUDID")
    },
    {
      id: "eudamed",
      name: "European Database on Medical Devices",
      shortName: "EUDAMED",
      description: "European Database on Medical Devices",
      totalDevices: mockDeviceData.filter(device => device.agencies.includes("EUDAMED")).length,
      color: "#2563EB",
      status: calculateAgencyStatus("EUDAMED")
    },
    {
      id: "cudid",
      name: "China Unique Device Identification Database",
      shortName: "CUDID",
      description: "China Unique Device Identification Database",
      totalDevices: 0,
      color: "#9B87F5",
      isAccessible: false,
      status: {
        created: 0,
        processed: 0,
        submitted: 0,
        needsUpdate: 0
      }
    },
    {
      id: "imdis",
      name: "South Korean UDI Database",
      shortName: "IMDIS",
      description: "South Korean UDI Database",
      totalDevices: mockDeviceData.filter(device => device.agencies.includes("IMDIS")).length,
      color: "#EC4899",
      flag: "/flags/kr.png",
      status: calculateAgencyStatus("IMDIS")
    },
    {
      id: "saudi-di",
      name: "Saudi UDI Database",
      shortName: "Saudi-DI",
      description: "Saudi UDI Database",
      totalDevices: 0,
      color: "#10B981",
      flag: "/flags/sa.png",
      isAccessible: false,
      status: {
        created: 0,
        processed: 0,
        submitted: 0,
        needsUpdate: 0
      }
    },
    {
      id: "tudid",
      name: "Taiwanese UDI Database",
      shortName: "TUDID",
      description: "Taiwanese UDI Database",
      totalDevices: mockDeviceData.filter(device => device.agencies.includes("TUDID")).length,
      color: "#EF4444",
      flag: "/flags/tw.png",
      status: calculateAgencyStatus("TUDID")
    },
    {
      id: "ausudid",
      name: "Australian Unique Device Identification Database",
      shortName: "AusUDID",
      description: "Australian Unique Device Identification Database",
      totalDevices: mockDeviceData.filter(device => device.agencies.includes("AusUDID")).length,
      color: "#F59E0B",
      flag: "/flags/au.png",
      status: calculateAgencyStatus("AusUDID")
    }
  ];

  // Directly use the agencies array without sorting to maintain the defined order
  // Only sort unaccessible agencies to the end
  const displayedAgencies = [...agencies].sort((a, b) => {
    if (a.isAccessible === false && b.isAccessible !== false) return 1;
    if (a.isAccessible !== false && b.isAccessible === false) return -1;
    return 0;
  });

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Agency Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayedAgencies.map(agency => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>
    </div>
  );
};

export default Hub;
