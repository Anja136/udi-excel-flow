
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDeviceReportData } from '@/hooks/useDeviceReportData';
import { KeyMetricsGrid, createDefaultMetrics } from '@/components/reports/KeyMetricsGrid';
import { DashboardHeader } from '@/components/reports/DashboardHeader';
import { DashboardOverview } from '@/components/reports/DashboardOverview';
import { DetailedAnalysis } from '@/components/reports/DetailedAnalysis';
import { Skeleton } from "@/components/ui/skeleton";

const Report = () => {
  const { devices, summary, isLoading, error } = useDeviceReportData();

  // Generate additional data for authority status breakdown
  const statusByAuthority: Record<string, Record<string, number>> = {};
  if (devices.length > 0) {
    devices.forEach(device => {
      const authority = device.deviceIdentifier.split('-')[0];
      if (!statusByAuthority[authority]) {
        statusByAuthority[authority] = {};
      }
      statusByAuthority[authority][device.status] = (statusByAuthority[authority][device.status] || 0) + 1;
    });
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-lg">
          <h2 className="text-lg font-semibold">Error Loading Report Data</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  const keyMetrics = createDefaultMetrics(summary);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col gap-6">
        <DashboardHeader 
          devicesCount={devices.length} 
          regionsCount={Object.keys(summary.byRegion).length}
          isLoading={isLoading}
        />

        <section className="mt-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <KeyMetricsGrid metrics={keyMetrics} />
          )}
        </section>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <DashboardOverview 
              devices={devices}
              summary={summary}
              isLoading={isLoading}
              statusByAuthority={statusByAuthority}
            />
          </TabsContent>
          
          <TabsContent value="details" className="mt-6">
            <DetailedAnalysis 
              devices={devices}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Report;
