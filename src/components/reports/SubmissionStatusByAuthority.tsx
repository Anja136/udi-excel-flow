
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubmissionStatusByAuthorityProps {
  authorityData: Record<string, number>;
  statusData: Record<string, Record<string, number>>;
}

export const SubmissionStatusByAuthority = ({ authorityData, statusData }: SubmissionStatusByAuthorityProps) => {
  // Format data for the stacked bar chart
  const authorityNames: Record<string, string> = {
    'fda': 'FDA (US)',
    'ema': 'EMA (EU)',
    'pmda': 'PMDA (Japan)',
    'mhra': 'MHRA (UK)',
    'tga': 'TGA (Australia)',
    'health-canada': 'Health Canada',
    'anvisa': 'ANVISA (Brazil)',
    'mfds': 'MFDS (Korea)',
    'sfda': 'SFDA (China)',
    'cdsco': 'CDSCO (India)'
  };
  
  const chartData = Object.entries(authorityData).map(([authority, count]) => {
    const statusCounts = {
      name: authorityNames[authority] || authority,
      total: count,
      Submitted: 0,
      Processed: 0,
      Created: 0,
      'Needs Update': 0
    };
    
    // Add status breakdown
    if (statusData[authority]) {
      Object.entries(statusData[authority]).forEach(([status, statusCount]) => {
        // @ts-ignore
        statusCounts[status] = statusCount;
      });
    }
    
    return statusCounts;
  }).sort((a, b) => b.total - a.total);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submission Status by Authority</CardTitle>
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
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
