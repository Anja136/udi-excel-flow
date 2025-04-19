
import React from 'react';
import { type Agency } from '@/types/agency';
import AgencyCard from '@/components/agency/AgencyCard';

const Hub = () => {
  // Define agencies in the specified order: GUDID, EUDAMED, CUDID, IMDIS, Saudi-DI, TUDID, AusUDID
  const agencies: Agency[] = [
    {
      id: "gudid",
      name: "U.S. FDA Global Unique Device Identification Database",
      shortName: "GUDID",
      description: "U.S. FDA Global Unique Device Identification Database",
      totalDevices: 28,
      color: "#0EA5E9",
      status: {
        created: 4,
        processed: 8,
        submitted: 12,
        needsUpdate: 4  // Keeping consistent with the Agency Hub screenshot (4)
      }
    },
    {
      id: "eudamed",
      name: "European Database on Medical Devices",
      shortName: "EUDAMED",
      description: "European Database on Medical Devices",
      totalDevices: 24,
      color: "#2563EB",
      status: {
        created: 6,
        processed: 6,
        submitted: 8,
        needsUpdate: 4
      }
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
      totalDevices: 20,
      color: "#EC4899",
      flag: "/flags/kr.png",
      status: {
        created: 3,
        processed: 5,
        submitted: 8,
        needsUpdate: 4
      }
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
      totalDevices: 15,
      color: "#EF4444",
      flag: "/flags/tw.png",
      status: {
        created: 4,
        processed: 3,
        submitted: 5,
        needsUpdate: 3
      }
    },
    {
      id: "ausudid",
      name: "Australian Unique Device Identification Database",
      shortName: "AusUDID",
      description: "Australian Unique Device Identification Database",
      totalDevices: 18,
      color: "#F59E0B",
      flag: "/flags/au.png",
      status: {
        created: 3,
        processed: 4,
        submitted: 7,
        needsUpdate: 4
      }
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
