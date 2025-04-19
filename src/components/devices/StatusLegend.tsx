
import React from 'react';
import { CircleDot } from 'lucide-react';

export const StatusLegend: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 text-xs">
        <CircleDot className="h-3 w-3 text-yellow-500" /> Started
      </span>
      <span className="flex items-center gap-1 text-xs">
        <CircleDot className="h-3 w-3 text-blue-500" /> In Progress
      </span>
      <span className="flex items-center gap-1 text-xs">
        <CircleDot className="h-3 w-3 text-green-500" /> Completed
      </span>
    </div>
  );
};

