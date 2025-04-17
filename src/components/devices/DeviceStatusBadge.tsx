
import { cn } from "@/lib/utils";

type StatusType = 'Submitted' | 'Processed' | 'Needs Update' | 'Created';

interface DeviceStatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  'Submitted': 'bg-green-100 text-green-700 border-green-200',
  'Processed': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Needs Update': 'bg-red-100 text-red-700 border-red-200',
  'Created': 'bg-blue-100 text-blue-700 border-blue-200',
};

export const DeviceStatusBadge = ({ status, className }: DeviceStatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
};
