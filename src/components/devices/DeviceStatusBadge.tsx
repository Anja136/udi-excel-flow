
import React from 'react';
import { Badge } from "@/components/ui/badge";

export type DeviceStatus = 'Created' | 'Processed' | 'Submitted' | 'Needs Update';

interface DeviceStatusBadgeProps {
  status: DeviceStatus;
}

export const DeviceStatusBadge: React.FC<DeviceStatusBadgeProps> = ({ status }) => {
  const getStatusInfo = (status: DeviceStatus) => {
    switch (status) {
      case 'Created':
        return {
          color: 'bg-blue-100 text-blue-700',
          tooltip: 'Data uploaded but not yet imported'
        };
      case 'Processed':
        return {
          color: 'bg-yellow-100 text-yellow-700',
          tooltip: 'Data imported but not yet submitted'
        };
      case 'Submitted':
        return {
          color: 'bg-green-100 text-green-700',
          tooltip: 'Data submitted and processed'
        };
      case 'Needs Update':
        return {
          color: 'bg-red-100 text-red-700',
          tooltip: 'Updates required'
        };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <span 
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${statusInfo.color}`}
      title={statusInfo.tooltip}
    >
      {status}
    </span>
  );
};

