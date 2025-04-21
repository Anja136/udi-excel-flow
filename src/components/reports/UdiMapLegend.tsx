
import React from 'react';
import { getStatusColor, getStatusText } from '@/data/udiRegionsData';

const UdiMapLegend = () => {
  const legendItems = [
    { status: 'REQUIRED', label: 'UDI Registration Required' },
    { status: 'UPCOMING', label: 'UDI Registration Upcoming' },
    { status: 'IN_PROCESS', label: 'UDI Registration In Process' },
  ];

  return (
    <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-sm p-3 rounded-md shadow-lg border z-10">
      <h3 className="text-sm font-medium mb-2">Legend</h3>
      <div className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: getStatusColor(item.status) }}
            />
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UdiMapLegend;
