
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceData } from '@/types/device';

interface DeviceGroupsStatsProps {
  devices: DeviceData[];
}

export const DeviceGroupsStats = ({ devices }: DeviceGroupsStatsProps) => {
  const data = useMemo(() => {
    const groupCounts = devices.reduce((acc, device) => {
      if (!acc[device.deviceGroupName]) {
        acc[device.deviceGroupName] = {
          name: device.deviceGroupName,
          total: 0,
          Submitted: 0,
          Processed: 0,
          Created: 0,
          'Needs Update': 0
        };
      }
      
      acc[device.deviceGroupName].total += 1;
      acc[device.deviceGroupName][device.status] += 1;
      
      return acc;
    }, {} as Record<string, { name: string, total: number, Submitted: number, Processed: number, Created: number, 'Needs Update': number }>);
    
    return Object.values(groupCounts).sort((a, b) => b.total - a.total);
  }, [devices]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Device Groups</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              Submitted: { color: "#4CAF50" },
              Processed: { color: "#2196F3" },
              Created: { color: "#FFC107" },
              "Needs Update": { color: "#F44336" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="Submitted" stackId="a" fill="#4CAF50" />
                <Bar dataKey="Processed" stackId="a" fill="#2196F3" />
                <Bar dataKey="Created" stackId="a" fill="#FFC107" />
                <Bar dataKey="Needs Update" stackId="a" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
