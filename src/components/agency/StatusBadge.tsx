
import React from 'react';
import { useNavigate } from 'react-router-dom';

type StatusBadgeProps = {
  label: string;
  count: number;
  className?: string;
  agency?: string;
};

const StatusBadge = ({ label, count, className = '', agency }: StatusBadgeProps) => {
  const navigate = useNavigate();
  const baseClasses = "px-4 py-2 rounded-md flex items-center justify-between gap-2 cursor-pointer hover:opacity-80 transition-opacity";
  
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
          tooltip: 'Submitted to agency and successfully registered'
        };
      case 'Needs Update':
        return {
          colorClasses: "bg-red-100 text-red-700",
          tooltip: 'Submitted to agency with error'
        };
      default:
        return {
          colorClasses: "bg-gray-100 text-gray-700",
          tooltip: ''
        };
    }
  };

  const statusInfo = getStatusInfo(label);

  const handleClick = () => {
    const params = new URLSearchParams();
    if (agency) params.set('agency', agency);
    params.set('status', label);
    navigate(`/devices?${params.toString()}`);
  };

  return (
    <div 
      className={`${baseClasses} ${statusInfo.colorClasses} ${className}`}
      title={statusInfo.tooltip}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <span className="font-medium">{label}</span>
      <span className="font-bold">{count}</span>
    </div>
  );
};

export default StatusBadge;
