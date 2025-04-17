
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileDown, History, AlertCircle, Info } from 'lucide-react';
import { ConfigData } from '@/components/ConfigStep';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DownloadStepProps {
  config: ConfigData;
  onPrevStep: (step: number) => void;
  onDownload: (isEmpty: boolean) => void;
  hasDownloadHistory: boolean;
  onViewHistory: () => void;
  downloadableInfo?: { total: number, downloadable: number };
}

const DownloadStep = ({
  config,
  onPrevStep,
  onDownload,
  hasDownloadHistory,
  onViewHistory,
  downloadableInfo
}: DownloadStepProps) => {
  const hasNonDownloadableDevices = downloadableInfo && 
    downloadableInfo.total > downloadableInfo.downloadable;

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-medium mb-4">Download UDI Data</h2>
      <p className="mb-4">Your UDI data is ready for download.</p>
      
      {downloadableInfo && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Info className="h-4 w-4 mr-2 text-blue-500" />
            <p className="font-medium">Download Summary:</p>
          </div>
          <ul className="list-disc pl-5 mt-2">
            <li>Selected devices: {downloadableInfo.total}</li>
            <li>Downloadable devices: {downloadableInfo.downloadable}</li>
            {hasNonDownloadableDevices && (
              <li className="text-amber-600">
                {downloadableInfo.total - downloadableInfo.downloadable} device(s) were excluded due to incomplete SRV calculation
              </li>
            )}
          </ul>
          
          {hasNonDownloadableDevices && (
            <Alert className="mt-4 bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-amber-700">
                Some selected devices were excluded from the download because their SRV calculation is not completed.
                Only devices with completed SRV calculation are included in the download.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
      
      <div className="mb-4">
        <p className="font-medium">Configuration:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Authority: {config.authority.toUpperCase()}</li>
          <li>Template: {config.template}</li>
          <li>Selected Devices: Ready to download</li>
        </ul>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <Button onClick={() => onDownload(false)}>
          <Download className="h-4 w-4 mr-2" />
          Download Excel Template
        </Button>
        <Button variant="outline" onClick={() => onDownload(true)}>
          <FileDown className="h-4 w-4 mr-2" />
          Download Empty Sheet
        </Button>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => onPrevStep(2)}>
          Back to Select Devices
        </Button>
        <Button variant="outline" onClick={() => onPrevStep(1)}>
          Back to Select Sheet
        </Button>
      </div>

      {hasDownloadHistory && (
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={onViewHistory}
            className="w-full"
          >
            <History className="h-4 w-4 mr-2" />
            Go to Recent Downloads
          </Button>
        </div>
      )}
    </div>
  );
};

export default DownloadStep;
