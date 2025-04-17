
import React from 'react';

type StatusBadgeProps = {
  label: string;
  count: number;
  className?: string;
};

const StatusBadge = ({ label, count, className = '' }: StatusBadgeProps) => {
  const baseClasses = "px-4 py-2 rounded-md flex items-center justify-between gap-2";
  
  // Get color classes and tooltip based on status label
  const getStatusInfo = (label: string) => {
    switch (label) {
      case 'Created':
        return {
          colorClasses: "bg-blue-100 text-blue-700",
          tooltip: 'Data uploaded but not yet imported'
        };
      case 'Processed':
        return {
          colorClasses: "bg-yellow-100 text-yellow-700",
          tooltip: 'Data imported but not yet submitted'
        };
      case 'Submitted':
        return {
          colorClasses: "bg-green-100 text-green-700",
          tooltip: 'Data submitted and processed'
        };
      case 'Needs Update':
        return {
          colorClasses: "bg-red-100 text-red-700",
          tooltip: 'Updates required'
        };
      default:
        return {
          colorClasses: "bg-gray-100 text-gray-700",
          tooltip: ''
        };
    }
  };

  const statusInfo = getStatusInfo(label);

  return (
    <div 
      className={`${baseClasses} ${statusInfo.colorClasses} ${className}`}
      title={statusInfo.tooltip}
    >
      <span className="font-medium">{label}</span>
      <span className="font-bold">{count}</span>
    </div>
  );
};

export default StatusBadge;
