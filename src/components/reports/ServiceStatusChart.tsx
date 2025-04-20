
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceData, SrvStatus } from '@/types/device';

interface ServiceStatusChartProps {
  devices: DeviceData[];
}

export const ServiceStatusChart = ({ devices }: ServiceStatusChartProps) => {
  const srvStatusCounts = devices.reduce((acc, device) => {
    acc[device.srvStatus] = (acc[device.srvStatus] || 0) + 1;
    return acc;
  }, {} as Record<SrvStatus, number>);
  
  const data = [
    { name: 'Completed', value: srvStatusCounts['completed'] || 0, fill: '#8B5CF6' },
    { name: 'In Progress', value: srvStatusCounts['in progress'] || 0, fill: '#A78BFA' },
    { name: 'Started', value: srvStatusCounts['started'] || 0, fill: '#C4B5FD' },
    { name: 'None', value: srvStatusCounts['none'] || 0, fill: '#EDE9FE' }
  ];

  const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#EDE9FE'];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">SRV Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              Completed: { color: "#8B5CF6" },
              "In Progress": { color: "#A78BFA" },
              Started: { color: "#C4B5FD" },
              None: { color: "#EDE9FE" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
