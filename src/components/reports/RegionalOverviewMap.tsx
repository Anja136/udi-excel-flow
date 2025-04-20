
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapIcon, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface RegionData {
  name: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  errorRate: number;
}

interface RegionalOverviewMapProps {
  regionData: Record<string, number>;
  isLoading?: boolean;
}

export const RegionalOverviewMap = ({ regionData, isLoading = false }: RegionalOverviewMapProps) => {
  // Convert raw data to more detailed region data
  const regions: RegionData[] = Object.entries(regionData).map(([name, count]) => {
    // Mock trends and error rates - in a real app, these would come from the backend
    const trends = ['up', 'down', 'stable'];
    const trend = trends[Math.floor(Math.random() * trends.length)] as 'up' | 'down' | 'stable';
    const errorRate = Math.random() * 0.1; // 0-10% error rate
    
    return { name, count, trend, errorRate };
  }).sort((a, b) => b.count - a.count);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Regional Overview</CardTitle>
        <MapIcon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-80">
            <p className="text-muted-foreground">Loading regional data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regions.map((region) => (
              <div 
                key={region.name} 
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{region.name}</h3>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    {region.trend === 'up' && (
                      <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    )}
                    {region.trend === 'down' && (
                      <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
                    )}
                    {region.trend === 'stable' && (
                      <span className="h-4 w-4 mr-1">→</span>
                    )}
                    <span>
                      {region.trend === 'up' ? 'Growing' : 
                       region.trend === 'down' ? 'Declining' : 'Stable'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{region.count}</div>
                  <div className="flex items-center justify-end mt-1 text-sm">
                    {region.errorRate > 0.05 ? (
                      <div className="flex items-center text-red-500">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        {(region.errorRate * 100).toFixed(1)}% errors
                      </div>
                    ) : (
                      <div className="text-green-500">
                        {(region.errorRate * 100).toFixed(1)}% errors
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
