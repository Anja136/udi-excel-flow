
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceData } from '@/types/device';

interface DeviceManufacturerStatsProps {
  devices: DeviceData[];
}

export const DeviceManufacturerStats = ({ devices }: DeviceManufacturerStatsProps) => {
  const manufacturerData = useMemo(() => {
    const manufacturers = devices.reduce((acc, device) => {
      if (!acc[device.manufacturerName]) {
        acc[device.manufacturerName] = {
          count: 0,
          statuses: { Submitted: 0, Processed: 0, Created: 0, 'Needs Update': 0 }
        };
      }
      
      acc[device.manufacturerName].count += 1;
      acc[device.manufacturerName].statuses[device.status] += 1;
      
      return acc;
    }, {} as Record<string, { count: number, statuses: Record<string, number> }>);
    
    return Object.entries(manufacturers)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);
  }, [devices]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manufacturer Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {manufacturerData.slice(0, 5).map((manufacturer) => (
            <div key={manufacturer.name} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{manufacturer.name}</p>
                <div className="flex gap-2 mt-1">
                  {Object.entries(manufacturer.statuses).map(([status, count]) => 
                    count > 0 ? (
                      <span 
                        key={status} 
                        className={`text-xs px-2 py-1 rounded-full ${
                          status === 'Submitted' ? 'bg-green-100 text-green-800' :
                          status === 'Processed' ? 'bg-blue-100 text-blue-800' :
                          status === 'Created' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {status}: {count}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
              <span className="text-2xl font-bold">{manufacturer.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
