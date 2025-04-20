
import React from 'react';
import { CalendarCheck } from 'lucide-react';

interface DashboardHeaderProps {
  devicesCount: number;
  regionsCount: number;
  isLoading: boolean;
}

export const DashboardHeader = ({ devicesCount, regionsCount, isLoading }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">UDI Reports Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          {isLoading ? 'Loading data...' : `${devicesCount} devices analyzed across ${regionsCount} regions`}
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarCheck className="h-4 w-4" />
        <span>Last updated: {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};
