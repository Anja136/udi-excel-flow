
import React from 'react';
import { DeviceData } from '@/types/device';
import { DeviceStatusChart } from './DeviceStatusChart';
import { ServiceStatusChart } from './ServiceStatusChart';
import { RegionalOverviewMap } from './RegionalOverviewMap';
import { ActivityTimeline } from './ActivityTimeline';
import { SubmissionStatusByAuthority } from './SubmissionStatusByAuthority';
import { RecentUpdatesTable } from './RecentUpdatesTable';
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardOverviewProps {
  devices: DeviceData[];
  summary: any;
  isLoading: boolean;
  statusByAuthority: Record<string, Record<string, number>>;
}

export const DashboardOverview = ({ devices, summary, isLoading, statusByAuthority }: DashboardOverviewProps) => {
  return (
    <>
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
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        {isLoading ? (
          <Skeleton className="h-[400px] w-full rounded-xl" />
        ) : (
          <RecentUpdatesTable devices={devices} limit={10} />
        )}
      </div>
    </>
  );
};
