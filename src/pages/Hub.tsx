import React from 'react';
import { type Agency } from '@/types/agency';
import AgencyCard from '@/components/agency/AgencyCard';

const Hub = () => {
  const agencies: Agency[] = [
    {
      id: "gudid",
      name: "U.S. FDA Global Unique Device Identification Database",
      shortName: "GUDID",
      description: "U.S. FDA Global Unique Device Identification Database",
      totalDevices: 8,
      color: "#0EA5E9",
      status: {
        created: 1,
        processed: 3,
        submitted: 3,
        needsUpdate: 1
      }
    },
    {
      id: "eudamed",
      name: "European Database on Medical Devices",
      shortName: "EUDAMED",
      description: "European Database on Medical Devices",
      totalDevices: 7,
      color: "#2563EB",
      status: {
        created: 2,
        processed: 2,
        submitted: 1,
        needsUpdate: 2
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
      totalDevices: 5,
      color: "#EC4899",
      status: {
        created: 1,
        processed: 0,
        submitted: 2,
        needsUpdate: 2
      }
    },
    {
      id: "ausudid",
      name: "Australian Unique Device Identification Database",
      shortName: "AusUDID",
      description: "Australian Unique Device Identification Database",
      totalDevices: 5,
      color: "#F59E0B",
      status: {
        created: 1,
        processed: 1,
        submitted: 2,
        needsUpdate: 1
      }
    },
    {
      id: "tudi",
      name: "Turkish UDI Database",
      shortName: "TUDI",
      description: "Turkish UDI Database",
      totalDevices: 3,
      color: "#EF4444",
      status: {
        created: 1,
        processed: 1,
        submitted: 0,
        needsUpdate: 1
      }
    },
    {
      id: "saudi-di",
      name: "Saudi UDI Database",
      shortName: "Saudi-DI",
      description: "Saudi UDI Database",
      totalDevices: 0,
      color: "#10B981",
      isAccessible: false,
      status: {
        created: 0,
        processed: 0,
        submitted: 0,
        needsUpdate: 0
      }
    }
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Agency Status Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {agencies.map(agency => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>
    </div>
  );
};

export default Hub;
