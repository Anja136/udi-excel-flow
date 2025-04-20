
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDeviceReportData } from '@/hooks/useDeviceReportData';
import { DeviceStatusChart } from '@/components/reports/DeviceStatusChart';
import { ServiceStatusChart } from '@/components/reports/ServiceStatusChart';
import { RecentUpdatesTable } from '@/components/reports/RecentUpdatesTable';
import { DeviceManufacturerStats } from '@/components/reports/DeviceManufacturerStats';
import { DeviceGroupsStats } from '@/components/reports/DeviceGroupsStats';
import { RegionalOverviewMap } from '@/components/reports/RegionalOverviewMap';
import { ActivityTimeline } from '@/components/reports/ActivityTimeline';
import { KeyMetricsGrid, createDefaultMetrics } from '@/components/reports/KeyMetricsGrid';
import { SubmissionStatusByAuthority } from '@/components/reports/SubmissionStatusByAuthority';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, CalendarCheck } from 'lucide-react';

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
        <Card className="mb-6 border-red-300">
          <CardHeader>
            <CardTitle className="text-red-500">Error Loading Report Data</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const keyMetrics = createDefaultMetrics(summary);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">UDI Reports Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              {isLoading ? 'Loading data...' : `${devices.length} devices analyzed across ${Object.keys(summary.byRegion).length} regions`}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarCheck className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Key Metrics Section */}
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
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {isLoading ? (
                <>
                  <Skeleton className="h-[350px] w-full rounded-xl" />
                  <Skeleton className="h-[350px] w-full rounded-xl" />
                </>
              ) : (
                <>
                  <DeviceStatusChart devices={devices} />
                  <ServiceStatusChart devices={devices} />
                </>
              )}
            </div>
            
            {/* Regional Overview and Activity Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                {isLoading ? (
                  <Skeleton className="h-[400px] w-full rounded-xl" />
                ) : (
                  <RegionalOverviewMap regionData={summary.byRegion} />
                )}
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-[400px] w-full rounded-xl" />
                ) : (
                  <ActivityTimeline activities={summary.recentActivity} />
                )}
              </div>
            </div>
            
            {/* Submission Status by Authority */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              {isLoading ? (
                <Skeleton className="h-[400px] w-full rounded-xl" />
              ) : (
                <SubmissionStatusByAuthority 
                  authorityData={summary.byAuthority} 
                  statusData={statusByAuthority} 
                />
              )}
            </div>
            
            {/* Recent Updates Table */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              {isLoading ? (
                <Skeleton className="h-[400px] w-full rounded-xl" />
              ) : (
                <RecentUpdatesTable devices={devices} limit={10} />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-6">
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
                  <CardDescription>Key findings from device data analysis</CardDescription>
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
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                          <p className="text-xs text-muted-foreground">Total Devices</p>
                          <p className="text-2xl font-bold">{devices.length}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                          <p className="text-xs text-muted-foreground">Ready for Download</p>
                          <p className="text-2xl font-bold">{devices.filter(d => d.isDownloadable).length}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                          <p className="text-xs text-muted-foreground">Need Updates</p>
                          <p className="text-2xl font-bold">{devices.filter(d => d.status === 'Needs Update').length}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                          <p className="text-xs text-muted-foreground">Manufacturers</p>
                          <p className="text-2xl font-bold">{new Set(devices.map(d => d.manufacturerName)).size}</p>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Report;
