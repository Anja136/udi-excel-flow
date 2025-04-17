
import { CircleDot, AlertCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SrvStatus } from '@/types/device';

interface SrvStatusIconProps {
  status: SrvStatus;
  isDownloadable: boolean;
}

export const SrvStatusIcon = ({ status, isDownloadable }: SrvStatusIconProps) => {
  switch(status) {
    case 'started':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <CircleDot className="h-4 w-4 text-yellow-500" />
                <span className="ml-1 capitalize">Started</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>SRV calculation started - Not downloadable</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case 'in progress':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <CircleDot className="h-4 w-4 text-blue-500" />
                <span className="ml-1 capitalize">In Progress</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>SRV calculation in progress - Not downloadable</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case 'completed':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <CircleDot className="h-4 w-4 text-green-500" />
                <span className="ml-1 capitalize">Completed</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>SRV calculation completed - Ready for download</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    default:
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <CircleDot className="h-4 w-4 text-gray-300" />
                <span className="ml-1">—</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>No SRV calculation - Not downloadable</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
  }
};

