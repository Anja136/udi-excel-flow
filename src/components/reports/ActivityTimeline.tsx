
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, AlertCircle, Clock1 } from "lucide-react";
import { DeviceStatusBadge } from '@/components/devices/DeviceStatusBadge';
import { DeviceStatus } from '@/types/device';

interface ActivityItem {
  id: string;
  action: string;
  timestamp: string;
  status: DeviceStatus;
  deviceId: string;
  deviceName: string;
  region: string;
}

interface ActivityTimelineProps {
  activities: ActivityItem[];
  limit?: number;
}

export const ActivityTimeline = ({ activities, limit = 7 }: ActivityTimelineProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Submitted':
        return <Clock className="h-5 w-5 text-blue-400" />;
      case 'Approved':
        return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'Rejected':
        return <AlertCircle className="h-5 w-5 text-rose-400" />;
      default:
        return <Clock1 className="h-5 w-5 text-slate-400" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.slice(0, limit).map((activity) => (
            <div key={activity.id} className="flex">
              <div className="mr-4 flex items-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50">
                  {getActionIcon(activity.action)}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">
                    {activity.action} {activity.deviceName}
                  </p>
                  <time className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</time>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.deviceId} • {activity.region}
                </p>
                <div className="mt-2">
                  <DeviceStatusBadge status={activity.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
