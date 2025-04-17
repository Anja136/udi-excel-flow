
import React from 'react';

type StatusBadgeProps = {
  label: string;
  count: number;
  className?: string;
};

const StatusBadge = ({ label, count, className = '' }: StatusBadgeProps) => {
  const baseClasses = "px-4 py-2 rounded-md flex items-center justify-between gap-2";
  const colorClasses = {
    Created: "bg-blue-100 text-blue-700",
    Processed: "bg-yellow-100 text-yellow-700",
    Submitted: "bg-green-100 text-green-700",
    "Needs Update": "bg-red-100 text-red-700"
  }[label] || "bg-gray-100 text-gray-700";

  return (
    <div className={`${baseClasses} ${colorClasses} ${className}`}>
      <span className="font-medium">{label}</span>
      <span className="font-bold">{count}</span>
    </div>
  );
};

export default StatusBadge;
