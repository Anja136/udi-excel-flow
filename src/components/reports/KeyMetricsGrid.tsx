
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  BarChart3, 
  Flag,
  CircleCheck
} from "lucide-react";

interface KeyMetric {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

interface KeyMetricsGridProps {
  metrics: KeyMetric[];
}

export const KeyMetricsGrid = ({ metrics }: KeyMetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className={`overflow-hidden ${metric.color ? `border-l-4 border-l-${metric.color}` : ''}`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
                {metric.description && (
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                )}
                {metric.trend && (
                  <p className={`text-xs mt-2 ${metric.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend.isPositive ? '↑' : '↓'} {metric.trend.value}% from last month
                  </p>
                )}
              </div>
              <div className="p-2">
                {metric.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const createDefaultMetrics = (summary: any) => {
  const metrics: KeyMetric[] = [
    {
      title: "Total Submissions",
      value: summary.totalDevices,
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
      trend: {
        value: 12,
        isPositive: true
      }
    },
    {
      title: "Submitted Today",
      value: summary.submittedToday,
      icon: <Clock className="h-6 w-6 text-indigo-500" />,
      description: "In the last 24 hours"
    },
    {
      title: "Completed",
      value: summary.completedCount,
      icon: <CircleCheck className="h-6 w-6 text-green-500" />,
      trend: {
        value: 8,
        isPositive: true
      }
    },
    {
      title: "In Progress",
      value: summary.pendingCount,
      icon: <Clock className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "Exceptions",
      value: summary.errorsCount,
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      description: "Need attention",
      trend: {
        value: 3,
        isPositive: false
      }
    },
    {
      title: "Registered Products",
      value: summary.totalDevices - summary.errorsCount,
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      description: "Successfully registered"
    },
    {
      title: "Regions",
      value: Object.keys(summary.byRegion).length,
      icon: <Flag className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Authorities",
      value: Object.keys(summary.byAuthority).length,
      icon: <Flag className="h-6 w-6 text-teal-500" />
    }
  ];
  
  return metrics;
};
