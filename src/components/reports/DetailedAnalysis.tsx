
import React from 'react';
import { DeviceData } from '@/types/device';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceGroupsStats } from './DeviceGroupsStats';
import { DeviceManufacturerStats } from './DeviceManufacturerStats';
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3 } from 'lucide-react';

interface DetailedAnalysisProps {
  devices: DeviceData[];
  isLoading: boolean;
}

export const DetailedAnalysis = ({ devices, isLoading }: DetailedAnalysisProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          {isLoading ? (
            <Skeleton className="h-[400px] w-full rounded-xl" />
          ) : (
            <DeviceGroupsStats devices={devices} />
          )}
        </div>
        <div>
          {isLoading ? (
            <Skeleton className="h-[400px] w-full rounded-xl" />
          ) : (
            <DeviceManufacturerStats devices={devices} />
          )}
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Report Summary</CardTitle>
            <p className="text-sm text-muted-foreground">Key findings from device data analysis</p>
          </div>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading ? (
              <>
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </>
            ) : (
              <>
                <SummaryCard title="Total Devices" value={devices.length} />
                <SummaryCard 
                  title="Ready for Download" 
                  value={devices.filter(d => d.isDownloadable).length} 
                />
                <SummaryCard 
                  title="Need Updates" 
                  value={devices.filter(d => d.status === 'Needs Update').length} 
                />
                <SummaryCard 
                  title="Manufacturers" 
                  value={new Set(devices.map(d => d.manufacturerName)).size} 
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const SummaryCard = ({ title, value }: { title: string; value: number }) => (
  <Card>
    <CardContent className="p-4 flex flex-col items-center justify-center h-full">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);
