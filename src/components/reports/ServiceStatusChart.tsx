
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
    { name: 'Completed', value: srvStatusCounts['completed'] || 0, fill: '#4CAF50' },
    { name: 'In Progress', value: srvStatusCounts['in progress'] || 0, fill: '#2196F3' },
    { name: 'Started', value: srvStatusCounts['started'] || 0, fill: '#FFC107' },
    { name: 'None', value: srvStatusCounts['none'] || 0, fill: '#9E9E9E' },
  ];

  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#9E9E9E'];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SRV Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              Completed: { color: "#4CAF50" },
              "In Progress": { color: "#2196F3" },
              Started: { color: "#FFC107" },
              None: { color: "#9E9E9E" },
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
