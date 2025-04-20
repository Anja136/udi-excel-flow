
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceData } from '@/types/device';
 
interface DeviceStatusChartProps {
  devices: DeviceData[];
  title?: string;
}

export const DeviceStatusChart = ({ devices, title = "Device Status Overview" }: DeviceStatusChartProps) => {
  const statusCounts = devices.reduce((acc, device) => {
    acc[device.status] = (acc[device.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const data = [
    { name: 'Submitted', value: statusCounts['Submitted'] || 0, fill: '#8B5CF6' },
    { name: 'Processed', value: statusCounts['Processed'] || 0, fill: '#A78BFA' },
    { name: 'Created', value: statusCounts['Created'] || 0, fill: '#C4B5FD' },
    { name: 'Needs Update', value: statusCounts['Needs Update'] || 0, fill: '#EDE9FE' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              Submitted: { color: "#8B5CF6" },
              Processed: { color: "#A78BFA" },
              Created: { color: "#C4B5FD" },
              "Needs Update": { color: "#EDE9FE" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="value" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
