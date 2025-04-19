
import React from 'react';
import { Badge } from "@/components/ui/badge";

export type DeviceStatus = 'Created' | 'Processed' | 'Submitted' | 'Needs Update';

interface DeviceStatusBadgeProps {
  status: DeviceStatus;
}

export const DeviceStatusBadge: React.FC<DeviceStatusBadgeProps> = ({ status }) => {
  // Normalize status for consistent rendering
  const normalizedStatus = status.toLowerCase().includes('need') 
    ? 'Needs Update' 
    : status;
    
  const getStatusInfo = (status: string) => {
    // Normalize the status to handle variations
    const normalizedStatusKey = status.toLowerCase().replace(/\s+/g, '');
    
    switch (normalizedStatusKey) {
      case 'created':
        return {
          color: 'bg-blue-100 text-blue-700',
          tooltip: 'Data uploaded but not yet imported'
        };
      case 'processed':
        return {
          color: 'bg-yellow-100 text-yellow-700',
          tooltip: 'Data imported but not yet submitted'
        };
      case 'submitted':
        return {
          color: 'bg-green-100 text-green-700',
          tooltip: 'Data submitted and processed'
        };
      case 'needsupdate':
      case 'needupdate':
      case 'needupdates':
        return {
          color: 'bg-red-100 text-red-700',
          tooltip: 'Updates required'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700',
          tooltip: ''
        };
    }
  };

  const statusInfo = getStatusInfo(normalizedStatus);

  return (
    <span 
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${statusInfo.color}`}
      title={statusInfo.tooltip}
    >
      {normalizedStatus}
    </span>
  );
};
