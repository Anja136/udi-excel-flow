
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileDown, History } from 'lucide-react';
import { ConfigData } from '@/components/ConfigStep';
import { useNavigate } from 'react-router-dom';

interface DownloadStepProps {
  config: ConfigData;
  onPrevStep: (step: number) => void;
  onDownload: (isEmpty: boolean) => void;
  hasDownloadHistory: boolean;
  onViewHistory: () => void;
}

const DownloadStep = ({
  config,
  onPrevStep,
  onDownload,
  hasDownloadHistory,
  onViewHistory
}: DownloadStepProps) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-medium mb-4">Download UDI Data</h2>
      <p className="mb-4">Your UDI data is ready for download.</p>
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
